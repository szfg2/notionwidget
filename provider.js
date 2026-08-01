/* ==================================================================== *
 *  provider.js — one model-provider adapter shared by every page.
 *
 *  All pages call AI.call() instead of talking to a vendor endpoint
 *  directly. Switching provider is then a single dropdown, stored once
 *  in localStorage under "cdg_provider" and honoured everywhere.
 *
 *  Both providers are called straight from the browser, which each has
 *  to allow explicitly: Anthropic via the dangerous-direct-browser-access
 *  header, DeepSeek by serving permissive CORS on its OpenAI-compatible
 *  endpoint.
 * ==================================================================== */
(function (global) {
  "use strict";

  const PROVIDERS = {
    anthropic: {
      label: "Claude",
      longLabel: "Claude (Anthropic)",
      url: "https://api.anthropic.com/v1/messages",
      models: { default: "claude-sonnet-4-6", ask: "claude-opus-5" },
      keyPlaceholder: "sk-ant-...",
      keyHint: "Claude (Anthropic) API key"
    },
    deepseek: {
      label: "DeepSeek",
      longLabel: "DeepSeek",
      url: "https://api.deepseek.com/chat/completions",
      models: { default: "deepseek-v4-flash", ask: "deepseek-v4-pro" },
      /* Both V4 models think by default. Thinking is left ON for the reasoning
       * tier and turned OFF for the routine tier, so summaries and letters stay
       * as quick as they were on Sonnet. Flip a value here to change that.
       * Unlisted models fall back to the API default (thinking enabled). */
      thinking: { "deepseek-v4-flash": false, "deepseek-v4-pro": true },
      // low | high | max. v4-pro treats "low" as "high" for now.
      reasoningEffort: "high",
      // Thinking tokens share the max_tokens budget with the answer, so a
      // thinking call gets plenty of headroom. You are billed only for tokens
      // actually generated, so a high ceiling costs nothing on short answers.
      thinkingMinMaxTokens: 32768,
      keyPlaceholder: "sk-...",
      keyHint: "DeepSeek API key"
    }
  };

  const LS = {
    provider: "cdg_provider",
    anthropic: "cdg_api_key",
    deepseek: "cdg_deepseek_key",
    // pft.html predates the shared key and stored its own copy
    anthropicLegacy: "anthropic_api_key"
  };

  function get(k) { try { return localStorage.getItem(k) || ""; } catch (e) { return ""; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  const AI = {
    PROVIDERS,
    LS,

    // A page may set this to a function returning a key typed into the
    // settings box but not yet saved, so the first generation still works.
    fallbackKey: null,

    id() {
      const v = get(LS.provider);
      return PROVIDERS[v] ? v : "anthropic";
    },
    current() { return PROVIDERS[AI.id()]; },
    label() { return AI.current().label; },
    setProvider(id) { set(LS.provider, PROVIDERS[id] ? id : "anthropic"); },

    // kind: "ask" picks the stronger/reasoning model, anything else the default
    model(kind) {
      const m = AI.current().models;
      return kind === "ask" ? m.ask : m.default;
    },

    storedKey(id) {
      const which = id || AI.id();
      if (which === "deepseek") return get(LS.deepseek);
      return get(LS.anthropic) || get(LS.anthropicLegacy);
    },
    saveKey(id, value) {
      if (id === "deepseek") set(LS.deepseek, value);
      else { set(LS.anthropic, value); set(LS.anthropicLegacy, value); }
    },
    key() {
      return AI.storedKey() || (typeof AI.fallbackKey === "function" ? (AI.fallbackKey() || "") : "");
    },
    hasKey() { return !!AI.key(); },
    missingKeyMsg() { return "Add your " + AI.current().keyHint + " in Settings first."; },

    /* Fill a page's settings controls. Pass the element ids it uses; any that
     * are absent are skipped, so pages can adopt this piecemeal. */
    fillSettings(ids) {
      const el = (id) => (id ? document.getElementById(id) : null);
      const sel = el(ids.provider), a = el(ids.anthropicKey), d = el(ids.deepseekKey);
      if (sel) sel.value = AI.id();
      if (a) a.value = AI.storedKey("anthropic");
      if (d) d.value = AI.storedKey("deepseek");
    },
    saveSettings(ids) {
      const el = (id) => (id ? document.getElementById(id) : null);
      const sel = el(ids.provider), a = el(ids.anthropicKey), d = el(ids.deepseekKey);
      if (sel) AI.setProvider(sel.value);
      if (a) AI.saveKey("anthropic", a.value.trim());
      if (d) AI.saveKey("deepseek", d.value.trim());
    },

    /* The one request path.
     *   systems  [{ text, cache }]  cache=true marks the reusable prefix
     *   messages [{ role, content }]
     *   kind     "ask" | undefined   (ignored when `model` is given)
     */
    async call(opts) {
      const p = AI.current();
      const isDeep = AI.id() === "deepseek";
      const key = opts.key || AI.key();
      if (!key) throw new Error(AI.missingKeyMsg());

      const model = opts.model || AI.model(opts.kind);
      const systems = opts.systems || [];
      const maxTokens = opts.maxTokens || 4096;

      let headers, body;
      if (isDeep) {
        const thinks = p.thinking[model] !== undefined ? p.thinking[model] : true;
        headers = { "content-type": "application/json", "Authorization": "Bearer " + key };
        body = {
          model,
          max_tokens: thinks ? Math.max(maxTokens, p.thinkingMinMaxTokens) : maxTokens,
          thinking: { type: thinks ? "enabled" : "disabled" },
          // No system-block concept on the OpenAI-compatible API: merge them
          // into one system message and let DeepSeek's automatic context
          // cache do what cache_control does on Anthropic.
          messages: [{ role: "system", content: systems.map(s => s.text).join("\n\n") }].concat(opts.messages || [])
        };
        if (thinks) body.reasoning_effort = p.reasoningEffort;
        // Sampling params don't apply while thinking
        if (opts.temperature != null && !thinks) body.temperature = opts.temperature;
      } else {
        headers = {
          "content-type": "application/json",
          "x-api-key": key,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        };
        body = {
          model,
          max_tokens: maxTokens,
          system: systems.map(s => {
            const b = { type: "text", text: s.text };
            if (s.cache) b.cache_control = { type: "ephemeral" };
            return b;
          }),
          messages: opts.messages || []
        };
        if (opts.temperature != null) body.temperature = opts.temperature;
      }

      const res = await fetch(p.url, {
        method: "POST",
        signal: opts.signal,
        headers,
        body: JSON.stringify(body)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(p.label + ": " + ((data.error && data.error.message) || ("API error " + res.status)));
      }
      const text = isDeep
        ? ((data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || "")
        : (data.content || []).filter(b => b.type === "text").map(b => b.text).join("\n");
      return String(text).trim();
    }
  };

  global.AI = AI;
})(window);
