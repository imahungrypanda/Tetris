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
      console.log("time");
    }, 1000);
  }

  animate(){}
}

export default GameView;
