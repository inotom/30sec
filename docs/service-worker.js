/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

importScripts(
  "precache-manifest.0d4b0b43866859d40eeabdbd20a4d1cf.js"
);

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute("/30sec/", workbox.strategies.cacheFirst({ cacheName: "top-page-cache", plugins: [new workbox.expiration.Plugin({"maxAgeSeconds":1209600})] }), 'GET');
workbox.routing.registerRoute(/\/30sec\/js\/.+/, workbox.strategies.cacheFirst({ cacheName: "scripts-cache", plugins: [new workbox.expiration.Plugin({"maxAgeSeconds":1209600})] }), 'GET');
workbox.routing.registerRoute(/\.(png|jpe?g|svg)/, workbox.strategies.cacheFirst({ cacheName: "assets", plugins: [new workbox.expiration.Plugin({"maxAgeSeconds":1209600})] }), 'GET');
