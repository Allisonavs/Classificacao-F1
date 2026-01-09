// Configura o seletor de anos, gerenciando a lista, a busca e o fechamento do dropdown
export function configurarSeletor(input, lista, aoSelecionar) {
  
  // Gera dinamicamente a lista de anos (do mais recente ao mais antigo)
  for (let ano = 2025; ano >= 1950; ano--) {
    const li = document.createElement("li");
    li.textContent = ano;

    // Define a ação ao clicar em um ano da lista: preenche o campo e busca os dados
    li.addEventListener("click", () => {
      input.value = ano;
      lista.style.display = "none";
      aoSelecionar(ano);
    });
    lista.appendChild(li);
  }

  // Implementa a funcionalidade de filtro (busca) enquanto o usuário digita
  input.addEventListener("keyup", () => {
    const termo = input.value.toLowerCase();
    const itens = lista.getElementsByTagName("li");
    lista.style.display = "block";

    // Percorre os itens da lista e esconde os que não coincidem com o que foi digitado
    for (let item of itens) {
      item.style.display = item.textContent.includes(termo) ? "" : "none";
    }
  });

  // Exibe a lista de opções automaticamente quando o campo recebe o foco
  input.addEventListener("focus", () => {
    lista.style.display = "block";
  });

  // Monitora cliques no documento para fechar o dropdown caso o usuário clique fora
  document.addEventListener("click", (e) => {
    const container = input.closest(".ano-selector-container");
    
    // Se o clique não foi dentro do container do seletor, esconde a lista
    if (!container.contains(e.target)) {
      lista.style.display = "none";
    }
  });
}