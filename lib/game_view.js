class GameView {
  constructor(game, ctx, modal){
    this.game = game;
    this.ctx = ctx;
    this.modal = modal;
    this.downPressed = false;
    this.intervalSpeed = 1000;
    this.paused = false;
    this.running = false;
    this.bindKeyHandlers();
  }

  bindKeyHandlers(){
    document.addEventListener("keydown", function(e) {


      switch(e.keyCode) {
        // space bar
        case 32:
          e.preventDefault();
          if (this.running && !this.paused) {
            this.game.slam();
            this.game.move();
          }
          else if (!this.paused) {
            this.modal.style.display = "none";
            this.start();
          }
          break;

        // left arrow
        case 37:
          e.preventDefault();
          this.game.moveLeft();
          break;

        // up arrow
        case 38:
          e.preventDefault();
          this.game.rotate();
          break;

        // right arrow
        case 39:
          e.preventDefault();
          this.game.moveRight();
          break;

        // down arrow
        case 40:
          e.preventDefault();
          if (!this.downPressed) {
            clearInterval(this.interval);
            this.interval = setInterval(() => {
              this.game.move();
            }, 40);
            this.downPressed = true;
          }
          break;

        // pause
        case 80:
          e.preventDefault();
          if (this.paused) {
            this.modal.style.display = "none";
            this.paused = false;
            this.interval = setInterval(() => {
              this.game.move();
            }, this.intervalSpeed);
          }
          else {
            clearInterval(this.interval);
            this.modal.style.display = "block";
            this.paused = true;
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
      this.modal.style.display = "block";
    }

    if (this.game.levelUp()) {
      this.speedIncreased = true;
      this.intervalSpeed -= 100;
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.game.move();
      }, this.intervalSpeed);
    }

    requestAnimationFrame(this.animate.bind(this));
  }
}

export default GameView;
