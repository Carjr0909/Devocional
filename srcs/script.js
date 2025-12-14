// ===== IMPORTS (SEMPRE NO TOPO) =====
import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { addDoc, collection } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ===== DOM READY =====
document.addEventListener("DOMContentLoaded", () => {

    const mensagem = document.getElementById("mensagem");
    const modal = document.getElementById("modalSalvar");
    const nomeInput = document.getElementById("nomeDevocional");

    const btnSalvar = document.getElementById("btnsalve");
    const btnCancelar = document.getElementById("cancelarSalvar");
    const btnConfirmar = document.getElementById("confirmarSalvar");

    let usuarioLogado = null;

    // Aguarda Firebase Auth
    onAuthStateChanged(auth, (user) => {
        usuarioLogado = user;
    });

    // Abrir / fechar modal
    btnSalvar.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    btnCancelar.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Salvar devocional
    btnConfirmar.addEventListener("click", async () => {

        if (!usuarioLogado) {
            alert("Usuário não autenticado");
            return;
        }

        const nome = nomeInput.value.trim();
        if (!nome) {
            alert("Dê um nome ao devocional");
            return;
        }

        try {
            await addDoc(
                collection(db, "devocionais", usuarioLogado.uid, "itens"),
                {
                    nome,
                    livro: localStorage.getItem("livroAtual"),
                    capitulo: localStorage.getItem("capituloAtual"),
                    versiculos: localStorage.getItem("versiculosAtual"),
                    anotacao: mensagem.value,
                    data: new Date().toLocaleDateString()
                }
            );

            modal.style.display = "none";
            nomeInput.value = "";
            alert("Devocional salvo com sucesso!");

        } catch (e) {
            console.error(e);
            alert("Erro ao salvar devocional");
        }
    });
});

document.getElementById("modalSalvar").style.display = "flex"

