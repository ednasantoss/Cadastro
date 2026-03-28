function getElementValue(elementId) {
    return document.getElementById(elementId).value;
}

function showErrorLoginMessage() {
    const msgErro = document.getElementById("mensagem-erro");
    if (msgErro) {
        msgErro.textContent = "E-mail e/ou senha incorretos!";
        msgErro.style.display = "block";
    } else {
        alert("E-mail e/ou senha incorretos!");
    }
}

function verificarLogado() {
    return localStorage.getItem("logado") === "true";
}

function logout() {
    localStorage.removeItem("logado");
    window.location.href = "login.html";
}

function login(event) {
    event.preventDefault();

    const email = getElementValue("input-email");
    const senha = getElementValue("input-senha");

    if (email === "admin@email.com" && senha === "987654321") {
        localStorage.setItem("logado", "true");
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 100);

        return true;
    } else {
        showErrorLoginMessage();
        return false;
    }
}