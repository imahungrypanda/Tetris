import Board from './board';
import Piece from './pieces';


class Game {
  constructor(ctxMain, ctxPreview) {
    this.board = new Board;
    this.ctxMain = ctxMain;
    this.ctxPreview = ctxPreview;
    this.gameover = false;
    this.spawnPiece();
    this.insert();
  }

  move(){
    this.drop();
    this.insert();
    if (this.over()) {
      // console.log("over");
      this.gameover = true;
    }
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
    if (this.collision()) {
      this.board.lineFilled();
      this.spawnPiece();
    }
    else {
      this.board.remove(this.currentTetrmino);
      this.currentTetrmino.drop();
    }
  }

  collision() {
    return this.board.collision(this.currentTetrmino);
  }

  over() {
    return this.board.over(this.currentTetrmino);
  }

  moveLeft() {
    if (!this.collision() && this.board.moveLeft(this.currentTetrmino)) {
      this.board.remove(this.currentTetrmino);
      this.currentTetrmino.moveLeft();
      this.insert();
    }
  }

  moveRight() {
    if (!this.collision() && this.board.moveRight(this.currentTetrmino)) {
      this.board.remove(this.currentTetrmino);
      this.currentTetrmino.moveRight();
      this.insert();
    }
  }

  clear() {
    this.gameover = false;
    this.board.clear();
    this.spawnPiece();
    this.insert();
  }
}

Game.WIDTH = 200;
Game.HEIGHT = 400;

export default Game;
