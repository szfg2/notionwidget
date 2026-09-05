/* ==================================================================== *
 *  provider.js — one model-provider adapter shared by every page.
 *
 *  All pages call AI.call() instead of talking to a vendor endpoint
 *  directly. Switching provider is then a single dropdown, stored once
 *  in localStorage under "cdg_provider" and honoured everywhere.
 *
 *  All three providers are called straight from the browser, which each
 *  has to allow explicitly: Anthropic via the dangerous-direct-browser-access
 *  header, DeepSeek by serving permissive CORS on its OpenAI-compatible
 *  endpoint, and Google by allowing browser origins on the Generative
 *  Language API when the key is sent as an x-goog-api-key header.
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
    },
    gemini: {
      label: "Gemini",
      longLabel: "Gemini (Google)",
      /* Google puts the model id in the URL path, so this is only the stem —
       * the full endpoint is assembled per call in AI.call(). */
      url: "https://generativelanguage.googleapis.com/v1beta/models/",
      models: { default: "gemini-3.8-flash", ask: "gemini-3.8-flash" },
      /* Gemini 3.x picks its own thinking budget. Leave these null to accept
       * that default; set either to "low" or "high" to force the routine or
       * reasoning tier to think less/more. A non-null value is sent as
       * generationConfig.thinkingConfig.thinkingLevel. */
      thinkingLevel: { default: null, ask: null },
      keyPlaceholder: "AIza...",
      keyHint: "Gemini (Google AI Studio) API key"
    }
  };

  /* List prices in USD per million tokens, used only to show a running daily
   * spend on the pages — nothing here changes a request. Anthropic charges
   * 1.25x input to write the 5-minute cache and 0.1x to read it, which is why
   * the cache columns aren't round numbers. A model missing from this table
   * still has its tokens counted; it just shows no dollar figure until rates
   * are added, so a wrong total is never invented. */
  const PRICES = {
    "claude-opus-5":     { in: 5, out: 25, cacheWrite: 6.25, cacheRead: 0.50 },
    "claude-sonnet-4-6": { in: 3, out: 15, cacheWrite: 3.75, cacheRead: 0.30 },
    // Whisper is billed per minute of audio, not per token.
    "whisper-1":         { perMinute: 0.006 }
    // DeepSeek v4 and Gemini 3.x rates are deliberately absent — add them here
    // to price those calls.
  };

  const LS = {
    provider: "cdg_provider",
    anthropic: "cdg_api_key",
    deepseek: "cdg_deepseek_key",
    gemini: "cdg_gemini_key",
    // pft.html predates the shared key and stored its own copy
    anthropicLegacy: "anthropic_api_key",
    // the council on RES.html has its own Gemini box; keep the two in step
    geminiLegacy: "council_gemini_key",
    usage: "cdg_usage_log"
  };

  const USAGE_DAYS = 14;   // older days are dropped on the next write

  function get(k) { try { return localStorage.getItem(k) || ""; } catch (e) { return ""; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  function dayKey(d) {
    d = d || new Date();
    return d.getFullYear() + "-" +
           String(d.getMonth() + 1).padStart(2, "0") + "-" +
           String(d.getDate()).padStart(2, "0");
  }
  function loadLog() { try { return JSON.parse(get(LS.usage) || "{}") || {}; } catch (e) { return {}; } }
  function saveLog(log) {
    const keep = Object.keys(log).sort().slice(-USAGE_DAYS);
    const trimmed = {};
    keep.forEach(k => { trimmed[k] = log[k]; });
    set(LS.usage, JSON.stringify(trimmed));
  }

  /* One row per model per day. `unpriced` marks a model with no rates above,
   * so the UI can show its tokens without pretending to know the cost. */
  function bump(model, fields, usd, unpriced) {
    const log = loadLog();
    const key = dayKey();
    const day = log[key] || (log[key] = {});
    const row = day[model] || (day[model] = { in: 0, out: 0, cw: 0, cr: 0, sec: 0, usd: 0, n: 0 });
    for (const k in fields) row[k] = (row[k] || 0) + fields[k];
    row.usd += usd;
    row.n += 1;
    if (unpriced) row.unpriced = true;
    saveLog(log);
    try { window.dispatchEvent(new CustomEvent("ai-usage")); } catch (e) {}
  }

  /* Every provider reports usage on the response, under different names. A
   * missing field counts as zero rather than breaking the tally. */
  function readUsage(data, id) {
    if (id === "gemini") {
      // Google reports the cached slice inside the prompt count, and bills
      // thinking tokens as output alongside the visible answer.
      const g = data.usageMetadata || {};
      const cached = g.cachedContentTokenCount || 0;
      return {
        in: Math.max((g.promptTokenCount || 0) - cached, 0),
        out: (g.candidatesTokenCount || 0) + (g.thoughtsTokenCount || 0),
        cw: 0,
        cr: cached
      };
    }
    const u = data.usage || {};
    if (id === "deepseek") {
      // DeepSeek splits the prompt into cache hits and misses; its cache is
      // automatic, so there is no separate write charge to record.
      const hit = u.prompt_cache_hit_tokens != null
        ? u.prompt_cache_hit_tokens
        : ((u.prompt_tokens_details && u.prompt_tokens_details.cached_tokens) || 0);
      return {
        in: Math.max((u.prompt_tokens || 0) - hit, 0),
        out: u.completion_tokens || 0,
        cw: 0,
        cr: hit
      };
    }
    return {
      in: u.input_tokens || 0,
      out: u.output_tokens || 0,
      cw: u.cache_creation_input_tokens || 0,
      cr: u.cache_read_input_tokens || 0
    };
  }

  const AI = {
    PROVIDERS,
    LS,

    /* Running spend, tallied from the usage block every provider returns and
     * kept in localStorage by date. Pages read `total()` for a headline figure
     * and `day()` for the per-model breakdown, and re-render on the `ai-usage`
     * window event fired after each call. */
    usage: {
      PRICES,
      dayKey,

      // Called by AI.call for every successful model response.
      record(model, data, id) {
        const t = readUsage(data, id);
        const p = PRICES[model];
        const usd = p
          ? (t.in * p.in + t.out * p.out + t.cw * p.cacheWrite + t.cr * p.cacheRead) / 1e6
          : 0;
        bump(model, t, usd, !p);
      },

      // Audio models are billed by the minute — Whisper dictation goes here.
      audio(model, seconds) {
        const p = PRICES[model];
        const usd = p && p.perMinute ? (seconds / 60) * p.perMinute : 0;
        bump(model, { sec: seconds }, usd, !(p && p.perMinute));
      },

      day(key) { return loadLog()[key || dayKey()] || {}; },

      total(key) {
        const day = AI.usage.day(key);
        return Object.keys(day).reduce((sum, m) => sum + (day[m].usd || 0), 0);
      },

      clear(key) {
        const log = loadLog();
        delete log[key || dayKey()];
        saveLog(log);
        try { window.dispatchEvent(new CustomEvent("ai-usage")); } catch (e) {}
      }
    },

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

    /* Where a provider's key lives. Some have a second, older location kept
     * in step on save so pages written before the shared adapter (and the
     * council on RES.html) still find the key they expect. */
    keyStorage(id) {
      const which = id || AI.id();
      if (which === "deepseek") return [LS.deepseek];
      if (which === "gemini") return [LS.gemini, LS.geminiLegacy];
      return [LS.anthropic, LS.anthropicLegacy];
    },
    storedKey(id) {
      const slots = AI.keyStorage(id);
      for (let i = 0; i < slots.length; i++) {
        const v = get(slots[i]);
        if (v) return v;
      }
      return "";
    },
    saveKey(id, value) {
      AI.keyStorage(id).forEach(k => set(k, value));
    },
    clearKey(id) {
      AI.keyStorage(id).forEach(k => { try { localStorage.removeItem(k); } catch (e) {} });
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
      const sel = el(ids.provider);
      if (sel) sel.value = AI.id();
      const a = el(ids.anthropicKey), d = el(ids.deepseekKey), g = el(ids.geminiKey);
      if (a) a.value = AI.storedKey("anthropic");
      if (d) d.value = AI.storedKey("deepseek");
      if (g) g.value = AI.storedKey("gemini");
    },
    saveSettings(ids) {
      const el = (id) => (id ? document.getElementById(id) : null);
      const sel = el(ids.provider);
      if (sel) AI.setProvider(sel.value);
      const a = el(ids.anthropicKey), d = el(ids.deepseekKey), g = el(ids.geminiKey);
      if (a) AI.saveKey("anthropic", a.value.trim());
      if (d) AI.saveKey("deepseek", d.value.trim());
      if (g) AI.saveKey("gemini", g.value.trim());
    },

    /* The one request path.
     *   systems  [{ text, cache }]  cache=true marks the reusable prefix
     *   messages [{ role, content }]
     *   kind     "ask" | undefined   (ignored when `model` is given)
     */
    async call(opts) {
      const p = AI.current();
      const id = AI.id();
      const key = opts.key || AI.key();
      if (!key) throw new Error(AI.missingKeyMsg());

      const model = opts.model || AI.model(opts.kind);
      const systems = opts.systems || [];
      const maxTokens = opts.maxTokens || 4096;

      let url = p.url, headers, body;
      if (id === "gemini") {
        // The model goes in the path, the key in a header, and the system
        // prompt in its own field. Google has no cache_control equivalent to
        // honour, so `cache` on a system block is simply ignored here.
        url = p.url + encodeURIComponent(model) + ":generateContent";
        headers = { "content-type": "application/json", "x-goog-api-key": key };
        const generationConfig = { maxOutputTokens: maxTokens };
        if (opts.temperature != null) generationConfig.temperature = opts.temperature;
        const level = p.thinkingLevel[opts.kind === "ask" ? "ask" : "default"];
        if (level) generationConfig.thinkingConfig = { thinkingLevel: level };
        body = {
          // Gemini calls the assistant "model" and takes a parts array per turn.
          contents: (opts.messages || []).map(m => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }]
          })),
          generationConfig
        };
        if (systems.length) body.systemInstruction = { parts: systems.map(sys => ({ text: sys.text })) };
      } else if (id === "deepseek") {
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

      const res = await fetch(url, {
        method: "POST",
        signal: opts.signal,
        headers,
        body: JSON.stringify(body)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(p.label + ": " + ((data.error && data.error.message) || ("API error " + res.status)));
      }
      AI.usage.record(model, data, id);

      let text;
      if (id === "gemini") {
        const cand = (data.candidates || [])[0];
        const parts = (cand && cand.content && cand.content.parts) || [];
        // `thought` parts are the model's reasoning, not the answer.
        text = parts.filter(b => typeof b.text === "string" && !b.thought).map(b => b.text).join("\n");
        // A safety filter or a truncated answer comes back 200 with no
        // text, so say why rather than handing the page an empty string.
        if (!text.trim()) {
          const why = (data.promptFeedback && data.promptFeedback.blockReason) ||
                      (cand && cand.finishReason && cand.finishReason !== "STOP" ? cand.finishReason : "");
          if (why) throw new Error(p.label + ": no answer returned (" + why + ").");
        }
      } else if (id === "deepseek") {
        text = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || "";
      } else {
        text = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("\n");
      }
      return String(text).trim();
    }
  };

  global.AI = AI;
})(window);
