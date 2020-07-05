export default function createKeyBoardListener(document){
    const state = {
        observers : [],
        playerId : null
    }

    function registerPlayerId(id){
        state.playerId = id;
    }
    
    function subscribe(observerFunction){
        state.observers.push(observerFunction);
    }

    function notifyAll(command){

        for(const observerFunction of state.observers){
            observerFunction(command);
        }
    }

    document.addEventListener("keydown",handleKeyDown);
    
    function handleKeyDown(event){
        const tecla = event.key;
        const command = {
            type : "move-player",
            player : state.playerId,
            keyPressed: tecla
        }

        notifyAll(command);

    }

    return {
        subscribe,
        registerPlayerId
    }
}
