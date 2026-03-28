function fazerLogin(event) {
    event.preventDefault();

    const email = getElementValue("input-email");
    const senha = getElementValue("input-senha");

    const login = "admin@email.com";
    const pass = "987654321";

    if (email === login && senha === pass) {
        setElementText("mensagem", "Olá Admin, login feito!");
        setElementDisplay("overlay", "flex");

        setTimeout(function () {
            window.location.href = "dashboard.html";
        }, 2000);

    } else {

        setElementText("mensagem", "Email ou senha incorretos!");
        setElementDisplay("overlay", "flex");
    }
}

function showHelpMessage() {
    setElementText("mensagem", "Digite seu email e senha para acessar sua conta.");
    setElementDisplay("overlay", "flex");
}

function fecharOverlay() {
    setElementDisplay("overlay", "none");
}

function getElementValue(element) {
    return document.getElementById(element).value;
}

function setElementText(element, text) {
    document.getElementById(element).textContent = text;
}

function setElementDisplay(element, display) {
    document.getElementById(element).style.display = display;
}

document.addEventListener("DOMContentLoaded", function () {
    
    if(verificarLogado())//Redireciona se já estiver logado
        window.location.href = "dashboard.html";
   
    document.getElementById("overlay").onclick = function (e) {
        if (e.target.id === "overlay") {
            fecharOverlay();
        }
    }
});

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        fecharOverlay();
    }
});