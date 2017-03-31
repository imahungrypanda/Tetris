import Game from './game';
import GameView from './game_view';



document.addEventListener("DOMContentLoaded", () => {
  const canvasMain = document.getElementById('canvas');
  canvasMain.width = 300;
  canvasMain.height = 600;
  const ctxMain = canvasMain.getContext("2d");

  const canvasPreview = document.getElementById('next-tetrmino-render');
  canvasPreview.width = 100;
  canvasPreview.height = 100;
  const ctxPreview = canvasPreview.getContext("2d");

  const modal = document.getElementById('myModal');

  const game = new Game(ctxMain, ctxPreview);
  new GameView(game, ctxMain, modal);
})
