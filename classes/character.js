function Character() {
  this.pos = createVector(width / 2, height / 2);
  this.r = blockSize/2;
  this.isMoving = false;
  this.d = 'STILL';
  this.last_d = 'DOWN';
  this.vel = 5;
  this.health = [];
  this.isAlive = true;
  this.coins = 0;
  this.keys = 0;
  this.invincibleCount = 0 ;
  this.isInvincible = false;
  this.primeColor = BLACK;
  this.weapon = {};
  this.weaponCount = 0;
  this.weaponUsed = false;
  this.ac = 0;
  this.burndownBar = {};
  this.isBurningDown = true;
  this.burndownFactor = 2;
  this.burndownCount = 0;
  this.canDig = false;
  this.canPush = false;

  this.look = function() {
    noStroke();

    fill(this.primeColor);
    rect(this.pos.x,this.pos.y,this.r*2,this.r*2);
    if (this.d == 'DOWN' || this.d == 'STILL') {
      fill(BROWN);
      rect(this.pos.x,this.pos.y,this.r*2,this.r*2/2);
      fill(LIGHT_TAN);
      rect(this.pos.x,this.pos.y+this.r*2/2,pixelSize,pixelSize);
      rect(this.pos.x+pixelSize*3,this.pos.y+this.r*2/2,pixelSize,pixelSize);
      fill(LIGHT_TAN);
      rect(this.pos.x+pixelSize,this.pos.y+pixelSize,pixelSize,pixelSize);
      rect(this.pos.x+this.r*2/2,this.pos.y+pixelSize,pixelSize,pixelSize);
    } else if (this.d == 'UP') {
      fill(BROWN);
      rect(this.pos.x,this.pos.y,this.r*2,this.r*2/2);
    } else if (this.d == 'RIGHT') {
      fill(BROWN);
      rect(this.pos.x,this.pos.y,this.r*2,this.r*2/2);
      fill(LIGHT_TAN);
      rect(this.pos.x+this.r*2/2,this.pos.y+this.r*2/2,pixelSize,pixelSize);
      rect(this.pos.x+pixelSize,this.pos.y+this.r*2/2,pixelSize,pixelSize);
      fill(LIGHT_TAN);
      rect(this.pos.x+pixelSize*2,this.pos.y+pixelSize,pixelSize,pixelSize);
      rect(this.pos.x+pixelSize*3,this.pos.y+pixelSize,pixelSize,pixelSize);
    } else if (this.d == 'LEFT') {
      fill(BROWN);
      rect(this.pos.x,this.pos.y,this.r*2,this.r*2/2);
      fill(LIGHT_TAN);
      rect(this.pos.x+this.r*2/2,this.pos.y+this.r*2/2,pixelSize,pixelSize);
      rect(this.pos.x+pixelSize,this.pos.y+this.r*2/2,pixelSize,pixelSize);
      fill(LIGHT_TAN);
      rect(this.pos.x,this.pos.y+pixelSize,pixelSize,pixelSize);
      rect(this.pos.x+pixelSize,this.pos.y+pixelSize,pixelSize,pixelSize);
    }
  }

  this.power = function() {
    return (this.burndownBar.percent)/100
  }

  this.explode = function() {
    createDebris(this.pos,randomInt(-25,25),6,this.primeColor);
  }

  this.update = function() {
    if (this.isMoving) {
      this.move();
    }
    if (this.isInvincible) {
      this.primeColor = COLORS[randomInt(0,COLORS.length)];
      this.invincibleCount += 1;
      if (this.invincibleCount >= 100) {
        this.isInvincible = false;
        this.invincibleCount = 0;
        this.primeColor = BLACK;
      }
    }
    if (this.weaponUsed) {
      this.weaponCount += 1;
      this.moving(false);
      // console.log(keyCodeMap)
      if (this.weaponCount >= 10) {
        this.weaponUsed = false;
        this.weaponCount = 0;
        this.isBurningDown = true;
        this.burndownCount = 0;
      }
    } else {
      this.weapon.pos = this.pos;
    }

    this.burndown();

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

  this.useWeapon = function() {
    this.weaponUsed = true;
    if (this.last_d == 'RIGHT') {
      this.weapon.pos = createVector(this.pos.x + this.r*2, this.pos.y);
    } else if (this.last_d == 'LEFT') {
      this.weapon.pos = createVector(this.pos.x - this.r*2, this.pos.y);
    } else if (this.last_d == 'DOWN') {
      this.weapon.pos = createVector(this.pos.x, this.pos.y + this.r*2);
    } else if (this.last_d == 'UP') {
      this.weapon.pos = createVector(this.pos.x, this.pos.y - this.r*2);
    }

    if (!this.isBurningDown) {
      loadedZone.missiles.weapon.push(new Missile(this.weapon.pos, this.last_d));
    }

  }

  this.burndown = function() {;
    if (this.isBurningDown) {
      this.burndownCount += this.burndownFactor;
      if (this.burndownCount >= 100) {
        this.isBurningDown = false;
      }
    }
    character.burndownBar.percent = this.burndownCount;
    character.burndownBar.render();
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
  for (var i=0; i<startHealth; i++) {
    character.health.push(new Health(i));
  }
  character.weapon = createItem(startingSword);
  character.burndownBar = new Progressbar();
  character.burndownBar.h = 5;
  console.log(character);
}


function resetCharacter() {
  character.health = [];
  for (var i=0; i<startHealth/2; i++) {
    character.health.push(new Health(i));
  }
  if (character.coins > 0) { character.coins = round(character.coins/2); }
  character.last_d = 'DOWN';
  character.d = 'STILL';
  character.isAlive = true;
  character.isInvincible = false;
  character.burndownCount = 0;
  character.isBurningDown = true;
  character.pos = createVector(width/2,height/2);
  character.primeColor = BLACK;
  loadZone(defaultCoords);
  console.log(character);
}


function drawCharacter() {
  character.render();
  character.update();
  character.edges();

  character.weapon.d = character.last_d;
  if (character.weaponUsed) {
    character.weapon.render();
  } else {
    character.weapon.pos = createVector(-9999,-9999);
  }

  var clusters = loadedZone.blocks;
  for (var c in clusters) {
    var blocks = clusters[c];
    for (var b=0;b<blocks.length;b++) {
      var block = blocks[b];
      if (character.hits(block)) {
        if (!character.isInvincible) {
          if (block.type == "hole") { // HOLE
            loadZone(defaultCoords);
            character.pos = createVector(width/2,height/2);
            character.health.splice(0,1);
            character.isInvincible = true;
          }
        }
        if (block.type == "heart") {
          blocks.splice(b,1);
          if (character.health.length < healthMax) {
            character.health.push(new Health(character.health.length));
          }
        } else if (block.type == "coin") {
          blocks.splice(b,1);
          character.coins += itemTypes[block._id].value;
        } else if (block.type == "key") {
          blocks.splice(b,1);
          hud.characterIconColor = block.innerColor;
          character.keys += 1;
        } else if (block.type == "door" && character.keys > 0) {
            character.keys -= 1;
            gameWon = true;
        } else {
          entityPush(character,block);
          // entityDig(character,block);
        }
      }

      var enemies = loadedZone.enemies;
      for (var e=0;e<enemies.length;e++) {
        var enemy = enemies[e];
        if (enemy.hits(block)) {
          if (block.type == "hole") {
            enemies.splice(e,1);
          } else {
            entityPush(enemy,block);
          }
        }
        if (character.weapon != {}) {
          if (!enemy.isInvincible) {
            if (character.weapon.hits(enemy)) {
              var damageDelt = character.weapon.damage*character.power();
              enemy.health -= damageDelt;
              enemy.isInvincible = true;
            }
            for (var m=0;m<loadedZone.missiles.weapon.length;m++) {
              var weaponMissile = loadedZone.missiles.weapon[m];
              if (weaponMissile.hits(enemy)) {
                var damageDelt = character.weapon.damage*character.power();
                enemy.health -= damageDelt/2;
                enemy.isInvincible = true;
                weaponMissile.explode();
              }
            }
            if (enemy.health <= 0) {
              enemy.explode(e);
            } else {
              entityHit(character.weapon,enemy,50);
            }
          }
        }
        if (!character.isInvincible) {
          if (character.hits(enemy)) {
            character.pos = createVector(character.pos.x-blockSize,character.pos.y-blockSize);
            character.health.splice(
              (character.ac+enemy.damage)*-1,
              character.ac+enemy.damage
            );
            // console.log(character.ac+enemy.damage)
            character.isInvincible = true;
            entityPush(character,enemy);
          }
        }
      }
    }
  }
}
