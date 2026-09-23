/* ==================================================================== *
 *  reshome.js — "Drop" and "RES tools" buttons at the top right of every
 *  tool, linking to drop.html and back to the RES.html launcher.
 *
 *  It sits on its own row just above the page header rather than inside
 *  it, because each tool lays its header out differently (settings boxes,
 *  install buttons, sync badges on the right) and a row of its own can
 *  never collide with any of them.
 * ==================================================================== */
(function () {
  "use strict";

  const CSS =
    ".res-home-row { display: flex; justify-content: flex-end; gap: 6px; margin: -12px 0 6px; }" +
    ".res-home { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px;" +
    " border: 1px solid var(--border-strong, #3f3d3a); border-radius: 7px;" +
    " color: var(--muted, #8d8a86); font: 12.5px var(--sans, system-ui, sans-serif);" +
    " text-decoration: none; white-space: nowrap; transition: color .12s, border-color .12s; }" +
    ".res-home:hover { color: var(--accent-strong, #74cdb4); border-color: var(--accent, #5fb8a0); }" +
    ".res-home svg { width: 13px; height: 13px; flex: none; }" +
    "@media print { .res-home-row { display: none; } }";

  const SVG = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
  const LINKS = [
    {
      href: "drop.html", label: "Drop", title: "Open Drop",
      icon: SVG + '<path d="M8 2.5v7M5 6.5l3 3 3-3"/><path d="M2.5 10.5v2a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-2"/></svg>'
    },
    {
      href: "RES.html", label: "RES tools", title: "Back to RES tools",
      icon: SVG + '<rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/>' +
        '<rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/></svg>'
    }
  ];

  function mount() {
    if (document.querySelector(".res-home")) return;
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);

    const row = document.createElement("div");
    row.className = "res-home-row";
    // A page never links to itself — Drop shows only the RES tools button.
    // Compared without ".html", so a host serving clean URLs (/drop) still matches.
    const bare = s => s.toLowerCase().replace(/\.html$/, "");
    const here = bare(location.pathname.split("/").pop());
    row.innerHTML = LINKS
      .filter(l => bare(l.href) !== here)
      .map(l => '<a class="res-home" href="' + l.href + '" title="' + l.title + '">' + l.icon + l.label + "</a>")
      .join("");

    const header = document.querySelector("header.app");
    if (header && header.parentNode) header.parentNode.insertBefore(row, header);
    else document.body.insertBefore(row, document.body.firstChild);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
