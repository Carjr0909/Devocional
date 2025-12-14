import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { addDoc, collection } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const mensagem = document.getElementById("mensagem");
const modal = document.getElementById("modalSalvar");
const nomeInput = document.getElementById("nomeDevocional");

const btnSalvar = document.getElementById("btnsalve");
const btnCancelar = document.getElementById("cancelarSalvar");
const btnConfirmar = document.getElementById("confirmarSalvar");

let usuarioLogado = null;

// ESPERA O FIREBASE AUTH
onAuthStateChanged(auth, (user) => {
    usuarioLogado = user;
});

// MODAL
btnSalvar.onclick = () => modal.style.display = "flex";
btnCancelar.onclick = () => modal.style.display = "none";

// SALVAR
btnConfirmar.onclick = async () => {

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
        alert("Erro ao salvar");
    }
};
