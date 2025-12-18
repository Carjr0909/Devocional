const CACHE_NAME = "devocional-v1";

const FILES_TO_CACHE = [
  "/",
  "/inicio.html",
  "/devocionais.html",
  "/guia.html",
  "/manifest.json",

  "/srcs/style.css",
  "/srcs/dark.css",
  "/srcs/btperson.css",
  "/srcs/hamburguer.css",

  "/srcs/script.js",
  "/srcs/devocionais.js",
  "/srcs/hamburguer.js",
  "/srcs/dark.js",

  "/srcs/img/Logo.png",
  "/srcs/img/Logo02.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

let deferredPrompt;
const btnInstall = document.getElementById("btnInstall");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  btnInstall.style.display = "block";
});

btnInstall.addEventListener("click", async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;

  if (outcome === "accepted") {
    console.log("App instalado");
  }

  deferredPrompt = null;
  btnInstall.style.display = "none";
});