const GameBoard = (() => {
  const gameTiles = document.getElementsByClassName('gameTile'); 
  const gameState = ["", "", "", "", "", "", "", "", ""];
  let roundsPlayed = 0;
  const displayBoard = () => {
    for(let i = 0; i < gameTiles.length; i++){
      gameTiles[i].innerText = GameBoard.gameState[i]; 
    }
  };
  const placeMarker = (marker, index) => {    
    if(GameBoard.gameState[index] != ''){
      console.log("Spot is take, cannot place here");
      return;
    }
    GameBoard.gameState[index] = marker;
    roundsPlayed++;
    checkGameOver(marker, roundsPlayed);
    toggleMarker();
    GameBoard.displayBoard()
  };
  
  return {
    gameState,
    displayBoard,
    placeMarker,
    gameTiles
  }
})();

let currentSymbol = "🤩"

let player1 = "🤩"
let player2 = "👿"

function toggleMarker () {
  if (currentSymbol == "🤩"){
    currentSymbol = "👿";
    return
  }
  currentSymbol = "🤩"
}

function checkGameOver (symbol, roundsPlayed) {
  let tiles = GameBoard.gameState
  let marker = symbol

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
      console.log(`${marker} Wins via row!`)
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
      console.log(`${marker} Wins via column`)
    }
  }

  //check diagnol - brute force is probabaly easiest here
  if(tiles[0] == marker && tiles[4] == marker && tiles[8] == marker){
    console.log(`${marker} Wins via diagnol`)
  }

  if(tiles[2] == marker && tiles[4] == marker && tiles[6] == marker){
    console.log(`${marker} Wins via diagnol`)
  }

}

document.querySelectorAll('.gameTile').forEach(tile => {
  tile.addEventListener('click', () => {
    GameBoard.placeMarker(currentSymbol, tile.dataset.index)
  })
})

// TODO
// - Add abaility for players to pick their names
// - Create player Factory
// - Add UI elements to show which player's turn it is
// - allow players to assign their own marker. Emoji or otherwise

