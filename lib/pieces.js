
const oPiece = {
  color: "#0000FF",
  startCoords: [[0, 4],[0, 5],[1, 4],[1, 5]]
}

const sPiece = {
  symbol: "s"
}

const zPiece = {
  symbol: "z"
}

const tPiece = {
  symbol: "t"
}

const lPiece = {
  symbol: "l"
}

class Piece {
  constructor(){
    this.PIECES = [oPiece];
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
    piece.startCoords = piece.startCoords.map(coord => {
      let [x, y] = coord;
      return [x + 1, y];
    });
  }

}




export default Piece;
