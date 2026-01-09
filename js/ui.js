import { CORES_EQUIPES, SIGNIFICADOS } from './constants.js';

// Seleção dos elementos do DOM que serão manipulados pelas funções de interface
const tabela = document.getElementById("corpo-tabela");
const avisoCarregando = document.getElementById("loading");
const legendaContainer = document.getElementById("legenda-container");

// Exibe a mensagem de carregamento para o usuário
export function mostrarLoading(mensagem) {
  avisoCarregando.style.display = "block";
  avisoCarregando.innerText = mensagem;
}

// Oculta o aviso de carregamento após a conclusão da requisição
export function esconderLoading() {
  avisoCarregando.style.display = "none";
}

// Função principal que limpa a interface e desenha a nova lista de pilotos na tabela
export function renderizarTabela(pilotos) {
  // Reseta o conteúdo da tabela e da legenda para evitar duplicatas ao trocar de ano
  tabela.innerHTML = "";
  legendaContainer.innerHTML = "";
  legendaContainer.style.display = "none";
  const siglasEncontradas = new Set();

  // Itera sobre a lista de pilotos para criar individualmente cada linha (tr) da tabela
  pilotos.forEach(piloto => {
    const linha = document.createElement('tr');
    const nomeEquipe = piloto.Constructors[0].name;
    const corEquipe = CORES_EQUIPES[nomeEquipe] || "#FFFFFF";
    const eCasoEspecial = isNaN(piloto.positionText);

    // Verifica se o piloto não possui uma posição numérica (ex: desclassificado ou reserva)
    if (eCasoEspecial) {
      siglasEncontradas.add(piloto.positionText);
      linha.classList.add('linha-especial');
    }

    // Define se exibe o número da posição (ex: 1º) ou a sigla especial (ex: D)
    const posicao = eCasoEspecial ? piloto.positionText : `${piloto.positionText}º`;

    // Monta a estrutura interna da linha com os dados do piloto e as cores da equipe
    linha.innerHTML = `
      <td>${posicao}</td>
      <td style="border-left: 4px solid ${corEquipe}; padding-left: 15px;">
        <strong>${piloto.Driver.givenName} ${piloto.Driver.familyName}</strong>
      </td>
      <td style="border-left: 4px solid ${corEquipe}; padding-left: 15px;">${nomeEquipe}</td>
      <td><strong>${piloto.points}</strong> pts</td>
    `;
    
    // Adiciona a linha preenchida ao corpo da tabela no HTML
    tabela.appendChild(linha);
  });

  // Renderiza a legenda apenas se houver siglas especiais na lista atual
  if (siglasEncontradas.size > 0) renderizarLegenda(siglasEncontradas);
}

// Gera o HTML da legenda baseado nas siglas coletadas durante a renderização da tabela
function renderizarLegenda(siglas) {
  legendaContainer.style.display = "block";
  let html = "<strong>Legenda:</strong><br>";

  // Percorre as siglas identificadas e busca seu significado no arquivo de constantes
  siglas.forEach(s => {
    html += `<div><span>${s}:</span> ${SIGNIFICADOS[s] || "Caso especial"}</div>`;
  });

  legendaContainer.innerHTML = html;
}