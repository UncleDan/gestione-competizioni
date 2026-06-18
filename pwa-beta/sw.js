// ══════════════════════════════════════════════════════════
// CONFIGURAZIONE — modificare qui per aggiornare il ramo
// ══════════════════════════════════════════════════════════
const SW_VERSION = '3.0b6';
const BASEDIR    = '/gestione-competizioni';   // root repo — cambiare per nuovo ramo
const BASE       = BASEDIR + '/pwa-beta';           // cartella istanza (pwa, pwa-beta, ecc.)
const CACHE_NAME = `gestione-competizioni-beta-sw-${SW_VERSION}`;

const PRECACHE = [
  `${BASE}/`,
  `${BASE}/index.html`,
  `${BASE}/finali.html`,
  `${BASE}/manifest.json`,
  `${BASE}/versions.json`,
  `${BASE}/icon.svg`,
  `${BASEDIR}/save/demo.json`,
];

const FONT_CACHE = `gestione-competizioni-beta-fonts-1`;
const FONT_ORIGINS = ['https://fonts.googleapis.com','https://fonts.gstatic.com'];

// versions.json sempre fresh (no cache)
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  // Font Google: cache-first con fallback rete → offline i font funzionano
  if (FONT_ORIGINS.some(o => e.request.url.startsWith(o))) {
    e.respondWith(
      caches.open(FONT_CACHE).then(cache =>
        cache.match(e.request).then(hit =>
          hit || fetch(e.request).then(resp => {
            if (resp.ok) cache.put(e.request, resp.clone());
            return resp;
          }).catch(() => hit)
        )
      )
    );
    return;
  }

  if (!e.request.url.startsWith(self.location.origin)) return;

  if (e.request.url.includes('/versions.json')) {
    e.respondWith(fetch(e.request));
    return;
  }

  e.respondWith(
    // cache:'no-store' impedisce alla cache HTTP del browser di servire
    // versioni stale di finali.html/index.html dopo un "Aggiornamento disponibile"
    // (altrimenti window.location.reload() poteva ri-ottenere lo stesso file vecchio
    // anche con SW aggiornato, riproponendo il banner di aggiornamento all'infinito)
    fetch(e.request, {cache:'no-store'})
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
      Promise.all(keys.filter(k => k !== CACHE_NAME && k !== FONT_CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});
