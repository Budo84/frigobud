const CACHE_NAME = 'frigo-app-v3';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
];

// Fase di installazione: salva i file nella cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Cache aperta');
            return cache.addAll(ASSETS);
        })
    );
});

// Fase di fetch: intercetta le richieste di rete
// Se sei offline, carica i file salvati nella cache
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            // Se trova il file in cache lo restituisce, altrimenti usa la rete
            return response || fetch(event.request);
        })
    );
});

// Fase di attivazione: pulisce le vecchie versioni della cache se aggiorni l'app
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME)
                .map(name => caches.delete(name))
            );
        })
    );
});
