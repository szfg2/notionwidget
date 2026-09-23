/* ==================================================================== *
 *  shots.js — paste or drop screenshots into a text box, for the model.
 *
 *  enableShots(box) makes a textarea accept pasted or dropped screenshots.
 *  They show as thumbnails under the box and go to the model as image
 *  blocks placed right after that box's text (see withShots), so it knows
 *  which section each one belongs to. They live only in memory — nothing
 *  here is saved anywhere; the note written from them carries their
 *  content forward. Formats the APIs don't take, or files over ~3.5 MB,
 *  are re-encoded as JPEG so the request isn't rejected.
 *
 *  Needs provider.js loaded first (shotsBlocked asks it for the provider).
 * ==================================================================== */
(function (global) {
  "use strict";

  const SHOT_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];
  const SHOT_MAX_B64 = 4.6e6;
  const boxes = new WeakMap();   // textarea -> { list, render }

  const CSS =
    ".shots { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 8px; }" +
    ".shots:empty { display: none; }" +
    ".shot { position: relative; width: 88px; height: 66px; border: 1px solid var(--border-strong); border-radius: 6px; overflow: hidden; background: var(--surface-2); flex: none; }" +
    ".shot img { width: 100%; height: 100%; object-fit: cover; display: block; cursor: zoom-in; }" +
    ".shot button { position: absolute; top: 3px; right: 3px; padding: 0 6px; font-size: 12px; line-height: 18px; border: 0; border-radius: 4px; background: rgba(0,0,0,.7); color: #fff; cursor: pointer; }" +
    ".shots .shot-note { font-size: 12px; color: var(--faint); }" +
    ".msg .shots { margin: 6px 0 0; }" +
    ".msg .shot { width: 64px; height: 48px; }" +
    "textarea.dropping { border-color: var(--accent); border-style: dashed; }";
  // Injected where this script sits in <head>, so the page's own stylesheet,
  // parsed after it, can still adjust spacing per page.
  const style = document.createElement("style");
  style.textContent = CSS;
  document.head.appendChild(style);

  function readAsDataURL(file) {
    return new Promise((ok, fail) => {
      const r = new FileReader();
      r.onload = () => ok(r.result);
      r.onerror = () => fail(r.error);
      r.readAsDataURL(file);
    });
  }
  function reencode(dataUrl, maxEdge, quality) {
    return new Promise((ok, fail) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * scale);
        c.height = Math.round(img.height * scale);
        const ctx = c.getContext("2d");
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0, c.width, c.height);
        ok(c.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => fail(new Error("Could not read that image."));
      img.src = dataUrl;
    });
  }
  async function fileToShot(file) {
    let url = await readAsDataURL(file);
    if (!SHOT_TYPES.includes(file.type) || url.length > SHOT_MAX_B64) {
      url = await reencode(url, 2400, 0.92);
      if (url.length > SHOT_MAX_B64) url = await reencode(url, 1800, 0.85);
    }
    const m = /^data:([^;]+);base64,(.*)$/.exec(url);
    return m ? { type: m[1], data: m[2], url } : null;
  }
  function openShot(s) {
    const w = window.open();
    if (w) w.document.write('<body style="margin:0;background:#191919"><img src="' + s.url + '" style="max-width:100%">');
  }
  function thumb(s, i) {
    const d = document.createElement("div");
    d.className = "shot";
    const img = document.createElement("img");
    img.src = s.url;
    img.alt = "Screenshot " + (i + 1);
    img.title = "Open full size";
    img.addEventListener("click", () => openShot(s));
    d.appendChild(img);
    return d;
  }

  // Read-only thumbnails, for screenshots already sent in an Ask thread.
  function shotThumbs(shots) {
    const strip = document.createElement("div");
    strip.className = "shots";
    shots.forEach((s, i) => strip.appendChild(thumb(s, i)));
    return strip;
  }

  // The box must already have a parent. onChange runs whenever a screenshot
  // is added or removed.
  function enableShots(box, onChange) {
    const list = [];
    const strip = document.createElement("div");
    strip.className = "shots";
    box.insertAdjacentElement("afterend", strip);

    const render = () => {
      strip.textContent = "";
      list.forEach((s, i) => {
        const d = thumb(s, i);
        const x = document.createElement("button");
        x.type = "button";
        x.textContent = "×";
        x.title = "Remove";
        x.addEventListener("click", () => { list.splice(i, 1); render(); });
        d.appendChild(x);
        strip.appendChild(d);
      });
      if (list.length) {
        const note = document.createElement("span");
        note.className = "shot-note";
        note.textContent = list.length + " screenshot" + (list.length === 1 ? "" : "s") + " — sent with this box";
        strip.appendChild(note);
      }
      if (onChange) onChange();
    };

    const addFiles = async (files) => {
      for (const f of files) {
        try {
          const s = await fileToShot(f);
          if (s) list.push(s);
        } catch (e) { /* an unreadable image is skipped, the rest still attach */ }
      }
      render();
    };

    // Copying cells from Excel or an EMR table puts text AND a picture of it on
    // the clipboard — the text is what's wanted then, so only a clipboard with
    // no text becomes a screenshot.
    box.addEventListener("paste", (e) => {
      const cd = e.clipboardData;
      if (!cd) return;
      const files = Array.from(cd.files || []).filter(f => /^image\//.test(f.type));
      if (!files.length || (cd.getData("text/plain") || "").trim()) return;
      e.preventDefault();
      addFiles(files);
    });
    ["dragenter", "dragover"].forEach(t => box.addEventListener(t, (e) => {
      if (!e.dataTransfer || !Array.from(e.dataTransfer.types || []).includes("Files")) return;
      e.preventDefault();
      box.classList.add("dropping");
    }));
    box.addEventListener("dragleave", () => box.classList.remove("dropping"));
    box.addEventListener("drop", (e) => {
      box.classList.remove("dropping");
      const files = Array.from((e.dataTransfer && e.dataTransfer.files) || []).filter(f => /^image\//.test(f.type));
      if (!files.length) return;
      e.preventDefault();
      addFiles(files);
    });

    boxes.set(box, { list, render });
  }
  function shotsOf(box) {
    const s = boxes.get(box);
    return s ? s.list.slice() : [];
  }
  function setShots(box, shots) {
    const s = boxes.get(box);
    if (!s) return;
    s.list.splice(0, s.list.length, ...shots);
    s.render();
  }
  function clearShots(box) { setShots(box, []); }

  /* A message body from labelled sections, each with its own screenshots. With
   * no screenshots anywhere it is the same plain string the page always sent. */
  function withShots(sections) {
    const text = sections.map(s => s.text).join("\n\n");
    if (!sections.some(s => s.shots && s.shots.length)) return text;
    const blocks = [];
    sections.forEach(s => {
      blocks.push({ type: "text", text: s.text });
      (s.shots || []).forEach(sh => blocks.push({ type: "image", source: { type: "base64", media_type: sh.type, data: sh.data } }));
    });
    return blocks;
  }

  /* Ask thread turns as API messages. A question's own screenshots follow its
   * text; caseShots (screenshots from the case boxes) ride on the first turn,
   * since the case context itself sits in the system prompt, which can't hold
   * images. */
  function askApiMessages(messages, caseShots) {
    return messages.map((m, i) => {
      if (m.role !== "user") return { role: m.role, content: m.content };
      const sections = [];
      if (i === 0 && caseShots && caseShots.length) sections.push({ text: "Screenshots from the case details:", shots: caseShots });
      sections.push({ text: m.content || "(see attached screenshots)", shots: m.shots || [] });
      return { role: "user", content: withShots(sections) };
    });
  }

  // DeepSeek has no vision, so say so rather than let the request fail oddly.
  function shotsBlocked(shots) {
    return shots.length && global.AI && global.AI.id() === "deepseek"
      ? "DeepSeek can't read images — switch to Claude or Gemini in Settings, or remove the screenshots."
      : "";
  }

  Object.assign(global, { enableShots, shotsOf, setShots, clearShots, shotThumbs, withShots, askApiMessages, shotsBlocked });
})(window);
