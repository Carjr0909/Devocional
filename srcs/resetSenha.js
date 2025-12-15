import { auth } from "./firebase.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("resetSenha");
    const inputEmail = document.getElementById("input1");

    btn.addEventListener("click", async () => {
        const email = inputEmail.value.trim();
        if (!email) return alert("Digite seu email primeiro!");

        try {
            await sendPasswordResetEmail(auth, email);
            alert("Email de redefinição enviado!");
        } catch (err) {
            alert("Erro ao enviar email!");
            console.error(err);
        }
    });
});
