// srcs/auth-guard.js
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.href = "index.html"; // não logado
        } else {
            console.log("Usuário logado:", user.email);
        }
    });
});
