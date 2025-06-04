/* eslint-disable */

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js"
);

if (workbox) {
  console.log(`Workbox is loaded`);

  workbox.core.skipWaiting();
  workbox.core.clientsClaim();

  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

  workbox.routing.registerRoute(
    ({ request }) => request.destination === "image",
    new workbox.strategies.CacheFirst({
      cacheName: "images-cache",
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    ({ url }) =>
      url.origin === "https://story-api.dicoding.dev" &&
      url.pathname.startsWith("/v1/stories"),
    new workbox.strategies.NetworkFirst({
      cacheName: "api-stories-cache",
      networkTimeoutSeconds: 10,
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    ({ request }) =>
      request.destination === "script" ||
      request.destination === "style" ||
      request.destination === "document",
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "assets-cache",
    })
  );

  workbox.routing.registerRoute(
    ({ url }) =>
      url.origin.includes("tile.openstreetmap.org") ||
      url.origin.includes("api.maptiler.com"),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "map-tiles-cache",
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 200,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    ({ request }) => request.mode === "navigate",
    new workbox.strategies.NetworkFirst({
      cacheName: "html-cache",
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 10,
        }),
      ],
    })
  );
} else {
  console.log(`Workbox didn't load`);
}

self.addEventListener("push", (event) => {
  const defaultPayload = {
    title: "Notification",
    options: { body: "You have a new notification" },
  };

  const { title, options } = event.data ? event.data.json() : defaultPayload;

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === "/" && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow("/");
      }
    })
  );
});
