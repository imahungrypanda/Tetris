// import Game from './game';

class GameView {
  constructor(game, ctx){
    this.game = game;
    this.ctx = ctx;
    this.downPressed = false;
    this.intervalSpeed = 600;
    this.bindKeyHandlers();
  }

  bindKeyHandlers(){
    document.addEventListener("keydown", function(e) {
      e.preventDefault();

      switch(e.keyCode) {
        // space bar
        // case 32:
        //   this.game.slam();
        //   break;

        // left arrow
        case 37:
          this.game.moveLeft();
          break;

        // up arrow
        // case 38:
        //   this.game.rotate();
        //   break;

        // right arrow
        case 39:
          this.game.moveRight();
          break;

        // down arrow
        case 40:
          if (!this.downPressed) {
            clearInterval(this.interval);
            this.interval = setInterval(() => {
              this.game.move();
            }, 40);
            this.downPressed = true;
          }
          break;

        default:
          return;
      }
    }.bind(this));

    document.addEventListener("keyup", function(e) {
      if (e.key === "ArrowDown") {
        clearInterval(this.interval);
        this.interval = setInterval(() => {
          this.game.move();
        }, 75);
        this.downPressed = false;
      }
    }.bind(this));
  }

  start(){
    this.interval = setInterval(() => {
      this.game.move();
    }, 75);

    // this.request = window.requestAnimationFrame(this.animate.bind(this));
    requestAnimationFrame(this.animate.bind(this));
  }



  animate(){
    this.game.draw();

    if (this.game.gameover) {
      console.log("game over");
      clearInterval(this.interval);
      // window.cancelAnimationFrame(this.request);
    }

    requestAnimationFrame(this.animate.bind(this));

  }
}

export default GameView;
