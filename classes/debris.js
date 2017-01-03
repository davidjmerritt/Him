function Debris(pos, vel, col) {
  this.pos = pos;
  this.vel = vel;
  this.col = col;
  this.offset = 10;
  this.transparency = randomInt(5, 10);

  this.update = function() {
    this.transparency -= 1;
    if (this.transparency > 0) {
      this.pos = createVector(
        this.pos.x+random(-this.vel+this.offset,this.vel-this.offset),
        this.pos.y+random(-this.vel+this.offset,this.vel-this.offset)
      );
    }
  }

  this.render = function() {
    noStroke();
    fill(col);
    rect(
      this.pos.x,
      this.pos.y,
      pixelSize,
      pixelSize
    );
  }
}


function drawDebris() {
  for (var i=0;i<loadedZone.debris.length;i++) {
    loadedZone.debris[i].render();
    loadedZone.debris[i].update();
  }
}


function createDebris(pos, vel, n, col) {
  for (var i = 0; i < n; i++) {
    loadedZone.debris.push(new Debris(pos, vel, col));

  }
}
