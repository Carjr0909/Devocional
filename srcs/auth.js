import { auth } from "./firebase.js";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ELEMENTOS
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
const btnLogin = document.getElementById("btnLogin");
const btnCadastro = document.getElementById("btnCadastro");

// LOGIN
if (btnLogin) {
    btnLogin.addEventListener("click", async () => {
        const email = emailInput.value.trim();
        const senha = senhaInput.value.trim();

        if (!email || !senha) {
            alert("Preencha email e senha");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, senha);
            window.location.href = "inicio.html";
        } catch (e) {
            alert("Erro no login");
            console.error(e);
        }
    });
}

// CADASTRO
if (btnCadastro) {
    btnCadastro.addEventListener("click", async () => {
        const email = emailInput.value.trim();
        const senha = senhaInput.value.trim();

        if (!email || !senha) {
            alert("Preencha email e senha");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, senha);
            window.location.href = "inicio.html";
        } catch (e) {
            alert("Erro no cadastro");
            console.error(e);
        }
    });
}
