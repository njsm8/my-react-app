const CACHE_NAME = 'v1_cache_contador_app_react';
const urlsToCache = [
    './',
    './index.html',
    './offline.html'
];

this.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => self.skipWaiting())
            })
            .catch(err => console.log('Failed to register cache', err))
    )
}
)

this.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if (res) {
                    return res;
                }
                return fetch(e.request);
            })
            .catch(err => caches.match('./offline.html'))
    )
}
)

this.addEventListener('activate', (e) => {
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheWhitelist.indexOf(cacheName) === -1) {
                            return caches.delete(cacheName);
                        }
                    })
                )
            })
            .then(() => self.clients.claim())
    )
}
)