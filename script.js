const tabela = document.getElementById("corpo-tabela");
const avisoCarregando = document.getElementById("loading");

async function carregarClassificacao() {
  try {
    const resposta = await fetch(
      "https://api.jolpi.ca/ergast/f1/current/driverStandings.json"
    );

    const dados = await resposta.json();

    console.log(dados);

    avisoCarregando.style.display = "none";

    preencherTabela(dados);
  } catch (erro) {
    console.error("Erro ao carregar os dados:", erro);
    avisoCarregando.innerText = "Erro ao carregar os dados.";
  }
}

carregarClassificacao();

function preencherTabela(dados) {
    // A. Encontrando a lista de pilotos dentro do "labirinto" do JSON
    // O caminho é: MRData -> Tabela de Classificação -> Listas -> Primeira Lista -> Classificação de Pilotos
    const listaPilotos = dados.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    // B. Limpando a tabela antes de preencher (para não duplicar se carregar de novo)
    tabela.innerHTML = "";

    // C O Loop Mágico: para cada piloto na lista...
    listaPilotos.forEach(piloto => {
        // 1. Criar uma nova linha na tabela <tr>
        const linha = document.createElement('tr');

        // 2. Monta o HTML dessa linha com os dados do piloto
        linha.innerHTML = `
            <td>${piloto.position}º</td>
            <td>
                <strong>${piloto.Driver.givenName} ${piloto.Driver.familyName}</strong>
            </td>
            <td>${piloto.Constructors[0].name}</td>
            <td><strong>${piloto.points}</strong> pts</td>
        `;

        // 3. Adiciona a linha na tabela (dentro do <tbody>)
        tabela.appendChild(linha);
    });
}