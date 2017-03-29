import Board from './board';
import Piece from './pieces';


class Game {
  constructor(ctxMain, ctxPreview) {
    this.board = new Board;
    this.ctxMain = ctxMain;
    this.ctxPreview = ctxPreview;
    this.spawnPiece();
    this.insert();
  }

  move(){
    this.drop();
    this.insert();
  }

  draw(){
      this.ctxMain.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
      this.board.draw(this.ctxMain);
      this.nextTetrmino.previewTetromino(this.ctxPreview);
  }

  spawnPiece(){
    if (!this.nextTetrmino) {
      this.currentTetrmino = Piece.randomPiece();
    } else {
      this.currentTetrmino = this.nextTetrmino;
    }
    this.nextTetrmino = Piece.randomPiece();
  }

  insert() {
    this.board.update(this.currentTetrmino);
  }

  drop(){
    // debugger
    if (this.collision()) {
      this.board.remove(this.currentTetrmino);
      this.currentTetrmino.drop();
    }
    else {
      this.spawnPiece();
    }
  }

  // base check
  collision() {
    return this.currentTetrmino.coords.every(coord => {
      let [x, y] = coord;
      x++;
      if (x < 20) {
        return true;
      }
    });
  }

}

Game.WIDTH = 200;
Game.HEIGHT = 400;

export default Game;
