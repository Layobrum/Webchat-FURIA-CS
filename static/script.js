const loginBtn = document.getElementById('login-btn');
const loginUsernameInput = document.getElementById('login-input');
const usernameError = document.getElementById('username-error');
const loginPage = document.getElementById('login-page');
const content = document.getElementById('content');
const chatMessages = document.getElementById('chat-messages');
const sendBtn = document.getElementById('send-btn');
const messageInput = document.getElementById('message');
let socket = io.connect();
let coresUsuarios = {};
let usuariosOnline = {};
const lineupContainer = document.getElementById('lineup-container');
const resultsContainer = document.getElementById('resultados-container');
const lineupCheckbox = document.getElementById('lineup');
const resultsCheckbox = document.getElementById('resultados');

function getRandomColor() {
    let letras = '0123456789ABCDEF';
    let cor = '#';
    for (let i = 0; i < 6; i++) {
        cor += letras[Math.floor(Math.random() * 16)];
    }
    return cor;
};

function exibirListaUsuarios(usuarios, listaDiv) {
    listaDiv.innerHTML = ''; // Limpa a lista antes de adicionar novos usuários
    for (let usuario in usuarios) {
        let elementoUsuario = document.createElement('div');
        elementoUsuario.textContent = usuario;
        elementoUsuario.addEventListener('click', function() {
            inserirNomeUsuario(usuario);
            listaDiv.style.display = 'none'; // Oculta a lista após selecionar um usuário
        });
        listaDiv.appendChild(elementoUsuario);
    }
};

function inserirNomeUsuario(nomeUsuario) {
    let textoAtual = messageInput.value;
    let palavras = textoAtual.split(' ');
    palavras.pop(); // Remove a última palavra (que é o @usuario)
    palavras.push('@${nomeUsuario} '); // Adiciona o nome do usuário selecionado
    messageInput.value = palavras.join(' '); // Atualiza o campo de entrada com o novo texto
    messageInput.focus(); // Foca novamente no campo de entrada
};

function atualizarListaUsuarios(usuarios) {
    let listaUsuariosDiv = document.getElementById('lista-usuarios');
    if (listaUsuariosDiv) {
        exibirListaUsuarios(usuarios, listaUsuariosDiv);
    }
};

function showLineup() {
    if (lineupCheckbox.checked) {
        lineupContainer.style.display = 'block';
        console.log("Lineup container is displayed.");
    } else {
        lineupContainer.style.display = 'none';
        console.log("Lineup container is hidden.");
    }
}

function showResultados() {
    if (resultsCheckbox.checked) {
        resultsContainer.style.display = 'block';
        console.log("Resultados container is displayed.");
    } else {
        resultsContainer.style.display = 'none';
        console.log("Resultados container is hidden.");
    }
}


$(document).ready(function() {
    loginBtn.addEventListener('click', () => {
        let username = loginUsernameInput.value.trim();
        if (username) {
            loginPage.style.display = 'none';  // Oculta a página de login
            content.style.display = 'block'; // Exibe o chat
            coresUsuarios[username] = getRandomColor(); // Atribui uma cor aleatória ao usuário
            coresUsuarios[username] = corUsuario;
            socket.emit('user_connected', { nome: username, color: corUsuario });
        } else {
            usernameError.textContent = 'Por favor, insira um nome de usuário.';
        }
    });

    // Adiciona os eventos de mudança para os checkboxes
    lineupCheckbox.addEventListener('change', showLineup);
    resultsCheckbox.addEventListener('change', showResultados);

    showLineup(); // Chamada inicial para exibir/ocultar no carregamento
    showResultados(); // Chamada inicial para exibir/ocultar no carregamento

    socket.on('connect', function() {
        console.log("Conectado ao servidor WebSocket!");
    });

    
    socket.on('message', function(data) {
        console.log("Received message: " + data);
        const mensagemElemento = document.createElement('p');
        console.log("TESTESTESTESTESTESTE");
        if (typeof data === 'string' && data.includes(':')) {
            let nomeUsuario = data.split(': ')[0].trim();
            let corUsuario = coresUsuarios[nomeUsuario]; // Usa a cor do usuário ou gera uma nova
            mensagemElemento.innerHTML = `<span style="color: ${corUsuario}; font-weight: bold;">${nomeUsuario}:</span> ${data.substring(data.indexOf(':') + 1)}`;
            console.log("Cor do usuário: " + corUsuario + " Nome do usuário: " + nomeUsuario + "cores usuarios: " + coresUsuarios[nomeUsuario]);
        } else {
            mensagemElemento.textContent = data;
        }
        chatMessages.appendChild(mensagemElemento);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });
    

    loginUsernameInput.addEventListener('input', () => {
        usernameError.textContent = '';
    });

    sendBtn.addEventListener('click', () => {
        const mensagem = messageInput.value.trim();
        if (mensagem) {
            socket.send($('#login-input').val() + ': ' + mensagem);
            messageInput.value = '';
        }
    });

    messageInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const mensagem = messageInput.value.trim();
            if (mensagem) {
                socket.send($('#login-input').val() + ': ' + mensagem);
                messageInput.value = '';
            }
        }
    });

    messageInput.addEventListener('input', function() {
        let texto = messageInput.value;
        let ultimaPalavra = texto.split(' ').pop();
        let listaUsuariosDiv = document.getElementById('lista-usuarios');

        if (ultimaPalavra.startsWith('@')) {
            listaUsuariosDiv.style.display = 'block';
            exibirListaUsuarios(usuariosOnline, listaUsuariosDiv);
        } else {
            listaUsuariosDiv.style.display = 'none';
        }
    });
    


    socket.on('user_connected', function(data) {
        const nome = data.nome;
        const cor = data.color;
        usuariosOnline[nome] = { color: cor }; // Armazena a cor do usuário
        atualizarListaUsuarios(usuariosOnline);
    });
    
    socket.on('user_disconnected', function(nome) {
        delete usuariosOnline[nome];
        atualizarListaUsuarios(usuariosOnline);
    });

});