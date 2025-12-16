const tabela = document.getElementById("corpo-tabela");
const avisoCarregando = document.getElementById("loading");
const coresEquipes = {
  "Alpine F1 Team": "#0093CC",
  "Aston Martin": "#229971",
  "Ferrari": "#E80020",
  "Haas F1 Team": "#B6BABD",
  "Sauber": "#52E252",
  "McLaren": "#FF8000",
  "Mercedes": "#27F4D2",
  "RB F1 Team": "#6692FF",
  "Red Bull": "#3671C6",
  "Williams": "#64C4FF"
}

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

        // Definir a cor de fundo da linha com base na equipe
        const nomeEquipe = piloto.Constructors[0].name;
        const corEquipe = coresEquipes[nomeEquipe] || "#FFFFFF";

        // 2. Monta o HTML dessa linha com os dados do piloto
        linha.innerHTML = `
            <td>${piloto.position}º</td>
            <td style="border-left: 4px solid ${corEquipe}; padding-left: 15px;">
                <strong>${piloto.Driver.givenName} ${piloto.Driver.familyName}</strong>
            </td>
            <td style="border-left: 4px solid ${corEquipe}; padding-left: 15px;">${piloto.Constructors[0].name}</td>
            <td><strong>${piloto.points}</strong> pts</td>
        `;

        // 3. Adiciona a linha na tabela (dentro do <tbody>)
        tabela.appendChild(linha);
    });
}