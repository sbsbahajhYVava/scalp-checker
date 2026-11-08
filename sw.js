/* Offline support: the app itself is cached on install; the text-recognition
   engine, its English data and the fonts are cached the first time they load. */
const VERSION = "scalp-check-v1";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon.svg", "./icon-192.png", "./icon-512.png", "./icon-180.png"];
const RUNTIME_HOSTS = ["cdn.jsdelivr.net", "fonts.googleapis.com", "fonts.gstatic.com", "tessdata.projectnaptha.com", "unpkg.com"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    // network first, so updates arrive; cache as fallback when offline
    e.respondWith(fetch(req).then((res) => {
      const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); return res;
    }).catch(() => caches.match(req).then((m) => m || caches.match("./index.html"))));
    return;
  }
  if (RUNTIME_HOSTS.includes(url.hostname)) {
    // cache first: these files are versioned and large
    e.respondWith(caches.match(req).then((m) => m || fetch(req).then((res) => {
      if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
      return res;
    })));
  }
});
