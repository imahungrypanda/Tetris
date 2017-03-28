class Board {
  constructor() {
    this.level = 0;
    this.grid = this.newGrid();
  }

  newGrid() {
    let grid = [];

    // rows
    for (let i = 0; i < 20; i++) {
      grid[i] = [];
      // cols
      for (let j = 0; j < 10; j++) {
        grid[i][j] = null;
      }
    }

    return grid;
  }

  draw(ctx) {
    let padding = 20;

    // possible grid in the future?
    // let width = 100;
    // let height = 200;
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

    for (var row = 0; row < 20; row++) {
      for (let col = 0; col < 10; col++) {
        let x = col * padding;
        let y = row * padding;
        let imageObj = new Image();
        imageObj.src = './lib/panda_logo.png';

        if (this.grid[row][col]) {
          // console.log(this.grid[row][col]);
          ctx.fillStyle = this.grid[row][col].color;
          ctx.fillRect(x, y, padding,padding);
          imageObj.onload = () => {
            ctx.drawImage(imageObj, x, y, padding, padding);
          };
        }
        // else {
        //   // ctx.fillStyle = "#FF0000";
        //   // ctx.fillRect(x, y, padding,padding);
        // }
      }
    }
  }

  update(piece) {
    piece.startCoords.forEach(coords => {
      let [x, y] = coords;
      this.grid[x][y] = piece;
    });
  }


}

export default Board;
