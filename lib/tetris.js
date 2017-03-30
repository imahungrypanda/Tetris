import Game from './game';
import GameView from './game_view';



document.addEventListener("DOMContentLoaded", () => {
  const canvasMain = document.getElementById('canvas');
  canvasMain.width = 200;
  canvasMain.height = 400;
  const ctxMain = canvasMain.getContext("2d");

  const canvasPreview = document.getElementById('next-tetrmino-render');
  canvasPreview.width = 100;
  canvasPreview.height = 100;
  const ctxPreview = canvasPreview.getContext("2d");

  const game = new Game(ctxMain, ctxPreview);
  // game.draw(ctx);
  new GameView(game, ctxMain, ctxPreview)
})
