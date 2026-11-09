
// Lista de disciplinas e seus pre-requisitos

let disciplinas = [

    // 1º SEMESTRE
    { id: "web1", nome: "Construção de Páginas Web I", semestre: 1, requisitos: [] },
    { id: "fundamentos", nome: "Fundamentos da Computação", semestre: 1, requisitos: [] },
    { id: "ingles", nome: "Inglês Técnico", semestre: 1, requisitos: [] },
    { id: "ihc", nome: "Interação Humano-Computador", semestre: 1, requisitos: [] },
    { id: "logica", nome: "Lógica e Linguagem de Programação", semestre: 1, requisitos: [] },

    // 2º SEMESTRE
    { id: "banco1", nome: "Banco de Dados I", semestre: 2, requisitos: ["logica"] },
    { id: "web2", nome: "Construção de Páginas Web II", semestre: 2, requisitos: ["logica", "web1"] },
    { id: "eng1", nome: "Engenharia de Software I", semestre: 2, requisitos: ["logica"] },
    { id: "estrutura1", nome: "Estrutura de Dados I", semestre: 2, requisitos: ["logica"] },
    { id: "poo", nome: "Linguagem de Programação Orientada a Objetos", semestre: 2, requisitos: ["logica"] },
    { id: "webdesign", nome: "Web Design", semestre: 2, requisitos: ["ihc", "web1"] },

    // 3º SEMESTRE
    { id: "banco2", nome: "Banco de Dados II", semestre: 3, requisitos: ["banco1"] },
    { id: "eng2", nome: "Engenharia de Software II", semestre: 3, requisitos: ["eng1", "poo"] },
    { id: "estrutura2", nome: "Estrutura de Dados II", semestre: 3, requisitos: ["estrutura1"] },
    { id: "extensao", nome: "Introdução à Extensão", semestre: 3, requisitos: [] },
    { id: "prog1", nome: "Programação para Web I", semestre: 3, requisitos: ["poo"] },

    // 4º SEMESTRE
    { id: "praticas", nome: "Computação e Práticas Extensionistas", semestre: 4, requisitos: ["logica"] },
    { id: "prog2", nome: "Programação para Web II", semestre: 4, requisitos: ["prog1"] },
    { id: "redes", nome: "Redes de Computadores", semestre: 4, requisitos: [] },
    { id: "sistemas", nome: "Sistemas Operacionais", semestre: 4, requisitos: [] },

    // 5º SEMESTRE
    { id: "projetos", nome: "Desenvolvimento de Projetos", semestre: 5, requisitos: ["prog1", "eng2"] },
    { id: "gestao", nome: "Gestão de Projetos", semestre: 5, requisitos: ["eng2"] },
    { id: "leitura", nome: "Leitura e Produção Textual", semestre: 5, requisitos: [] },
    { id: "metodologia", nome: "Metodologia da Pesquisa", semestre: 5, requisitos: [] },
    { id: "optativa1", nome: "Componente Curricular Optativo I", semestre: 5, requisitos: [] },
    { id: "mobile", nome: "Programação para Dispositivos Móveis", semestre: 5, requisitos: ["prog2"] },
    { id: "tcc1", nome: "Trabalho de Conclusão de Curso I", semestre: 5, requisitos: ["eng2", "prog2"] },

    // 6º SEMESTRE
    { id: "empreendedorismo", nome: "Empreendedorismo", semestre: 6, requisitos: [] },
    { id: "governanca", nome: "Governança de Tecnologia da Informação", semestre: 6, requisitos: [] },
    { id: "sociedade", nome: "Informática e Sociedade", semestre: 6, requisitos: [] },
    { id: "optativa2", nome: "Componente Curricular Optativo II", semestre: 6, requisitos: [] },
    { id: "estatistica", nome: "Probabilidade e Estatística", semestre: 6, requisitos: [] },
    { id: "seguranca", nome: "Segurança e Auditoria de Sistemas", semestre: 6, requisitos: [] },
    { id: "validacao", nome: "Validação e Verificação de Sistemas", semestre: 6, requisitos: ["prog1"] },
    { id: "tcc2", nome: "Trabalho de Conclusão de Curso II", semestre: 6, requisitos: ["tcc1", "metodologia"] }
];


// Opções específicas de disciplinas optativas

let opcoesOptativas = [
    { id: "acessiveis", nome: "Desenvolvimento de Sistemas Acessíveis", requisitos: ["web2"] },
    { id: "ia", nome: "Tópicos em Inteligência Artificial", requisitos: ["logica"] },
    { id: "contemporaneo", nome: "Desenvolvimento Contemporâneo de Sistemas", requisitos: ["logica"] },
    { id: "ipv6", nome: "IPV6", requisitos: ["redes"] },
    { id: "libras", nome: "Língua Brasileira de Sinais", requisitos: [] },
    { id: "inovacao", nome: "Tópicos em Inovação", requisitos: [] },
    { id: "tic", nome: "Tecnologias de Informação e Comunicação na Educação", requisitos: [] }
];


// Iniciar todas as disciplinas como não aprovadas

for (let i = 0; i < disciplinas.length; i++) {
    disciplinas[i].aprovada = false;
}


// Entrar no modo aluno

function entrarAluno() {

    document.getElementById("area-aluno").classList.remove("escondido");
    document.getElementById("optativas").classList.remove("escondido");

    mostrarMatriz(true);

}


// Entrar no modo visitante

function entrarVisitante() {

    document.getElementById("area-aluno").classList.add("escondido");
    document.getElementById("optativas").classList.add("escondido");

    mostrarMatriz(false);

}


// Mostrar a matriz curricular

function mostrarMatriz(modoAluno) {

    document.getElementById("matriz").classList.remove("escondido");
    document.getElementById("avisos").classList.remove("escondido");
    document.getElementById("observacao").classList.remove("escondido");
    document.getElementById("voltar").classList.remove("escondido");

    let lista = document.getElementById("lista-disciplinas");

    lista.innerHTML = "";

    for (let semestre = 1; semestre <= 6; semestre++) {

        lista.innerHTML += "<h2>" + semestre + "º SEMESTRE</h2>";

        for (let i = 0; i < disciplinas.length; i++) {

            let materia = disciplinas[i];

            if (materia.semestre == semestre) {

                let status = "";
                let classe = "";

                if (modoAluno == false) {

                    status = "Consulta da matriz";
                }
                else if (materia.aprovada == true) {

                    status = "Aprovada";
                    classe = "aprovada";

                }
                else {

                    let liberada = true;
                    let faltam = [];

                    for (let j = 0; j < materia.requisitos.length; j++) {

                        let requisito = materia.requisitos[j];

                        let encontrada = false;

                        for (let k = 0; k < disciplinas.length; k++) {

                            if (disciplinas[k].id == requisito) {

                                encontrada = disciplinas[k].aprovada;
                            }
                        }

                        if (encontrada == false) {
                            liberada = false;

                            for (let k = 0; k < disciplinas.length; k++) {

                                if (disciplinas[k].id == requisito) {
                                    faltam.push(disciplinas[k].nome);
                                }
                            }
                        }
                    }

                    if (liberada == true) {

                        status = "LIBERADA";
                        classe = "liberada";

                    }
                    else {

                        status = "BLOQUEADA - Falta: " + faltam.join(", ");
                        classe = "bloqueada";
                    }
                }

                lista.innerHTML += `
                    <div class="disciplina">

                        <h3>${materia.nome}</h3>

                        <p class="status ${classe}">
                            ${status}
                        </p>

                        ${modoAluno ? `
                            <label>
                                <input
                                    type="checkbox"
                                    ${materia.aprovada ? "checked" : ""}
                                    onchange="marcarAprovada(${i}, this.checked)"
                                >
                                Aprovado nesta disciplina
                            </label>
                        ` : ""}

                    </div>
                `;
            }
        }
    }

    atualizarTotal();
    atualizarOptativas();
}


// Marcar uma disciplina como aprovada

function marcarAprovada(indice, valor) {

    disciplinas[indice].aprovada = valor;

    mostrarMatriz(true);

}


// Atualizar total de aprovações

function atualizarTotal() {

    let total = 0;

    for (let i = 0; i < disciplinas.length; i++) {

        if (disciplinas[i].aprovada == true) {
            total++;
        }
    }

    document.getElementById("total-aprovadas").innerHTML =
        total + " de " + disciplinas.length + " disciplinas aprovadas.";
}


// Verificar se uma optativa está liberada

function optativaLiberada(opcao) {

    for (let i = 0; i < opcao.requisitos.length; i++) {

        let encontrada = false;

        for (let j = 0; j < disciplinas.length; j++) {

            if (disciplinas[j].id == opcao.requisitos[i]) {
                encontrada = disciplinas[j].aprovada;
            }
        }

        if (encontrada == false) {
            return false;
        }
    }

    return true;
}


// Atualizar as opções de optativas

function atualizarOptativas() {

    let select1 = document.getElementById("optativa1");
    let select2 = document.getElementById("optativa2");

    let escolha1 = select1.value;
    let escolha2 = select2.value;

    if (escolha1 != "" && escolha1 == escolha2) {

        document.getElementById("aviso-optativas").innerHTML =
            "Você não pode escolher a mesma optativa duas vezes.";

        if (document.activeElement == select1) {
            escolha1 = "";
        } else {
            escolha2 = "";
        }

    } else {

        document.getElementById("aviso-optativas").innerHTML = "";
    }

    select1.innerHTML = '<option value="">Selecione uma opção</option>';
    select2.innerHTML = '<option value="">Selecione uma opção</option>';

    for (let i = 0; i < opcoesOptativas.length; i++) {

        let opcao = opcoesOptativas[i];

        if (optativaLiberada(opcao)) {

            if (opcao.id != escolha2) {

                select1.innerHTML += `
                    <option value="${opcao.id}">
                        ${opcao.nome}
                    </option>
                `;
            }

            if (opcao.id != escolha1) {

                select2.innerHTML += `
                    <option value="${opcao.id}">
                        ${opcao.nome}
                    </option>
                `;
            }
        }
    }

    select1.value = escolha1;
    select2.value = escolha2;
}


// Voltar para a tela inicial

function voltarInicio() {

    document.getElementById("area-aluno").classList.add("escondido");
    document.getElementById("matriz").classList.add("escondido");
    document.getElementById("optativas").classList.add("escondido");
    document.getElementById("avisos").classList.add("escondido");
    document.getElementById("observacao").classList.add("escondido");
    document.getElementById("voltar").classList.add("escondido");

    document.getElementById("lista-disciplinas").innerHTML = "";

}
