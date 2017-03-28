
class Pieces {
  constructor(){

  }

  previewTetromino() {
    const canvasEl = document.getElementById('next-tetrimino-render');
    canvasEl.width = 75;
    canvasEl.height = 75;
    const ctx = canvasEl.getContext("2d");
  }
}
