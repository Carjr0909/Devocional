// ================= IMPORTS =================
import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  addDoc,
  updateDoc,
  collection,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ================= DOM READY =================
document.addEventListener("DOMContentLoaded", () => {

  // ---------- ELEMENTOS ----------
  const mensagem = document.getElementById("mensagem");

  const modalSalvar = document.getElementById("modalSalvar");
  const modalCores = document.getElementById("modalcores");
  const modalCoresfd = document.getElementById("modalcoresfd");

  const nomeInput = document.getElementById("nomeDevocional");

  const btnSalvar = document.getElementById("btnsalve");
  const btnCancelar = document.getElementById("cancelarSalvar");
  const btnConfirmar = document.getElementById("confirmarSalvar");

  const btnModalColor = document.getElementById("btnModalColor");
  const btnModalColorfd = document.getElementById("btnModalColorfd");

  const btnBold = document.getElementById("btnBold");
  const btnItalic = document.getElementById("btnItalic");
  const btnUnderline = document.getElementById("btnUnderline");
  const btnClear = document.getElementById("btnClear");

  // ---------- CONTROLE ----------
  let usuarioLogado = null;
  let alterado = false;

  const devocionalEmEdicao = localStorage.getItem("devocionalEmEdicao");

  if (devocionalEmEdicao) {
    btnSalvar.innerText = "Atualizar";
    nomeInput.style.display = "none"; // 👈 não renomeia
  }

  // ================= AUTH GUARD =================
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = "index.html";
      return;
    }

    usuarioLogado = user;

    // ===== CARREGAR DEVOCIONAL PARA EDIÇÃO =====
    if (devocionalEmEdicao) {
      const ref = doc(
        db,
        "devocionais",
        user.uid,
        "itens",
        devocionalEmEdicao
      );

      const snap = await getDoc(ref);
      if (!snap.exists()) return;

      const d = snap.data();

      mensagem.innerHTML = d.anotacao || "";
      document.getElementById("livro").value = d.livro;
      document.getElementById("capitulo").value = d.capitulo;
      document.getElementById("versiculos").value = d.versiculos;

      if (typeof carregarBiblia === "function") {
        carregarBiblia();
      }
    }
  });

  // ================= MODAL SALVAR =================
  btnSalvar.onclick = () => {
    modalSalvar.style.display = "flex";
  };

  btnCancelar.onclick = () => {
    modalSalvar.style.display = "none";
  };

  btnConfirmar.onclick = async () => {

    if (!usuarioLogado) return;

    if (devocionalEmEdicao) {
      // ✏️ ATUALIZAR (SEM RENOMEAR)
      await updateDoc(
        doc(db, "devocionais", usuarioLogado.uid, "itens", devocionalEmEdicao),
        {
          livro: localStorage.getItem("livroAtual"),
          capitulo: localStorage.getItem("capituloAtual"),
          versiculos: localStorage.getItem("versiculosAtual"),
          anotacao: mensagem.innerHTML,
          data: new Date().toLocaleDateString()
        }
      );

      localStorage.removeItem("devocionalEmEdicao");
      alert("Devocional atualizado!");

    } else {
      // ➕ NOVO DEVOCIONAL
      const nome = nomeInput.value.trim();
      if (!nome) {
        alert("Dê um nome ao devocional");
        return;
      }

      await addDoc(
        collection(db, "devocionais", usuarioLogado.uid, "itens"),
        {
          nome,
          livro: localStorage.getItem("livroAtual"),
          capitulo: localStorage.getItem("capituloAtual"),
          versiculos: localStorage.getItem("versiculosAtual"),
          anotacao: mensagem.innerHTML,
          data: new Date().toLocaleDateString()
        }
      );

      alert("Devocional salvo!");
    }

    alterado = false;
    modalSalvar.style.display = "none";
    nomeInput.value = "";
  };

  // ================= MODAIS DE CORES =================
  btnModalColor.onclick = () => modalCores.style.display = "flex";
  btnModalColorfd.onclick = () => modalCoresfd.style.display = "flex";

  document.getElementById("fecharmodalcolor").onclick = () =>
    modalCores.style.display = "none";

  document.getElementById("fecharmodalcolorfd").onclick = () =>
    modalCoresfd.style.display = "none";

  const cores = {
    btBlack: "black",
    btRed: "red",
    btBlue: "blue",
    btGreen: "green",
    btPurple: "purple",
    btYellow: "yellow"
  };

  for (const id in cores) {
    document.getElementById(id).onclick = () => {
      document.execCommand("foreColor", false, cores[id]);
      modalCores.style.display = "none";
    };
  }

  const coresfd = {
    btBlackfd: "black",
    btRedfd: "red",
    btBluefd: "blue",
    btGreenfd: "green",
    btPurplefd: "purple",
    btYellowfd: "yellow"
  };

  for (const id in coresfd) {
    document.getElementById(id).onclick = () => {
      document.execCommand("hiliteColor", false, coresfd[id]);
      modalCoresfd.style.display = "none";
    };
  }

  // ================= FORMATAÇÃO =================
  btnBold.onclick = () => document.execCommand("bold");
  btnItalic.onclick = () => document.execCommand("italic");
  btnUnderline.onclick = () => document.execCommand("underline");
  btnClear.onclick = () => document.execCommand("removeFormat");

  // ================= CONFIRMAR SAÍDA =================
  mensagem.addEventListener("input", () => alterado = true);

  window.addEventListener("beforeunload", (e) => {
    if (alterado) {
      e.preventDefault();
      e.returnValue = "";
    }
  });

  const btnNovoDevocional = document.getElementById("btnNovoDevocional");
  const livro = document.getElementById("livro");
  const capitulo = document.getElementById("capitulo");
  const versiculos = document.getElementById("versiculos");
  const textoBiblico = document.getElementById("textoBiblico");

  btnNovoDevocional.addEventListener("click", () => {

    // Limpa edição
    localStorage.removeItem("devocionalEmEdicao");

    // Limpa campos bíblicos
    document.getElementById("livro").value = "";
    document.getElementById("capitulo").value = "";
    document.getElementById("versiculos").value = "";
    document.getElementById("textoBiblico").innerHTML = "";

    // Limpa anotações
    mensagem.innerHTML = "";

    // Volta para modo "novo"
    btnSalvar.innerText = "Salvar";
    nomeInput.style.display = "block";
    nomeInput.value = "";

    alert("Novo devocional iniciado!");
  });


});
