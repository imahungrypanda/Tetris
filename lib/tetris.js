import Game from './game';



document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById('canvas');
  canvasEl.width = 200;
  canvasEl.height = 400;

  const ctx = canvasEl.getContext("2d");
  const game = new Game(ctx);
  game.draw(ctx);
  // new GameView(game, ctx).start();
})
