function Enemy() {
  this.pos = createVector(randomInt(blockSize*2,width-blockSize*2), randomInt(blockSize*2,height-blockSize*2));
  this.r = blockSize/2;
  this.isMoving = false;
  this.d = null;
  this.vel = 4;
  this.isMovable = false;
  this.isSolid = true;
  this.moveCount = 0;
  this.moveCountMax = 0;
  this.col = [BLUE,RED][randomInt(0,2)]
  if (this.col == BLUE) { this.vel *= 2; }

  this.look = function() {
    fill(this.col);
    stroke(this.col);
    rect(
      this.pos.x,
      this.pos.y,
      this.r*2,
      this.r*2
    );
    fill(BLACK);
    stroke(BLACK);
    rect(
      this.pos.x+this.r/2,
      this.pos.y+this.r/2,
      this.r/2,
      this.r/2
    );
    fill(BLACK);
    stroke(BLACK);
    rect(
      this.pos.x+this.r,
      this.pos.y+this.r/2,
      this.r/2,
      this.r/2
    );
  }

  this.move = function() {
    if (this.d == 'RIGHT')  {
      this.pos.x+= this.vel;
    } else if (this.d == 'LEFT') {
      this.pos.x -= this.vel;
    } else if (this.d == 'UP') {
      this.pos.y -= this.vel;
    } else if (this.d == 'DOWN') {
      this.pos.y += this.vel;
    } else if (this.d == 'STILL') {
      this.pos = this.pos;
    }
  }

  this.moving = function(b) {
    this.isMoving = b;
  }

  this.update = function() {
    this.moveCount += 1;
    if (this.moveCount > this.moveCountMax) {
      this.moveCountMax = randomInt(0,100);
      this.d = ["LEFT","RIGHT","UP","DOWN","STILL"][randomInt(0,4)];
      this.moveCount = 0;
    }
    this.move();

    if (this.hits(character)) {
      entityPush(this,character);
    }
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
      this.d = ['LEFT','STILL'][randomInt(0,2)];
    } else if (this.pos.x < -this.r) { // LEFT
      this.d = ['RIGHT','STILL'][randomInt(0,2)];
    }
    if (this.pos.y > appHeight + this.r) { // BOTTOM
      this.d = ['UP','STILL'][randomInt(0,2)];
    } else if (this.pos.y < -this.r) { // TOP
      this.d = ['DOWN','STILL'][randomInt(0,2)];
    }
  }

  this.render = function() {
    push();
    this.look();
    pop();
  }
}


function createEnemies(numberOfEnemies) {
  var enemies = [];
  for (var i=0;i<numberOfEnemies;i++) {
    enemies.push(new Enemy());
  }
  return enemies;
}


function drawEnemies() {
  for (var i=0;i<loadedZone.enemies.length;i++) {
    loadedZone.enemies[i].render();
    loadedZone.enemies[i].update();
    loadedZone.enemies[i].edges();
  }
}
