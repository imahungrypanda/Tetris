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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_view__ = __webpack_require__(4);





document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById('canvas');
  canvasEl.width = 200;
  canvasEl.height = 400;

  const ctx = canvasEl.getContext("2d");
  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](ctx);
  // game.draw(ctx);
  new __WEBPACK_IMPORTED_MODULE_1__game_view__["a" /* default */](game, ctx).start();
})


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pieces__ = __webpack_require__(3);




class Game {
  constructor(ctx) {
    this.board = new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */];
    this.piece = new __WEBPACK_IMPORTED_MODULE_1__pieces__["a" /* default */];
    this.currentTetrmino = this.spawnPiece();

    this.insert();
  }

  draw(ctx){
      ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
      this.board.draw(ctx);
  }

  spawnPiece(){
    let random = Math.floor(Math.random() * 7);
    // console.log(random);
    let tetrmino = this.piece.PIECES[0];
    return tetrmino
  }

  insert() {
    this.board.update(this.currentTetrmino);
  }

  drop(){
    this.board.remove(this.currentTetrmino);
    this.piece.drop(this.currentTetrmino);
  }
}

Game.WIDTH = 200;
Game.HEIGHT = 400;

/* harmony default export */ __webpack_exports__["a"] = Game;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

  update(piece) {
    piece.startCoords.forEach(coords => {
      let [x, y] = coords;
      this.grid[x][y] = piece;
    });
  }

  remove(piece) {
    piece.startCoords.forEach(coords => {
      let [x, y] = coords;
      this.grid[x][y] = null;
    });
  }


}

/* harmony default export */ __webpack_exports__["a"] = Board;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const oPiece = {
  color: "#0000FF",
  startCoords: [[0, 4],[0, 5],[1, 4],[1, 5]]
}

const sPiece = {
  symbol: "s"
}

const zPiece = {
  symbol: "z"
}

const tPiece = {
  symbol: "t"
}

const lPiece = {
  symbol: "l"
}

class Piece {
  constructor(){
    this.PIECES = [oPiece];
  }

  previewTetromino() {
    const canvasEl = document.getElementById('next-tetrimino-render');
    canvasEl.width = 75;
    canvasEl.height = 75;
    const ctx = canvasEl.getContext("2d");
  }

  rotate(){}

  toggle(){}

  drop(piece) {
    piece.startCoords = piece.startCoords.map(coord => {
      let [x, y] = coord;
      return [x + 1, y];
    });
  }

}




/* harmony default export */ __webpack_exports__["a"] = Piece;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// import Game from './game';

class GameView {
  constructor(game, ctx){
    this.game = game;
    this.ctx = ctx;
  }

  bindKeyHandlers(){}

  start(){
    setInterval(() => {
      this.game.draw(this.ctx);
      console.log("time");
    }, 1000);
  }

  animate(){}
}

/* harmony default export */ __webpack_exports__["a"] = GameView;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map