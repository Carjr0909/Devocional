// ===============================
// BÍBLIA — VERSÃO FINAL ESTÁVEL
// A Bíblia Digital + fallback automático
// ===============================

const livro = document.getElementById("livro");
const capitulo = document.getElementById("capitulo");
const versiculos = document.getElementById("versiculos");
const textoBiblico = document.getElementById("textoBiblico");

// ================= LIVROS =================
const livrosBiblia = [
  { pt: "Gênesis", api: "gn", en: "genesis" },
  { pt: "Êxodo", api: "ex", en: "exodus" },
  { pt: "Levítico", api: "lv", en: "leviticus" },
  { pt: "Números", api: "nm", en: "numbers" },
  { pt: "Deuteronômio", api: "dt", en: "deuteronomy" },
  { pt: "Josué", api: "js", en: "joshua" },
  { pt: "Juízes", api: "jz", en: "judges" },
  { pt: "Rute", api: "rt", en: "ruth" },
  { pt: "1 Samuel", api: "1sm", en: "1samuel" },
  { pt: "2 Samuel", api: "2sm", en: "2samuel" },
  { pt: "1 Reis", api: "1rs", en: "1kings" },
  { pt: "2 Reis", api: "2rs", en: "2kings" },
  { pt: "1 Crônicas", api: "1cr", en: "1chronicles" },
  { pt: "2 Crônicas", api: "2cr", en: "2chronicles" },
  { pt: "Esdras", api: "ed", en: "ezra" },
  { pt: "Neemias", api: "ne", en: "nehemiah" },
  { pt: "Ester", api: "et", en: "esther" },
  { pt: "Jó", api: "job", en: "job" },
  { pt: "Salmos", api: "sl", en: "psalms" },
  { pt: "Provérbios", api: "pv", en: "proverbs" },
  { pt: "Eclesiastes", api: "ec", en: "ecclesiastes" },
  { pt: "Cânticos", api: "ct", en: "songofsolomon" },
  { pt: "Isaías", api: "is", en: "isaiah" },
  { pt: "Jeremias", api: "jr", en: "jeremiah" },
  { pt: "Lamentações", api: "lm", en: "lamentations" },
  { pt: "Ezequiel", api: "ez", en: "ezekiel" },
  { pt: "Daniel", api: "dn", en: "daniel" },
  { pt: "Oséias", api: "os", en: "hosea" },
  { pt: "Joel", api: "jl", en: "joel" },
  { pt: "Amós", api: "am", en: "amos" },
  { pt: "Obadias", api: "ob", en: "obadiah" },
  { pt: "Jonas", api: "jn", en: "jonah" },
  { pt: "Miqueias", api: "mq", en: "micah" },
  { pt: "Naum", api: "na", en: "nahum" },
  { pt: "Habacuque", api: "hc", en: "habakkuk" },
  { pt: "Sofonias", api: "sf", en: "zephaniah" },
  { pt: "Ageu", api: "ag", en: "haggai" },
  { pt: "Zacarias", api: "zc", en: "zechariah" },
  { pt: "Malaquias", api: "ml", en: "malachi" },
  { pt: "Mateus", api: "mt", en: "matthew" },
  { pt: "Marcos", api: "mc", en: "mark" },
  { pt: "Lucas", api: "lc", en: "luke" },
  { pt: "João", api: "jo", en: "john" },
  { pt: "Atos", api: "at", en: "acts" },
  { pt: "Romanos", api: "rm", en: "romans" },
  { pt: "1 Coríntios", api: "1co", en: "1corinthians" },
  { pt: "2 Coríntios", api: "2co", en: "2corinthians" },
  { pt: "Gálatas", api: "gl", en: "galatians" },
  { pt: "Efésios", api: "ef", en: "ephesians" },
  { pt: "Filipenses", api: "fp", en: "philippians" },
  { pt: "Colossenses", api: "cl", en: "colossians" },
  { pt: "1 Tessalonicenses", api: "1ts", en: "1thessalonians" },
  { pt: "2 Tessalonicenses", api: "2ts", en: "2thessalonians" },
  { pt: "1 Timóteo", api: "1tm", en: "1timothy" },
  { pt: "2 Timóteo", api: "2tm", en: "2timothy" },
  { pt: "Tito", api: "tt", en: "titus" },
  { pt: "Filemom", api: "fm", en: "philemon" },
  { pt: "Hebreus", api: "hb", en: "hebrews" },
  { pt: "Tiago", api: "tg", en: "james" },
  { pt: "1 Pedro", api: "1pe", en: "1peter" },
  { pt: "2 Pedro", api: "2pe", en: "2peter" },
  { pt: "1 João", api: "1jo", en: "1john" },
  { pt: "2 João", api: "2jo", en: "2john" },
  { pt: "3 João", api: "3jo", en: "3john" },
  { pt: "Judas", api: "jd", en: "jude" },
  { pt: "Apocalipse", api: "ap", en: "revelation" }
];

// ================= POPULAR SELECT =================
livrosBiblia.forEach(l => {
  const opt = document.createElement("option");
  opt.value = l.api;
  opt.dataset.en = l.en;
  opt.textContent = l.pt;
  livro.appendChild(opt);
});

// ================= EVENTO =================
document.getElementById("btnCarregar").addEventListener("click", carregarBiblia);

// ================= FUNÇÕES =================
function carregarBiblia() {

  if (!livro.value || !capitulo.value || !versiculos.value) {
    alert("Preencha todos os campos!");
    return;
  }

  const livroApi = livro.value;
  const livroEn = livro.options[livro.selectedIndex].dataset.en;
  const livroPt = livro.options[livro.selectedIndex].text;
  const cap = capitulo.value.trim();
  const entrada = versiculos.value.replace(/\s+/g, "");

  textoBiblico.innerHTML = "Carregando...";

  // 1️⃣ tenta A Bíblia Digital
  fetch(`https://www.abibliadigital.com.br/api/verses/nvi/${livroApi}/${cap}`)
    .then(r => {
      if (!r.ok) throw new Error("ABD falhou");
      return r.json();
    })
    .then(d => {
      if (!d.verses) throw new Error("ABD inválido");
      renderizar(d.verses, livroPt, cap, entrada);
    })
    .catch(() => {
      // 2️⃣ fallback automático
      fetch(`https://bible-api.com/${livroEn}+${cap}?translation=almeida`)
        .then(r => r.json())
        .then(d => renderizar(d.verses, livroPt, cap, entrada))
        .catch(() => {
          textoBiblico.innerHTML = "Erro ao carregar texto bíblico.";
        });
    });
}

function renderizar(verses, livroPt, cap, entrada) {
  const lista = parseVersiculos(entrada);

  const filtrados = verses.filter(v =>
    lista.includes(v.number || v.verse)
  );

  if (!filtrados.length) {
    textoBiblico.innerHTML = "Versículo(s) não encontrado(s).";
    return;
  }

  textoBiblico.innerHTML = filtrados.map(v => `
    <p>
      <b>${livroPt} ${cap}:${v.number || v.verse}</b><br>
      ${v.text}
    </p>
  `).join("");

  localStorage.setItem("livroAtual", livro.value);
  localStorage.setItem("capituloAtual", cap);
  localStorage.setItem("versiculosAtual", entrada);
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
