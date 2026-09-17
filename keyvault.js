/* ==================================================================== *
 *  keyvault.js — unlock your saved keys on a computer that lacks them.
 *
 *  keyvault.data.js (made once by keyvault-setup.html) holds the keys
 *  encrypted with a 10-character code. A page that finds none of those keys
 *  in this browser offers to unlock them. The code is stretched into an
 *  AES-256 key with PBKDF2 — deliberately slow, so anyone who copies the
 *  public file pays about a second per guess — and the keys are written to
 *  localStorage for UNLOCK_HOURS, then wiped on the next page load.
 *
 *  Keys a browser already had (your own laptop) are never overwritten and
 *  never wiped: only what this script wrote is tracked and removed.
 * ==================================================================== */
(function (global) {
  "use strict";

  const UNLOCK_HOURS = 12;
  const ITERATIONS = 2000000;
  const CODE_LENGTH = 10;
  // Crockford base32: no I, L, O or U, so nothing is mistaken for 1 or 0
  const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
  const SESSION = "kv_session";
  const DISMISSED = "kv_dismissed";

  const GROUPS = [
    {
      id: "ai", label: "AI provider keys", checked: true,
      names: ["cdg_api_key", "anthropic_api_key", "cdg_deepseek_key", "cdg_gemini_key",
              "council_gemini_key", "dictation_openai_key", "cdg_provider"]
    },
    {
      id: "github", label: "GitHub token and patient-list repo", checked: false,
      warn: "This token can read and write your private patient-data repo. If the code ever leaks, patient lists are exposed, not just API credit. Tick only if you need the ward lists on work computers.",
      names: ["dictation_gh_token", "dictation_gh_owner", "dictation_gh_repo", "dictation_gh_branch",
              "resblue_gh_path", "resclinic_gh_path", "iculist_gh_path", "gwlist_gh_path", "dictation_gh_path"]
    }
  ];
  const isSecret = (name) => /_(key|token)$/.test(name);

  /* ---------- storage ---------- */
  function get(k) { try { return localStorage.getItem(k) || ""; } catch (e) { return ""; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function remove(k) { try { localStorage.removeItem(k); } catch (e) {} }
  function session() { try { return JSON.parse(get(SESSION) || "null"); } catch (e) { return null; } }

  function wipe() {
    const s = session();
    if (s && Array.isArray(s.names)) s.names.forEach(remove);
    remove(SESSION);
  }

  // Runs before the page's own scripts read storage, so expired keys are gone first.
  const started = session();
  if (started && !(started.until > Date.now())) wipe();

  /* ---------- crypto ---------- */
  const b64 = (buf) => btoa(String.fromCharCode.apply(null, new Uint8Array(buf)));
  const unb64 = (s) => Uint8Array.from(atob(s), c => c.charCodeAt(0));

  function normalize(code) {
    return String(code || "").toUpperCase().replace(/[\s-]/g, "")
      .replace(/O/g, "0").replace(/[IL]/g, "1");
  }

  function generateCode() {
    // 256 is a multiple of 32, so masking a random byte keeps every symbol equally likely
    const bytes = crypto.getRandomValues(new Uint8Array(CODE_LENGTH));
    const raw = Array.from(bytes, b => ALPHABET[b & 31]).join("");
    return raw.slice(0, 5) + "-" + raw.slice(5);
  }

  async function deriveKey(code, salt, iterations) {
    const base = await crypto.subtle.importKey(
      "raw", new TextEncoder().encode(normalize(code)), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey(
      { name: "PBKDF2", hash: "SHA-256", salt, iterations },
      base, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
  }

  async function lock(values, code) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKey(code, salt, ITERATIONS);
    const data = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv }, key, new TextEncoder().encode(JSON.stringify(values)));
    return {
      v: 1, kdf: "PBKDF2-SHA256", iterations: ITERATIONS,
      created: new Date().toISOString().slice(0, 10),
      names: Object.keys(values),
      salt: b64(salt), iv: b64(iv), data: b64(data)
    };
  }

  // A wrong code fails AES-GCM's integrity check and rejects.
  async function unlock(vault, code) {
    const key = await deriveKey(code, unb64(vault.salt), vault.iterations);
    const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: unb64(vault.iv) }, key, unb64(vault.data));
    return JSON.parse(new TextDecoder().decode(plain));
  }

  function apply(values) {
    const prev = session();
    const written = prev && Array.isArray(prev.names) ? prev.names.slice() : [];
    Object.keys(values).forEach(name => {
      if (values[name] && !get(name)) {
        set(name, values[name]);
        if (written.indexOf(name) < 0) written.push(name);
      }
    });
    if (written.length) set(SESSION, JSON.stringify({ until: Date.now() + UNLOCK_HOURS * 3600e3, names: written }));
    return written.length;
  }

  /* ---------- page UI ---------- */
  const CSS = `
.kv-back{position:fixed;inset:0;z-index:2147483000;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;padding:16px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif}
.kv-box{width:100%;max-width:360px;background:#1f201f;color:#eeece8;border:1px solid #343633;border-radius:12px;padding:20px;box-shadow:0 20px 60px rgba(0,0,0,.5)}
.kv-box h2{margin:0 0 6px;font-size:16px;font-weight:600}
.kv-box p{margin:0 0 14px;font-size:13px;line-height:1.45;color:#9a9892}
.kv-box input{box-sizing:border-box;width:100%;padding:10px 12px;font:600 18px/1.2 ui-monospace,Consolas,monospace;letter-spacing:.12em;text-transform:uppercase;text-align:center;background:#171817;color:#eeece8;border:1px solid #464944;border-radius:8px;outline:none}
.kv-box input:focus{border-color:#65c1a7}
.kv-row{display:flex;gap:8px;margin-top:12px}
.kv-btn{flex:1;padding:9px 12px;font-family:inherit;font-size:13px;font-weight:600;line-height:1;border-radius:8px;border:1px solid #464944;background:#252625;color:#eeece8;cursor:pointer}
.kv-btn.kv-primary{background:#65c1a7;border-color:#65c1a7;color:#10201b}
.kv-btn:disabled{opacity:.55;cursor:default}
.kv-status{min-height:18px;margin-top:10px;font-size:12.5px;color:#9a9892;text-align:center}
.kv-status.kv-bad{color:#e68a82}
.kv-chip{position:fixed;left:10px;bottom:10px;z-index:2147482000;display:flex;align-items:center;gap:8px;padding:5px 10px;font:500 11.5px/1.2 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;color:#9a9892;background:rgba(31,32,31,.92);border:1px solid #343633;border-radius:999px}
.kv-chip button{padding:0;font-family:inherit;font-size:11.5px;font-weight:600;color:#65c1a7;background:none;border:0;cursor:pointer}
@media print{.kv-back,.kv-chip{display:none}}`;

  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  function showModal(vault) {
    const back = el("div", "kv-back");
    const box = el("div", "kv-box");
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.appendChild(el("h2", "", "Unlock your keys"));
    box.appendChild(el("p", "", "This browser has no saved keys. Enter your code to use them here for " +
      UNLOCK_HOURS + " hours. The page will reload."));
    const input = el("input");
    input.placeholder = "XXXXX-XXXXX";
    input.setAttribute("autocomplete", "off");
    input.setAttribute("autocapitalize", "characters");
    input.spellcheck = false;
    const row = el("div", "kv-row");
    const later = el("button", "kv-btn", "Not now");
    const go = el("button", "kv-btn kv-primary", "Unlock");
    row.append(later, go);
    const status = el("div", "kv-status");
    box.append(input, row, status);
    back.appendChild(box);
    document.body.appendChild(back);
    input.focus();

    later.onclick = () => {
      try { sessionStorage.setItem(DISMISSED, "1"); } catch (e) {}
      back.remove();
      renderChip(vault);
    };

    async function attempt() {
      if (normalize(input.value).length !== CODE_LENGTH) {
        status.className = "kv-status kv-bad";
        status.textContent = "The code is " + CODE_LENGTH + " characters.";
        return;
      }
      go.disabled = later.disabled = input.disabled = true;
      status.className = "kv-status";
      status.textContent = "Unlocking…";
      try {
        const values = await unlock(vault, input.value);
        apply(values);
        location.reload();
      } catch (e) {
        go.disabled = later.disabled = input.disabled = false;
        status.className = "kv-status kv-bad";
        status.textContent = e && e.name === "OperationError" ? "Wrong code." : "Could not unlock: " + (e && e.message);
        input.select();
      }
    }
    go.onclick = attempt;
    input.addEventListener("keydown", e => { if (e.key === "Enter") attempt(); });
  }

  let chip = null;
  function renderChip(vault) {
    if (chip) chip.remove();
    chip = null;
    const s = session();
    if (s) {
      const until = new Date(s.until).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      chip = el("div", "kv-chip");
      chip.appendChild(el("span", "", "Keys unlocked until " + until));
      const btn = el("button", "", "Lock now");
      btn.onclick = () => { wipe(); location.reload(); };
      chip.appendChild(btn);
      // A tab left open past the deadline still clears storage on time.
      setTimeout(() => { wipe(); renderChip(vault); }, Math.min(Math.max(s.until - Date.now(), 0), 2147483647));
    } else if (vault && !hasKeys(vault)) {
      chip = el("div", "kv-chip");
      const btn = el("button", "", "Unlock keys");
      btn.onclick = () => { chip.remove(); chip = null; showModal(vault); };
      chip.appendChild(btn);
    }
    if (chip) document.body.appendChild(chip);
  }

  function hasKeys(vault) {
    return vault.names.filter(isSecret).some(n => get(n));
  }

  function init() {
    const vault = global.KEY_VAULT;
    if (!vault || !global.crypto || !crypto.subtle) return;
    const style = el("style");
    style.textContent = CSS;
    document.head.appendChild(style);
    let dismissed = false;
    try { dismissed = sessionStorage.getItem(DISMISSED) === "1"; } catch (e) {}
    if (!session() && !hasKeys(vault) && !dismissed) showModal(vault);
    else renderChip(vault);
  }

  global.KeyVault = { GROUPS, UNLOCK_HOURS, CODE_LENGTH, generateCode, normalize, lock, unlock, get };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})(window);
