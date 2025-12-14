// script.js — modal + devocionais

const mensagem = document.getElementById("mensagem");

// abrir modal
document.getElementById("btnsalve").onclick = () => {
    document.getElementById("modalSalvar").style.display = "flex";
};

// cancelar
document.getElementById("cancelarSalvar").onclick = () => {
    document.getElementById("modalSalvar").style.display = "none";
};

// confirmar salvar
document.getElementById("confirmarSalvar").onclick = () => {
    const nome = document.getElementById("nomeDevocional").value;

    if (!nome) {
        alert("Dê um nome ao devocional");
        return;
    }

    const devocionais = JSON.parse(localStorage.getItem("devocionais")) || [];

    devocionais.push({
        nome,
        livro: localStorage.getItem("livroAtual"),
        capitulo: localStorage.getItem("capituloAtual"),
        versiculos: localStorage.getItem("versiculosAtual"),
        anotacao: mensagem.value,
        data: new Date().toLocaleDateString()
    });

    localStorage.setItem("devocionais", JSON.stringify(devocionais));

    document.getElementById("modalSalvar").style.display = "none";
    document.getElementById("nomeDevocional").value = "";
};

// voltar de devocionais.html

window.onload = () => {
    const inicio = localStorage.getItem("devocionalSelecionado");

    if (inicio !== null) {
        const devocionais = JSON.parse(localStorage.getItem("devocionais"));
        const d = devocionais[inicio];

        livro.value = d.livro;
        capitulo.value = d.capitulo;
        versiculos.value = d.versiculos;
        mensagem.value = d.anotacao;

        carregarBiblia();

        localStorage.removeItem("devocionalSelecionado");
    }
};
