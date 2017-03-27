import Board from './board';

class Game {
  constructor() {
    this.board = new Board;
    this.currentTetrmino = [];
    console.log(this.board);
  }

  draw(ctx){
    ctx.clearRect(0, 0, Game.HEIGHT, Game.WIDTH);
    ctx.fillStyle = "#FF0000";
    // ctx.fillRect(10, 10, 15, 15);

    this.board.draw(ctx, Game.HEIGHT, Game.WIDTH);
  }
}

Game.HEIGHT = 600;
Game.WIDTH = 800;

export default Game;
