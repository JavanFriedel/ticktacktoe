// Gameboard state and helper methods
const GameBoard = (() => {
  const gameTiles = document.getElementsByClassName('gameTile'); 
  const gameState = ["", "", "", "", "", "", "", "", ""];
  let roundsPlayed = 0;

  const bindClick () {
    
  }

  const render = () => {
    for(let i = 0; i < gameTiles.length; i++){
      gameTiles[i].innerText = GameBoard.gameState[i]; 
    }
  };

  const placeMarker = (activePlayer, index) => {    
    if(GameBoard.gameState[index] != ''){
      console.log("Spot is take, cannot place here");
      return;
    }
    GameBoard.gameState[index] = activePlayer.marker;
    roundsPlayed++;
    checkGameOver(activePlayer, roundsPlayed);
    toggleMarker();
    GameBoard.render()
  };

  const resetGame = () => {
    for (let i = 0; i < gameTiles.length; i++){
      gameState[i] = ""
    }
   winnerDeclare.innerText = ""
    roundsPlayed = 0;
    render();
  }

  const bindEvents = () => {
    document.querySelectorAll('.gameTile').forEach(tile => {
      tile.addEventListener('click', function bindClick () {
        GameBoard.placeMarker(activePlayer, tile.dataset.index)
      })
    })
  }

  const unBindEvents = () => {
    document.querySelectorAll('.gameTile').forEach(tile => {
      tile.removeEventListener('click', bindClick());
    })
  }
  
  return {
    gameState,
    render,
    placeMarker,
    gameTiles,
    resetGame,
    bindEvents,
    unBindEvents
  }
})();

function bindClick (event) {
  GameBoard.placeMarker(activePlayer, tile.dataset.index)
}

const makePlayer = (name, symbol) => {
  const playerName = name;
  const playerMarker = symbol;

  return {
    name: playerName,
    marker: playerMarker
  }
}

function toggleMarker () {
  if (activePlayer == player1){
    activePlayer = player2;
    return
  }
  activePlayer = player1;
}

//function is too big to put in object and keep the object clean
function checkGameOver (player, roundsPlayed) {
  let tiles = GameBoard.gameState
  let marker = player.marker

  if(roundsPlayed == 9){
    console.log("All Spots Filled. Tie Game!")
    return
  }

  //check every row
  for(let i = 0; i < tiles.length; i+=3){
    let rowSum = 0;
    for(let j = 0; j < 3; j++){
      if(tiles[i + j] == marker){
        rowSum++;
      }
    }
    if(rowSum >= 3){
     winnerDeclare.innerText = `${player.name} Wins via row!`
     GameBoard.unBindEvents();
    }
  }

  //check every column
  for(let i = 0; i < 3; i++){
    let colSum = 0;
  
    for(let j = 0; j < tiles.length; j+=3){
      if(tiles[i + j] == marker){
        colSum++;
      }
    }
    if(colSum >= 3){
     winnerDeclare.innerText = `${player.name} Wins via column`
     GameBoard.unBindEvents();
    }
  }

  //check diagnol - brute force is probabaly easiest here
  if(tiles[0] == marker && tiles[4] == marker && tiles[8] == marker){
    winnerDeclare.innerText = `${player.name} Wins via diagnol`
    GameBoard.unBindEvents();
  }

  if(tiles[2] == marker && tiles[4] == marker && tiles[6] == marker){
    winnerDeclare.innerText = `${player.name} Wins via diagnol`
    GameBoard.unBindEvents();
  }

}

function createInput (obj) {
  const inputBox = document.createElement('input')
  console.log(obj)
  inputBox.id = `Input${obj.dataset.player}`

  inputBox.addEventListener('keyup', (event) => {
    if(event.key == "Enter"){
      editName(obj, inputBox)
    }
  })


  obj.innerText = '';
  obj.appendChild(inputBox)
}

function editName (obj, inputBox) {
  const newName = inputBox.value;
  inputBox.remove();
  obj.innerText = newName;

  if(obj.dataset.player == 1){
    player1.name = newName;
    return
  }

  player1.name = newName;
}

const player1 = makePlayer('Player One', '🤩')
const player2 = makePlayer('Player Two', '👿')

let activePlayer = player1;

const winnerDeclare = document.querySelector('.winnerDeclare')


GameBoard.bindEvents();

document.getElementById('resetBtn').addEventListener('click', () => {
  GameBoard.resetGame();
})

document.querySelectorAll('.playerName').forEach(element => {
  element.addEventListener('click', (element) => {
    createInput(element.target);
  })
})


// TODO
// - Add abaility for players to pick their names
// - Create player Factory
// - Add UI elements to show which player's turn it is
// - allow players to assign their own marker. Emoji or otherwise

