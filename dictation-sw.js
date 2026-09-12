/* ====================================================================== *
 *  dictation-sw.js — service worker for the Dictation → Note app.
 *
 *  It sits at the site root, so the browser gives it control of every page
 *  here. That is deliberately not used: the fetch handler answers ONLY for
 *  the dictation app's own files and lets every other request fall through
 *  to the browser untouched, so installing this app changes nothing about
 *  how RES.html, index.html or anything else behaves.
 *
 *  Strategy is network-first with a cache fallback: online you always get
 *  the current file (templates included, so editing a prompt in the repo
 *  shows up straight away); offline you get the last copy that worked.
 *  The app still needs a connection to actually transcribe, format or save
 *  — the cache only makes it open instantly and survive a dead signal.
 * ====================================================================== */

const CACHE_NAME = "dictation-shell-v1";

/* Paths are relative to this file, which lives beside dictation.html. */
const APP_SHELL = [
  "./dictation.html",
  "./provider.js",
  "./favicon.svg",
  "./dictation-icon.svg",
  "./dictation-manifest.webmanifest",
  "./dictation-prompts/index.json",
  "./dictation-prompts/base.txt"
];

/* Anything under here is cached as it is fetched, so adding a new template
 * needs no change to this file. */
const PROMPTS_PREFIX = new URL("./dictation-prompts/", self.location).pathname;
const APP_PAGE = new URL("./dictation.html", self.location).pathname;

self.addEventListener("install", (event) => {
  // A single missing file would reject addAll and abandon the whole install,
  // so each is cached on its own and a failure is tolerated.
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(APP_SHELL.map((url) => cache.add(url).catch(() => {})))
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

function isOurs(url) {
  if (url.pathname === APP_PAGE) return true;
  if (url.pathname.indexOf(PROMPTS_PREFIX) === 0) return true;
  return APP_SHELL.some((rel) => new URL(rel, self.location).pathname === url.pathname);
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  // Cross-origin (OpenAI, Anthropic, GitHub) and every other page on this
  // site are left entirely alone.
  if (url.origin !== self.location.origin) return;
  if (!isOurs(url)) return;

  event.respondWith(
    fetch(event.request).then((response) => {
      if (response.ok) {
        const copy = response.clone();
        event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)));
      }
      return response;
    }).catch(() =>
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        if (event.request.mode === "navigate") return caches.match(APP_PAGE);
        return Response.error();
      })
    )
  );
});
