let atletaEdicao = null;

document.addEventListener("DOMContentLoaded", function () {
    mostrarSecao('cadastro');
    carregarLista();
});


function mostrarSecao(secaoDesejada) {
    const abaCadastro = document.getElementById('secao-cadastro');
    const abaListagem = document.getElementById('secao-listagem');
    const secaoEditar = document.getElementById('editar');

    abaCadastro.style.display = 'none';
    abaListagem.style.display = 'none';
    secaoEditar.style.display = 'none';

    if (secaoDesejada === 'cadastro') {
        abaCadastro.style.display = 'flex';
    } else if (secaoDesejada === 'listagem') {
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
        nacionalidade: document.getElementById('atleta-nacionalidade').value,
        data: document.getElementById('atleta-data').value,
        modalidade: document.getElementById('atleta-modalidade').value,
        sangue: document.getElementById('atleta-sangue').value,
        genero: document.getElementById('atleta-genero').value,
        problemasSaude: document.getElementById('atleta-problemasSaude').value
    };

    let listaAtletas = JSON.parse(localStorage.getItem('atletas')) || [];
    listaAtletas.push(novoAtleta);
    localStorage.setItem('atletas', JSON.stringify(listaAtletas));

    document.getElementById("form-atleta").reset();
    carregarLista();
    mostrarModal();
}

function mostrarModal() {
    const modal = document.getElementById('meuModal');
    modal.classList.add('show');
    modal.style.display = 'flex';

    document.getElementById('closeBtn').onclick = () => {
        modal.classList.remove('show');
        modal.style.display = 'none';
    };
}

function carregarLista() {
    let atletas = JSON.parse(localStorage.getItem("atletas")) || [];
    let body = document.getElementById("tabela-atletas");

    if (!body) return;

    if (atletas.length === 0) {
        body.innerHTML = "<tr><td colspan='10'>Nenhum atleta cadastrado</td></tr>";
    } else {
        body.innerHTML = atletas.map(atleta => `
            <tr>
                <td><strong>${atleta.nome}</strong></td>
                <td>${atleta.documento || atleta.id}</td>
                <td>${atleta.nacionalidade}</td>
                <td>${atleta.data}</td>
                <td>${atleta.modalidade}</td>
                <td>${atleta.sangue}</td>
                <td>${atleta.genero}</td>
                <td>${atleta.problemasSaude}</td>
                <td><button class='btn-acao btn-editar' onclick='abrirEditar(${atleta.id})'>Editar</button></td>
                <td><button class='btn-acao btn-excluir' onclick='excluirAtleta(${atleta.id})'>Excluir</button></td>
            </tr>
        `).join("");
    }
}

function abrirEditar(idAtleta) {
    let atletas = JSON.parse(localStorage.getItem("atletas")) || [];
    atletaEdicao = atletas.find(a => a.id == idAtleta);

    if (atletaEdicao) {

        document.getElementById("secao-listagem").style.display = "none";
        document.getElementById("secao-cadastro").style.display = "none";


        const formEditar = document.getElementById("editar");
        formEditar.style.display = "flex";

        document.getElementById("edit-nome-atleta").value = atletaEdicao.nome;
        document.getElementById("edit-nacionalidade").value = atletaEdicao.nacionalidade;
        document.getElementById("edit-modalidade").value = atletaEdicao.modalidade;
        document.getElementById("edit-genero").value = atletaEdicao.genero;
        document.getElementById("edit-problemasSaude").value = atletaEdicao.problemasSaude;
    }
}

function salvarEdicaoAtleta(event) {
    event.preventDefault();
    let atletas = JSON.parse(localStorage.getItem("atletas")) || [];

    let atletasAtualizado = atletas.map(atleta => {
        if (atleta.id == atletaEdicao.id) {
            return {
                ...atleta,
                nome: document.getElementById("edit-nome-atleta").value,
                nacionalidade: document.getElementById("edit-nacionalidade").value,
                modalidade: document.getElementById("edit-modalidade").value,
                genero: document.getElementById("edit-genero").value,
                problemasSaude: document.getElementById("edit-problemasSaude").value
            };
        }
        return atleta;
    });

    localStorage.setItem("atletas", JSON.stringify(atletasAtualizado));
    carregarLista();
    mostrarSecao('listagem');
}

function excluirAtleta(idAtleta) {
    if (confirm("Deseja realmente excluir o atleta?")) {
        let atletas = JSON.parse(localStorage.getItem("atletas")) || [];
        let atletasFiltrado = atletas.filter(a => a.id !== idAtleta);
        localStorage.setItem("atletas", JSON.stringify(atletasFiltrado));
        carregarLista();
    }
}