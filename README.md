## Tetris

!
#### Background
Tetris is a classic game from the 1980's where tiles(tetriminos), made up of 4 squares, are arranged into a row. When a row is filled it is cleared. Tetriminos are randomly picked and slowly drop down until either hitting the base of the board or another tetrimino. The tetriminos slowly move faster as more lines are cleared. The game ends when the tetriminos are stacked all the way up and are outside the top of the board.

https://en.wikipedia.org/wiki/Tetris

Tetris has been one of my favorite games since I was a child. I have many great memories of playing the game with my Dad and other friends over the years. It is truly a timeless game and because of this I chose to remake it with my own twist. Panda themed!

(Image of panda goodness)


#### Functionality and MVP
This game will be able to do the following:

- [ ] Start and pause
- [ ] Rotate, drop, and increase the speed of the pieces as more lines are cleared
- [ ] Panda/Zen theme
- [ ] Instructions on how to play in the sidebar
- [ ] Production README

#### Wireframes
This app will be a single page with the center being the grid of the game. On the right side there will be a score, pause, and next piece display.

The game will respond to left and right to move the piece side to side and up to rotate the piece. Space bar will drop the piece.

![wireframe](/docs/wireframe.png)

#### Technologies
This game will be implemented with the following technologies:
- JavaScript
- Vanilla DOM for starting and pausing
- HTML5 Canvas for the drawing of pieces
- Webpack to bundle all the JS files into one file

#### Timeline
Day 1: Set up Webpack and Node. Outline a basic file structure and have the board being render on the screen by the end of the day. Have the instructions rendering, an outline of the board, and the preview square. Setup the pieces class to have a piece randomly selected.

Day 2: Learn more about how to use Canvas to make the pieces render with different panda faces. Have the random piece be rendered on the screen. Display the next piece in the preview box. Get the main game loop running. Get pieces to slowly move down, and have them stop correctly. Get key bindings working.

Day 3: Finish the rest of the controls(Rotate, Drop, Speed increase). Check to be sure that pieces stay within the walls when they are rotated by the edge. Check that when a line of pieces is filled it removes them.

Day 4: Get score working. Implement speed increase. Style. Wrap up an other lose ends.
