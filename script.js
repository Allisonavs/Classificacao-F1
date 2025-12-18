const tabela = document.getElementById("corpo-tabela");
const avisoCarregando = document.getElementById("loading");
const inputAno = document.getElementById("ano-input");
const btnBuscar = document.getElementById("btn-buscar");
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

async function carregarClassificacao(ano) {
  avisoCarregando.style.display = "block";
  avisoCarregando.innerText = `Carregando dados de ${ano}...`;
  tabela.innerHTML = "";

  try {
    const resposta = await fetch(
      `https://api.jolpi.ca/ergast/f1/${ano}/driverStandings.json`
    );
    const dados = await resposta.json();

    if (!dados.MRData.StandingsTable.StandingsLists.length) {
      throw new Error("Ano não encontrado ou sem dados.");
    }

    avisoCarregando.style.display = "none";
    preencherTabela(dados);

  } catch (erro) {
    console.error("Erro:", erro);
    avisoCarregando.style.display = "block";
    avisoCarregando.innerText = `Dados não encontrados para o ano ${ano}.`;
  }
}

carregarClassificacao(2025);

btnBuscar.addEventListener("click", () => {
  const anoEscolhido = inputAno.value;
  if(anoEscolhido >= 1950 && anoEscolhido <= 2025) {
    carregarClassificacao(anoEscolhido);
  } else {
    alert("Por favor, escolha um ano entre 1950 e 2025.");
  }
});
const significados = {
  "D" : "Desclassificado (Disqualified)",
  "E" : "Excluído (Excluded)",
  "-" : "Ineligível (Ineligible)"
}

function preencherTabela(dados) {
    // A. Encontrando a lista de pilotos dentro do "labirinto" do JSON
    // O caminho é: MRData -> Tabela de Classificação -> Listas -> Primeira Lista -> Classificação de Pilotos
    const listaPilotos = dados.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    const legendaContainer = document.getElementById("legenda-container");

    // B. Limpando a tabela antes de preencher (para não duplicar se carregar de novo)
    tabela.innerHTML = "";
    legendaContainer.innerHTML = "";
    legendaContainer.style.display = "none";

    const siglasEncontradas = new Set();


    // C O Loop Mágico: para cada piloto na lista...
    listaPilotos.forEach(piloto => {
        // 1. Criar uma nova linha na tabela <tr>
        const linha = document.createElement('tr');

        // Definir a cor de fundo da linha com base na equipe
        const nomeEquipe = piloto.Constructors[0].name;
        const corEquipe = coresEquipes[nomeEquipe] || "#FFFFFF";

        const eCasoEspecial = isNaN(piloto.positionText);


        const posicaoFormatada = eCasoEspecial
          ? piloto.positionText
          : `${piloto.positionText}º`;

          if (eCasoEspecial) {

            siglasEncontradas.add(piloto.positionText);

            linha.style.backgroundColor = "#e0e0e0";
            linha.style.color = "#777";
            linha.style.fontStyle = "italic";
          }

          
        // 2. Monta o HTML dessa linha com os dados do piloto
        linha.innerHTML = `
            <td>${posicaoFormatada}</td>
            <td style="border-left: 4px solid ${corEquipe}; padding-left: 15px;">
                <strong>${piloto.Driver.givenName} ${piloto.Driver.familyName}</strong>
            </td>
            <td style="border-left: 4px solid ${corEquipe}; padding-left: 15px;">${piloto.Constructors[0].name}</td>
            <td><strong>${piloto.points}</strong> pts</td>
        `;

        // 3. Adiciona a linha na tabela (dentro do <tbody>)
        tabela.appendChild(linha);
    });

    if (siglasEncontradas.size > 0) {
      legendaContainer.style.display = "block";
      let htmlLegenda = "<strong>Legenda:</strong><br>";

      siglasEncontradas.forEach(sigla => {
        const texto = significados[sigla] || "Caso especial";
        htmlLegenda += `<div class="item-legenda"><span class="sigla-legenda">${sigla}:</span> ${texto}</div>`;
      });
      legendaContainer.innerHTML = htmlLegenda;
    }
}

