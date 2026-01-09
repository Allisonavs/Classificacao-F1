// Realiza a busca dos dados de classificação de pilotos para um ano específico na API
export async function buscarClassificacao(ano) {
  // Faz a requisição assíncrona para o endpoint da API Jolpi (baseada no Ergast)
  const resposta = await fetch(`https://api.jolpi.ca/ergast/f1/${ano}/driverStandings.json`);

  // Verifica se a comunicação com o servidor foi bem-sucedida; caso contrário, lança um erro
  if (!resposta.ok) throw new Error("Erro na rede");

  // Converte a resposta bruta em JSON e acessa o caminho específico da lista de pilotos
  const dados = await resposta.json();
  const lista = dados.MRData.StandingsTable.StandingsLists[0]?.DriverStandings;

  // Verifica se a lista existe para evitar erros de processamento em anos sem dados
  if (!lista) throw new Error("Ano sem dados.");

  // Retorna a lista final de pilotos para ser utilizada pelo restante da aplicação
  return lista;
}