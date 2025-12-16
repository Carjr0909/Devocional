// biblia.js — A Bíblia Digital (estável, sem erro 500)

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
  { pt: "1 Crônicas", api: "1cr" },
  { pt: "2 Crônicas", api: "2cr" },
  { pt: "Esdras", api: "ed" },
  { pt: "Neemias", api: "ne" },
  { pt: "Ester", api: "et" },
  { pt: "Jó", api: "job" }, // ← atenção aqui
  { pt: "Salmos", api: "sl" },
  { pt: "Provérbios", api: "pv" },
  { pt: "Eclesiastes", api: "ec" },
  { pt: "Cânticos", api: "ct" },
  { pt: "Isaías", api: "is" },
  { pt: "Jeremias", api: "jr" },
  { pt: "Lamentações", api: "lm" },
  { pt: "Ezequiel", api: "ez" },
  { pt: "Daniel", api: "dn" },
  { pt: "Oséias", api: "os" },
  { pt: "Joel", api: "jl" },
  { pt: "Amós", api: "am" },
  { pt: "Obadias", api: "ob" },
  { pt: "Jonas", api: "jn" },
  { pt: "Miqueias", api: "mq" },
  { pt: "Naum", api: "na" },
  { pt: "Habacuque", api: "hc" },
  { pt: "Sofonias", api: "sf" },
  { pt: "Ageu", api: "ag" },
  { pt: "Zacarias", api: "zc" },
  { pt: "Malaquias", api: "ml" },
  { pt: "Mateus", api: "mt" },
  { pt: "Marcos", api: "mc" },
  { pt: "Lucas", api: "lc" },
  { pt: "João", api: "jo" },
  { pt: "Atos", api: "at" },
  { pt: "Romanos", api: "rm" },
  { pt: "1 Coríntios", api: "1co" },
  { pt: "2 Coríntios", api: "2co" },
  { pt: "Gálatas", api: "gl" },
  { pt: "Efésios", api: "ef" },
  { pt: "Filipenses", api: "fp" },
  { pt: "Colossenses", api: "cl" },
  { pt: "1 Tessalonicenses", api: "1ts" },
  { pt: "2 Tessalonicenses", api: "2ts" },
  { pt: "1 Timóteo", api: "1tm" },
  { pt: "2 Timóteo", api: "2tm" },
  { pt: "Tito", api: "tt" },
  { pt: "Filemom", api: "fm" },
  { pt: "Hebreus", api: "hb" },
  { pt: "Tiago", api: "tg" },
  { pt: "1 Pedro", api: "1pe" },
  { pt: "2 Pedro", api: "2pe" },
  { pt: "1 João", api: "1jo" },
  { pt: "2 João", api: "2jo" },
  { pt: "3 João", api: "3jo" },
  { pt: "Judas", api: "jd" },
  { pt: "Apocalipse", api: "ap" }
];

// popular livros
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
  const entrada = versiculos.value.replace(/\s+/g, "");

  textoBiblico.innerHTML = "Carregando...";

  // Sempre busca o capítulo inteiro (estável)
  fetch(`https://www.abibliadigital.com.br/api/verses/nvi/${livroApi}/${cap}`)
    .then(res => {
      if (!res.ok) throw new Error("Capítulo não encontrado");
      return res.json();
    })
    .then(data => {

      const lista = parseVersiculos(entrada);
      const filtrados = data.verses.filter(v =>
        lista.includes(v.number)
      );

      if (!filtrados.length) {
        textoBiblico.innerHTML = "Versículo(s) não encontrado(s).";
        return;
      }

      textoBiblico.innerHTML = filtrados.map(v => `
        <p>
          <b>${livroPt} ${cap}:${v.number}</b><br>
          ${v.text}
        </p>
      `).join("");

      localStorage.setItem("livroAtual", livroApi);
      localStorage.setItem("capituloAtual", cap);
      localStorage.setItem("versiculosAtual", entrada);
    })
    .catch(() => {
      textoBiblico.innerHTML = "Erro ao carregar o texto bíblico.";
    });
}

// converte "1,3-5" → [1,3,4,5]
function parseVersiculos(txt) {
  return txt.split(",").flatMap(p => {
    if (p.includes("-")) {
      const [i, f] = p.split("-").map(Number);
      return Array.from({ length: f - i + 1 }, (_, x) => i + x);
    }
    return Number(p);
  });
}
