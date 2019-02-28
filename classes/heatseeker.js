var heatseekerTypes = [
  { "_id":0,"type":"boomerang","primaryColor":YELLOW,"apex":150 },
  { "_id":1,"type":"magic-boomerang","primaryColor":COOL_BLUE,"apex":600 }
];


function Heatseeker(pos,dir,launchPos) {
  this._id = 0;
  this.type = heatseekerTypes[this._id].type;
  this.r = pixelSize;
  this.d = dir;
  this.pos = pos.copy();
  this.vel = createVector();
  this.acc = createVector();
  this.speed = 1;
  this.x_heading = 0;
  this.y_heading = 0;
  this.apex = heatseekerTypes[this._id].apex;
  this.launchPos = launchPos;
  this.easing = 0.005;
  this.returnCount = 0;
  this.isSolid = true;
  this.isMovable = true;
  this.returning = false;
  this.rotateCount = 0;
  this.spinFactor = 8;
  this.primaryColor = heatseekerTypes[this._id].primaryColor;

  this.movement = function() {
    if (this.d == 'RIGHT') { this.x_heading = this.speed; }
    if (this.d == 'LEFT') { this.x_heading = -this.speed; }
    if (this.d == 'UP') { this.y_heading = -this.speed; }
    if (this.d == 'DOWN') { this.y_heading = this.speed; }
  }

  this.hasApexed = function() {
    var d = dist(this.pos.x, this.pos.y, character.pos.x, character.pos.y);
    if (d > this.apex) {
      this.returnCount += 1;
      return true;
    } else {
      return false;
    }
  }

  this.edges = function() {
    // this.x_heading = (width/2-this.pos.x) * this.easing;
    // this.y_heading = (height/2-this.pos.y) * this.easing;
    this.x_heading = (character.pos.x-this.pos.x) * this.easing;
    this.y_heading = (character.pos.y-this.pos.y) * this.easing;
  }

  this.hits = function(entity) {
    var d = dist(this.pos.x, this.pos.y, entity.pos.x, entity.pos.y);
    if (d < (this.r*2 + entity.r)) {
      return true;
    } else {
      return false;
    }
  }

  this.update = function() {
    // console.log(this.hasApexed())
    this.returning = this.hasApexed();
    if (this.returnCount > 100) { this.pos = character.pos.copy(); }
    if (this.returning) {
      this.speed = 0.01;
      this.easing = 0.003;
      this.edges(character);
    } else {
      if (this.returnCount < 1) {
        this.movement();
      }
    }

    this.acc = createVector(this.x_heading,this.y_heading);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }

  this.look = function() {
    noStroke();
    fill(this.primaryColor);
    this.rotateCount += 1;

    if (this.rotateCount < 1*this.spinFactor) {
      rect(this.pos.x,this.pos.y,pixelSize*2,pixelSize);
      rect(this.pos.x,this.pos.y,pixelSize,pixelSize*2);
    } else
    if (this.rotateCount >= 1*this.spinFactor && this.rotateCount < 2*this.spinFactor) {
      rect(this.pos.x,this.pos.y+pixelSize,pixelSize*2,pixelSize);
      rect(this.pos.x,this.pos.y,pixelSize,pixelSize*2);
    } else
    if (this.rotateCount >= 2*this.spinFactor && this.rotateCount < 3*this.spinFactor) {
      rect(this.pos.x,this.pos.y,pixelSize*2,pixelSize);
      rect(this.pos.x+pixelSize,this.pos.y,pixelSize,pixelSize*2);

    } else
    if (this.rotateCount >= 3*this.spinFactor && this.rotateCount < 4*this.spinFactor) {
      rect(this.pos.x,this.pos.y+pixelSize,pixelSize*2,pixelSize);
      rect(this.pos.x+pixelSize,this.pos.y,pixelSize,pixelSize*2);
      this.rotateCount = 0;
    }
  }

  this.render = function() {
    push();
    this.look();
    pop();
  }
}
