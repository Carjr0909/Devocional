// biblia.js — A Bíblia Digital (sem token)

const livro = document.getElementById("livro");
const capitulo = document.getElementById("capitulo");
const versiculos = document.getElementById("versiculos");
const textoBiblico = document.getElementById("textoBiblico");

const livrosBiblia = [
  { pt: "Gênesis", api: "gn" },
  { pt: "Êxodo", api: "ex" },
  { pt: "Levítico", api: "lv" },
  { pt: "Números", api: "nm" },
  { pt: "Deuteronômio", api: "dt" },
  { pt: "Josué", api: "js" },
  { pt: "Juízes", api: "jz" },
  { pt: "Rute", api: "rt" },
  { pt: "1 Samuel", api: "1sm" },
  { pt: "2 Samuel", api: "2sm" },
  { pt: "1 Reis", api: "1rs" },
  { pt: "2 Reis", api: "2rs" },
  { pt: "Salmos", api: "sl" },
  { pt: "Provérbios", api: "pv" },
  { pt: "Isaías", api: "is" },
  { pt: "Mateus", api: "mt" },
  { pt: "Marcos", api: "mc" },
  { pt: "Lucas", api: "lc" },
  { pt: "João", api: "jo" },
  { pt: "Romanos", api: "rm" },
  { pt: "Apocalipse", api: "ap" }
];

// popula dropdown
livrosBiblia.forEach(l => {
  const opt = document.createElement("option");
  opt.value = l.api;
  opt.textContent = l.pt;
  livro.appendChild(opt);
});

document.getElementById("btnCarregar").onclick = carregarBiblia;

function carregarBiblia() {

  if (!livro.value || !capitulo.value || !versiculos.value) {
    alert("Preencha todos os campos!");
    return;
  }

  const livroApi = livro.value;
  const livroPt = livro.options[livro.selectedIndex].text;
  const cap = capitulo.value.trim();
  const vers = versiculos.value.replace(/\s+/g, "");

  textoBiblico.innerHTML = "Carregando...";

  const partes = vers.split(",");

  Promise.all(
    partes.map(v => {
      if (v.includes("-")) {
        return fetchCapitulo(livroApi, cap, v);
      }
      return fetchVersiculo(livroApi, cap, v);
    })
  )
  .then(res => {
    textoBiblico.innerHTML = res.flat().map(v => `
      <p>
        <b>${livroPt} ${v.chapter}:${v.number}</b><br>
        ${v.text}
      </p>
    `).join("");

    localStorage.setItem("livroAtual", livroApi);
    localStorage.setItem("capituloAtual", cap);
    localStorage.setItem("versiculosAtual", vers);
  })
  .catch(() => {
    textoBiblico.innerHTML = "Erro ao carregar texto bíblico.";
  });
}

function fetchVersiculo(livro, cap, vers) {
  return fetch(
    `https://www.abibliadigital.com.br/api/verses/nvi/${livro}/${cap}/${vers}`
  )
  .then(r => r.json())
  .then(v => [v]);
}

function fetchCapitulo(livro, cap, intervalo) {
  const [i, f] = intervalo.split("-").map(Number);

  return fetch(
    `https://www.abibliadigital.com.br/api/verses/nvi/${livro}/${cap}`
  )
  .then(r => r.json())
  .then(d => d.verses.filter(v => v.number >= i && v.number <= f));
}
