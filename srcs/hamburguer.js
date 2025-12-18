const buttons = document.getElementById("buttons");

function clickhb() {
    // só executa se for mobile
    if (window.innerWidth <= 768) {
        if (buttons.style.display === "flex") {
            buttons.style.display = "none";
        } else {
            buttons.style.display = "flex";
        }
    }
}

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        buttons.style.display = "flex";
    } else {
        buttons.style.display = "none";
    }
});
