// import Game from './game';

class GameView {
  constructor(game, ctx){
    this.game = game;
    this.ctx = ctx;
    this.downPressed = false;
    this.intervalSpeed = 1000;
    this.running = false;
    this.bindKeyHandlers();
  }

  bindKeyHandlers(){
    document.addEventListener("keydown", function(e) {
      e.preventDefault();

      switch(e.keyCode) {
        // space bar
        case 32:
          if (this.running) {
            //   this.game.slam();
          }
          else {
            this.start();
          }
          break;

        // left arrow
        case 37:
          this.game.moveLeft();
          break;

        // up arrow
        case 38:
          this.game.rotate();
          break;

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
        }, this.intervalSpeed);
        this.downPressed = false;
      }
    }.bind(this));
  }

  start(){
    this.game.clear();
    this.running = true;

    this.interval = setInterval(() => {
      this.game.move();
    }, this.intervalSpeed);

    requestAnimationFrame(this.animate.bind(this));
  }



  animate(){
    this.game.draw();

    if (this.game.gameover) {
      clearInterval(this.interval);
      this.running = false;
    }

    requestAnimationFrame(this.animate.bind(this));

  }
}

export default GameView;
