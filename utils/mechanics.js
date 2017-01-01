function entityPush(e1,e2) {
  if (e1.hits(e2)) {
    if (e2.isSolid) {
      if (e2.isMovable) {
        if (e1.d == "RIGHT") { e2.pos.x += e1.r; }
        else if (e1.d == "LEFT") { e2.pos.x -= e1.r; }
        else if (e1.d == "UP") { e2.pos.y -= e1.r; }
        else if (e1.d == "DOWN") { e2.pos.y += e1.r; }
      } else {
        e1.isMoving = false;
        if (e1.d == "RIGHT") { e1.isMoving = false; e1.pos.x -= e1.vel; }
        else if (e1.d == "LEFT") { e1.isMoving = false; e1.pos.x += e1.vel; }
        else if (e1.d == "UP") { e1.isMoving = false; e1.pos.y += e1.vel; }
        else if (e1.d == "DOWN") { e1.isMoving = false; e1.pos.y -= e1.vel; }
      }
    }
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
