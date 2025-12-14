const form = document.getElementById("loginForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const usuario = document.getElementById("input1").value;
    const senha = document.getElementById("input2").value;

    if (usuario === "admin" && senha === "1234") {
        localStorage.setItem("logado", "true");
        localStorage.setItem("usuario", usuario);

        window.location.href = "inicio.html";
    } else {
        alert("Usuário ou senha incorretos!");
    }
});
