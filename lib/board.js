class Board {
  constructor() {
    this.level = 0;
    this.grid = [];

    // rows
    for (let i = 0; i < 20; i++) {
      this.grid[i] = [];
      // cols
      for (let j = 0; j < 10; j++) {
        this.grid[i][j] = null;
      }
    }
  }

  draw(ctx, height, width) {
    // let padding = 10;
    // for (let x = padding; x <= width; x += padding) {
    //   ctx.moveTo(0.5 + x, 0);
    //   ctx.lineTo(0.5 + x, width);
    //   this.grid[x];
    //
    // }
    //
    // for (let x = padding; x <= height; x += padding) {
    //   ctx.moveTo(0, 0.5 + x);
    //   ctx.lineTo(height, 0.5 + x);
    // }
    //
    // ctx.strokeStyle = "grey";
    // ctx.stroke();

  }
}

export default Board;
