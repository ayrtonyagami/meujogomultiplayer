export default function createKeyBoardListener(document){
    const state = {
        observers : []
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
            player : 'player1',
            keyPressed: tecla
        }

        notifyAll(command);

    }

    return {
        subscribe
    }
}
