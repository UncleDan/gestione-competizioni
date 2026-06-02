const CACHE_NAME = 'gestione-competizioni-v1';
const BASE = '/gestione-competizioni';

// File da mettere in cache all'installazione
const PRECACHE = [
  `${BASE}/`,
  `${BASE}/pwa/index.html`,
  `${BASE}/pwa/manifest.json`,
  `${BASE}/finali.html`,
  `${BASE}/save/finali-2026.json`,
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network first, fallback to cache
self.addEventListener('fetch', e => {
  // Solo richieste GET dello stesso origine
  if (e.request.method !== 'GET') return;
  if (!e.request.url.startsWith(self.location.origin)) return;

  e.respondWith(
    fetch(e.request)
      .then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});
