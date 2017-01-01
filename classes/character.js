function Character() {
  this.pos = createVector(width / 2, height / 2);
  this.r = blockSize/2;
  this.isMoving = false;
  this.d = 'STILL';
  this.vel = 5;
  this.health = [];
  this.isAlive = true;
  this.coins = 0;
  this.isInvincible = false;
  this.primeColor = BLACK;
  this.invincibleCount = 0 ;

  this.look = function() {
    fill(this.primeColor);
    stroke(this.primeColor);
    rect(
      this.pos.x,
      this.pos.y,
      this.r*2,
      this.r*2
    );
    fill(BROWN);
    stroke(BROWN);
    rect(
      this.pos.x,
      this.pos.y,
      this.r*2,
      this.r*2/2
    );
    fill(GRAY);
    stroke(GRAY);
    rect(
      this.pos.x+this.r*2/2,
      this.pos.y+this.r*2/2,
      this.r*2/4,
      this.r*2/4
    );
    fill(GRAY);
    stroke(GRAY);
    rect(
      this.pos.x+this.r*2/4,
      this.pos.y+this.r*2/2,
      this.r*2/4,
      this.r*2/4
    );
    fill(TAN);
    stroke(TAN);
    rect(
      this.pos.x+this.r*2/4,
      this.pos.y+this.r*2/4,
      this.r*2/4,
      this.r*2/4
    );
    fill(TAN);
    stroke(TAN);
    rect(
      this.pos.x+this.r*2/2,
      this.pos.y+this.r*2/4,
      this.r*2/4,
      this.r*2/4
    );
  }

  this.update = function() {
    if (this.isMoving) {
      this.move();
    }
    if (this.isInvincible) {
      this.primeColor = COLORS[randomInt(0,COLORS.length)];
      this.invincibleCount += 1;
      if (this.invincibleCount > 100) {
        this.isInvincible = false;
        this.invincibleCount = 0;
        this.primeColor = BLACK;
      }
    }
  }

  this.moving = function(b) {
    this.isMoving = b;
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
    }
  }

  this.dig = function() {
    var newBlock = new Block(6);
    if (this.d == 'RIGHT') {
      newBlock.pos = createVector(this.pos.x + this.r*3, this.pos.y);
    } else if (this.d == 'LEFT') {
      newBlock.pos = createVector(this.pos.x - this.r*3, this.pos.y);
    } else if (this.d == 'DOWN') {
      newBlock.pos = createVector(this.pos.x, this.pos.y + this.r*3);
    } else if (this.d == 'UP') {
      newBlock.pos = createVector(this.pos.x, this.pos.y - this.r*3);
    }
    world.zones[loadedZone._id].blocks.temporary.push(newBlock);
    p(world.zones[loadedZone._id])
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
      loadZone(newCoordsFromDir("RIGHT"),"RIGHT");
      this.pos.x = this.r*2;
      world.breadcrumbs.push(loadedZone._id);
    } else if (this.pos.x < -this.r) { // LEFT
      loadZone(newCoordsFromDir("LEFT"),"LEFT");
      this.pos.x = appWidth - this.r*2;
      world.breadcrumbs.push(loadedZone._id);
    }
    if (this.pos.y > appHeight + this.r) { // BOTTOM
      loadZone(newCoordsFromDir("BOTTOM"),"BOTTOM");
      this.pos.y = this.r*2;
      world.breadcrumbs.push(loadedZone._id);
    } else if (this.pos.y < -this.r) { // TOP
      loadZone(newCoordsFromDir("TOP"),"TOP");
      this.pos.y = appHeight - this.r*2;
      world.breadcrumbs.push(loadedZone._id);
    }
  }

  this.render = function() {
    push();
    this.look();
    pop();
  }
}


var character;


function createCharacter() {
  character = new Character();
  for (var i=0; i<3; i++) {
    character.health.push(new Health(i));
  }
  p(character);
}


function drawCharacter() {
  character.render();
  character.update();
  character.edges();
  drawHealth();

  var clusters = loadedZone.blocks;
  for (var c in clusters) {
    var blocks = clusters[c];
    for (var b=0;b<blocks.length;b++) {
      var block = blocks[b];
      if (character.hits(block)) {
        if (!character.isInvincible) {
          if (block._id == 6) { // HOLE
            loadZone(defaultCoords);
            character.pos = createVector(width/2,height/2);
            character.health.splice(0,1);
            character.isInvincible = true;
          }
        }
        if (block.type == "coin") { // COIN
          blocks.splice(b,1);
          hud.characterIconColor = YELLOW;
          character.coins += 1;
        } else if (block.type == "stairs" && character.coins > 0) { // STAIRS
            gameWon = true;
        } else {
          entityPush(character,block);
        }
      }

      var enemies = loadedZone.enemies;
      for (var e=0;e<enemies.length;e++) {
        var enemy = enemies[e];
        if (enemy.hits(block)) {
          if (block._id == 6) {
            enemies.splice(e,1);
          } else {
            entityPush(enemy,block);
          }
        }
        if (!character.isInvincible) {
          if (character.hits(enemy)) {
            character.pos = createVector(character.pos.x-blockSize,character.pos.y-blockSize);
            character.health.splice(0,1);
            character.isInvincible = true;
            entityPush(character,enemy);
          }
        }
      }

    }
  }
}
