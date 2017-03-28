import Board from './board';

class Game {
  constructor() {
    this.board = new Board;
    this.currentTetrmino = [];

  }

  draw(ctx){
    ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);

    this.board.draw(ctx);
  }
}

Game.WIDTH = 200;
Game.HEIGHT = 400;

export default Game;
