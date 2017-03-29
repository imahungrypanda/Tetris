
const oPiece = {
  color: "yellow",
  coords: [[0, 4],[0, 5],[1, 4],[1, 5]]
}

const sPiece = {
  color: "magenta",
  coords: [[0, 3],[0, 4],[1, 4],[1, 5]]
}

const zPiece = {
  color: "green",
  coords: [[0, 4],[0, 5],[1, 3],[1, 4]]
}

const tPiece = {
  color: "#0000FF",
  coords: [[0, 4],[1, 3],[1, 4],[1, 5]]
}

const iPiece = {
  color: "red",
  coords: [[0, 4],[1, 4],[2, 4],[3, 4]]
}

const lPiece = {
  color: "orange",
  coords: [[0, 4],[1, 4],[2, 4],[2, 5]]
}

const jPiece = {
  color: "blue",
  coords: [[0, 5],[1, 5],[2, 5],[2, 4]]
}

class Piece {
  constructor(){
    this.PIECES = [oPiece, sPiece, zPiece, tPiece, iPiece, lPiece, jPiece];
  }

  previewTetromino() {
    const canvasEl = document.getElementById('next-tetrimino-render');
    canvasEl.width = 75;
    canvasEl.height = 75;
    const ctx = canvasEl.getContext("2d");
  }

  rotate(){}

  toggle(){}

  drop(piece) {
    piece.coords = piece.coords.map(coord => {
      let [x, y] = coord;
      return [x + 1, y];
    });
  }



}




export default Piece;
