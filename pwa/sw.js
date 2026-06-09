// ══════════════════════════════════════════════════════════
// CONFIGURAZIONE — modificare qui per aggiornare il ramo
// ══════════════════════════════════════════════════════════
const SW_VERSION = '2.10';
const BASEDIR    = '/gestione-competizioni';   // root repo — cambiare per nuovo ramo
const BASE       = BASEDIR + '/pwa';           // cartella istanza (pwa, pwa-beta, ecc.)
const CACHE_NAME = `gestione-competizioni-sw-${SW_VERSION}`;

const PRECACHE = [
  `${BASE}/`,
  `${BASE}/index.html`,
  `${BASE}/finali.html`,
  `${BASE}/manifest.json`,
  `${BASE}/versions.json`,
  `${BASE}/icon.svg`,
  `${BASEDIR}/save/demo.json`,
];

// versions.json sempre fresh (no cache)
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (!e.request.url.startsWith(self.location.origin)) return;

  if (e.request.url.includes('/versions.json')) {
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

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});
