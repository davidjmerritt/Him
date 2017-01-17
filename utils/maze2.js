function createMaze2(w,h) {
  var maze = {};
  var matrix = createMatrix(w,h);
  for (var i = 0; i < matrix.length; i++) {
    var coords = [matrix[i][0],matrix[i][1]];
    var _id = coords.toString().replace(',','-');
    var walls = wallOptions[randomInt(0,wallOptions.length)].slice(0);

    // SET OUTER WALLS
    if (coords[0] == 0) { walls[0] = true; }
    if (coords[0] >= h) { walls[2] = true; }
    if (coords[1] == 0) { walls[3] = true; }
    if (coords[1] >= w) { walls[4] = true; }

    maze[_id] = { "_id": _id, "coords": coords, "walls": walls };
  }

  for (var i in maze) {
    var coords = maze[i].coords;

    // SET WALLS BETWEEN
    var top_id     = (coords[0])    +'-'+(coords[1]-1);
    var right_id   = (coords[0]+1)  +'-'+(coords[1]);
    var bottom_id  = (coords[0])    +'-'+(coords[1]+1)
    var left_id    = (coords[0]-1)  +'-'+(coords[1]);

    if (typeof maze[top_id] != "undefined" && typeof maze[right_id] != "undefined" && typeof maze[bottom_id] != "undefined" && typeof maze[left_id] != "undefined") {
      if (maze[i].walls[0] == true || maze[top_id].walls[2] == true) { // TOP WALL AND BOTTOM WALL OF ZONE ABOVE
        maze[i].walls[0] == true;
        maze[top_id].walls[2] == true;
      }

      if (maze[i].walls[1] == true || maze[right_id].walls[3] == true) { // RIGHT WALL AND LEFT WALL OF ZONE TO RIGHT
        maze[i].walls[1] == true;
        maze[right_id].walls[3] == true;
      }

      if (maze[i].walls[2] == true || maze[bottom_id].walls[0] == true) { // BOTTOM WALL AND TOP WALL OF ZONE BELOW
        maze[i].walls[2] == true;
        maze[bottom_id].walls[0] == true;
      }

      if (maze[i].walls[3] == true || maze[left_id].walls[1] == true) { // LEFT WALL AND RIGHT WALL OF ZONE TO LEFT
        maze[i].walls[3] == true;
        maze[left_id].walls[1] == true;
      }
    }
  }

  return maze;
}

var wallOptions = [
  [true,true,true,true],
  [true,false,true,true],
  [true,true,false,true],
  [true,true,true,false],
  [true,false,true,false],
  [false,true,false,true],
  [false,true,true,false],
  [true,false,false,false],
  [true,true,true,false],
  [true,true,false,false],
  [true,false,false,false],
  [false,false,false,false],
  [false,true,false,false],
  [false,false,true,false],
  [true,false,false,true],
  [false,true,true,false],
];
