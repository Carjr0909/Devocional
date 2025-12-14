import { auth } from "./firebase.js";
import { signOut } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const btn = document.getElementById("logout");

if (btn) {
    btn.addEventListener("click", async () => {
        await signOut(auth);
        window.location.href = "index.html";
    });
}
