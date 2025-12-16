// script2.js — Bíblia (corrigido, sem cortes de versículos)

const livro = document.getElementById("livro");
const capitulo = document.getElementById("capitulo");
const versiculos = document.getElementById("versiculos");
const textoBiblico = document.getElementById("textoBiblico");

const livrosBiblia = [
  { pt: "Gênesis", en: "genesis" },
  { pt: "Êxodo", en: "exodus" },
  { pt: "Levítico", en: "leviticus" },
  { pt: "Números", en: "numbers" },
  { pt: "Deuteronômio", en: "deuteronomy" },
  { pt: "Josué", en: "joshua" },
  { pt: "Juízes", en: "judges" },
  { pt: "Rute", en: "ruth" },
  { pt: "1 Samuel", en: "1samuel" },
  { pt: "2 Samuel", en: "2samuel" },
  { pt: "1 Reis", en: "1kings" },
  { pt: "2 Reis", en: "2kings" },
  { pt: "Salmos", en: "psalms" },
  { pt: "Provérbios", en: "proverbs" },
  { pt: "Isaías", en: "isaiah" },
  { pt: "Mateus", en: "matthew" },
  { pt: "Marcos", en: "mark" },
  { pt: "Lucas", en: "luke" },
  { pt: "João", en: "john" },
  { pt: "Romanos", en: "romans" },
  { pt: "Apocalipse", en: "revelation" }
];

// popular livros
livrosBiblia.forEach(l => {
  const opt = document.createElement("option");
  opt.value = l.en;
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
  const vers = versiculos.value.trim();

  // Normaliza entrada (ex: 1,3-5 → 1-5)
  let intervalo = vers;

  if (vers.includes(",")) {
    const partes = vers.split(",").map(v => v.trim());
    const nums = partes.flatMap(p => {
      if (p.includes("-")) {
        const [i, f] = p.split("-").map(Number);
        return Array.from({ length: f - i + 1 }, (_, x) => i + x);
      }
      return Number(p);
    });
    intervalo = `${Math.min(...nums)}-${Math.max(...nums)}`;
  }

  textoBiblico.innerHTML = "Carregando...";

  const url = `https://bible-api.com/${livroApi}+${cap}:${intervalo}?translation=almeida`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("Texto não encontrado");
      return res.json();
    })
    .then(data => {

      textoBiblico.innerHTML = "";

      data.verses.forEach(v => {
        textoBiblico.innerHTML += `
          <p>
            <b>${livroPt} ${v.chapter}:${v.verse}</b><br>
            ${v.text}
          </p>
        `;
      });

      // salvar leitura atual
      localStorage.setItem("livroAtual", livro.value);
      localStorage.setItem("capituloAtual", cap);
      localStorage.setItem("versiculosAtual", vers);
    })
    .catch(() => {
      textoBiblico.innerHTML = "Texto não encontrado para esta referência.";
    });
}
