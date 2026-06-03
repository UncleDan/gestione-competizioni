const CACHE_NAME = 'gestione-competizioni-sw-1.4';
const BASE = '/gestione-competizioni';

// File da mettere in cache all'installazione
// versions.json è sempre scaricato fresh (no cache) per il controllo aggiornamenti
const PRECACHE = [
  `${BASE}/`,
  `${BASE}/pwa/index.html`,
  `${BASE}/pwa/manifest.json`,
  `${BASE}/finali.html`,
  `${BASE}/save/finali-2026.json`,
  `${BASE}/versions.json`,
  `${BASE}/pwa/icon.svg`,
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE))
  );
  // Non chiama skipWaiting automaticamente — aspetta il segnale dal launcher
});

// Il launcher invia SKIP_WAITING quando l'utente tocca il toast
self.addEventListener('message', e => {
  if(e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
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

  // versions.json: sempre fresh, mai dalla cache
  if(e.request.url.endsWith('/versions.json')){
    e.respondWith(fetch(e.request));
    return;
  }

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
