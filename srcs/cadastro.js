import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from
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
    const confirmar = input3.value;

    if (senha !== confirmar) {
        showToast("As senhas não coincidem!");
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, senha);
        showToast("Cadastro realizado com sucesso!");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);
    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            showToast("Esse email já está cadastrado!");
        } else if (error.code === "auth/weak-password") {
            showToast("Senha fraca (mín. 6 caracteres)");
        } else {
            showToast("Erro ao cadastrar");
        }
    }
});