const cacheName = 'v1';
const cacheAssets = ['index.html', '/js/main.js'];

// Call Install Event
self.addEventListener('install', (e) => {
  console.log('Service Worker Installed');

  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting()),
  );
});

// Call Activate Event
self.addEventListener('activate', (e) => {
  console.log('Service Worker Activated');
  e.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        }),
      ),
    ),
  );
});

// Call Fetch Event
self.addEventListener('fetch', (e) => {
  console.log('Service Worker: Fetching');
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
