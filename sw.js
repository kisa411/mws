let CACHE_NAME = 'restaurant-cache';
let urlsToCache = [
  '/',
  '/css/',
  '/js/',
  '/data/',
  '/img/',
  '../'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    console.log(event.request)
    event.respondWith(
      caches.match(event.request).then(function(response) {
        // Cache hit - return response
        if (response) {
            return response;
        }
        return fetch(event.request);
      }
    )
  );
});