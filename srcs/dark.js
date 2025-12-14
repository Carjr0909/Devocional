const botao = document.getElementById("darkModeBtn");

// 1️⃣ aplica o modo salvo ao carregar a página
const modoSalvo = localStorage.getItem("tema");

if (modoSalvo === "dark") {
    document.body.classList.add("dark");
}

// 2️⃣ troca o modo ao clicar
botao.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    // 3️⃣ salva a escolha
    const temaAtual = document.body.classList.contains("dark")
        ? "dark"
        : "light";

    localStorage.setItem("tema", temaAtual);
});
