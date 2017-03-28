import Board from './board';

class Game {
  constructor() {
    this.board = new Board;
    this.currentTetrmino = [];
    console.log(this.board);
  }

  draw(ctx){
    ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
    // ctx.fillStyle = "#FF0000";
    // ctx.fillRect(10, 10, 15, 15);

    this.board.draw(ctx, Game.WIDTH, Game.HEIGHT);
  }
}

Game.WIDTH = 800;
Game.HEIGHT = 600;

export default Game;
