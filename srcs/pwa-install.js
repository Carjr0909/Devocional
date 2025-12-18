// ================= PWA INSTALL =================
let deferredPrompt = null;

document.addEventListener("DOMContentLoaded", () => {
  const btnInstall = document.getElementById("btnInstall");

  // Se a página não tiver o botão, sai sem erro
  if (!btnInstall) return;

  // Evento disparado quando o PWA pode ser instalado
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    btnInstall.style.display = "block";
  });

  // Clique no botão instalar
  btnInstall.addEventListener("click", async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    deferredPrompt = null;
    btnInstall.style.display = "none";

    if (outcome === "accepted") {
      console.log("PWA instalado com sucesso");
    }
  });
});
