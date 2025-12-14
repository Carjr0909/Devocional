import { auth } from "./firebase.js";
import { sendPasswordResetEmail } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const btn = document.getElementById("resetSenha");

if (btn) {
    btn.addEventListener("click", async () => {
        const email = input1.value.trim();

        if (!email) {
            alert("Digite seu email primeiro");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            alert("Email de redefinição enviado!");
        } catch {
            alert("Erro ao enviar email");
        }
    });
}
