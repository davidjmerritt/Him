function Missile(pos, d) {
  this._id = 0;
  this.pos = pos.copy();
  this.vel = 10;
  this.d = d;
  this.r = pixelSize*3;

  this.update = function(d) {
    if (this.d == 'RIGHT') {
      this.pos.x += this.vel;
    } else if (this.d == 'LEFT') {
        this.pos.x -= this.vel;
    } else if (this.d == 'UP') {
        this.pos.y -= this.vel;
    } else if (this.d == 'DOWN') {
        this.pos.y += this.vel;
    }
  }

  this.explode = function() {
    loadedZone.missiles.weapon.splice(this._id,1);
  }

  this.hits = function(entity) {
    var d = dist(this.pos.x, this.pos.y, entity.pos.x, entity.pos.y);
    if (d < (this.r + entity.r)) {
      return true;
    } else {
      return false;
    }
  }

  this.edges = function() {
    if (this.pos.x > appWidth + this.r) { // RIGHT
      loadedZone.missiles.weapon.splice(this._id,1);
    } else if (this.pos.x < -this.r) { // LEFT
      loadedZone.missiles.weapon.splice(this._id,1);
    } else if (this.pos.y > appHeight + this.r) { // BOTTOM
      loadedZone.missiles.weapon.splice(this._id,1);
    } else if (this.pos.y < -this.r) { // TOP
      loadedZone.missiles.weapon.splice(this._id,1);
    }
  }

  this.look = function() {
    noStroke();
    fill(COLORS[randomInt(0,COLORS.length)]);
    if (this.d == 'RIGHT' || this.d == 'LEFT') {
      rect(
        this.pos.x,
        this.pos.y+pixelSize*1.5,
        this.r,
        pixelSize
      );
    } else {
      rect(
        this.pos.x+pixelSize*1.5,
        this.pos.y,
        pixelSize,
        this.r
      );
    }
  }

  this.render = function() {
    push();
    this.look();
    pop();
  }
}


function drawMissiles() {
  for (var i=0; i < loadedZone.missiles.weapon.length; i++) {
    loadedZone.missiles.weapon[i].render();
    loadedZone.missiles.weapon[i].update();
    loadedZone.missiles.weapon[i].edges();
  }
}
