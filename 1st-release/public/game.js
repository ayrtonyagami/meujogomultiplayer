export default function createGame(){
    const state = {
        players : {},
        frutas:{},
        screen : {
            width:10,
            height:10
        }
    }

    
    const observers = [];
    function subscribe(observerFunction){
        observers.push(observerFunction);
    }

    function notifyAll(command){

        for(const observerFunction of observers){
            observerFunction(command);
        }
    }

    function addPlayer(command){
        const playerId = command.playerId;
        const playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random()*state.screen.width);
        const playerY = 'playerY' in command ? command.playerY : Math.floor(Math.random()*state.screen.height);
        state.players[playerId] = {
            x:playerX,
            y:playerY
        }

        notifyAll({
            type:'add-player',
            playerId: playerId,
            playerX: playerX,
            playerY: playerY
        });
    }

    function removePlayer(command){
        const id = command.playerId;
        delete state.players[id];
    }

    function addFruit(command){
        const fruitID = command.fruitID;
        const fruitX = command.fruitX;
        const fruitY = command.fruitY;
        
        state.frutas[fruitID] = {
            x : fruitX,
            y : fruitY
        }
    }

    function removeFruit(command){
        const id = command.fruitID

        delete state.frutas[id];
    }

    function setState(newState){
        Object.assign(state,newState);
    }

    function checkForFruitCollision(playerID){
        const player = state.players[playerID]
        for(const fruitID in state.frutas){
            const fruit = state.frutas[fruitID];
            console.log(`Checar jogador ${playerID} com a fruta ${fruitID} `);
            if(player.x == fruit.x && player.y == fruit.y){
                console.log("Houve uma colisão");
                removeFruit({fruitID : fruitID});
            }
        }
    }

    function movePlayer(command){
        
        const movimentosAceites = {
            ArrowUp : function(player){
                if(player.y > 0){
                    player.y -=1;
                    return;
                }
            },
            ArrowDown : function(player){
                if(player.y < state.screen.height-1){
                    player.y +=1;
                    return;
                }
            },
            ArrowRight : function(player){
                if(player.x < state.screen.width -1){
                    player.x +=1;
                    return;
                }
            },
            ArrowLeft : function(player){
                if(player.x > 0){
                    player.x -=1;
                    return;
                }
            }
        }

        const tecla = command.keyPressed;
        const player = state.players[command.player];
        const moveFunction = movimentosAceites[tecla];

        if(player && moveFunction){
            moveFunction(player);
            checkForFruitCollision(command.player);
        }
        
    }

    return{
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        movePlayer,
        state,
        setState,
        subscribe
    };
}