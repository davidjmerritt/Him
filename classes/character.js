function Character() {
  this.pos = createVector(width / 2, height / 2);
  this.r = blockSize/2;
  this.isMoving = false;
  this.d = 'STILL';
  this.last_d = 'DOWN';
  this.vel = 3.5;
  this.health = 0;
  this.isAlive = true;
  this.coins = 0;
  this.keys = 0;
  this.hasMasterKey = false;
  this.invincibleCount = 0 ;
  this.isInvincible = false;
  this.primeColor = BLACK;
  this.hasWeapon = false;
  this.weapon = false;
  this.weaponCount = 0;
  this.weaponUsed = false;
  this.ac = 0;
  this.burndownBar = {};
  this.isBurningDown = true;
  this.burndownFactor = 0;
  this.burndownCount = 0;
  this.canDig = true;
  this.canPush = true;
  this.hasCompass = false;
  this.hasMap = false;
  this.wallHitCount = 0;
  this.sizeOffset = [1,1];
  this.enteringPortal = false;
  this.isSolid = true;
  this.isMovable = true;
  this.secondaryWeapon = {"type":null,"_id":null};
  this.hasSecondaryWeapon = false;
  this.secondaryWeaponUsed = false;
  this.secondaryWeaponOut = false;
  this.secondaryWeaponCount = 0;
  this.aim;
  this.tertiaryWeapon = {"type":"bomb","_id":null};
  this.tertiaryWeaponUsed = false;
  this.hasTertiaryWeapon = false;
  this.bombs = 0;

  this.damageDelt = function() {
    var damage = character.weapon.damage*character.power();
    // console.log(damage,character.weapon.damage,character.power());
    return damage;
  }

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
    createDebris(this.pos,randomInt(-2,2),5,RED);
    createCharacterDebris(this.pos,[this.primeColor,BROWN,LIGHT_TAN]);
  }

  this.update = function() {
    if (character.health > 3) {
      stopLoop(lowHealth,'lowHealth');
    }

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
    if (this.hasWeapon && this.weaponUsed) {
      this.weaponCount += 1;
      this.moving(false);
      if (this.weaponCount >= 10) {
        this.weaponUsed = false;
        this.weaponCount = 0;
        this.isBurningDown = true;
        this.burndownCount = 0;
        this.moving(true);
      }
    } else {
      this.weapon.pos = this.pos.copy();
    }

    if (this.hasSecondaryWeapon && this.secondaryWeaponUsed) {
      this.secondaryWeaponCount += 1;
      this.moving(false);
      if (this.secondaryWeaponCount >= 10) {
        this.secondaryWeaponUsed = false;
        this.secondaryWeaponCount = 0;
        this.moving(true);
      }
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
    if (this.hasWeapon) {
      if (this.weapon._id == 4) { swordSlash1.play(); swordSlash1.setVolume(0.5); } else
      if (this.weapon._id == 7) { swordSlash2.play(); swordSlash2.setVolume(0.5); } else
      if (this.weapon._id == 8) { swordSlash3.play(); swordSlash3.setVolume(0.5); } else
      if (this.weapon._id > 8) { swordSlash4.play(); swordSlash4.setVolume(0.5); }
    }
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
    if (!this.isBurningDown && this.health == totalHealth && character.hasWeapon) {
      swordBeam.play();
      loadedZone.missiles.weapon.push(new Missile(this.weapon.pos, this.last_d, "weapon", this.sizeOffset));
    }
  }

  this.useSecondaryWeapon = function() {
    if (this.hasSecondaryWeapon && heatseekerTypes[this.secondaryWeapon._id].type == "boomerang") {
      this.secondaryWeaponUsed = true;
      if (!this.secondaryWeaponOut) {
        startLoop(boomerang,100,'boomerang');
        var pos = this.pos.copy();

        if (this.last_d == 'RIGHT') {
          pos.x += this.r*2;
          pos.y += this.r-pixelSize/2;
        } else
        if (this.last_d == 'LEFT') {
          pos.x -= this.r*2;
          pos.y += this.r-pixelSize/2;
        } else
        if (this.last_d == 'UP') {
          pos.x += this.r-pixelSize/2;
          pos.y -= this.r*2;
        } else
        if (this.last_d == 'DOWN') {
          pos.x += this.r-pixelSize/2;
          pos.y += this.r*2;
        }

        var launchPos = pos.copy();
        this.secondaryWeapon = new Heatseeker(pos, this.last_d,launchPos);
        this.secondaryWeaponOut = true;
      }
    }
  }

  this.useTertiaryWeapon = function() {
    this.tertiaryWeaponUsed = true;
    if (this.hasTertiaryWeapon) {
      if (character.bombs > 0) {
        var bomb = new Bomb(this.pos,this.d, 0);
        bomb.set();
        loadedZone.bombs.push(bomb);
        character.bombs -= 1;
      }
    }
  }

  this.burndown = function() {;
    if (this.isBurningDown) {
      this.burndownCount += this.burndownFactor;
      if (this.burndownCount >= 100) {
        burnDownPeak.play(); burnDownPeak.setVolume(0.3);
        this.isBurningDown = false;
      }
    }
    character.burndownBar.percent = this.burndownCount;
    // ** render() is called in hud so it shops above all other elements **
    character.burndownBar.update(character.burndownBar.percent);
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
    if (this.pos.x > appWidth) { // RIGHT
      loadZone(newCoordsFromDir("RIGHT"),"RIGHT");
      world.breadcrumbs.push(loadedZone.coordinates);
      this.pos.x = this.r*2;
    } else if (this.pos.x < 0) { // LEFT
      loadZone(newCoordsFromDir("LEFT"),"LEFT");
      this.pos.x = appWidth - this.r*2;
      world.breadcrumbs.push(loadedZone.coordinates);
    } else if (this.pos.y > appHeight) { // BOTTOM
      if (STATE == 'SHOP') { // EXIT PORTAL
        caveTrack.stop();
        overworldTrack.loop(); overworldTrack.setVolume(0.3);
        this.enteringPortal = false;
        this.pos = createVector(width-(blockSize*3)-(blockSize/2),blockSize);
        STATE = "OVERWORLD";
        loadZone(loadedZone.coordinates);
      } else {
        loadZone(newCoordsFromDir("BOTTOM"),"BOTTOM");
        this.pos.y = this.r*2;
        world.breadcrumbs.push(loadedZone.coordinates);
      }
    } else if (this.pos.y < 0) { // TOP
      if (this.enteringPortal) { // ENTER PORTAL
        this.pos = createVector(width/2,appHeight-this.r*3);
        STATE = "SHOP";
        loadShop(loadedZone.coordinates);
      } else {
        loadZone(newCoordsFromDir("TOP"),"TOP");
        this.pos.y = appHeight - this.r*3;
        world.breadcrumbs.push(loadedZone.coordinates);
      }
    }
  }

  this.isFacing = function(entity) {
    if (this.d == 'RIGHT' && entity.d == 'LEFT') { return true; } else
    if (this.d == 'LEFT' && entity.d == 'RIGHT') { return true; } else
    if (this.d == 'UP' && entity.d == 'DOWN') { return true; } else
    if (this.d == 'DOWN' && entity.d == 'UP') { return true; } else {
      return false;
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
  character.healthBar = new Progressbar(blockSize*5,15,progressBarWidth,pixelSize*2);
  // character.healthBar = new Progressbar(appWidth-progressBarWidth-blockSize-25,15,progressBarWidth,pixelSize*1.5);
  character.healthBar.fillCol = [255, 0, 0, 200];
  character.healthBar.backCol = [0, 0, 0, 75];
  character.health = startHealth;
  // character.weapon = createItem(startingSword);
  character.burndownBar = new Progressbar(blockSize*5,15+pixelSize*2,progressBarWidth,pixelSize/4);
  character.burndownBar.fillCol = [0, 100, 255, 200];
  character.burndownBar.backCol = [0, 0, 0, 100];
  console.log(character);
}


function resetCharacter(TYPE) {
  character.health = startHealth;
  character.last_d = 'DOWN';
  character.d = 'STILL';
  character.isMoving = false;
  keyCodeMap = [];
  character.isAlive = true;
  character.isInvincible = false;
  character.burndownCount = 0;
  character.isBurningDown = true;
  character.primeColor = BLACK;

  character.pos = createVector(width/2,height/2);
  if (world.lastShop == undefined) { loadZone(defaultCoords); } else { loadZone(world.lastShop); }

  respawnEnemies();
  world.coinsInWorld = countCoinsInWorld();
  console.log(character);
}


function drawCharacter() {
  character.render();
  character.update();
  character.edges();

  drawNPCs();

  character.weapon.d = character.last_d;
  if (character.hasWeapon && character.weaponUsed) {
    character.weapon.render();
  } else {
    character.weapon.pos = createVector(-9999,-9999);
  }

  if (character.hasSecondaryWeapon && character.secondaryWeaponOut) {
    character.secondaryWeapon.render();
    character.secondaryWeapon.update();
    if (character.secondaryWeapon.hits(character)) {
      stopLoop(boomerang,'boomerang');
      character.secondaryWeaponOut = false;
      character.secondaryWeapon = {"type":"boomerang","_id":0};
    }
  }

  // BLOCKS
  var clusters = loadedZone.blocks;
  for (var c in clusters) {
    var blocks = clusters[c];
    for (var b=0;b<blocks.length;b++) {
      var block = blocks[b];
      if (character.hits(block)) {
        // pushBlock.play();
        entityPush(character,block);
      }
      if (character.secondaryWeapon != {} && character.secondaryWeaponOut) {
        if (character.secondaryWeapon.hits(block)) {
          // character.secondaryWeapon.returning = true;
          // entityBounce(character.secondaryWeapon,block,1)
          // entityHit(character.secondaryWeapon,block,1);

        }
      }
      // BOMBS
      var bombs = loadedZone.bombs;
      for (var bo=0;bo<bombs.length;bo++) {
        var bomb = bombs[bo];
        if (character.hits(bomb)) {
          entityPush(character,bomb);
        }
      }
      // ENEMY
      var enemies = loadedZone.enemies;
      for (var e=0;e<enemies.length;e++) {
        var enemy = enemies[e];
        // console.log(enemy)
        if (enemy.hits(block)) {
          // enemy.moveCount = 999;
          entityPush(enemy,block);
        }
        // WEAPON
        if (character.weapon != {}) {
          if (!findInArray(enemy.requiredWeapons,character.weapon._id)) { } else {
            if (!enemy.isInvincible) {
              if (character.weapon.hits(enemy)) {
                enemy.health -= character.damageDelt();
                enemy.isInvincible = true;
                enemyHit.play();
              }
              for (var m=0;m<loadedZone.missiles.weapon.length;m++) {
                var weaponMissile = loadedZone.missiles.weapon[m];
                if (weaponMissile.hits(enemy)) {
                  enemy.health -= Math.ceil(character.damageDelt()/2);
                  enemy.isInvincible = true;
                  weaponMissile.explode();
                  enemyHit.play();
                }
              }
              for (var d=0;d<loadedZone.debris.length;d++) {
                var debris = loadedZone.debris[d];
                if (debris.canDamage) {
                  if (debris.hits(enemy)) {
                    enemy.health -= Math.ceil(debris.damage);
                    enemy.isInvincible = true;
                    enemyHit.play();
                    break;
                  }
                }
              }
              if (enemy.health <= 0) {
                enemy.explode(e);
                enemyExplode.play();
              } else {
                // console.log(character.isFacing(enemy))
                if (enemy.rarity != "unique" && character.isFacing(enemy)) {
                  entityHit(character.weapon,enemy,25);
                }
              }
            }
          }
        }
        // SECONDARY WEAPON
        if (character.secondaryWeapon != {} && character.secondaryWeaponOut) {
          if (character.secondaryWeapon.hits(enemy)) {
            // character.secondaryWeapon.returning = true;
            // character.secondaryWeapon.returnCount = 1;
            // character.secondaryWeapon.apex = 0;
            // character.secondaryWeapon.easing = 100;
            enemy.isStunned = true;
            enemyHit.play();
            character.secondaryWeapon = {"type":"boomerang","_id":0};
            character.secondaryWeaponOut = false;
            stopLoop(boomerang,'boomerang');
          }
        }
        if (!character.isInvincible) {
          if (character.hits(enemy)) {
            characterHit.play();
            if (character.health <= 3) {
              startLoop(lowHealth,1500,'lowHealth');
            }
            character.pos = createVector(character.pos.x-blockSize,character.pos.y-blockSize);
            var damageTaken = character.ac+enemy.damage;
            character.health -= damageTaken;
            character.isInvincible = true;
            if (enemy.rarity != "unique") {
              entityPush(character,enemy);
            }
          }
          for (var em=0;em<loadedZone.missiles.enemy.length;em++) {
            var enemyMissile = loadedZone.missiles.enemy[em];
            if (enemyMissile.hits(character)) {
              var damageTaken = character.ac+enemy.damage;
              character.health -= round(damageTaken*2);
              character.isInvincible = true;
              enemyMissile.explode();
            }
          }
        }
      }
      // NPC
      var npcs = loadedZone.npcs;
      // console.log(npcs)
      for (var n=0;n<npcs.length;n++) {
        var npc = npcs[n];
        if (npc.hits(block)) {
          entityPush(npc,block);
        }
        if (character.hits(npc)) {
          npc.isTalking = true;
          entityPush(character,npc);
        }
      }
      // DEBRIS
      var debris = loadedZone.debris;
      for (var de=0;de<debris.length;de++) {
        var debri = debris[de];
        if (debri.hits(block)) {
          if (debri.canDamage && block.isRemovable) {
            var block_index = blocks.indexOf(block);
            if (block_index > -1) {
              var hasNextRoom = destroyOtherWallBlock(c,block);
              if (hasNextRoom || !findInArray(["topBorder","bottomBorder","rightBorder","leftBorder"],c)) {
                blocks.splice(block_index,1);
              }
            }
          }
        }
      }
    }
  }
}
