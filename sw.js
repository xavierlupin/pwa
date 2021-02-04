const CACHE_NAME = 'my-site-cache-v1'
const urlsToCache = [
  './index.html',
  './main.css',
  './main.js',
  './images/144x144.png',
  './images/192x192.jpg',
  './images/512x512.jpg',
  './images/m1.jpg',
  './images/m2.jpg',
  './images/s1.jpg',
  './images/s2.jpg'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
  )
})

self.addEventListener('fetch', event => {
  console.log('Fetch', event)
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response
        return fetch(event.request)
      })
  )
})
