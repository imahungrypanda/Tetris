// all the tetriminos
const oPiece = {
  color: "#EDE9A3",
  coords: [[0, 4],[0, 5],[1, 4],[1, 5]],
  type: "staticPiece",
  center: [1, 5],
  draw: ctx => {
    ctx.beginPath();
    ctx.lineWidth="2";
    ctx.strokeStyle="black";
    ctx.fillStyle = "#EDE9A3";
    ctx.fillRect(30, 30, 20, 20);
    ctx.fillRect(30, 50, 20, 20);
    ctx.fillRect(50, 30, 20, 20);
    ctx.fillRect(50, 50, 20, 20);
    ctx.rect(30, 30, 20, 20);
    ctx.rect(30, 50, 20, 20);
    ctx.rect(50, 30, 20, 20);
    ctx.rect(50, 50, 20, 20);
    ctx.stroke();
  }
}

const sPiece = {
  color: "#E98B50",
  coords: [[0, 3],[0, 4],[1, 4],[1, 5]],
  type: "togglePiece",
  center: [1, 4],
  draw: ctx => {
    ctx.beginPath();
    ctx.lineWidth="2";
    ctx.strokeStyle="black";
    ctx.fillStyle = "#E98B50";
    ctx.fillRect(40, 50, 20, 20);
    ctx.fillRect(40, 30, 20, 20);
    ctx.fillRect(20, 30, 20, 20);
    ctx.fillRect(60, 50, 20, 20);
    ctx.rect(40, 50, 20, 20);
    ctx.rect(40, 30, 20, 20);
    ctx.rect(20, 30, 20, 20);
    ctx.rect(60, 50, 20, 20);
    ctx.stroke();
  }
}

const zPiece = {
  color: "#55A44E",
  coords: [[0, 4],[0, 5],[1, 3],[1, 4]],
  type: "togglePiece",
  center: [1, 4],
  draw: ctx => {
    ctx.beginPath();
    ctx.lineWidth="2";
    ctx.strokeStyle="black";
    ctx.fillStyle = "#55A44E";
    ctx.fillRect(40, 50, 20, 20);
    ctx.fillRect(40, 30, 20, 20);
    ctx.fillRect(20, 50, 20, 20);
    ctx.fillRect(60, 30, 20, 20);
    ctx.rect(40, 50, 20, 20);
    ctx.rect(40, 30, 20, 20);
    ctx.rect(20, 50, 20, 20);
    ctx.rect(60, 30, 20, 20);
    ctx.stroke();
  }
}

const tPiece = {
  color: "#F3CD97",
  coords: [[0, 4],[1, 3],[1, 4],[1, 5]],
  type: "rotatePiece",
  center: [1, 4],
  draw: ctx => {
    ctx.beginPath();
    ctx.lineWidth="2";
    ctx.strokeStyle="black";
    ctx.fillStyle = "#F3CD97";
    ctx.fillRect(40, 50, 20, 20);
    ctx.fillRect(20, 50, 20, 20);
    ctx.fillRect(60, 50, 20, 20);
    ctx.fillRect(40, 30, 20, 20);
    ctx.rect(40, 50, 20, 20);
    ctx.rect(20, 50, 20, 20);
    ctx.rect(60, 50, 20, 20);
    ctx.rect(40, 30, 20, 20);

    ctx.stroke();
  }
}

const iPiece = {
  color: "#D7C37A",
  coords: [[0, 4],[1, 4],[2, 4],[3, 4]],
  type: "togglePiece",
  center: [2, 4],
  draw: ctx => {
    ctx.beginPath();
    ctx.lineWidth="2";
    ctx.strokeStyle="black";
    ctx.fillStyle = "#D7C37A";
    ctx.fillRect(40, 30, 20, 20);
    ctx.fillRect(40, 10, 20, 20);
    ctx.fillRect(40, 50, 20, 20);
    ctx.fillRect(40, 70, 20, 20);
    ctx.rect(40, 30, 20, 20);
    ctx.rect(40, 10, 20, 20);
    ctx.rect(40, 50, 20, 20);
    ctx.rect(40, 70, 20, 20);
    ctx.stroke();
  }
}

const lPiece = {
  color: "#BC4F4F",
  coords: [[0, 4],[1, 4],[2, 4],[2, 5]],
  type: "rotatePiece",
  center: [2, 4],
  draw: ctx => {
    ctx.beginPath();
    ctx.lineWidth="2";
    ctx.strokeStyle="black";
    ctx.fillStyle = "#BC4F4F";
    ctx.fillRect(30, 20, 20, 20);
    ctx.fillRect(30, 40, 20, 20);
    ctx.fillRect(30, 60, 20, 20);
    ctx.fillRect(50, 60, 20, 20);
    ctx.rect(30, 20, 20, 20);
    ctx.rect(30, 40, 20, 20);
    ctx.rect(30, 60, 20, 20);
    ctx.rect(50, 60, 20, 20);
    ctx.stroke();
  }
}

const jPiece = {
  color: "#1B8057",
  coords: [[0, 5],[1, 5],[2, 5],[2, 4]],
  type: "rotatePiece",
  center: [2, 5],
  draw: ctx => {
    ctx.beginPath();
    ctx.lineWidth="2";
    ctx.strokeStyle="black";
    ctx.fillStyle = "#1B8057";
    ctx.fillRect(50, 20, 20, 20);
    ctx.fillRect(50, 40, 20, 20);
    ctx.fillRect(50, 60, 20, 20);
    ctx.fillRect(30, 60, 20, 20);
    ctx.rect(50, 20, 20, 20);
    ctx.rect(50, 40, 20, 20);
    ctx.rect(50, 60, 20, 20);
    ctx.rect(30, 60, 20, 20);
    ctx.stroke();
  }
}


class Piece {
  constructor(options){
    this.center = options.center;
    this.coords = options.coords;
    this.color  = options.color;
    this.draw   = options.draw;
  }

  previewTetrimino(ctx) {
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

  spin(board, clockwise){
  let rotatedCoords = this.rotatedCoords(clockwise);

  if (this.validRotate(board, rotatedCoords)) {
    this.coords = rotatedCoords;
  }

return;
  }

  validRotate(board, coords) {
    for (let i = 0; i < coords.length; i++) {
      if (board.filled(coords[i]) || !board.insideBoard(coords[i])) {
        return false;
      }
    }
    return true;
  }

  rotatedCoords(clockwise) {
    let newCoords = [];
    this.coords.forEach(coord => {
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

  rotate(board) {
    this.spin(board, false);
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
