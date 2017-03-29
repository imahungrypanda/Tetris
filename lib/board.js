// const imageObj = new Image();
// imageObj.src = './lib/panda_logo.png';
// const panda_logo = './lib/panda_logo.png';

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

    // ctx.clip();

    for (var row = 0; row < 20; row++) {
      for (let col = 0; col < 10; col++) {
        let x = col * padding;
        let y = row * padding;


        if (this.grid[row][col]) {
          ctx.fillStyle = this.grid[row][col].color;
          ctx.fillRect(x, y, padding,padding);
          // let imageObj = new Image();
          // imageObj.src = panda_logo;
          // imageObj.onload = () => {
          //   ctx.drawImage(imageObj, x, y, padding, padding);
          // };
        }
        else {
          // ctx.fillStyle = "white";
          // ctx.fillRect(x, y, padding,padding);
          ctx.clearRect(x, y, x + padding, y + padding);
        }
      }
    }
  }

  pos(coords) {
    let [x, y] = coords;
    return this.grid[x][y];
  }

  update(piece) {
    piece.coords.forEach(coords => {
      let [x, y] = coords;
      this.grid[x][y] = piece;
    });
  }

  remove(piece) {
    piece.coords.forEach(coords => {
      let [x, y] = coords;
      this.grid[x][y] = null;
    });
  }




}

export default Board;
