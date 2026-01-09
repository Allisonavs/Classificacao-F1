# 🏁 Classificação F1 (F1 Standings Dashboard)

![F1 Dashboard Preview](img/preview.png)

Dashboard interativo e responsivo para consulta da classificação de pilotos da Fórmula 1, abrangendo dados históricos desde 1950 até à temporada atual (2025).

## 🚀 Demonstração
O projeto está disponível online através do GitHub Pages:

<a href="https://allisonavs.github.io/Classificacao-F1/" target="_blank"><strong>Site Aqui</strong></a>

## ✨ Funcionalidades
- **Busca Histórica:** Consulta de classificações de qualquer temporada entre 1950 e 2025.
- **Seletor Inteligente:** Dropdown de anos com filtro de pesquisa em tempo real para facilitar a navegação.
- **Legenda Dinâmica:** Identificação automática de casos especiais (Desqualificações, Exclusões, Abandonos) com explicações técnicas.
- **Identidade Visual:** Linhas da tabela destacadas com as cores oficiais de cada escuderia (Ferrari, McLaren, Red Bull, etc.).
- **Design Imersivo:** Fundo personalizado com efeito de profundidade e interface otimizada para leitura.

## 🛠️ Tecnologias Utilizadas
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)
![ES6+](https://img.shields.io/badge/ES6%2B-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)

- **HTML5**: Estrutura semântica da aplicação.
- **CSS3**: Estilização avançada, incluindo Flexbox, posicionamento `sticky` e filtros de transparência (RGBA).
- **JavaScript**: 
  - Consumo da **API Ergast/Jolpi** via `fetch`.
  - Manipulação dinâmica do DOM.
  - Tratamento de dados assíncronos e lógica de filtragem com `Set` e `isNaN`.
  - ES6 Modules: Organização do código em arquivos independentes (import/export), promovendo a separação de responsabilidades (Clean Code).

## 🧠 Desafios Técnicos e Soluções

Durante o desenvolvimento deste dashboard, enfrentei desafios comuns no consumo de APIs reais que exigiram soluções lógicas estruturadas:

### 1. Tratamento de Dados Inconsistentes (Casos Especiais)
**Desafio:** A API Ergast retorna a posição dos pilotos como números, mas em casos de desclassificação (ex: Schumacher em 1997) ou abandono, o valor retornado é uma string (ex: "D" ou "R"). Isso causava erros de exibição como "undefinedº".
**Solução:** Implementei uma lógica utilizando a função `isNaN()` para verificar se o dado de posição é numérico. Caso não seja, o sistema identifica o "caso especial", aplica uma formatação visual distinta (itálico e fundo cinza) e prepara a sigla para a legenda dinâmica.

### 2. Mapeamento de Identidade Visual Dinâmica
**Desafio:** Associar visualmente cada piloto à sua escuderia sem sobrecarregar a interface com logos pesadas, mantendo a performance do site.
**Solução:** Criei um dicionário de dados (`Objeto Literal`) que mapeia os nomes das construtoras para seus códigos hexadecimais oficiais. Durante o loop de renderização, o JavaScript aplica dinamicamente uma borda lateral colorida em cada linha da tabela, facilitando a identificação imediata por parte do usuário.

### 3. Otimização da Legenda Dinâmica com `Set`
**Desafio:** Exibir uma legenda explicativa apenas para as siglas que aparecem na busca atual, evitando duplicidade e poluição visual (ex: não exibir "R" se nenhum piloto abandonou naquela temporada).
**Solução:** Utilizei a estrutura de dados `Set` do JavaScript para coletar siglas únicas durante o processamento da lista de pilotos. Por ser uma estrutura que não permite valores duplicados, ela garante que a legenda seja montada de forma limpa e eficiente, aparecendo apenas quando necessária.

### 4. Arquitetura Modular e Manutenibilidade
**Desafio**: À medida que o projeto crescia, o arquivo de script principal tornava-se denso e difícil de dar manutenção, misturando lógica de interface, chamadas de API e configurações de dados. 
**Solução**: Refatorei o código utilizando ES6 Modules, dividindo a aplicação em camadas de responsabilidade:

- api.js: Exclusivo para comunicação com o servidor e tratamento de dados brutos.

- ui.js: Responsável apenas pela manipulação do DOM e feedback visual (loading/tabela).

- yearSelector.js: Componente lógico para o seletor de anos.

- constants.js: Armazenamento de dados estáticos e mapeamentos. Essa abordagem permitiu um código muito mais limpo, fácil de testar e escalável, seguindo o princípio de Responsabilidade Única (SRP).

## 📦 Como correr o projeto localmente

Este projeto utiliza **ES6 Modules**, o que exige que ele seja executado em um ambiente de servidor local para que as importações entre os arquivos funcionem corretamente.

1. Clone este repositório:
   ```bash
   git clone https://github.com/Allisonavs/Classificacao-F1.git

2. Acesse a pasta
    ```bash
    cd Classificacao-F1

3. Executar um servidor local

  Escolha a opção que preferir:

  VS Code (Recomendado): Instale a extensão Live Server, abra a pasta do projeto e clique em "Go Live" na barra inferior.

  Python: Se tiver Python instalado, execute python -m http.server 8000.

  Node.js: Utilize o comando npx serve ..

  - Nota: Abrir o arquivo index.html diretamente pelo explorador de arquivos (protocolo file://) causará erros de segurança (CORS) e o projeto não funcionará.

## Sobre o Autor
Formado em Análise e Desenvolvimento de Sistemas. Atualmente, uno a minha experiência em Design e Social Media com o desenvolvimento de software para criar interfaces que são simultaneamente funcionais e visualmente impactantes.

Desenvolvido com 🏎️ e ☕ por <a href="https://www.linkedin.com/in/allisonavs/" target="_blank"><strong>Allisonavs</strong></a>
