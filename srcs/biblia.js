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
    { pt: "1 Crônicas", en: "1chronicles" },
    { pt: "2 Crônicas", en: "2chronicles" },
    { pt: "Esdras", en: "ezra" },
    { pt: "Neemias", en: "nehemiah" },
    { pt: "Ester", en: "esther" },
    { pt: "Jó", en: "job" },
    { pt: "Salmos", en: "psalms" },
    { pt: "Provérbios", en: "proverbs" },
    { pt: "Eclesiastes", en: "ecclesiastes" },
    { pt: "Cânticos", en: "songofsolomon" },
    { pt: "Isaías", en: "isaiah" },
    { pt: "Jeremias", en: "jeremiah" },
    { pt: "Lamentações", en: "lamentations" },
    { pt: "Ezequiel", en: "ezekiel" },
    { pt: "Daniel", en: "daniel" },
    { pt: "Oséias", en: "hosea" },
    { pt: "Joel", en: "joel" },
    { pt: "Amós", en: "amos" },
    { pt: "Obadias", en: "obadiah" },
    { pt: "Jonas", en: "jonah" },
    { pt: "Miqueias", en: "micah" },
    { pt: "Naum", en: "nahum" },
    { pt: "Habacuque", en: "habakkuk" },
    { pt: "Sofonias", en: "zephaniah" },
    { pt: "Ageu", en: "haggai" },
    { pt: "Zacarias", en: "zechariah" },
    { pt: "Malaquias", en: "malachi" },
    { pt: "Mateus", en: "matthew" },
    { pt: "Marcos", en: "mark" },
    { pt: "Lucas", en: "luke" },
    { pt: "João", en: "john" },
    { pt: "Atos", en: "acts" },
    { pt: "Romanos", en: "romans" },
    { pt: "1 Coríntios", en: "1corinthians" },
    { pt: "2 Coríntios", en: "2corinthians" },
    { pt: "Gálatas", en: "galatians" },
    { pt: "Efésios", en: "ephesians" },
    { pt: "Filipenses", en: "philippians" },
    { pt: "Colossenses", en: "colossians" },
    { pt: "1 Tessalonicenses", en: "1thessalonians" },
    { pt: "2 Tessalonicenses", en: "2thessalonians" },
    { pt: "1 Timóteo", en: "1timothy" },
    { pt: "2 Timóteo", en: "2timothy" },
    { pt: "Tito", en: "titus" },
    { pt: "Filemom", en: "philemon" },
    { pt: "Hebreus", en: "hebrews" },
    { pt: "Tiago", en: "james" },
    { pt: "1 Pedro", en: "1peter" },
    { pt: "2 Pedro", en: "2peter" },
    { pt: "1 João", en: "1john" },
    { pt: "2 João", en: "2john" },
    { pt: "3 João", en: "3john" },
    { pt: "Judas", en: "jude" },
    { pt: "Apocalipse", en: "revelation" }
];

// popular select
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
    const cap = capitulo.value;
    const vers = versiculos.value.replace(/\s+/g, ""); // remove espaços
    const query = `${livroApi}+${cap}:${vers}`;
    const url = `https://bible-api.com/${encodeURIComponent(query)}?translation=almeida`;

    textoBiblico.innerHTML = "Carregando...";

    fetch(url)
        .then(res => res.json())
        .then(data => {
            textoBiblico.innerHTML = "";

            if (!data.verses) {
                textoBiblico.innerHTML = "Versículo não encontrado.";
                return;
            }

            data.verses.forEach(v => {
                textoBiblico.innerHTML += `<p><b>${v.book_name} ${v.chapter}:${v.verse}</b><br>${v.text}</p>`;
            });

            localStorage.setItem("livroAtual", livro.value);
            localStorage.setItem("capituloAtual", capitulo.value);
            localStorage.setItem("versiculosAtual", versiculos.value);
        })
        .catch(err => {
            console.error(err);
            textoBiblico.innerHTML = "Erro ao carregar a Bíblia.";
        });
}
