import Board from './board';
import Piece from './pieces';


class Game {
  constructor(ctx) {
    this.board = new Board;
    this.piece = new Piece;
    this.currentTetrmino = this.spawnPiece();

    this.insert();
  }

  move(){
    this.drop();
    this.insert();
  }

  draw(ctx){
      ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
      this.board.draw(ctx);
  }

  spawnPiece(){
    let random = Math.floor(Math.random() * 7);
    let tetrmino = this.piece.PIECES[random];
    return tetrmino
  }

  insert() {
    this.board.update(this.currentTetrmino);
  }

  drop(){
    debugger
    if (this.collision(this.currentTetrmino)) {

      this.board.remove(this.currentTetrmino);
      this.piece.drop(this.currentTetrmino);
    }
    else {
      this.currentTetrmino = this.spawnPiece();
    }


  }

  collision(piece) {
    return piece.coords.every(coord => {
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
