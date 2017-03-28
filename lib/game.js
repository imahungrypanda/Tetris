import Board from './board';
import Piece from './pieces';


class Game {
  constructor(ctx) {
    this.board = new Board;
    this.piece = new Piece;
    this.currentTetrmino = this.spawnPiece();

    this.insert();
    // for (var i = 0; i < 10; i++) {
    //   this.drop();
    //
    //   console.log(i);
    // }
    // console.log(this.currentTetrmino);
  }

  draw(ctx){
    for (var i = 0; i < 10; i++) {
      this.drop();
      this.board.update(this.currentTetrmino);

      console.log(i);
    ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);

    this.board.draw(ctx);
  }

    // console.log(this.piece);
  }

  spawnPiece(){
    let random = Math.floor(Math.random() * 7);
    // console.log(random);
    let tetrmino = this.piece.PIECES[0];
    return tetrmino
  }

  insert() {
    this.board.update(this.currentTetrmino);
  }

  drop(){
    this.piece.drop(this.currentTetrmino);
  }
}

Game.WIDTH = 200;
Game.HEIGHT = 400;

export default Game;
