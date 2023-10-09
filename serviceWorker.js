"use strict";
// @ts-check

let version = "v1";
let resources = [
  "./",
  "./index.html",
  "./style.css",
  "./index.js",
  "./images/icon-dollar.svg",
  "./images/icon-person.svg",
  "./images/logo.svg",
  "./manifest.json",
];
let cacheResources = async (resources) => {
  let cache = await caches.open(version);
  cache.addAll(resources);
};
self.addEventListener("install", async (e) => {
  e.waitUntil(cacheResources(resources));
});
let cacheFirst = async (request) => {
  let cached = await caches.match(request);
  if (cached) {
    return cached;
  }
  let serverRes = await fetch(request);
  let cache = await caches.open(version);
  if (request.method !== "GET") {
    return;
  }
  cache.put(request, serverRes.clone());
  return serverRes;
};
self.addEventListener("fetch", (e) => {
  e.respondWith(cacheFirst(e.request));
});
