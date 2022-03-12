// Gameboard state and helper methods
const GameBoard = (() => {
  const gameTiles = document.getElementsByClassName("gameTile");
  const gameState = ["", "", "", "", "", "", "", "", ""];
  let roundsPlayed = 0;

  const bindClick = (event) => {
    GameBoard.placeMarker(activePlayer, event.target.dataset.index);
  };

  const render = () => {
    for (let i = 0; i < gameTiles.length; i++) {
      gameTiles[i].innerText = GameBoard.gameState[i];
    }
  };

  const placeMarker = (activePlayer, index) => {
    if (GameBoard.gameState[index] != "") {
      console.log("Spot is take, cannot place here");
      return;
    }
    GameBoard.gameState[index] = activePlayer.marker();
    roundsPlayed++;
    checkGameOver(activePlayer, roundsPlayed);
    toggleMarker();
    GameBoard.render();
  };

  const resetGame = () => {
    for (let i = 0; i < gameTiles.length; i++) {
      gameState[i] = "";
    }

    if (document.querySelector(".winner")) {
      document.querySelector(".winner").classList.remove("winner");
      document.querySelector(".loser").classList.remove("loser");
    }
    winnerDeclare.innerText = "Tick-Tack-Toe";
    roundsPlayed = 0;
    bindEvents();
    render();
  };

  const bindEvents = () => {
    document.querySelectorAll(".gameTile").forEach((tile) => {
      tile.addEventListener("click", bindClick);
    });
  };

  const unBindEvents = () => {
    document.querySelectorAll(".gameTile").forEach((tile) => {
      tile.removeEventListener("click", bindClick);
    });
  };

  return {
    gameState,
    render,
    placeMarker,
    gameTiles,
    resetGame,
    bindEvents,
    unBindEvents,
  };
})();

const MakePlayer = (name, symbol) => {
  const playerName = name;
  let playerMarker = symbol;

  const changePiece = (element) => {
    const playerOptions = document.querySelectorAll(
      `.tokenOption[data-selected="true"][data-player="${element.dataset.player}"]`
    );
    playerOptions.forEach((e) => {
      e.dataset.selected = "false";
    });
    element.dataset.selected = "true";
    playerMarker = element.innerText;
  };

  const getMarker = () => playerMarker;

  return {
    name: playerName,
    marker: getMarker,
    changePiece,
  };
};

function toggleMarker() {
  document.querySelector(".selected").classList.remove("selected");
  if (activePlayer == player1) {
    document.querySelector("#player2").classList.add("selected");
    activePlayer = player2;
    return;
  }
  activePlayer = player1;
  document.querySelector("#player1").classList.add("selected");
}

//function is too big to put in object and keep the object clean
function checkGameOver(player, roundsPlayed) {
  let tiles = GameBoard.gameState;
  let marker = player.marker();

  let playerWinner;
  let playerLoser;

  if (player == player1) {
    playerWinner = document.querySelector("#player1");
    playerLoser = document.querySelector("#player2");
  } else {
    playerWinner = document.querySelector("#player2");
    playerLoser = document.querySelector("#player1");
  }

  //check every row
  for (let i = 0; i < tiles.length; i += 3) {
    let rowSum = 0;
    for (let j = 0; j < 3; j++) {
      if (tiles[i + j] == marker) {
        rowSum++;
      }
    }
    if (rowSum >= 3) {
      winnerDeclare.innerText = `${player.name} Wins via row!`;
      playerWinner.classList.add("winner");
      playerLoser.classList.add("loser");
      GameBoard.unBindEvents();
      return;
    }
  }

  //check every column
  for (let i = 0; i < 3; i++) {
    let colSum = 0;

    for (let j = 0; j < tiles.length; j += 3) {
      if (tiles[i + j] == marker) {
        colSum++;
      }
    }
    if (colSum >= 3) {
      winnerDeclare.innerText = `${player.name} Wins via column`;
      playerWinner.classList.add("winner");
      playerLoser.classList.add("loser");
      GameBoard.unBindEvents();
      return;
    }
  }

  //check diagnol - brute force is probabaly easiest here
  if (tiles[0] == marker && tiles[4] == marker && tiles[8] == marker) {
    winnerDeclare.innerText = `${player.name} Wins via diagnol`;
    playerWinner.classList.add("winner");
    playerLoser.classList.add("loser");
    GameBoard.unBindEvents();
    return;
  }

  if (tiles[2] == marker && tiles[4] == marker && tiles[6] == marker) {
    winnerDeclare.innerText = `${player.name} Wins via diagnol`;
    playerWinner.classList.add("winner");
    playerLoser.classList.add("loser");
    GameBoard.unBindEvents();
    return;
  }

  if (roundsPlayed == 9) {
    console.log("All Spots Filled. Tie Game!");
    return;
  }
}

function createInput(obj) {
  const inputBox = document.createElement("input");
  inputBox.id = `Input${obj.dataset.player}`;

  inputBox.addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
      editName(obj, inputBox);
    }
  });

  inputBox.addEventListener("focusout", () => {
    editName(obj, inputBox);
  });

  obj.innerHTML = "";
  obj.appendChild(inputBox);
}

function editName(obj, inputBox) {
  const newName = inputBox.value;
  inputBox.remove();
  obj.innerText = newName;

  if (obj.dataset.player == 1) {
    player1.name = newName;
    return;
  }

  player2.name = newName;
}

const player1 = MakePlayer("Player 1", "✖️");
const player2 = MakePlayer("Player 2", "⭕");

// global referrences
let activePlayer = player1;
const winnerDeclare = document.querySelector("#title");

// Initalize game Board
GameBoard.bindEvents();

// --- Global Event Listeners ----
document.getElementById("resetBtn").addEventListener("click", () => {
  GameBoard.resetGame();
});

document.querySelectorAll(".playerName").forEach((element) => {
  element.addEventListener("click", (element) => {
    createInput(element.target);
  });
});

document
  .querySelectorAll('.tokenOption[data-player="2"]')
  .forEach((element) => {
    element.addEventListener("click", function (element) {
      player2.changePiece(element.target);
    });
  });

document
  .querySelectorAll('.tokenOption[data-player="1"]')
  .forEach((element) => {
    element.addEventListener("click", function (element) {
      player1.changePiece(element.target);
    });
  });

// TODO
// - Add abaility for players to pick their names
// - Create player Factory
// - Add UI elements to show which player's turn it is
// - allow players to assign their own marker. Emoji or otherwise
