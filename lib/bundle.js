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
      this.nextTetrmino.previewTetromino(this.ctxPreview);
  }

  spawnPiece(){
    if (!this.nextTetrmino) {
      this.currentTetrmino = __WEBPACK_IMPORTED_MODULE_1__pieces__["a" /* default */].randomPiece();
    } else {
      this.currentTetrmino = this.nextTetrmino;
    }
    this.nextTetrmino = __WEBPACK_IMPORTED_MODULE_1__pieces__["a" /* default */].randomPiece();
  }

  insert() {
    this.board.update(this.currentTetrmino);
  }

  drop(){
    if (this.collision()) {
      this.board.lineFilled();
      this.spawnPiece();
    }
    else {
      this.board.remove(this.currentTetrmino);
      this.currentTetrmino.drop();
    }
  }

  collision() {
    return this.board.collision(this.currentTetrmino);
  }

  over() {
    return this.board.over(this.currentTetrmino);
  }

  moveLeft() {
    if (!this.collision() && this.board.moveLeft(this.currentTetrmino)) {
      this.board.remove(this.currentTetrmino);
      this.currentTetrmino.moveLeft();
      this.insert();
    }
  }

  moveRight() {
    if (!this.collision() && this.board.moveRight(this.currentTetrmino)) {
      this.board.remove(this.currentTetrmino);
      this.currentTetrmino.moveRight();
      this.insert();
    }
  }

  clear() {
    this.gameover = false;
    this.board.clear();
    this.spawnPiece();
    this.insert();
  }

  rotate() {
    // debugger
    // return;
    if (this.currentTetrmino.type !== "staticPiece") {
      this.board.remove(this.currentTetrmino);
      this.currentTetrmino.rotate(this.board);
      this.insert();
    }
  }
}

Game.WIDTH = 200;
Game.HEIGHT = 400;

/* harmony default export */ __webpack_exports__["a"] = Game;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// import Game from './game';

class GameView {
  constructor(game, ctx){
    this.game = game;
    this.ctx = ctx;
    this.downPressed = false;
    this.intervalSpeed = 1000;
    this.running = false;
    this.bindKeyHandlers();
  }

  bindKeyHandlers(){
    document.addEventListener("keydown", function(e) {
      e.preventDefault();

      switch(e.keyCode) {
        // space bar
        case 32:
          if (this.running) {
            //   this.game.slam();
          }
          else {
            this.start();
          }
          break;

        // left arrow
        case 37:
          this.game.moveLeft();
          break;

        // up arrow
        case 38:
          this.game.rotate();
          break;

        // right arrow
        case 39:
          this.game.moveRight();
          break;

        // down arrow
        case 40:
          if (!this.downPressed) {
            clearInterval(this.interval);
            this.interval = setInterval(() => {
              this.game.move();
            }, 40);
            this.downPressed = true;
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
        }, 75);
        this.downPressed = false;
      }
    }.bind(this));
  }

  start(){
    this.game.clear();
    this.running = true;

    this.interval = setInterval(() => {
      this.game.move();
    }, 75);

    requestAnimationFrame(this.animate.bind(this));
  }



  animate(){
    this.game.draw();

    if (this.game.gameover) {
      clearInterval(this.interval);
      this.running = false;
    }

    requestAnimationFrame(this.animate.bind(this));

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

/* harmony default export */ __webpack_exports__["a"] = Board;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// all the tetrminos
const oPiece = {
  color: "yellow",
  coords: [[0, 4],[0, 5],[1, 4],[1, 5]],
  type: "staticPiece",
  center: [1, 5],
  draw: ctx => {
    ctx.fillStyle = "yellow";
    ctx.fillRect(30, 30, 20, 20);
    ctx.fillRect(30, 50, 20, 20);
    ctx.fillRect(50, 30, 20, 20);
    ctx.fillRect(50, 50, 20, 20);
  }
}

const sPiece = {
  color: "magenta",
  coords: [[0, 3],[0, 4],[1, 4],[1, 5]],
  type: "togglePiece",
  center: [1, 4],
  draw: ctx => {
    ctx.fillStyle = "magenta";
    ctx.fillRect(40, 50, 20, 20);
    ctx.fillRect(40, 30, 20, 20);
    ctx.fillRect(20, 30, 20, 20);
    ctx.fillRect(60, 50, 20, 20);
  }
}

const zPiece = {
  color: "green",
  coords: [[0, 4],[0, 5],[1, 3],[1, 4]],
  type: "togglePiece",
  center: [1, 4],
  draw: ctx => {
    ctx.fillStyle = "green";
    ctx.fillRect(40, 50, 20, 20);
    ctx.fillRect(40, 30, 20, 20);
    ctx.fillRect(20, 50, 20, 20);
    ctx.fillRect(60, 30, 20, 20);
  }
}

const tPiece = {
  color: "black",
  coords: [[0, 4],[1, 3],[1, 4],[1, 5]],
  type: "rotatePiece",
  center: [1, 5],
  draw: ctx => {
    ctx.fillStyle = "black";
    ctx.fillRect(40, 50, 20, 20);
    ctx.fillRect(20, 50, 20, 20);
    ctx.fillRect(60, 50, 20, 20);
    ctx.fillRect(40, 30, 20, 20);
  }
}

const iPiece = {
  color: "red",
  coords: [[0, 4],[1, 4],[2, 4],[3, 4]],
  type: "togglePiece",
  center: [2, 4],
  draw: ctx => {
    ctx.fillStyle = "red";
    ctx.fillRect(40, 30, 20, 20);
    ctx.fillRect(40, 10, 20, 20);
    ctx.fillRect(40, 50, 20, 20);
    ctx.fillRect(40, 70, 20, 20);
  }
}

const lPiece = {
  color: "orange",
  coords: [[0, 4],[1, 4],[2, 4],[2, 5]],
  type: "rotatePiece",
  center: [2, 4],
  draw: ctx => {
    ctx.fillStyle = "orange";
    ctx.fillRect(30, 20, 20, 20);
    ctx.fillRect(30, 40, 20, 20);
    ctx.fillRect(30, 60, 20, 20);
    ctx.fillRect(50, 60, 20, 20);
  }
}

const jPiece = {
  color: "blue",
  coords: [[0, 5],[1, 5],[2, 5],[2, 4]],
  type: "rotatePiece",
  center: [2, 5],
  draw: ctx => {
    ctx.fillStyle = "blue";
    ctx.fillRect(50, 20, 20, 20);
    ctx.fillRect(50, 40, 20, 20);
    ctx.fillRect(50, 60, 20, 20);
    ctx.fillRect(30, 60, 20, 20);
  }
}


class Piece {
  constructor(options){
    this.center = options.center;
    this.coords = options.coords;
    this.color  = options.color;
    this.draw   = options.draw;
  }

  previewTetromino(ctx) {
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

  // dictates the spin? maybe just keep it in the toggle/rotate classes
  spin(board, clockwise){
  let rotatedCoords = this.rotatedCoords(clockwise);

  // if they are valid
  if (this.validRotate(board, rotatedCoords)) {
    // console.log("Should rotate");
    this.coords = rotatedCoords;
  }
  //   rotate
  // else
  //   do nothing

  // debugger
return;
  }

  // checks if new rotatedCoords are valid
  validRotate(board, coords) {
    // for each coord check if the board is empty
    for (let i = 0; i < coords.length; i++) {
      // debugger
      if (board.filled(coords[i]) && board.insideBoard(coords[i]) && !this.coordsIncluded(coords[i])) {
        return false;
      }
    }
    return true;
  }

  // return a new set of coords that have been rotated
  rotatedCoords(clockwise) {
    let newCoords = [];
    this.coords.forEach(coord => {
      // let [x, y] = coord;
      newCoords.push(this.rotateCoord(coord, clockwise))
    })
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

  // rotate a piece counter clockwise
  rotate() {
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
  canvasMain.width = 200;
  canvasMain.height = 400;
  const ctxMain = canvasMain.getContext("2d");

  const canvasPreview = document.getElementById('next-tetrmino-render');
  canvasPreview.width = 100;
  canvasPreview.height = 100;
  const ctxPreview = canvasPreview.getContext("2d");

  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](ctxMain, ctxPreview);
  // game.draw(ctx);
  new __WEBPACK_IMPORTED_MODULE_1__game_view__["a" /* default */](game, ctxMain, ctxPreview)
})


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map