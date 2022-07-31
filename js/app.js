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

    return this.checkWinner(this.xDimension, this.yDimension, this.zDimension);
  }

  checkWinner() {
    
  }
}