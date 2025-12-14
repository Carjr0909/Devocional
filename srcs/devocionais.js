const container = document.getElementById("listaDevocionais");
const devocionais = JSON.parse(localStorage.getItem("devocionais")) || [];

if (devocionais.length === 0) {
    container.innerHTML = "<p>Nenhum devocional salvo.</p>";
}

devocionais.forEach((d, index) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <link rel="stylesheet" href="srcs/style.css">
        <h3 id="titlebible" >${d.nome}</h3>
        <p id="titlebible"><b>${d.livro} ${d.capitulo}:${d.versiculos}</b></p>
        <small id="titlebible">${d.data}</small>

        <div class="card-buttons">
            <button id="bthd" onclick="abrir(${index})">Abrir</button>
            <button id="bthd" onclick="excluir(${index})">Excluir</button>
        </div>
    `;

    container.appendChild(card);
});

function abrir(index){
    localStorage.setItem("devocionalSelecionado", index);
    window.location.href = "index.html";
}

function excluir(index){
    if(!confirm("Deseja excluir este devocional?")) return;

    devocionais.splice(index, 1);
    localStorage.setItem("devocionais", JSON.stringify(devocionais));
    location.reload();
}
