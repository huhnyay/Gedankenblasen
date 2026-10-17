// Gedankenblasen – Offline-Unterstützung
// Bei jeder neuen Version die Zahl erhöhen, damit Handys das Update laden.
const VERSION = "gedankenblasen-v8";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/favicon-32.png",
  "./fonts/fredoka-latin-400-normal.woff2",
  "./fonts/fredoka-latin-500-normal.woff2",
  "./fonts/fredoka-latin-600-normal.woff2",
  "./fonts/atkinson-hyperlegible-latin-400-normal.woff2",
  "./fonts/atkinson-hyperlegible-latin-700-normal.woff2",
  "./fonts/atkinson-hyperlegible-latin-400-italic.woff2",
  "./vendor/jspdf.umd.min.js"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Schriften und die PDF-Bibliothek: einmal laden, danach aus dem Speicher
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com" || url.hostname === "cdnjs.cloudflare.com") {
    event.respondWith(
      caches.open(VERSION + "-fonts").then(async cache => {
        const hit = await cache.match(req);
        if (hit) return hit;
        try {
          const res = await fetch(req);
          if (res.ok || res.type === "opaque") cache.put(req, res.clone());
          return res;
        } catch (e) {
          return new Response("", { status: 504 });
        }
      })
    );
    return;
  }

  if (url.origin !== location.origin) return;

  // App-Seite: erst online versuchen (für Updates), sonst gespeicherte Version
  if (req.mode === "navigate") {
    event.respondWith(
      // "no-cache": immer bei GitHub nachfragen, ob es eine neue Version gibt
      fetch(req.url, { cache: "no-cache", credentials: "same-origin" })
        .then(res => { if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put("./index.html", copy)); } return res; })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Icons & Manifest: aus dem Speicher, sonst Netz
  event.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
