missileTypes = [
  {"_id":0, "type":"magic","innerColor": LIGHT_BLUE,"secondaryColor":LIGHT_GREEN,"tertiaryColor":WHITE,"movable": false,"solid": false, "damage":0.5,"rarity":1,"value":1,"decays":true,"size":[3,1]},
  {"_id":1, "type":"fireball","innerColor": RED,"secondaryColor":ORANGE,"tertiaryColor":YELLOW,"movable": false,"solid": false, "damage":3,"rarity":1,"value":1,"decays":true,"size":[3,3]},
];

function Missile(_id, pos, d, origin, sizeOffset) {
  this._id = _id;
  this.pos = pos.copy();
  this.vel = 10;
  this.d = d;
  this.r = pixelSize*3;
  this.origin = origin;
  this.sizeOffset = missileTypes[this._id].size;
  this.innerColor = missileTypes[this._id].innerColor;
  this.secondaryColor = missileTypes[this._id].secondaryColor;
  this.tertiaryColor = missileTypes[this._id].tertiaryColor;
  this.rotateCount = 0;
  this.spinFactor = 1;
  this.damage = missileTypes[this._id].damage;

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
    var index = loadedZone.missiles[this.origin].indexOf(this);
    loadedZone.missiles[this.origin].splice(index,1);
    // createDebris(this.pos, 10, 10, GREEN);
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
    var index = loadedZone.missiles[this.origin].indexOf(this);
    if (this.pos.x > appWidth + this.r) { // RIGHT
      loadedZone.missiles[this.origin].splice(index,1);
    } else if (this.pos.x < -this.r) { // LEFT
      loadedZone.missiles[this.origin].splice(index,1);
    } else if (this.pos.y > appHeight + this.r) { // BOTTOM
      loadedZone.missiles[this.origin].splice(index,1);
    } else if (this.pos.y < -this.r) { // TOP
      loadedZone.missiles[this.origin].splice(index,1);
    }
  }

  this.look = function() {
    noStroke();
    if (missileTypes[this._id].type == "magic") {
      fill(COLORS[randomInt(0,COLORS.length)]);
      if (this.d == 'RIGHT' || this.d == 'LEFT') {
        rect(
          this.pos.x,
          this.pos.y+pixelSize*1.5,
          pixelSize*this.sizeOffset[0],
          pixelSize*this.sizeOffset[1]
        );
      } else {
        rect(
          this.pos.x+pixelSize*1.5,
          this.pos.y,
          pixelSize*this.sizeOffset[1],
          pixelSize*this.sizeOffset[0]
        );
      }
    } else if (missileTypes[this._id].type == "fireball") {
      fill([this.innerColor,this.secondaryColor,this.tertiaryColor][randomInt(0,3)]);
      this.rotateCount += 1;
      if (this.rotateCount < 1*this.spinFactor) {
        if (this.d == 'RIGHT' || this.d == 'LEFT') {
          rect(this.pos.x,this.pos.y+pixelSize/1.5,pixelSize*this.sizeOffset[0],pixelSize*this.sizeOffset[1]);
        } else {
          rect(this.pos.x+pixelSize/1.5,this.pos.y,pixelSize*this.sizeOffset[0],pixelSize*this.sizeOffset[1]);
        }
      } else if (this.rotateCount >= 1*this.spinFactor && this.rotateCount < 2*this.spinFactor) {
        if (this.d == 'RIGHT' || this.d == 'LEFT') {
          rect(this.pos.x,this.pos.y+pixelSize*1.5,pixelSize*this.sizeOffset[1],pixelSize*this.sizeOffset[0]);
        } else {
          rect(this.pos.x+pixelSize*1.5,this.pos.y,pixelSize*this.sizeOffset[1],pixelSize*this.sizeOffset[0]);
        }
      } else if (this.rotateCount >= 2*this.spinFactor && this.rotateCount < 3*this.spinFactor) {
        if (this.d == 'RIGHT' || this.d == 'LEFT') {
          rect(this.pos.x,this.pos.y+pixelSize/1.5,pixelSize*this.sizeOffset[0],pixelSize*this.sizeOffset[1]);
        } else {
          rect(this.pos.x+pixelSize/1.5,this.pos.y,pixelSize*this.sizeOffset[0],pixelSize*this.sizeOffset[1]);
        }
      } else if (this.rotateCount >= 3*this.spinFactor && this.rotateCount < 4*this.spinFactor) {
        if (this.d == 'RIGHT' || this.d == 'LEFT') {
          rect(this.pos.x,this.pos.y+pixelSize*1.5,pixelSize*this.sizeOffset[1],pixelSize*this.sizeOffset[0]);
        } else {
          rect(this.pos.x+pixelSize*1.5,this.pos.y,pixelSize*this.sizeOffset[1],pixelSize*this.sizeOffset[0]);
        }
        this.rotateCount = 0;
      }
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
  for (var i=0; i < loadedZone.missiles.enemy.length; i++) {
    loadedZone.missiles.enemy[i].render();
    loadedZone.missiles.enemy[i].update();
    loadedZone.missiles.enemy[i].edges();
  }
}
