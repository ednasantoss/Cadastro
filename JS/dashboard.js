document.addEventListener("DOMContentLoaded", function () {

    if (!verificarLogado()) {
        logout();
    }

    mostrarSecao('cadastro');
    carregarLista(); //Toda vez que entro no sistema
});


function mostrarSecao(secaoDesejada) {
    const abaCadastro = document.getElementById('secao-cadastro');
    const abaListagem = document.getElementById('secao-listagem');

    abaCadastro.style.display = 'none';
    abaListagem.style.display = 'none';

    if (secaoDesejada === 'cadastro') {
        abaCadastro.style.display = 'flex';
    } else {
        abaListagem.style.display = 'flex';
    }
}


function abrirFecharMenu() {
    const menu = document.getElementById('menu-dropdown');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

function salvarAtleta(event) {
    event.preventDefault();

    const novoAtleta = {
        id: Date.now(),
        nome: document.getElementById('atleta-nome').value,
        documento: document.getElementById('atleta-id').value,
        esporte: document.getElementById('atleta-esporte').value,
        nacionalidade: document.getElementById('atleta-nacionalidade').value,
        data: document.getElementById('atleta-data').value,
        modalidade: document.getElementById('atleta-esporte').value,
        sangue: document.getElementById('atleta-sangue').value,
        genero: document.getElementById('atleta-genero').value,
        problemasSaude: document.getElementById('atleta-problemasSaude').value
    };

    let listaAtletas = JSON.parse(localStorage.getItem('atletas')) || [];
    listaAtletas.push(novoAtleta);
    localStorage.setItem('atletas', JSON.stringify(listaAtletas));

    alert("Cadastrado com sucesso!");
    let form = document.getElementById("form-atleta");
    form.reset();
    carregarLista(); //Toda vez que salvo um dado
}

function carregarLista() {
    let atletas = JSON.parse(localStorage.getItem("atletas")) || [];
    let body = document.getElementById("tabela-atletas");

    if (atletas.length === 0) {
        body.innerHTML = "<tr><td colspan='12'>Nenhum atleta cadastrado</td></tr>";
    } else {
        body.innerHTML = atletas.map(function (atleta) {
            return "<tr>" +
                "<td> <strong>" + atleta.nome + "</strong> </td>" +
                "<td>" + atleta.id + "</td>" +
                "<td>" + atleta.nacionalidade + "</td>" +
                "<td>" + atleta.data + "</td>" +
                "<td>" + atleta.esporte + "</td>" +
                "<td>" + atleta.sangue + "</td>" +
                "<td>" + atleta.genero + "</td>" +
                "<td>" + atleta.problemasSaude + "</td>" +

                "</tr>";
        }).join("");

    }
}



