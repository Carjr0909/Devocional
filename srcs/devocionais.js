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
const inputPesquisa = document.getElementById("pesquisaDevocional");

let listaDevocionais = [];

<link rel="stylesheet" href="srcs/style.css"></link>

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

  // 👉 salva em array
  listaDevocionais = snapshot.docs.map(docSnap => ({
    id: docSnap.id,
    ...docSnap.data()
  }));

  // 👉 ordena por data (mais recente primeiro)
  listaDevocionais.sort((a, b) =>
    new Date(b.data) - new Date(a.data)
  );

  renderizar(listaDevocionais);
});

// ================= RENDER =================
function renderizar(lista) {
  container.innerHTML = "";

  lista.forEach(d => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3 class="textosfomat" class="nome-devocional">${d.nome}</h3>
      <p class="textosfomat"><b>${d.livro} ${d.capitulo}:${d.versiculos}</b></p>
      <small class="textosfomat">${d.data}</small>

      <div class="card-buttons">
        <button class="btpadrao editar">Editar</button>
        <button class="btpadrao renomear">Renomear</button>
        <button class="btpadrao excluir">Excluir</button>
      </div>
    `;

    // ✏️ Editar
    card.querySelector(".editar").onclick = () => {
      localStorage.setItem("devocionalEmEdicao", d.id);
      window.location.href = "inicio.html";
    };

    // 🗑️ Excluir
    card.querySelector(".excluir").onclick = async () => {
      if (confirm("Deseja excluir este devocional?")) {
        await deleteDoc(
          doc(db, "devocionais", auth.currentUser.uid, "itens", d.id)
        );
        location.reload();
      }
    };

    // ✏️ Renomear
    card.querySelector(".renomear").onclick = async () => {
      const novoNome = prompt("Novo nome do devocional:", d.nome);
      if (!novoNome || !novoNome.trim()) return;

      await updateDoc(
        doc(db, "devocionais", auth.currentUser.uid, "itens", d.id),
        { nome: novoNome.trim() }
      );

      alert("Nome atualizado!");
      location.reload();
    };

    container.appendChild(card);
  });
}

// ================= PESQUISA =================
inputPesquisa.addEventListener("input", () => {
  const termo = inputPesquisa.value.toLowerCase();

  const filtrados = listaDevocionais.filter(d =>
    d.nome.toLowerCase().includes(termo) ||
    d.livro.toLowerCase().includes(termo) ||
    d.versiculos.toLowerCase().includes(termo)
  );

  renderizar(filtrados);
});
