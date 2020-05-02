/*
 * @license
 * Your First PWA Codelab (https://g.co/codelabs/pwa)
 * Copyright 2019 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */
'use strict';

console.log('Hello from service-worker.js');

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}

workbox.routing.registerRoute(
    /.*\.(?:png|jpg|jpeg|svg|gif|js|css)/g,
    new workbox.strategies.CacheFirst({
        cacheName: "static-cache",
        cacheableResponse: {
            statuses: [0, 200]
        }
    })
);

// workbox.routing.registerRoute(
//     // "/https://localhost/(.*)",
//     "/https://localhost/GetClientes/(.*)",
//     new workbox.strategies.CacheFirst({
//         cacheName: "data-cache",
//         cacheableResponse: {
//             statuses: [200]
//         }
//     })
// );

// async function addToCache(urls) {
//     const myCache = await window.caches.open(API_CACHE);
//     await myCache.addAll(urls);
// }

// self.addEventListener('load', function (event) {
//     event.waitUntil(
//         caches.open('data-cache').then(function (cache) {
//             return cache.addAll([
//                 '/Cliente/GetClientes',
//                 '/NotaFiscal/GetNotasFiscais'
//             ]);
//         })
//     );
// });

// self.addEventListener('fetch', function (event, url) {
//     if (event.request.method !== "POST" && event.request.url.includes('localhost')) {
//         event.respondWith(caches.match(event.request).then(function (response) {
//             // caches.match() always resolves
//             // but in case of success response will have value
//             if (response !== undefined) {
//                 return response;
//             } else {
//                 return fetch(event.request).then(function (response) {
//                     // response may be used only once
//                     // we need to save clone to put one copy in cache
//                     // and serve second one
//                     let responseClone = response.clone();

//                     caches.open('data-cache').then(function (cache) {

//                         cache.put(event.request, responseClone);
//                     });
//                     return response;
//                 }).catch(function () {
//                     return caches.match(event.request.url);
//                 });
//             }
//         }));
//     }
// });

// self.onfetch = function(event) {
//     event.respondWith(
//          (async function() {
//             var cache = await caches.open(CACHE_NAME);
//             var cachedFiles = await cache.match(event.request);
//             if(cachedFiles) {
//                 return cachedFiles;
//             } else {
//                 try {
//                     var response = await fetch(event.request);
//                     await cache.put(event.request, response.clone());
//                     return response;
//                 } catch(e) { /* ... */ }
//             }
//         }())
//     )
// }


// self.addEventListener('message', function(ev) {
//     if (ev.data.action === 'skipWaiting') { self.skipWaiting(); }
// });

// self.addEventListener('push', function(ev) {
//     if (ev.data) {
//         var data = ev.data.json();
//         var title = data.title;
//         const promiseChain = self.registration.showNotification(title, data);
//         ev.waitUntil(promiseChain);
//     }
// });


// evt.waitUntil(
//     caches.open("files-cache").then((cache) => {
//         console.log('[ServiceWorker] Pre-caching offline page');
//         return cache.addAll(FILES_TO_CACHE);
//     })
// );

// evt.waitUntil(
//     caches.keys().then((keyList) => {
//         return Promise.all(keyList.map((key) => {
//             if (key !== CACHE_NAME) {
//                 console.log('[ServiceWorker] Removing old cache', key);
//                 return caches.delete(key);
//             }
//         }));
//     })
// );

// if (evt.request.mode !== 'navigate') {
//     // Not a page navigation, bail.
//     return;
// }
// evt.respondWith(
//     fetch(evt.request)
//         .catch(() => {
//             return caches.open(CACHE_NAME)
//                 .then((cache) => {
//                     return cache.match('offline.html');
//                 });
//         })
// );

// self.addEventListener('install', (evt) => {
//     console.log('[ServiceWorker] Install');
//     // CODELAB: Precache static resources here.

//     self.skipWaiting();
// });

// self.addEventListener('activate', (evt) => {
//     console.log('[ServiceWorker] Activate');
//     // CODELAB: Remove previous cached data from disk.

//     self.clients.claim();
// });

// self.addEventListener('fetch', (evt) => {
//     console.log('[ServiceWorker] Fetch', evt.request.url);
//     // CODELAB: Add fetch event handler here.

// });