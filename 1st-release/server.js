import express from 'express';
import http from 'http';
import createGame from './public/game.js';
import socketio from 'socket.io';

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

app.use(express.static('public'));

const jogo = createGame();

jogo.subscribe((commant)=>{
    console.log(`>Emitir ${commant.type}`);
    sockets.emit(commant.type,commant);
});

jogo.addFruit({fruitID: 'fruit1',fruitX:6,fruitY:8})


sockets.on('connection',(socket)=>{
    const playerId = socket.id;
    console.log("Player connected on server with id: " + playerId);

    jogo.addPlayer({playerId: playerId});
    console.log(jogo.state);
    socket.emit('inicializar',jogo.state);

    socket.on('disconnect',()=>{
        jogo.removePlayer({playerId:playerId});
        console.log('Desconectar player '+ playerId);
    })

});




server.listen(3000, () =>{
    console.log('> servidor listening na porta 3000');
});