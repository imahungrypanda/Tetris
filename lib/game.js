import Board from './board';
import Piece from './pieces';


class Game {
  constructor(ctxMain, ctxPreview) {
    this.board = new Board;
    this.ctxMain = ctxMain;
    this.ctxPreview = ctxPreview;
    this.gameover = false;
    this.level = 0;
    this.spawnPiece();
    this.insert();
  }

  move(){
    this.drop();
    this.insert();
    if (this.over()) {
      this.gameover = true;
    }
  }

  draw(){
      this.ctxMain.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
      this.board.draw(this.ctxMain);
      this.nextTetrimino.previewTetrimino(this.ctxPreview);
  }

  spawnPiece(){
    if (!this.nextTetrimino) {
      this.currentTetrimino = Piece.randomPiece();
    }
    else {
      this.currentTetrimino = this.nextTetrimino;
    }
    this.nextTetrimino = Piece.randomPiece();
  }

  insert() {
    this.board.update(this.currentTetrimino);
  }

  drop(){
    if (this.collision()) {
      this.board.lineFilled();
      this.spawnPiece();
    }
    else {
      this.board.remove(this.currentTetrimino);
      this.currentTetrimino.drop();
    }
  }

  collision() {
    return this.board.collision(this.currentTetrimino);
  }

  over() {
    return this.board.over(this.currentTetrimino);
  }

  moveLeft() {
    if (this.board.moveLeft(this.currentTetrimino)) {
      this.board.remove(this.currentTetrimino);
      this.currentTetrimino.moveLeft();
      this.insert();
    }
  }

  moveRight() {
    // debugger
    if (this.board.moveRight(this.currentTetrimino)) {
      this.board.remove(this.currentTetrimino);
      this.currentTetrimino.moveRight();
      this.insert();
    }
  }

  clear() {
    this.level = 0;
    this.gameover = false;
    this.board.clear();
    this.spawnPiece();
    this.insert();
  }

  levelUp() {
    if (this.level + 10 <= this.board.level) {
      this.level += 10;
      return true;
    }
    return false;
  }

  rotate() {
    if (this.currentTetrimino.type !== "staticPiece") {
      this.board.remove(this.currentTetrimino);
      this.currentTetrimino.rotate(this.board);
      this.insert();
    }
  }

  slam() {
    while (!this.collision()) {
      this.drop();
    }
    this.insert();
  }
}

Game.WIDTH = 200;
Game.HEIGHT = 400;

export default Game;
