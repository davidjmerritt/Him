function entityPush(e1,e2) {
  if (e1.hits(e2)) {
    if (e2.isSolid) {
      if (e2.isMovable) {
        if (e1.canPush) {
          if (e1.d == "RIGHT") { e2.pos.x += e1.r; }
          else if (e1.d == "LEFT") { e2.pos.x -= e1.r; }
          else if (e1.d == "UP") { e2.pos.y -= e1.r; }
          else if (e1.d == "DOWN") { e2.pos.y += e1.r; }
        }
      } else if (e2.isDiggable) {
        if (e1.canDig) {
          if (e1.d == "RIGHT") { e2.pos.x -= e1.vel+1; }
          else if (e1.d == "LEFT") { e2.pos.x += e1.vel+1; }
          else if (e1.d == "UP") { e2.pos.y += e1.vel+1; }
          else if (e1.d == "DOWN") { e2.pos.y -= e1.vel+1; }
        }
      } else {
        e1.isMoving = false;
        if (e1.d == "RIGHT") { e1.isMoving = false; e1.pos.x -= e1.vel; }       // IF YOU WANT TO LIFT SOMETHING OR MOVE IT => if (e1.d == "RIGHT") { e1.isMoving = false; e2.pos.x -= e1.vel+force; }
        else if (e1.d == "LEFT") { e1.isMoving = false; e1.pos.x += e1.vel; }
        else if (e1.d == "UP") { e1.isMoving = false; e1.pos.y += e1.vel; }
        else if (e1.d == "DOWN") { e1.isMoving = false; e1.pos.y -= e1.vel; }   // IF YOU WANT TO MAKE A ZIPPY => else if (e1.d == "DOWN") { e1.isMoving = false; e1.pos.y += e1.vel+force; }
      }
    }
  }
}


function entityDig(e1,e2,force) {
  if (e1.canDig) {
    if (force == undefined) { force = 0; }
    if (e1.hits(e2)) {
      if (e1.d == "RIGHT") { e2.pos.x -= e1.vel+force; }
      else if (e1.d == "LEFT") { e2.pos.x += e1.vel+force; }
      else if (e1.d == "UP") { e2.pos.y += e1.vel+force; }
      else if (e1.d == "DOWN") { e2.pos.y -= e1.vel+force; }
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


function createMatrix(w,h) {
  var matrix = [];
  for (r=0;r<w;r++) {
    for (c=0;c<h;c++) {
      matrix.push([r, c]);
    }
  }
  return matrix
}
