function entityPush(e1,e2) {
  if (e1.hits(e2)) {
    if (e2.isSolid) {
      if (e2.isMovable) {
        if (e1.canPush) { // PUSH
          if (e1.d == "RIGHT") { e2.pos.x += e1.vel; }
          else if (e1.d == "LEFT") { e2.pos.x -= e1.vel; }
          else if (e1.d == "UP") { e2.pos.y -= e1.vel; }
          else if (e1.d == "DOWN") { e2.pos.y += e1.vel; }
        }
      } else if (e2.isDiggable) { // DIG
        if (e1.canDig) {
          // digBlock.play();
          if (e1.d == "RIGHT") { e2.pos.x -= e1.vel+1; }
          else if (e1.d == "LEFT") { e2.pos.x += e1.vel+1; }
          else if (e1.d == "UP") { e2.pos.y += e1.vel+1; }
          else if (e1.d == "DOWN") { e2.pos.y -= e1.vel+1; }
        }
      } else { // SOLID
        e1.isMoving = false;
        if (e1.d == "RIGHT") { e1.pos.x -= e1.vel+2; }       // IF YOU WANT TO LIFT SOMETHING OR MOVE IT => if (e1.d == "RIGHT") { e1.isMoving = false; e2.pos.x -= e1.vel+force; }
        else if (e1.d == "LEFT") { e1.pos.x += e1.vel+2; }
        else if (e1.d == "UP") { e1.pos.y += e1.vel+2; }
        else if (e1.d == "DOWN") { e1.pos.y -= e1.vel+3; }   // IF YOU WANT TO MAKE A ZIPPY => else if (e1.d == "DOWN") { e1.isMoving = false; e1.pos.y += e1.vel+force; }
        // }
      }
    }
  }
}


function entityHit(e1,e2,force) {
  if (force == undefined) { force = 0; }
  if (e1.hits(e2)) {
    if (e1.d == "RIGHT") { e2.pos.x += blockSize+force; }
    else if (e1.d == "LEFT") { e2.pos.x -= blockSize+force; }
    else if (e1.d == "UP") { e2.pos.y -= blockSize+force; }
    else if (e1.d == "DOWN") { e2.pos.y += blockSize+force; }
  }
}


function newCoordsFromDir(dir) {
  var newCoords = loadedZone.coordinates.slice();
  if (dir == "LEFT") {
    newCoords[0] -= 1;
  }
  if (dir == "RIGHT") {
    newCoords[0] += 1;
  }
  if (dir == "TOP") {
    newCoords[1] -= 1;
  }
  if (dir == "BOTTOM") {
    newCoords[1] += 1;
  }
  return newCoords;
}


function getRegionFromCoords(coordinates) {
  var results;
  var x = coordinates[0];
  var y = coordinates[1];
  if (y < worldHeight/2 && x < worldWidth/2) { results = 'north west'; }
  if (y < worldHeight/2 && x >= worldWidth/2) { results = 'north east'; }
  if (y >= worldHeight/2 && x < worldWidth/2) { results = 'south west'; }
  if (y >= worldHeight/2 && x >= worldWidth/2) { results = 'south east'; }
  if (x < (worldWidth/2)+(worldWidth/4) && x > (worldWidth/2)-(worldWidth/4) && y < (worldHeight/2)+(worldHeight/4) && y > (worldHeight/2)-(worldHeight/4)) { results = 'central '+results; }
  return results
}
