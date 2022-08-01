// Player class with constructor
class Player {
  type;
  movesArray;
  xDimension;
  yDimension;
  zDimension;

  constructor(type) {
    this.type = type;
    this.movesArray = [];
    this.xDimension = [];
    this.yDimension = [];
    this.zDimension = [];
  }

  addMove(moveCoordinates) {
    this.movesArray.push(moveCoordinates);
    this.xDimension.push(moveCoordinates[0]);
    this.yDimension.push(moveCoordinates[1]);
    this.zDimension.push(moveCoordinates[2]);

    return this.checkWinner();
  }

  checkWinner() {
    let isWinner = ((this.checkAscending(this.xDimension) || this.checkEqual(this.xDimension))
    && (this.checkAscending(this.yDimension) || this.checkEqual(this.yDimension))
    && (this.checkAscending(this.zDimension) || this.checkEqual(this.zDimension)));
    return isWinner;
  }

  checkAscending(dimensionArr) {
    return (dimensionArr.includes(0)
    && dimensionArr.includes(1)
    && dimensionArr.includes(2));
  }

  checkEqual(dimensionArr) {
    let count0 = 0;
    let count1 = 1;
    let count2 = 0;

    for (let i of dimensionArr) {
      if (i === 0) {
        count0++;
      }
      if (i === 1) {
        count1++;
      }
      if (i === 2) {
        count2++;
      }
    }
    return count0 === 3 || count1 === 3 || count2 === 3;
  }
}

// global variables
let playerX = new Player('x');
let playerY = new Player('y');
let playerTurn = 1;
let hasWon = false;
let boardDiv = document.querySelector('#gameBoard');

function createIntArray(str) {
  intArr = [];
  for (let char of str) {
    let number = parseInt(char);
    if(number === 0 || number === 1 || number === 2) {
      intArr.push(number);
    }
    if(intArr.length === 3) {
      return intArr;
    }
  }
  return 0;
}

// dynamically create board and event listeners
function createBoard() {
  for(let i = 0; i < 3; i++) {
    let boardLevel = document.createElement('h3');
    boardLevel.innerHTML = `z = ${i}`;
    boardDiv.appendChild(boardLevel);
  }
  for (let z = 0; z < 3; z++) {
    let zDiv = document.createElement('div');
    zDiv.setAttribute('class', 'zDiv');
    boardDiv.appendChild(zDiv);
    for(let y = 0; y < 3; y++) {
      let yDiv = document.createElement('div');
      yDiv.setAttribute('class', 'yDiv');
      zDiv.appendChild(yDiv);
      for(let x = 0; x < 3; x++) {
        let xDiv = document.createElement('div');
        xDiv.setAttribute('class', 'xDiv');
        xDiv.innerHTML = `(${x}, ${y}, ${z})`;
        xDiv.addEventListener('click', handlePlayerMove);
        yDiv.appendChild(xDiv);
      }
    }
  }
}

function handlePlayerMove(event) {
  appendMarker(event.target);
  let displayTurn = document.querySelector('#currentPlayer');
  let move = event.target.innerHTML;
  let coordinateArr = createIntArray(move);
  if (playerTurn === 1) {
    hasWon = playerX.addMove(coordinateArr);
  } else {
    hasWon = playerY.addMove(coordinateArr);
  }
  if(hasWon) {
    boardDiv.innerHTML = '';
    displayTurn.innerHTML = '';
    let winner = document.querySelector('#winnerAlert');
    winner.innerHTML = `Player ${playerTurn} Wins`;
  } else {
    playerTurn === 1 ? playerTurn = 2 : playerTurn = 1;
    displayTurn.innerHTML = `Player ${playerTurn} Your Turn`;
  }
  
  event.target.removeEventListener('click', handlePlayerMove);
}

function appendMarker(gridBox) {
  let marker = document.createElement('p');
  if(playerTurn === 1) {
    marker.innerHTML = 'X';
  } else {
    marker.innerHTML = 'O';
  }
  gridBox.appendChild(marker);
}

createBoard();