function Debris(pos, vel, col, damage, canDamage, sizeFactor) {
  if (sizeFactor == undefined) { sizeFactor = 1 ; }
  this.pos = pos.copy();
  this.vel = vel;
  this.col = col;
  this.offset = 10;
  this.w = pixelSize*sizeFactor;
  this.h = pixelSize*sizeFactor;
  this.r = this.w/2;
  this.transparency = 255;
  this.damage = damage;
  this.canDamage = canDamage;
  this.count = 0;

  this.update = function() {
    this.count += 1;
    if (this.canDamage) {
      this.transparency -= 10;
    }
    if (this.count <= 5) {
      this.pos = createVector(
        this.pos.x+random(-this.vel+this.offset,this.vel-this.offset),
        this.pos.y+random(-this.vel+this.offset,this.vel-this.offset)
      );
    }
    if (this.canDamage) {
      if (this.count >= this.vel) {
        this.transparency = 0;
        this.canDamage = false;
      }
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

  this.render = function() {
    noStroke();
    c = color(this.col[0], this.col[1], this.col[2], this.transparency);
    fill(c);
    rect(
      this.pos.x,
      this.pos.y,
      this.w,
      this.h
    );
    value = alpha(c);
    fill(value);
  }
}

function drawDebris() {
  for (var i=0;i<loadedZone.debris.length;i++) {
    loadedZone.debris[i].render();
    loadedZone.debris[i].update();
    if (loadedZone.debris[i].canDamage) {
      if (loadedZone.debris[i].hits(character)) {
        characterHit.play();
        if (character.health <= 3) { startLoop(lowHealth,1500,'lowHealth'); }

        character.pos = createVector(character.pos.x-blockSize,character.pos.y-blockSize);

        var damageTaken = character.ac+loadedZone.debris[i].damage;
        character.health -= damageTaken;
        character.isInvincible = true;
      }
    }

    if (loadedZone.debris[i].transparency == 0) {
      var debris_index = loadedZone.debris.indexOf(loadedZone.debris[i]);
      loadedZone.debris.splice(debris_index,1);
      character.tertiaryWeaponUsed = false;
    }
  }
}


function createDebris(pos, vel, n, col) {
  for (var i = 0; i < n; i++) {
    loadedZone.debris.push(new Debris(pos, vel, col));
  }
}


function createBombDebris(pos, vel, n, colors, damage) {
  for (var i = 0; i < n; i++) {
    // var col = colors[randomInt(0,colors.length)];
    var col = [RED,ORANGE,YELLOW,WHITE,DARKER_RED,DARK_RED][randomInt(0,4)];
    loadedZone.debris.push(new Debris(pos, vel, col, damage, true, 2));
  }
}

function createCharacterDebris(pos, colors) {
  for (var i = 0; i < 6; i++) {
    var col = colors[randomInt(0,colors.length)];
    loadedZone.debris.push(new Debris(pos, randomInt(-5,5), col, 0, false, 1.5));
  }
}
