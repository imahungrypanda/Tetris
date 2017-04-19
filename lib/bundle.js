/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pieces__ = __webpack_require__(3);




class Game {
  constructor(ctxMain, ctxPreview) {
    this.board = new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */];
    this.ctxMain = ctxMain;
    this.ctxPreview = ctxPreview;
    this.gameover = false;
    this.level = 0;
    this.spawnPiece();
    this.insert();
  }

  move(){
    this.drop();
    this.insert();
    if (this.over()) {
      this.gameover = true;
    }
  }

  draw(){
      this.ctxMain.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
      this.board.draw(this.ctxMain);
      this.nextTetrimino.previewTetrimino(this.ctxPreview);
  }

  spawnPiece(){
    if (!this.nextTetrimino) {
      this.currentTetrimino = __WEBPACK_IMPORTED_MODULE_1__pieces__["a" /* default */].randomPiece();
    }
    else {
      this.currentTetrimino = this.nextTetrimino;
    }
    this.nextTetrimino = __WEBPACK_IMPORTED_MODULE_1__pieces__["a" /* default */].randomPiece();
  }

  insert() {
    this.board.update(this.currentTetrimino);
  }

  drop(){
    if (this.collision()) {
      this.board.lineFilled();
      this.spawnPiece();
    }
    else {
      this.board.remove(this.currentTetrimino);
      this.currentTetrimino.drop();
    }
  }

  collision() {
    return this.board.collision(this.currentTetrimino);
  }

  over() {
    return this.board.over(this.currentTetrimino);
  }

  moveLeft() {
    if (this.board.moveLeft(this.currentTetrimino)) {
      this.board.remove(this.currentTetrimino);
      this.currentTetrimino.moveLeft();
      this.insert();
    }
  }

  moveRight() {
    // debugger
    if (this.board.moveRight(this.currentTetrimino)) {
      this.board.remove(this.currentTetrimino);
      this.currentTetrimino.moveRight();
      this.insert();
    }
  }

  clear() {
    this.level = 0;
    this.gameover = false;
    this.board.clear();
    this.spawnPiece();
    this.insert();
  }

  levelUp() {
    if (this.level + 10 <= this.board.level) {
      this.level += 10;
      return true;
    }
    return false;
  }

  rotate() {
    if (this.currentTetrimino.type !== "staticPiece") {
      this.board.remove(this.currentTetrimino);
      this.currentTetrimino.rotate(this.board);
      this.insert();
    }
  }

  slam() {
    while (!this.collision()) {
      this.drop();
    }
    this.insert();
  }
}

Game.WIDTH = 200;
Game.HEIGHT = 400;

/* harmony default export */ __webpack_exports__["a"] = Game;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

    document.getElementById('close-modal').addEventListener("click", function(e) {
      e.preventDefault();
      console.log("closed");
      console.log(this);

      this.modal.style.display = "none";

      if (this.game.gameover) {
        this.clearGame();
        // clearInterval(this.interval);
      }

      this.paused = false;
      this.running = true;

      this.interval = setInterval(() => {
        this.game.move();
      }, this.intervalSpeed);

      requestAnimationFrame(this.animate.bind(this));
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
      this.modal.style.display = "block";
      this.clearGame();
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

  clearGame() {
    clearInterval(this.interval);
    this.running = false;
  }
}

/* harmony default export */ __webpack_exports__["a"] = GameView;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Board {
  constructor() {
    this.grid = this.newGrid();
    this.level = 0;
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
    let padding = 30;

    for (var row = 0; row < 20; row++) {
      for (let col = 0; col < 10; col++) {
        let x = col * padding;
        let y = row * padding;


        if (this.grid[row][col]) {
          ctx.beginPath();
          ctx.lineWidth="2";
          ctx.strokeStyle="black";
          ctx.fillStyle = this.grid[row][col].color;
          ctx.fillRect(x, y, padding, padding);
          ctx.rect(x, y, padding, padding);
          ctx.stroke();
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
    // debugger
    for (let i = 0; i < piece.coords.length; i++) {
      let coord = piece.coords[i];
      let [x, y] = coord;
      if (x === 19  ||
         (!piece.coordsIncluded([x + 1, y]) &&
          this.pos([x  + 1, y]))) {
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
        return false;
      }
    }
    // debugger
    return true;
  }

  moveRight(piece) {
    for (let i = 0; i < piece.coords.length; i++) {
      let [x, y] = piece.coords[i];
      if (y + 1 > 9  || (this.filled([x, y + 1]) && !piece.coordsIncluded([x, y + 1]))) {
        return false;
      }
    }
    // debugger
    return true;
  }

  insideBoard(coords) {
    let [x, y] = coords;
    return x < 20 && (y < 10 && y > -1);
  }

  clear() {
    this.grid = this.newGrid();
    this.level = 0;
  }

  lineFilled() {
    for (let row = 0; row < this.grid.length; row++) {
      if (this.rowFilled(row)) {
        this.deleteRow(row);
        this.level++;
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

/* harmony default export */ __webpack_exports__["a"] = Board;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// all the tetriminos
const oPiece = {
  color: "#32c1ff",
  coords: [[0, 4],[0, 5],[1, 4],[1, 5]],
  type: "staticPiece",
  center: [1, 5],
  draw: ctx => {
    ctx.beginPath();
    ctx.lineWidth="2";
    ctx.strokeStyle="black";
    ctx.fillStyle = "#32c1ff";
    ctx.fillRect(30, 30, 20, 20);
    ctx.fillRect(30, 50, 20, 20);
    ctx.fillRect(50, 30, 20, 20);
    ctx.fillRect(50, 50, 20, 20);
    ctx.rect(30, 30, 20, 20);
    ctx.rect(30, 50, 20, 20);
    ctx.rect(50, 30, 20, 20);
    ctx.rect(50, 50, 20, 20);
    ctx.stroke();
  }
}

const sPiece = {
  color: "#E98B50",
  coords: [[0, 3],[0, 4],[1, 4],[1, 5]],
  type: "togglePiece",
  center: [1, 4],
  draw: ctx => {
    ctx.beginPath();
    ctx.lineWidth="2";
    ctx.strokeStyle="black";
    ctx.fillStyle = "#E98B50";
    ctx.fillRect(40, 50, 20, 20);
    ctx.fillRect(40, 30, 20, 20);
    ctx.fillRect(20, 30, 20, 20);
    ctx.fillRect(60, 50, 20, 20);
    ctx.rect(40, 50, 20, 20);
    ctx.rect(40, 30, 20, 20);
    ctx.rect(20, 30, 20, 20);
    ctx.rect(60, 50, 20, 20);
    ctx.stroke();
  }
}

const zPiece = {
  color: "#55A44E",
  coords: [[0, 4],[0, 5],[1, 3],[1, 4]],
  type: "togglePiece",
  center: [1, 4],
  draw: ctx => {
    ctx.beginPath();
    ctx.lineWidth="2";
    ctx.strokeStyle="black";
    ctx.fillStyle = "#55A44E";
    ctx.fillRect(40, 50, 20, 20);
    ctx.fillRect(40, 30, 20, 20);
    ctx.fillRect(20, 50, 20, 20);
    ctx.fillRect(60, 30, 20, 20);
    ctx.rect(40, 50, 20, 20);
    ctx.rect(40, 30, 20, 20);
    ctx.rect(20, 50, 20, 20);
    ctx.rect(60, 30, 20, 20);
    ctx.stroke();
  }
}

const tPiece = {
  color: "#334477",
  coords: [[0, 4],[1, 3],[1, 4],[1, 5]],
  type: "rotatePiece",
  center: [1, 4],
  draw: ctx => {
    ctx.beginPath();
    ctx.lineWidth="2";
    ctx.strokeStyle="black";
    ctx.fillStyle = "#334477";
    ctx.fillRect(40, 50, 20, 20);
    ctx.fillRect(20, 50, 20, 20);
    ctx.fillRect(60, 50, 20, 20);
    ctx.fillRect(40, 30, 20, 20);
    ctx.rect(40, 50, 20, 20);
    ctx.rect(20, 50, 20, 20);
    ctx.rect(60, 50, 20, 20);
    ctx.rect(40, 30, 20, 20);

    ctx.stroke();
  }
}

const iPiece = {
  color: "#D7C37A",
  coords: [[0, 4],[1, 4],[2, 4],[3, 4]],
  type: "togglePiece",
  center: [2, 4],
  draw: ctx => {
    ctx.beginPath();
    ctx.lineWidth="2";
    ctx.strokeStyle="black";
    ctx.fillStyle = "#D7C37A";
    ctx.fillRect(40, 30, 20, 20);
    ctx.fillRect(40, 10, 20, 20);
    ctx.fillRect(40, 50, 20, 20);
    ctx.fillRect(40, 70, 20, 20);
    ctx.rect(40, 30, 20, 20);
    ctx.rect(40, 10, 20, 20);
    ctx.rect(40, 50, 20, 20);
    ctx.rect(40, 70, 20, 20);
    ctx.stroke();
  }
}
 
const lPiece = {
  color: "#BC4F4F",
  coords: [[0, 4],[1, 4],[2, 4],[2, 5]],
  type: "rotatePiece",
  center: [1, 4],
  draw: ctx => {
    ctx.beginPath();
    ctx.lineWidth="2";
    ctx.strokeStyle="black";
    ctx.fillStyle = "#BC4F4F";
    ctx.fillRect(30, 20, 20, 20);
    ctx.fillRect(30, 40, 20, 20);
    ctx.fillRect(30, 60, 20, 20);
    ctx.fillRect(50, 60, 20, 20);
    ctx.rect(30, 20, 20, 20);
    ctx.rect(30, 40, 20, 20);
    ctx.rect(30, 60, 20, 20);
    ctx.rect(50, 60, 20, 20);
    ctx.stroke();
  }
}

const jPiece = {
  color: "#1B8057",
  coords: [[0, 5],[1, 5],[2, 5],[2, 4]],
  type: "rotatePiece",
  center: [2, 5],
  draw: ctx => {
    ctx.beginPath();
    ctx.lineWidth="2";
    ctx.strokeStyle="black";
    ctx.fillStyle = "#1B8057";
    ctx.fillRect(50, 20, 20, 20);
    ctx.fillRect(50, 40, 20, 20);
    ctx.fillRect(50, 60, 20, 20);
    ctx.fillRect(30, 60, 20, 20);
    ctx.rect(50, 20, 20, 20);
    ctx.rect(50, 40, 20, 20);
    ctx.rect(50, 60, 20, 20);
    ctx.rect(30, 60, 20, 20);
    ctx.stroke();
  }
}


class Piece {
  constructor(options){
    this.center = options.center;
    this.coords = options.coords;
    this.color  = options.color;
    this.draw   = options.draw;
  }

  previewTetrimino(ctx) {
    ctx.clearRect(0, 0, 100, 100);
    this.draw(ctx);
  }

  drop() {
    this.coords = this.coords.map(coord => {
      let [x, y] = coord;
      return [x + 1, y];
    });
    this.center = [this.center[0] + 1, this.center[1]];
  }

  coordsIncluded(coord) {
    for (let i = 0; i < this.coords.length; i++) {
      let [oldx, oldy] = this.coords[i];
      if (oldx === coord[0] && oldy === coord[1]) {
        return true;
      }
    }
    return false;
  }

  moveLeft() {
    this.coords = this.coords.map(coord => {
      let [x, y] = coord;
      return [x, y - 1];
    });
    this.center = [this.center[0], this.center[1] - 1];
  }

  moveRight() {
    this.coords = this.coords.map(coord => {
      let [x, y] = coord;
      return [x, y + 1];
    });
    this.center = [this.center[0], this.center[1] + 1];
  }

  spin(board, clockwise){
    let rotatedCoords = this.rotatedCoords(clockwise);

    if (this.validRotate(board, rotatedCoords)) {
      this.coords = rotatedCoords;
    }
  }

  validRotate(board, coords) {
    for (let i = 0; i < coords.length; i++) {
      if (board.filled(coords[i]) || !board.insideBoard(coords[i])) {
        return false;
      }
    }
    return true;
  }

  rotatedCoords(clockwise) {
    let newCoords = [];

    this.coords.forEach(coord =>
      newCoords.push(this.rotateCoord(coord, clockwise))
    );

    return newCoords;
  }

  rotateCoord(coord, clockwise) {
    let [centerX, centerY] = this.center;

    let posFromCenter = [coord[0] - centerX, coord[1] - centerY];
    let [row, col] = posFromCenter;

    if (clockwise) {
      return [col + centerX, (row * -1) + centerY];
    } else {
      return [(col * -1) + centerX, row + centerY];
    }
  }
}


/* harmony default export */ __webpack_exports__["a"] = Piece;

class TogglePiece extends Piece {
  constructor(options) {
    super(options);
    this.toggled = false;
    this.type = options.type;
  }

  rotate(board) {
    if (this.toggled) {
      // rotate counter clockwise
      this.spin(board, false);
      this.toggled = false;
    } else {
      // rotate clockwise
      this.spin(board, true);
      this.toggled = true;
    }
    return;
  }
}

class RotatePiece extends Piece {
  constructor(options) {
    super(options);
    this.type = options.type;
  }

  rotate(board) {
    this.spin(board, false);
    return;
  }
}

class StaticPiece extends Piece {
  constructor(options) {
    super(options);
    this.type = options.type;
  }

  rotate() {
    // do nothing because it doesn't move
    return;
  }
}




Piece.PIECES = [oPiece, sPiece, zPiece, tPiece, iPiece, lPiece, jPiece];

Piece.randomPiece = () => {
  let random = Math.floor(Math.random() * 7);
  let options = Piece.PIECES[random];

  switch (options.type) {
    case "staticPiece":
      return new StaticPiece(options);

    case "rotatePiece":
      return new RotatePiece(options);

    case "togglePiece":
      return new TogglePiece(options);

    default:
      console.log(`No type ${options.type}`);
  }
};


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_view__ = __webpack_require__(1);





document.addEventListener("DOMContentLoaded", () => {
  const canvasMain = document.getElementById('canvas');
  canvasMain.width = 300;
  canvasMain.height = 600;
  const ctxMain = canvasMain.getContext("2d");

  const canvasPreview = document.getElementById('next-tetrimino-render');
  canvasPreview.width = 100;
  canvasPreview.height = 100;
  const ctxPreview = canvasPreview.getContext("2d");

  const modal = document.getElementById('myModal');

  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](ctxMain, ctxPreview);
  new __WEBPACK_IMPORTED_MODULE_1__game_view__["a" /* default */](game, ctxMain, modal);
})


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map