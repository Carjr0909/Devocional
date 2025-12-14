import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
    collection,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const container = document.getElementById("listaDevocionais");

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "index.html";
        return;
    }

    const ref = collection(db, "devocionais", user.uid, "itens");
    const snapshot = await getDocs(ref);

    if (snapshot.empty) {
        container.innerHTML = "<p>Nenhum devocional salvo.</p>";
        return;
    }

    snapshot.forEach((docSnap) => {
        const d = docSnap.data();

        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h3>${d.nome}</h3>
            <p><b>${d.livro} ${d.capitulo}:${d.versiculos}</b></p>
            <small>${d.data}</small>
            <button data-id="${docSnap.id}">Excluir</button>
        `;

        card.querySelector("button").onclick = async () => {
            if (!confirm("Excluir devocional?")) return;
            await deleteDoc(doc(db, "devocionais", user.uid, "itens", docSnap.id));
            location.reload();
        };

        container.appendChild(card);
    });
});
