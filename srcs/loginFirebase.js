import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const form = document.getElementById("loginForm");
const emailInput = document.getElementById("input1");
const senhaInput = document.getElementById("input2");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        await signInWithEmailAndPassword(auth, emailInput.value.trim(), senhaInput.value.trim());
        window.location.href = "inicio.html";
    } catch (err) {
        alert("Erro ao fazer login!");
        console.error(err);
    }
});
