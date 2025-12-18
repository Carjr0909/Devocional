document.addEventListener("DOMContentLoaded", () => {
  const btnInstall = document.getElementById("btnInstall");
  if (!btnInstall) return;

  let deferredPrompt = null;
  let isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

  if (isIOS) {
    btnInstall.style.display = "block";
    btnInstall.textContent = "📲 Adicionar à Tela Inicial";
    btnInstall.onclick = () => {
      alert(
        "No iPhone:\n\n" +
        "1. Toque em Compartilhar\n" +
        "2. Adicionar à Tela de Início"
      );
    };
    return;
  }

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    btnInstall.style.display = "block";
  });

  btnInstall.addEventListener("click", async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    btnInstall.style.display = "none";
    deferredPrompt = null;
  });
});
