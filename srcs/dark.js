const botao = document.getElementById("darkModeBtn");
const temaSalvo = localStorage.getItem("tema");

if(temaSalvo === "dark") document.body.classList.add("dark");

botao.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("tema", document.body.classList.contains("dark") ? "dark" : "light");
});
