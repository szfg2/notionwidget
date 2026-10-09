/* ====================================================================== *
 *  drop-sw.js — service worker for Drop, so it can receive Android shares.
 *
 *  When something is shared to the installed Drop app, Android sends it as
 *  a form upload (a POST) to drop.html?share-target. The web server only
 *  serves files and can't accept uploads, so this worker catches the upload
 *  on the phone, parks the text and pictures in a local cache, and opens
 *  drop.html — which picks them up and saves them like a paste.
 *
 *  It is registered with scope "/drop", so it never touches Dictation or
 *  any other page on the site. Every other request passes straight through.
 * ====================================================================== */

const SHARE_CACHE = "drop-share";
const SHARE_PREFIX = new URL("./drop-share/", self.location).href;
const PAGE = new URL("./drop.html", self.location).href;

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

async function stash(request) {
  try {
    const form = await request.formData();
    const files = form.getAll("files").filter((f) => f && typeof f !== "string" && f.size);
    const id = Date.now() + "-" + Math.random().toString(36).slice(2, 6);
    const cache = await caches.open(SHARE_CACHE);
    for (let i = 0; i < files.length; i++) {
      await cache.put(SHARE_PREFIX + id + "/" + i, new Response(files[i], {
        headers: { "content-type": files[i].type || "application/octet-stream", "x-name": encodeURIComponent(files[i].name || "") }
      }));
    }
    // The .json is written last: the page only acts on shares whose .json exists, so it never sees a half-written one.
    const meta = {
      title: form.get("title") || "", text: form.get("text") || "", url: form.get("url") || "", files: files.length
    };
    await cache.put(SHARE_PREFIX + id + ".json", new Response(JSON.stringify(meta), {
      headers: { "content-type": "application/json" }
    }));
    return Response.redirect(PAGE + "?shared", 303);
  } catch (e) {
    return Response.redirect(PAGE + "?share-failed", 303);
  }
}

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (event.request.method === "POST" && url.href.split("?")[0] === PAGE && url.searchParams.has("share-target")) {
    event.respondWith(stash(event.request));
  }
});
