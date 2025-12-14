import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.innerText = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}

const form = document.getElementById("loginForm");
console.log(form);

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = input1.value.trim();
    const senha = input2.value;

    try {
        await signInWithEmailAndPassword(auth, email, senha);
        window.location.href = "inicio.html";
    } catch {
        showToast("Email ou senha inválidos");
    }
});

console.log("JS carregou");
