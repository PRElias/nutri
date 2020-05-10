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

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉 for PWA`);
} else {
    console.log(`Boo! Workbox didn't load 😬 for PWA`);
}

workbox.routing.registerRoute(
    /.*\.(?:png|jpg|jpeg|svg|gif|js|css|woff|woff2)/g,
    new workbox.strategies.CacheFirst({
        cacheName: "static-cache",
        cacheableResponse: {
            statuses: [0, 200]
        }
    })
);