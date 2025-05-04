from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit, send

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")
users = {}

@app.route('/')
def login():
    return render_template('index.html')

@socketio.on('connect')
def handle_connect():
    print(f"Cliente conectado!")

@socketio.on('disconnect')
def handle_disconnect():
    for nome, sid in list(users.items()):
        if sid == request.sid:
            del users[nome]
            send(f"{nome} se desconectou.", broadcast=True)
            print(f"Usuários conectados: {users}")
            break

@socketio.on('message')
def handle_message (mensagem):
    print(f"Mensagem: {mensagem}")
    send(mensagem, broadcast=True)

@socketio.on('user_connected')
def handle_user_connected(data):
    nome = data['nome']
    cor = data.get('color')
    users[nome] = {'sid': request.sid, 'color': cor}
    send(f"{nome} seja bem-vindo ao chat! Se tiver alguma sugestão, entre em contato com o desenvolvedor!")
    send(f"<span style='color: {cor}; font-weight: bold;'>{nome}</span> entrou na sala", broadcast=True)
    print(f"Usuário conectado: {nome} (Cor: {cor})")
    print(f"Usuários conectados: {users}")

if __name__ == '__main__':
    socketio.run(app, debug=True)