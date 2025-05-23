// Nazwa cache
const CACHE_NAME = 'my-cache-v2';

// Pliki do zapisania w cache
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/form.html',
  '/weather.html',
  '/script.js',
  '/form.js',
  '/weather.js',
  '/style.css',
  '/manifest.json',
  '/offline.html',
  '/icons/w192.png',
  '/icons/w512.png'
];

// Instalacja service workera i zapisanie zasobów do cache
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll([
  '/',
  '/index.html',
  '/form.html',
  '/weather.html',
  '/script.js',
  '/form.js',
  '/weather.js',
  '/style.css',
  '/manifest.json',
  '/offline.html',
  '/icons/w192.png',
  '/icons/w512.png'
]);
    }).catch(function(error) {
      console.error('Błąd podczas cachowania plików:', error);
    })
  );
});

// Przechwytywanie żądań i obsługa z cache lub sieci
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Jeśli plik w cache, zwróć go
      if (response) return response;
      // Jeśli nie, spróbuj pobrać z sieci
      return fetch(event.request).catch(() => {
        // Jeśli nie działa sieć, pokaż offline.html
        if (event.request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
      });
    })
  );
});

// Czyszczenie starego cache przy aktywacji nowej wersji SW
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) {
          return key !== CACHE_NAME;
        }).map(function(key) {
          return caches.delete(key);
        })
      );
    })
  );
});
