// all the tetrminos
const oPiece = {
  color: "yellow",
  coords: [[0, 4],[0, 5],[1, 4],[1, 5]],
  type: "staticPiece",
  center: [1, 5],
  draw: ctx => {
    ctx.fillStyle = "yellow";
    ctx.fillRect(30, 30, 20, 20);
    ctx.fillRect(30, 50, 20, 20);
    ctx.fillRect(50, 30, 20, 20);
    ctx.fillRect(50, 50, 20, 20);
  }
}

const sPiece = {
  color: "magenta",
  coords: [[0, 3],[0, 4],[1, 4],[1, 5]],
  type: "togglePiece",
  center: [1, 4],
  draw: ctx => {
    ctx.fillStyle = "magenta";
    ctx.fillRect(40, 50, 20, 20);
    ctx.fillRect(40, 30, 20, 20);
    ctx.fillRect(20, 30, 20, 20);
    ctx.fillRect(60, 50, 20, 20);
  }
}

const zPiece = {
  color: "green",
  coords: [[0, 4],[0, 5],[1, 3],[1, 4]],
  type: "togglePiece",
  center: [1, 4],
  draw: ctx => {
    ctx.fillStyle = "green";
    ctx.fillRect(40, 50, 20, 20);
    ctx.fillRect(40, 30, 20, 20);
    ctx.fillRect(20, 50, 20, 20);
    ctx.fillRect(60, 30, 20, 20);
  }
}

const tPiece = {
  color: "black",
  coords: [[0, 4],[1, 3],[1, 4],[1, 5]],
  type: "rotatePiece",
  center: [1, 5],
  draw: ctx => {
    ctx.fillStyle = "black";
    ctx.fillRect(40, 50, 20, 20);
    ctx.fillRect(20, 50, 20, 20);
    ctx.fillRect(60, 50, 20, 20);
    ctx.fillRect(40, 30, 20, 20);
  }
}

const iPiece = {
  color: "red",
  coords: [[0, 4],[1, 4],[2, 4],[3, 4]],
  type: "togglePiece",
  center: [2, 4],
  draw: ctx => {
    ctx.fillStyle = "red";
    ctx.fillRect(40, 30, 20, 20);
    ctx.fillRect(40, 10, 20, 20);
    ctx.fillRect(40, 50, 20, 20);
    ctx.fillRect(40, 70, 20, 20);
  }
}

const lPiece = {
  color: "orange",
  coords: [[0, 4],[1, 4],[2, 4],[2, 5]],
  type: "rotatePiece",
  center: [2, 4],
  draw: ctx => {
    ctx.fillStyle = "orange";
    ctx.fillRect(30, 20, 20, 20);
    ctx.fillRect(30, 40, 20, 20);
    ctx.fillRect(30, 60, 20, 20);
    ctx.fillRect(50, 60, 20, 20);
  }
}

const jPiece = {
  color: "blue",
  coords: [[0, 5],[1, 5],[2, 5],[2, 4]],
  type: "rotatePiece",
  center: [2, 5],
  draw: ctx => {
    ctx.fillStyle = "blue";
    ctx.fillRect(50, 20, 20, 20);
    ctx.fillRect(50, 40, 20, 20);
    ctx.fillRect(50, 60, 20, 20);
    ctx.fillRect(30, 60, 20, 20);
  }
}


class Piece {
  constructor(options){
    this.center = options.center;
    this.coords = options.coords;
    this.color  = options.color;
    this.draw   = options.draw;
  }

  previewTetromino(ctx) {
    ctx.clearRect(0, 0, 100, 100);
    this.draw(ctx);
  }

  drop() {
    this.coords = this.coords.map(coord => {
      let [x, y] = coord;
      return [x + 1, y];
    });
    this.center = [this.center[0] + 1, this.center[1]];
  }

  coordsIncluded(coord) {
    for (let i = 0; i < this.coords.length; i++) {
      let [oldx, oldy] = this.coords[i];
      if (oldx === coord[0] && oldy === coord[1]) {
        return true;
      }
    }
    return false;
  }

  moveLeft() {
    this.coords = this.coords.map(coord => {
      let [x, y] = coord;
      return [x, y - 1];
    });
    this.center = [this.center[0], this.center[1] - 1];
  }

  moveRight() {
    this.coords = this.coords.map(coord => {
      let [x, y] = coord;
      return [x, y + 1];
    });
    this.center = [this.center[0], this.center[1] + 1];
  }

  // dictates the spin? maybe just keep it in the toggle/rotate classes
  spin(board, clockwise){
  let rotatedCoords = this.rotatedCoords(clockwise);

  // if they are valid
  if (this.validRotate(board, rotatedCoords)) {
    // console.log("Should rotate");
    this.coords = rotatedCoords;
  }
  //   rotate
  // else
  //   do nothing

  // debugger
return;
  }

  // checks if new rotatedCoords are valid
  validRotate(board, coords) {
    // for each coord check if the board is empty
    for (let i = 0; i < coords.length; i++) {
      // debugger
      if (board.filled(coords[i]) && board.insideBoard(coords[i]) && !this.coordsIncluded(coords[i])) {
        return false;
      }
    }
    return true;
  }

  // return a new set of coords that have been rotated
  rotatedCoords(clockwise) {
    let newCoords = [];
    this.coords.forEach(coord => {
      // let [x, y] = coord;
      newCoords.push(this.rotateCoord(coord, clockwise))
    })
    return newCoords;
  }

  rotateCoord(coord, clockwise) {
    let [centerX, centerY] = this.center;

    let posFromCenter = [coord[0] - centerX, coord[1] - centerY];
    let [row, col] = posFromCenter;

    if (clockwise) {
      return [col + centerX, (row * -1) + centerY];
    } else {
      return [(col * -1) + centerX, row + centerY];
    }
  }
}


export default Piece;

class TogglePiece extends Piece {
  constructor(options) {
    super(options);
    this.toggled = false;
    this.type = options.type;
  }

  rotate(board) {
    if (this.toggled) {
      // rotate counter clockwise
      this.spin(board, false);
      this.toggled = false;
    } else {
      // rotate clockwise
      this.spin(board, true);
      this.toggled = true;
    }
    return;
  }
}

class RotatePiece extends Piece {
  constructor(options) {
    super(options);
    this.type = options.type;
  }

  // rotate a piece counter clockwise
  rotate() {
    return;
  }
}

class StaticPiece extends Piece {
  constructor(options) {
    super(options);
    this.type = options.type;
  }

  rotate() {
    // do nothing because it doesn't move
    return;
  }
}




Piece.PIECES = [oPiece, sPiece, zPiece, tPiece, iPiece, lPiece, jPiece];

Piece.randomPiece = () => {
  let random = Math.floor(Math.random() * 7);
  let options = Piece.PIECES[random];

  switch (options.type) {
    case "staticPiece":
      return new StaticPiece(options);

    case "rotatePiece":
      return new RotatePiece(options);

    case "togglePiece":
      return new TogglePiece(options);

    default:
      console.log(`No type ${options.type}`);
  }
};
