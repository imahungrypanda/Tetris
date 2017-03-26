## Tetris
#### Background
https://en.wikipedia.org/wiki/Tetris


#### Functionality and MVP
This game will be able to do the following:

- [ ] Start and pause
- [ ] Rotate, drop, and increase the speed of the pieces as more lines are cleared.
- [ ] Instructions on how to play in the sidebar
- [ ] Production README

#### Wireframes
This app will be a single page with the center being the grid of the game. On the right side there will be a score, pause, and next piece display.

The game will respond to left and right to move the piece side to side and up to rotate the piece. Space bar will drop the piece.

![wireframe](/docs/wireframe.png)

#### Technologies
This game will be implemented with the following technologies:
- Vanilla DOM for starting and pausing
- HTML5 Canvas for the drawing of pieces
- Webpack to bundle all the JS files into one file

#### Timeline
Day 1: Set up Webpack and Node. Outline a basic file structure and have something being render on the screen by the end of the day. Have the instructions rendering, an outline of the board, and the preview square.

Day 2: Learn more about how to use Canvas to make the pieces render. Have pieces randomly be selected. Get pieces to slowly move down, and have key bindings working.

Day 3: Finish the rest of the controls. Check to be sure that pieces stay within the walls when they are rotated by the edge. Check that when a line of pieces is filled it removes them.

Day 4: Implement speed increase. Style.
