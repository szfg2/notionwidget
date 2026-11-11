/* ==================================================================== *
 *  reshome.js — "Drop" and "RES tools" buttons at the top right of every
 *  tool, linking to Drop (szfg2.github.io/drop) and back to the RES.html launcher.
 *
 *  It sits on its own row just above the page header rather than inside
 *  it, because each tool lays its header out differently (settings boxes,
 *  install buttons, sync badges on the right) and a row of its own can
 *  never collide with any of them.
 *
 *  On szfg2.github.io the Drop button opens Drop in a popup panel (the
 *  Drop page in its compact ?embed mode, inside a frame) so you never
 *  leave the tool. It shares this site's saved GitHub token, which is why
 *  anywhere else (widgets.szfg2.tech, a local file) it stays a plain link.
 *  Ctrl/middle-click still opens the full page in a new tab.
 * ==================================================================== */
(function () {
  "use strict";

  const DROP_URL = "https://szfg2.github.io/drop/";
  const CSS =
    ".res-home-row { display: flex; justify-content: flex-end; gap: 6px; margin: -12px 0 6px; }" +
    ".res-home { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px;" +
    " border: 1px solid var(--border-strong, #3f3d3a); border-radius: 7px;" +
    " color: var(--muted, #8d8a86); font: 12.5px var(--sans, system-ui, sans-serif);" +
    " text-decoration: none; white-space: nowrap; transition: color .12s, border-color .12s; }" +
    ".res-home:hover, .res-home.on { color: var(--accent-strong, #74cdb4); border-color: var(--accent, #5fb8a0); }" +
    ".res-home svg { width: 13px; height: 13px; flex: none; }" +
    ".res-drop { position: fixed; z-index: 2147483000; display: flex; flex-direction: column;" +
    " width: min(440px, calc(100vw - 32px)); height: min(720px, calc(100vh - 24px));" +
    " background: #171817; border: 1px solid #464944; border-radius: 12px; overflow: hidden;" +
    " box-shadow: 0 18px 50px rgba(0,0,0,.5); font: 13px system-ui, sans-serif; color: #eeece8; }" +
    ".res-drop[hidden] { display: none; }" +
    ".res-drop-head { display: flex; align-items: center; gap: 10px; padding: 8px 10px 8px 14px; border-bottom: 1px solid #343633; }" +
    ".res-drop-head b { flex: 1; font-size: 13.5px; font-weight: 650; }" +
    ".res-drop-head a, .res-drop-head button { color: #9a9892; font: inherit; font-size: 12px; text-decoration: none;" +
    " background: none; border: 0; padding: 3px 6px; border-radius: 6px; cursor: pointer; }" +
    ".res-drop-head a:hover, .res-drop-head button:hover { color: #81d4bd; background: #252625; }" +
    ".res-drop-head button { font-size: 16px; line-height: 1; }" +
    ".res-drop iframe { flex: 1; width: 100%; border: 0; background: #171817; }" +
    "@media print { .res-home-row, .res-drop { display: none; } }";

  const SVG = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
  const LINKS = [
    {
      id: "drop", href: DROP_URL, label: "Drop", title: "Open Drop",
      icon: SVG + '<path d="M8 2.5v7M5 6.5l3 3 3-3"/><path d="M2.5 10.5v2a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-2"/></svg>'
    },
    {
      id: "res", href: "RES.html", label: "RES tools", title: "Back to RES tools",
      icon: SVG + '<rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/>' +
        '<rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/></svg>'
    }
  ];

  function dropPopup(btn) {
    let panel = null, frame = null;

    function place() {
      const r = btn.getBoundingClientRect();
      panel.style.top = Math.max(12, r.bottom + 6) + "px";
      panel.style.right = Math.max(16, innerWidth - r.right) + "px";
    }
    function tell(msg) { if (frame && frame.contentWindow) frame.contentWindow.postMessage(msg, DROP_URL); }

    function open() {
      if (!panel) {
        panel = document.createElement("div");
        panel.className = "res-drop";
        panel.setAttribute("role", "dialog");
        panel.setAttribute("aria-label", "Drop");
        panel.innerHTML =
          '<div class="res-drop-head"><b>Drop</b>' +
          '<a href="' + DROP_URL + '" target="_blank" rel="noopener" title="Open the full Drop page in a new tab">Open full ↗</a>' +
          '<button type="button" title="Close (Esc)" aria-label="Close">×</button></div>';
        frame = document.createElement("iframe");
        frame.title = "Drop";
        frame.allow = "clipboard-read; clipboard-write";
        frame.src = DROP_URL + "?embed";
        frame.addEventListener("load", () => { if (!panel.hidden) tell("drop:show"); });
        panel.appendChild(frame);
        panel.querySelector("button").addEventListener("click", close);
        document.body.appendChild(panel);
      } else {
        panel.hidden = false;
        tell("drop:show");
      }
      place();
      btn.classList.add("on");
      frame.focus();
    }
    function close() {
      if (!panel || panel.hidden) return;
      panel.hidden = true;
      btn.classList.remove("on");
      tell("drop:hide");
    }

    btn.addEventListener("click", e => {
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      if (panel && !panel.hidden) close(); else open();
    });
    document.addEventListener("mousedown", e => {
      if (panel && !panel.hidden && !panel.contains(e.target) && !btn.contains(e.target)) close();
    });
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
    window.addEventListener("message", e => { if (frame && e.source === frame.contentWindow && e.data === "drop:close") close(); });
    window.addEventListener("resize", () => { if (panel && !panel.hidden) place(); });
  }

  function mount() {
    if (document.querySelector(".res-home")) return;
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);

    const row = document.createElement("div");
    row.className = "res-home-row";
    // A page never links to itself. Drop lives in its own repo (/drop/), so from there RES is one folder over.
    const onDrop = /\/drop\/(index\.html)?$/i.test(location.pathname);
    const onRes = /\/res(\.html)?$/i.test(location.pathname);
    row.innerHTML = LINKS
      .filter(l => !(l.id === "drop" && onDrop) && !(l.id === "res" && onRes))
      .map(l => {
        const href = l.id === "res" && onDrop ? "../notionwidget/RES.html" : l.href;
        return '<a class="res-home" data-id="' + l.id + '" href="' + href + '" title="' + l.title + '">' + l.icon + l.label + "</a>";
      })
      .join("");

    const header = document.querySelector("header.app");
    if (header && header.parentNode) header.parentNode.insertBefore(row, header);
    else document.body.insertBefore(row, document.body.firstChild);

    const dropBtn = row.querySelector('[data-id="drop"]');
    if (dropBtn && location.origin === new URL(DROP_URL).origin) dropPopup(dropBtn);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
