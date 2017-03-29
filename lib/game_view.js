// import Game from './game';

class GameView {
  constructor(game, ctx){
    this.game = game;
    this.ctx = ctx;
  }

  bindKeyHandlers(){}

  start(){
    setInterval(() => {
      this.game.draw(this.ctx);
      this.game.move();
      console.log("time");
    }, 100);
  }

  animate(){}
}

export default GameView;
