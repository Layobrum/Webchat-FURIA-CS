[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Web Chat da Torcida FURIA CS

Este é um aplicativo de chat web desenvolvido com Flask (Python) e SocketIO para a torcida do time da FURIA de Counter-Strike 2. Ele permite que os usuários se conectem em tempo real para discutir partidas, compartilhar notícias e interagir com outros fãs.

## Funcionalidades

* **Autenticação Simples:** Os usuários podem inserir um nome de usuário para entrar no chat.
* **Chat em Tempo Real:** As mensagens são enviadas e recebidas instantaneamente através do SocketIO.
* **Cores de Usuário:** Cada usuário recebe uma cor única para facilitar a identificação das mensagens.
* **Notificações de Conexão/Desconexão:** Os usuários são notificados quando outros entram ou saem do chat.
* **Interface Amigável:** Design inspirado na identidade visual da FURIA, com layout responsivo.
* **Lineup e Resultados:** Botões que exibem a lineup do time e os resultados das partidas recentes (opcionalmente visível).

## Tecnologias Utilizadas

* **Flask:** Framework web em Python para o backend.
* **Flask-SocketIO:** Biblioteca para integrar SocketIO com Flask, permitindo comunicação em tempo real.
* **JavaScript:** Para interatividade no frontend.
* **HTML/CSS:** Para a estrutura e estilo da página.
* **jQuery:** Para manipulação do DOM e eventos (pode ser opcional dependendo da extensão de uso).

## Pré-requisitos

Antes de começar, você precisará ter o Python instalado (versão 3.6 ou superior é recomendada). Você também precisará do `pip`, o gerenciador de pacotes do Python.

## Instalação

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/Layobrum/Webchat-FURIA-CS.git
    ```

2.  **Instale as dependências:**

    ```bash
    pip install flask flask-socketio
    ```

## Configuração

* **Variáveis de Ambiente:**
    * Opcional: Se você precisar de variáveis de ambiente (como chaves de API), configure-as no seu sistema.  O código fornecido não utiliza variáveis de ambiente, mas é uma boa prática para projetos maiores.

## Execução

1.  **Execute o aplicativo Flask:**

    ```bash
    python app.py
    ```

2.  **Acesse o chat no seu navegador:**

    Abra o navegador e vá para `http://127.0.0.1:5000/`.

## Estrutura do Projeto

├── app.py           # Arquivo principal do Flask
├── static/
│   ├── style.css    # Estilos CSS
│   ├── script.js    # Lógica do frontend
│   ├── furia-logo.png
│   ├── furia-banner2.png
│   ├── cade-o-fallen.png
│   ├── ...          # Outras imagens
└── templates/
│   └── index.html   # Página HTML principal
├── requirements.txt # Lista de dependências Python
└── README.md        # Este arquivo

##  Documentação do Código

### `app.py` (Backend - Flask)

* **Flask e SocketIO:** Inicializa o aplicativo Flask e o SocketIO.
* **Rotas:**
    * `/`:  Rota principal que renderiza a página de login (`index.html`).
* **Eventos SocketIO:**
    * `connect`:  Trata a conexão de um novo cliente.
    * `disconnect`: Trata a desconexão de um cliente e remove o usuário da lista.
    * `message`:  Trata o envio de mensagens no chat, retransmitindo para todos os conectados.
    * `user_connected`:  Trata a conexão inicial de um usuário, armazenando seu nome, ID de sessão e cor.
* **Gerenciamento de Usuários:** Um dicionário (`users`) é usado para armazenar informações dos usuários conectados (nome, SID, cor).

### `index.html` (Frontend - HTML)

* **Estrutura da Página:** Define a estrutura do chat, incluindo cabeçalho, áreas de login, chat, lineup e resultados.
* **Elementos:**
    * `login-page`, `content`:  Containers para a página de login e o conteúdo do chat (ocultados/exibidos via JS).
    * `chat-container`, `chat-messages`:  Containers para a área de mensagens do chat.
    * `message`, `send-btn`:  Input de texto e botão para enviar mensagens.
    * `lineup-container`, `resultados-container`:  Containers para exibir lineup e resultados (controlados por checkboxes).
* **Inclusão de Arquivos:** Inclui os arquivos CSS (`style.css`) e JavaScript (`script.js`), além das bibliotecas jQuery e SocketIO.

### `style.css` (Frontend - CSS)

* **Estilos Gerais:** Define estilos para o corpo da página, cabeçalho, rodapé, etc.
* **Estilos do Chat:** Estiliza o container do chat, mensagens, input de texto, botão de enviar, etc.
* **Estilos do Login:** Estiliza a página de login.
* **Estilos do Lineup e Resultados:** Estiliza a exibição do lineup e resultados das partidas.
* **Responsividade:** O código inclui algumas considerações de responsividade, mas pode ser aprimorado para diferentes tamanhos de tela.

### `script.js` (Frontend - JavaScript)

* **Manipulação do DOM:** Seleciona elementos HTML para interagir com eles.
* **SocketIO:** Estabelece a conexão com o servidor SocketIO.
* **Lógica do Login:** Trata o envio do nome de usuário e a exibição/ocultação das seções de login e chat.
* **Envio de Mensagens:** Envia mensagens para o servidor SocketIO quando o botão é clicado ou a tecla Enter é pressionada.
* **Recebimento de Mensagens:** Recebe mensagens do servidor e as exibe na área do chat, formatando a cor do nome do usuário.
* **Exibição de Lineup/Resultados:** Controla a exibição das seções de lineup e resultados com checkboxes.
* **Cores de Usuário:** Gera cores aleatórias para cada usuário.

## Melhorias Futuras

* **Autenticação Avançada:** Implementar um sistema de autenticação mais robusto (ex: OAuth, JWT).
* **Persistência de Mensagens:** Salvar as mensagens em um banco de dados para que não se percam ao recarregar a página.
* **Mensagens com Menções:** Adicionar a funcionalidade de enviar mensagens mencionando outros usuários.
* **Responsividade Completa:** Melhorar a responsividade para diferentes dispositivos e tamanhos de tela.
* **Acessibilidade (a11y):** Garantir que o chat seja acessível para usuários com deficiências.

## Contribuição

Contribuições são bem-vindas! Se você tiver alguma sugestão de melhoria ou encontrar algum bug, por favor, abra uma issue ou envie um pull request.

## Autor

Layo Brum - [Linkedin](https://www.linkedin.com/in/layo-brum/)

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
