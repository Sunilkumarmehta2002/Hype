// Service Worker for Hype Delivery App
const CACHE_NAME = 'hype-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json'
];

// Install Service Worker
self.addEventListener('install', event => {
    console.log('📦 Service Worker installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('✅ Cache opened');
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting();
});

// Activate Service Worker
self.addEventListener('activate', event => {
    console.log('🚀 Service Worker activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🧹 Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch Event - Network First, Cache Fallback
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Handle API requests - network first
    if (event.request.url.includes('/api/') || event.request.url.includes('googleapis')) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                })
                .catch(() => caches.match(event.request))
        );
        return;
    }

    // Handle static assets - cache first
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request).then(response => {
                    // Cache new requests
                    if (response.status === 200) {
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                    }
                    return response;
                });
            })
            .catch(() => {
                // Return offline page if available
                if (event.request.destination === 'document') {
                    return caches.match('/index.html');
                }
            })
    );
});

// Handle background sync
self.addEventListener('sync', event => {
    if (event.tag === 'sync-orders') {
        event.waitUntil(syncOrders());
    }
});

async function syncOrders() {
    console.log('🔄 Syncing orders...');
    // Add order sync logic here
}

// Push notifications
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'New notification from Hype',
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%23d4af37" width="192" height="192"/><text x="50%" y="50%" font-size="100" fill="%231a1a1a" text-anchor="middle" dy=".3em" font-weight="bold" font-family="Arial">H</text></svg>',
        badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><rect fill="%23d4af37" width="96" height="96"/><text x="48" y="48" font-size="50" fill="%231a1a1a" text-anchor="middle" dy=".3em" font-weight="bold" font-family="Arial">H</text></svg>',
        tag: 'hype-notification',
        requireInteraction: false
    };

    event.waitUntil(
        self.registration.showNotification('🚀 Hype Delivery', options)
    );
});

// Message handler for communication between app and service worker
self.addEventListener('message', event => {
    console.log('📨 Message from client:', event.data);
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
