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

  const btnNovoDevocional = document.getElementById("btnNovoDevocional");
  const btnDevocionais = document.getElementById("bthd");
  const btnLogout = document.getElementById("logout");

  // ---------- CONTROLE ----------
  let usuarioLogado = null;
  let alterado = false;

  let devocionalEmEdicao = localStorage.getItem("devocionalEmEdicao");

  if (devocionalEmEdicao) {
    btnSalvar.innerText = "Atualizar";
    nomeInput.style.display = "none";
  }

  // ================= FUNÇÃO CONFIRMAR SAÍDA =================
  function confirmarSaida(acao) {
    if (alterado) {
      const ok = confirm(
        "Você tem alterações não salvas. Deseja sair mesmo assim?"
      );
      if (!ok) return;
    }
    acao();
  }

  // ================= AUTH GUARD =================
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = "index.html";
      return;
    }

    usuarioLogado = user;

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
      devocionalEmEdicao = null;
      alert("Devocional atualizado!");

    } else {
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

  // ================= FORMATAÇÃO =================
  btnBold.onclick = () => document.execCommand("bold");
  btnItalic.onclick = () => document.execCommand("italic");
  btnUnderline.onclick = () => document.execCommand("underline");
  btnClear.onclick = () => document.execCommand("removeFormat");

  // ================= CONTROLE DE ALTERAÇÃO =================
  mensagem.addEventListener("input", () => {
    alterado = true;
  });

  window.addEventListener("beforeunload", (e) => {
    if (alterado) {
      e.preventDefault();
      e.returnValue = "";
    }
  });

  // ================= BOTÃO NOVO DEVOCIONAL =================
  btnNovoDevocional.onclick = () => {
    confirmarSaida(() => {

      localStorage.removeItem("devocionalEmEdicao");
      devocionalEmEdicao = null;

      document.getElementById("livro").value = "";
      document.getElementById("capitulo").value = "";
      document.getElementById("versiculos").value = "";
      document.getElementById("textoBiblico").innerHTML = "";
      mensagem.innerHTML = "";

      btnSalvar.innerText = "Salvar";
      nomeInput.style.display = "block";
      nomeInput.value = "";

      alterado = false;
      alert("Novo devocional iniciado!");
    });
  };

  // ================= NAVEGAÇÃO PROTEGIDA =================
  btnDevocionais.onclick = () => {
    confirmarSaida(() => {
      window.location.href = "devocionais.html";
    });
  };

  btnLogout.onclick = () => {
    confirmarSaida(() => {
      auth.signOut();
    });
  };

});
