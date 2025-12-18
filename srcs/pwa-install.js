// ================= PWA INSTALL (SEGURO) =================
document.addEventListener("DOMContentLoaded", () => {

  const btnInstall = document.getElementById("btnInstall");

  // Se não existir o botão, NÃO faz nada
  if (!btnInstall) return;

  let deferredPrompt = null;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    btnInstall.style.display = "block";
  });

  btnInstall.onclick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    deferredPrompt = null;
    btnInstall.style.display = "none";
  };

});
