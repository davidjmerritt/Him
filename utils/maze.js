var cols, rows;
var w = 20;
var grid = [];

var current;

var stack = [];
var maze = [];

var cols = 16//floor(width/w);
var rows = 8//floor(height/w);

for (var   j = 0; j < rows; j++) {
  for (var i = 0; i < cols; i++) {
    var cell = new Cell(i, j);
    grid.push(cell);
  }
}

function generateMaze(grid) {
  current = grid[120]; // 120 Default Zone "8-7" // 0 Default Start Cell "0-0"
  for (var x = 0; x < 128; x++) {
    current.visited = true;
    // STEP 1
    var next = current.checkNeighbors();
    if (next) {
      next.visited = true;
      // STEP 2
      stack.push(current);
      maze.push(current);
      // STEP 3
      removeWalls(current, next);
      // STEP 4
      current = next;
    } else if (stack.length > 0) {
      current = stack.pop();
    }
  }
}


function createMaze() {
  generateMaze(grid);
  for (var i = 0; i < maze.length; i++) {
    maze[i].visited = false;
  }



  // generateMaze(maze);
  // for (var i = 0; i < maze.length; i++) {
  //   maze[i].visited = false;
  // }
  // generateMaze(maze);
  // cleanUpMaze();
}


function cleanUpMaze() {
  var fullMazeIndex = [];
  var fullMatrixString = createMatrixString(cols,rows);
  var matrixCounter = {};
  var indexToDelete = [];

 // LOOP THROUGH MAZE
 for (var i = 0; i < maze.length; i++) { matrixCounter[maze[i].i+'-'+maze[i].j] = {}; }
 for (var i = 0; i < maze.length; i++) { matrixCounter[maze[i].i+'-'+maze[i].j]['index'] = []; }
 for (var i = 0; i < maze.length; i++) { matrixCounter[maze[i].i+'-'+maze[i].j]['count'] = 0; }
 // FOR EVERY CELL WITH I,J CREATE NEW LIST AND ADD 1
 for (var i = 0; i < maze.length; i++) { matrixCounter[maze[i].i+'-'+maze[i].j]['count'] += 1; matrixCounter[maze[i].i+'-'+maze[i].j]['index'].push(i); }

// REMOVE FIRST OCCURANCE OF AND CELL FROM COUNTER
 for (i in matrixCounter) {
   if (matrixCounter[i].index.length > 1) {
      matrixCounter[i].index.splice(0,1);
   }
 }

 // LOOP THROUGH REMAINING COORDS AND ADD INDEXES TO NEW LIST MARKED FOR DELETION
 for (i in matrixCounter) {
   for (var j = 0; j < matrixCounter[i].index.length; j++) {
     indexToDelete.push(matrixCounter[i].index[j])
   }
 }

 // DELETE ALL REDUNDANT
 for (var i = 0; i < indexToDelete.length; i++) {
   maze.splice(maze[indexToDelete[i]],1);
 }

for (var i = 0; i < maze.length; i++) {
  fullMazeIndex.push(maze[i].i+'-'+maze[i].j);
}

 //
 // for (var i = 0; i < fullMatrixString.length; i++) {
 //   if (fullMazeIndex.indexOf(fullMatrixString[i]) > -1) { } else {
 //     var coords = fullMatrixString[i].split("-");
 //     var cell = new Cell(coords[0], coords[1]);
 //     cell.walls = [false,false,false,false];
 //     maze.push(cell);
 //   }
 // }

// for (var i = 0; i < maze.length; i++) {
//   if ()
// }



 // console.log(fullMazeIndex,fullMatrixString)


 // ADD WALLS TO SPACES THAT DONT EXIST
 for (var i = 0; i < maze.length; i++) {
   var top    = (maze[i].i,maze[i].j-1);
   var right  = (maze[i].i+1,maze[i]);
   var bottom = (maze[i].i,maze[i]+1);
   var left   = (maze[i].i-1,maze[i]+1);
 }

}


function index(i, j) {
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
    return -1;
  }
  return i + j * cols;
}


function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow

// Videos
// https://youtu.be/HyK_Q5rrcr4
// https://youtu.be/D8UgRyRnvXU
// https://youtu.be/8Ju_uxJ9v44
// https://youtu.be/_p5IH0L63wo

// Depth-first search
// Recursive backtracker
// https://en.wikipedia.org/wiki/Maze_generation_algorithm

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;

  this.checkNeighbors = function() {
    var neighbors = [];

    var top    = grid[index(i, j -1)];
    var right  = grid[index(i+1, j)];
    var bottom = grid[index(i, j+1)];
    var left   = grid[index(i-1, j)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      var r = randomInt(0, neighbors.length);
      return neighbors[r];
    } else {
      return undefined;
    }


  }
  this.highlight = function() {
    var x = this.i*w;
    var y = this.j*w;
    noStroke();
    // fill(0, 0, 255, 100);
    rect(x, y, w, w);

  }

  this.show = function() {
    var w = 7*2;
    // console.log(w)
    var x = (this.i*w)+15;
    var y = (this.j*w)+15;

    stroke(BLACK);
    noFill()
    if (this.walls[0]) {
      line(x    , y    , x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y    , x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x    , y + w);
    }
    if (this.walls[3]) {
      line(x    , y + w, x    , y);
    }

    // if (!this.visited) {
    //   noStroke();
    //   fill(255, 0, 255, 100);
    //   rect(x, y, w, w);
    // }
  }
}
