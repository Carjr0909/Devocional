import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const form = document.getElementById("loginForm");
const inputEmail = document.getElementById("input1");
const inputSenha = document.getElementById("input2");
const inputConfirma = document.getElementById("input3");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if(inputSenha.value !== inputConfirma.value){
        alert("As senhas não coincidem!");
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, inputEmail.value, inputSenha.value);
        alert("Cadastro realizado!");
        window.location.href = "index.html";
    } catch (err) {
        alert("Erro ao cadastrar!");
        console.error(err);
    }
});
