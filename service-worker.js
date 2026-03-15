/**
 * Service Worker dla Zegar PWA
 * Umożliwia pracę offline i cache'owanie zasobów
 */

const CACHE_NAME = 'zegar-v1';
const BASE_PATH = '/Zegar';

const urlsToCache = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/start.html`,
  `${BASE_PATH}/nauka.html`,
  `${BASE_PATH}/godziny.html`,
  `${BASE_PATH}/wpisz.html`,
  `${BASE_PATH}/ustaw.html`,
  `${BASE_PATH}/ustawienia.html`,
  `${BASE_PATH}/clock-renderer.js`,
  `${BASE_PATH}/clock-styles.css`,
  `${BASE_PATH}/manifest.json`,
];

// Instalacja - cache zasobów
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Service Worker] Caching app shell');
      return cache.addAll(urlsToCache).catch(err => {
        console.warn('[Service Worker] Cache addAll error:', err);
        // Nie przerywa instalacji jeśli niektóre pliki nie będą dostępne
        return Promise.resolve();
      });
    })
  );
});

// Aktivacja - czyszczenie starych cache'y
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch - strategy: try Cache first, fallback to Network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignoruj request'y spoza naszej aplikacji
  if (!url.pathname.startsWith(BASE_PATH)) {
    return;
  }

  if (request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(request).then(response => {
      if (response) {
        console.log('[Service Worker] Serving from cache:', request.url);
        return response;
      }

      return fetch(request).then(response => {
        // Nie cache'uj error response'y
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        // Clone response i cache'uj
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, responseToCache);
        });

        return response;
      }).catch(err => {
        console.log('[Service Worker] Fetch failed; returning offline page');
        // Zwróć cached HTML jeśli dostęp offline
        return caches.match(`${BASE_PATH}/start.html`);
      });
    })
  );
});

// Komunikacja z klientem
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
