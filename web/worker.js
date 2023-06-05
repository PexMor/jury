const version = "1.0.1";
const cts = "2023/06/05 10:16:37 CEST";
const CACHE_NAME = "jury-app";
const toCache = [
    "css/jury.css",
    "css/main.css",
    "images/icon.png",
    "images/icon_bg.png",
    "images/icon_bgp.png",
    "index.html",
    "js/script.js",
    "js/ui.js",
    "js/utils.js",
    "purecss/base-context-min.css",
    "purecss/base-context.css",
    "purecss/base-min.css",
    "purecss/base.css",
    "purecss/buttons-core-min.css",
    "purecss/buttons-core.css",
    "purecss/buttons-min.css",
    "purecss/buttons.css",
    "purecss/forms-min.css",
    "purecss/forms-nr-min.css",
    "purecss/forms-nr.css",
    "purecss/forms.css",
    "purecss/grids-core-min.css",
    "purecss/grids-core.css",
    "purecss/grids-min.css",
    "purecss/grids-responsive-min.css",
    "purecss/grids-responsive.css",
    "purecss/grids-units-min.css",
    "purecss/grids-units.css",
    "purecss/grids.css",
    "purecss/menus-core-min.css",
    "purecss/menus-core.css",
    "purecss/menus-dropdown-min.css",
    "purecss/menus-dropdown.css",
    "purecss/menus-horizontal-min.css",
    "purecss/menus-horizontal.css",
    "purecss/menus-min.css",
    "purecss/menus-scrollable-min.css",
    "purecss/menus-scrollable.css",
    "purecss/menus-skin-min.css",
    "purecss/menus-skin.css",
    "purecss/menus.css",
    "purecss/pure-min.css",
    "purecss/pure-nr-min.css",
    "purecss/pure-nr.css",
    "purecss/pure.css",
    "purecss/tables-min.css",
    "purecss/tables.css",
    "."
]; // toCache
self.addEventListener("install", function (event) {
  console.log("used to register the service worker");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        console.log(toCache);
        return cache.addAll(toCache);
      })
      .then(self.skipWaiting())
  );
});
self.addEventListener("fetch", function (event) {
  console.log(
    "used to intercept requests so we can check for the file or data in the cache"
  );
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request);
      });
    })
  );
});
self.addEventListener("activate", function (event) {
  console.log("this event triggers when the service worker activates");
  event.waitUntil(
    caches
      .keys()
      .then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            if (key !== CACHE_NAME) {
              console.log("[ServiceWorker] Removing old cache", key);
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});
