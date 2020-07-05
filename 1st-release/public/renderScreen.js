export default function renderScreen(screen, jogo, requestAnimationFrame){
    const context = screen.getContext("2d");

    context.clearRect(0,0,10,10);
    for(const playerId in jogo.state.players){
        const player = jogo.state.players[playerId]
        context.fillStyle = "black"
        context.fillRect(player.x,player.y,1,1)
    }

    for(const frutaId in jogo.state.frutas){
        const fruta = jogo.state.frutas[frutaId]
        context.fillStyle = "green"
        context.fillRect(fruta.x,fruta.y,1,1)
    }

    requestAnimationFrame(() =>{
        renderScreen(screen,jogo,requestAnimationFrame);
    });
}