// import Game from './game';

class GameView {
  constructor(game, ctx){
    this.game = game;
    this.ctx = ctx;
    this.downPressed = false;
    this.intervalSpeed = 600;
    // this.bindKeyHandlers();
  }

  bindKeyHandlers(){
    document.addEventListener("keydown", function(e) {
      e.preventDefault();
      console.log(e.keyCode);

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
    this.bindKeyHandlers();

    this.interval = setInterval(() => {
      this.game.move();
    }, 75);
    requestAnimationFrame(this.animate.bind(this));
  }



  animate(){
    this.game.draw();

    if (this.game.gameover) {
      clearInterval(this.interval);
    }

    requestAnimationFrame(this.animate.bind(this));
  }
}

export default GameView;
