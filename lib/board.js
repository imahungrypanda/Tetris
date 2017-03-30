class Board {
  constructor() {
    this.grid = this.newGrid();
  }

  newGrid() {
    let grid = [];

    for (let i = 0; i < 20; i++) {
      grid[i] = this.addRow();
    }

    return grid;
  }

  addRow() {
    let row = [];

    for (let i = 0; i < 10; i++) {
      row.push(null);
    }

    return row;
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
    for (let i = 2; i < 8; i++) {
      if (top[i] === piece && this.collision(piece)) {
        return true;
      }
    }
  }

  moveLeft(piece) {
    for (let i = 0; i < piece.coords.length; i++) {
      let [x, y] = piece.coords[i];
      if ((y - 1 < 0) || (this.filled([x, y - 1]) && !piece.coordsIncluded([x, y - 1]))) {
        debugger
        return false;
      }
    }
    return true;
  }

  moveRight(piece) {
    for (let i = 0; i < piece.coords.length; i++) {
      let [x, y] = piece.coords[i];
      if (y + 1 > 9  || (this.filled([x, y + 1]) && !piece.coordsIncluded([x, y + 1]))) {
        debugger
        return false;
      }
    }
    return true;
  }

  insideBoard(coords) {
    let [x, y] = coords;
    return x < 20 && (y < 10 && y > -1);
  }

  clear() {
    this.grid = this.newGrid();
  }

  lineFilled() {
    for (let row = 0; row < this.grid.length; row++) {
      if (this.rowFilled(row)) {
        this.deleteRow(row)
      }
    }
  }

  rowFilled(row) {
    for (let col = 0; col < this.grid[row].length; col++) {
      if (!this.filled([row, col])) {
        return false;
      }
    }
    return true;
  }

  deleteRow(row) {
    this.grid.splice(row, 1);
    this.grid.unshift(this.addRow());
  }

}

export default Board;
