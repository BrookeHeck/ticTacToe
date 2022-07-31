// global variables

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
    if (isWinner) {
      alert(`Congrats Player ${this.type}! You Win!`);
    }
    return isWinner;
  }

  checkAscending(dimensionArr) {
    return dimensionArr.includes(0) && dimensionArr.includes(1) && dimensionArr(2);
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

function createIntArray(str) {
  intArr = [];
  for (let char in str) {
    let number = Number(char);
    if(number === 0 || number === 1 || number === 2) {
      intArr.push(number);
    }
    if(intArr.length === 3) {
      return intArr;
    }
  }
  return 0;
}

function playGame() {
  let hasWon = false;
  let playerX = new Player('x');
  let playerY = new Player('y');
  let playerTurn = 1;

  while(!hasWon) {
    let move = prompt('Enter a game board coordinate');
    let coordinateArr = createIntArray(move);
    if(!coordinateArr) {
      alert('Not a valid coordinate');
      break;
    } else {
      if (playerTurn === 1) {
        hasWon = playerX.addMove(coordinateArr);
        playerTurn = 2;
      } else {
        hasWon = playerY.addMove(coordinateArr);
        playerTurn = 2;
      }
    }
  }
}