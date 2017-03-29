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
    // console.log(random);
    let tetrmino = this.piece.PIECES[random];
    return tetrmino
  }

  insert() {
    this.board.update(this.currentTetrmino);
  }

  drop(){
    if (this.collision(this.currentTetrmino)) {

      this.board.remove(this.currentTetrmino);
      this.piece.drop(this.currentTetrmino);
    }
  }

  collision(piece) {
    return piece.coords.some(coord => {
      console.log(coord);
      let [x, y] = coord;
      // debugger
      x++;
      if (x > 20 || this.board.pos(coord)) {
        return true;
      }
    });
  }

}

Game.WIDTH = 200;
Game.HEIGHT = 400;

export default Game;
