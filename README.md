## Tetris

[Live link](https://imahungrypanda.github.io/Tetris/)

![demo_2](/assets/demo_2.gif)

#### Background
Tetris is a classic game from the 1980's where tiles(tetriminos), made up of 4 squares, are arranged into a row. When a row is filled it is cleared. Tetriminos are randomly picked and slowly drop down until either hitting the base of the board or another tetrimino. The tetriminos slowly move faster as more lines are cleared. The game ends when the tetriminos are stacked all the way up and are outside the top of the board.

https://en.wikipedia.org/wiki/Tetris

#### Implementation
- JavaScript
- Canvas

#### Gameplay

There are seven different tetriminos. Combine them together to clear a line. Don't let them stack up to the top!

- Right & Left arrow keys move a piece side to side
- Up arrow key rotates the tetrimino
- Down arrow increases the drop speed
- Spacebar drops the tetrimino or starts a game
- P pauses the game

#### Functionality
- [x] Start and pause controls
- [x] Rotation
- [x] Drop
- [x] Level based speed increase
- [x] Instructions on how to play

#### Tetrimino Rotate

Breaking the rotate functionality into several small methods made determining if a rotation could be made. The spin method determines if it is possible. First it gets the new coordinates of where the piece would be rotated to based on which direction the rotation is going. It then checks to see if the new coordinates are empty on the board and that the rotation would not put the tetrimino outside the board. If all of these conditions are met then the piece will be rotated.


```JavaScript
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
```

#### Piece

The key to making rotation simple was to have each piece know where it is on the board and having a center point to rotate around. When a new piece is created it knows it's starting location and what it's center point is.

#### Pause, Start, and Restart

Getting the stopping and starting just right was one of the hardest parts about doing this project. It was achieved by creating variables to hold the interval at which the piece falls and with 2 variables that know when the game is running or paused.

```JavaScript
start(){
  this.game.clear();
  this.running = true;

  this.interval = setInterval(() => {
    this.game.move();
  }, this.intervalSpeed);

  requestAnimationFrame(this.animate.bind(this));
}
```

One of the key parts to pausing the game is to alter the modal that appears. I did this by changing the styling on the fly.

```JavaScript
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
    this.modal.style.display = "flex";
    document.getElementById('modal-text').innerHTML = "Paused<br>Press 'P' to Unpause";
    this.paused = true;
  }
  break;
```

#### Future Development

- [ ] Add score
- [ ] Allow a user to pick a starting level
- [ ] Add animations for making it through so many levels
