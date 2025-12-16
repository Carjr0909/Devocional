// ===============================
// BÍBLIA — VERSÃO FINAL ESTÁVEL
// API: bible-api.com (frontend-safe)
// ===============================

const livro = document.getElementById("livro");
const capitulo = document.getElementById("capitulo");
const versiculos = document.getElementById("versiculos");
const textoBiblico = document.getElementById("textoBiblico");

// ===== LIVROS (FORMATO ACEITO PELA API) =====
const livrosBiblia = [
  "Gênesis","Êxodo","Levítico","Números","Deuteronômio",
  "Josué","Juízes","Rute",
  "1 Samuel","2 Samuel",
  "1 Reis","2 Reis",
  "1 Crônicas","2 Crônicas",
  "Esdras","Neemias","Ester","Jó","Salmos","Provérbios",
  "Eclesiastes","Cânticos","Isaías","Jeremias","Lamentações",
  "Ezequiel","Daniel","Oséias","Joel","Amós","Obadias","Jonas",
  "Miqueias","Naum","Habacuque","Sofonias","Ageu","Zacarias",
  "Malaquias","Mateus","Marcos","Lucas","João","Atos","Romanos",
  "1 Coríntios","2 Coríntios","Gálatas","Efésios","Filipenses",
  "Colossenses","1 Tessalonicenses","2 Tessalonicenses",
  "1 Timóteo","2 Timóteo","Tito","Filemom","Hebreus","Tiago",
  "1 Pedro","2 Pedro","1 João","2 João","3 João","Judas","Apocalipse"
];

// popular select
livrosBiblia.forEach(nome => {
  const opt = document.createElement("option");
  opt.value = nome;
  opt.textContent = nome;
  livro.appendChild(opt);
});

document.getElementById("btnCarregar").addEventListener("click", carregarBiblia);

// ================= FUNÇÃO PRINCIPAL =================
function carregarBiblia() {

  if (!livro.value || !capitulo.value || !versiculos.value) {
    alert("Preencha todos os campos!");
    return;
  }

  const livroNome = livro.value;
  const cap = capitulo.value.trim();
  const entrada = versiculos.value.replace(/\s+/g, "");

  textoBiblico.innerHTML = "Carregando...";

  // bible-api aceita capítulo inteiro
  const url = `https://bible-api.com/${encodeURIComponent(livroNome)}+${cap}?translation=almeida`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("Texto não encontrado");
      return res.json();
    })
    .then(data => {
      if (!data.verses) throw new Error("Formato inválido");

      const lista = parseVersiculos(entrada);
      const filtrados = data.verses.filter(v => lista.includes(v.verse));

      if (!filtrados.length) {
        textoBiblico.innerHTML = "Versículo(s) não encontrado(s).";
        return;
      }

      textoBiblico.innerHTML = filtrados.map(v => `
        <p>
          <b>${livroNome} ${cap}:${v.verse}</b><br>
          ${v.text}
        </p>
      `).join("");

      localStorage.setItem("livroAtual", livroNome);
      localStorage.setItem("capituloAtual", cap);
      localStorage.setItem("versiculosAtual", entrada);
    })
    .catch(err => {
      console.error("ERRO BÍBLIA:", err);
      textoBiblico.innerHTML = "Erro ao carregar texto bíblico.";
    });
}

// ===== UTIL =====
function parseVersiculos(txt) {
  return txt.split(",").flatMap(p => {
    if (p.includes("-")) {
      const [i, f] = p.split("-").map(Number);
      return Array.from({ length: f - i + 1 }, (_, x) => i + x);
    }
    return Number(p);
  });
}
