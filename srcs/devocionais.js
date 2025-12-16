import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
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

  container.innerHTML = "";

  snapshot.forEach((docSnap) => {
    const d = docSnap.data();

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3 class="nome-devocional">${d.nome}</h3>
      <p><b>${d.livro} ${d.capitulo}:${d.versiculos}</b></p>
      <small>${d.data}</small>

      <div class="card-buttons">
        <button class="btpadrao editar">Editar</button>
        <button class="btpadrao renomear">Renomear</button>
        <button class="btpadrao excluir">Excluir</button>
      </div>
    `;

    // ✏️ Editar
    card.querySelector(".editar").onclick = () => {
      localStorage.setItem("devocionalEmEdicao", docSnap.id);
      window.location.href = "inicio.html";
    };

    // 🗑️ Excluir
    card.querySelector(".excluir").onclick = async () => {
      if (confirm("Deseja excluir este devocional?")) {
        await deleteDoc(
          doc(db, "devocionais", user.uid, "itens", docSnap.id)
        );
        location.reload();
      }
    };

    // ✏️ Renomear
    card.querySelector(".renomear").onclick = async () => {
      const novoNome = prompt("Novo nome do devocional:", d.nome);
      if (!novoNome || !novoNome.trim()) return;

      await updateDoc(
        doc(db, "devocionais", user.uid, "itens", docSnap.id),
        { nome: novoNome.trim() }
      );

      alert("Nome atualizado!");
      location.reload();
    };

    container.appendChild(card);
  });
});
