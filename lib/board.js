class Board {
  constructor() {
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

    for (var row = 0; row < 20; row++) {
      for (let col = 0; col < 10; col++) {
        let x = col * padding;
        let y = row * padding;


        if (this.grid[row][col]) {
          ctx.fillStyle = this.grid[row][col].color;
          ctx.fillRect(x, y, padding,padding);
        }
        else {
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

  collision(piece) {
    for (let i = 0; i < piece.coords.length; i++) {
      let coord = piece.coords[i];
      let [x, y] = coord;
      if (x === 19  ||
         (!piece.coordsIncluded([x + 1, y]) &&
          this.filled([x  + 1, y]))) {
        return true;
      }
    }
    return false;
  }

  filled(coords) {
    return this.pos(coords) !== null;
  }

  over(piece) {
    let top = this.grid[0];
    for (let i = 3; i < 7; i++) {
      return top[i] === piece && this.collision(piece);
    }
  }

  moveLeft(piece) {
    for (let i = 0; i < piece.coords.length; i++) {
      let [x, y] = piece.coords[i];
      if ((y - 1 < 0) || (this.filled([x, y - 1]) && !piece.coordsIncluded([x, y - 1]))) {
        return false;
      }
    }
    return true;
  }

  moveRight(piece) {
    for (let i = 0; i < piece.coords.length; i++) {
      let [x, y] = piece.coords[i];
      if (y + 1 > 9  || (this.filled([x, y + 1]) && !piece.coordsIncluded([x, y + 1]))) {
        return false;
      }
    }
    return true;
  }

}

export default Board;
