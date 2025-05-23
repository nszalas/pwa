const CACHE_NAME = "pwa-cache-v1";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/weather.html",
  "/form.html",
  "/script.js",
  "/style.css",
  "/form.js",
  "/weather.js",
  "/manifest.json",
  "/offline.html",
  "/icons/w512.png",
  "/icons/w192.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request).then(res => res || caches.match("/offline.html")))
  );
});