// all the tetrminos
const oPiece = {
  color: "yellow",
  coords: [[0, 4],[0, 5],[1, 4],[1, 5]],
  type: "staticPiece",
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
  type: "staticPiece",
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
  type: "staticPiece",
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
  type: "staticPiece",
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
  type: "staticPiece",
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
  type: "staticPiece",
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
  type: "staticPiece",
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
}


export default Piece;

class TogglePiece extends Piece {
  constructor(options) {
    super(options);
  }
}

class RotatePiece extends Piece {
  constructor(options) {
    super(options);
  }
}

class StaticPiece extends Piece {
  constructor(options) {
    super(options);
  }
}




Piece.PIECES = [oPiece, sPiece, zPiece, tPiece, iPiece, lPiece, jPiece];

Piece.randomPiece = () => {
  let random = Math.floor(Math.random() * 7);
  let options = Piece.PIECES[random];

  switch (options.type) {
    case "staticPiece":
      return new StaticPiece(options);
    default:
      console.log(`No type ${options.type}`);
  }
};
