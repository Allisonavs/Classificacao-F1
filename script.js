// Importação das funcionalidades modularizadas de API, UI e controle do seletor
import { buscarClassificacao } from './js/api.js';
import { renderizarTabela, mostrarLoading, esconderLoading } from './js/ui.js';
import { configurarSeletor } from './js/yearSelector.js';

// Seleção dos elementos de controle da interface (input, botão e lista suspensa)
const filtroInput = document.getElementById("ano-filtro-input");
const btnBuscar = document.getElementById("btn-buscar");
const listaAnosUl = document.getElementById("lista-anos-dropdown");

// Função central que coordena o fluxo de dados: busca na API e atualiza a interface
async function atualizarPagina(ano) {
  try {
    // Inicia o estado de carregamento e busca os dados de forma assíncrona
    mostrarLoading(`Carregando dados de ${ano}...`);
    const dados = await buscarClassificacao(ano);
    
    // Se a busca for bem-sucedida, desenha a tabela e remove o aviso de loading
    renderizarTabela(dados);
    esconderLoading();
  } catch (erro) {
    // Caso ocorra qualquer erro (rede ou ano inválido), exibe a mensagem de erro na tela
    mostrarLoading(`Dados não encontrados para o ano ${ano}.`);
  }
}

// Inicializa o comportamento do dropdown de anos e define o callback para atualizar a página
configurarSeletor(filtroInput, listaAnosUl, (ano) => atualizarPagina(ano));

// Gerencia o clique no botão de busca manual para validar a entrada do usuário
btnBuscar.addEventListener("click", () => {
  const ano = filtroInput.value;

  // Verifica se o ano digitado está dentro do intervalo histórico coberto pela API
  if (ano >= 1950 && ano <= 2025) {
    atualizarPagina(ano);
  } else {
    // Alerta caso o valor seja inválido ou esteja fora do intervalo
    alert("Por favor, escolha um ano entre 1950 e 2025.");
  }
});

// Define o carregamento padrão do site com os dados da temporada atual (2025)
atualizarPagina(2025);