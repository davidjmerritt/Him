var enemyTypes = [
  {"_id":0, "type":"red-bloog","innerColor": RED,"secondaryColor": BLACK,"movable": true,"solid": true, "damage":1,"health":.9,"speed":2,"rarity":1,"digger":false,"pusher":true,"size":[1,1],"attack":null,"level":1,"exp":5,"requiredWeapons":[4,7,8],"spells":[],"magic":0,"burndown":[12,16]},
  {"_id":1, "type":"blue-bloog","innerColor": BLUE,"secondaryColor": BLACK,"movable": true,"solid": true, "damage":2,"health":2,"speed":4,"rarity":2,"digger":true,"pusher":false,"size":[1,1],"attack":null,"level":2,"exp":10,"requiredWeapons":[4,7,8],"burndown":[12,16]},
  {"_id":2, "type":"green-bloog","innerColor": GREEN,"secondaryColor": BLACK,"movable": true,"solid": true, "damage":3,"health":2,"speed":1,"rarity":2,"digger":false,"pusher":true,"size":[1,1],"attack":null,"level":1,"exp":15,"requiredWeapons":[4,7,8],"burndown":[12,16]},
  {"_id":3, "type":"black-bloog","innerColor": BLACK,"secondaryColor": OFF_WHITE,"movable": true,"solid": true, "damage":5,"health":3,"speed":3,"rarity":10,"digger":false,"pusher":true,"size":[1,1],"attack":null,"level":3,"exp":20,"requiredWeapons":[4,7,8],"burndown":[12,16]},
  {"_id":4, "type":"white-bloog","innerColor": OFF_WHITE,"secondaryColor": BLACK,"movable": true,"solid": true, "damage":4,"health":5,"speed":3,"rarity":20,"digger":true,"pusher":true,"size":[1,1],"attack":"missile","level":4,"exp":30,"requiredWeapons":[4,7,8],"burndown":[12,16]},
  {"_id":5, "type":"boss-bloog","innerColor": PURPLE,"secondaryColor": BLACK,"tertiaryColor": OFF_PURPLE,"movable": false,"solid": false, "damage":5,"health":20,"speed":.4,"rarity":"unique","digger":false,"pusher":false,"size":[3,3],"attack":"missile","spells":[],"requiredWeapons":[7,8],"level":0,"exp":100,"magic":0,"burndown":[12,16]},
  {"_id":6, "type":"prince-bloog","innerColor": PINK,"secondaryColor": BLACK,"tertiaryColor": OFF_PINK,"movable": false,"solid": false, "damage":8,"health":35,"speed":.6,"rarity":"unique","digger":false,"pusher":false,"size":[3,3],"attack":"missile","spells":["spawner"],"requiredWeapons":[8],"level":0,"exp":200,"magic":10,"burndown":[12,16]},
  {"_id":7, "type":"king-bloog","innerColor": ORANGE,"secondaryColor": BLACK,"tertiaryColor": OFF_ORANGE,"movable": false,"solid": false, "damage":10,"health":50,"speed":.8,"rarity":"unique","digger":false,"pusher":false,"size":[3,3],"attack":"missile","spells":["spawner"],"requiredWeapons":[8],"level":0,"exp":500,"magic":10,"burndown":[12,16]},
  {"_id":8, "type":"blue-flutter","innerColor": BLACK,"secondaryColor": DARK_BLUE,"movable": false,"solid": false, "damage":0.2,"health":0.2,"speed":6,"rarity":5,"digger":false,"pusher":false,"size":[1,1],"attack":null,"level":0,"exp":3,"requiredWeapons":[4,7,8],"burndown":[12,16]},
  {"_id":9, "type":"mad-bomber","innerColor": BLACK,"secondaryColor": DARK_BLUE,"tertiaryColor": DARKER_GRAY,"movable": false,"solid": false, "damage":1,"health":4,"speed":3,"rarity":100,"digger":true,"pusher":true,"size":[1,1],"attack":"bomb","level":0,"exp":3,"requiredWeapons":[4,7,8],"spells":["bomb"],"items":[23],"burndown":[12,16]},
  {"_id":10, "type":"red-mage","innerColor": DARK_RED,"secondaryColor": BLACK,"tertiaryColor": DARKER_RED,"movable": true,"solid": true, "damage":0.1,"health":2,"speed":1,"rarity":50,"digger":false,"pusher":true,"size":[1,1],"attack":null,"level":0,"exp":5,"requiredWeapons":[4,7,8],"spells":["sleep","fireball"],"magic":4,"burndown":[1,3]},
  {"_id":11, "type":"gray-mage","innerColor": DARK_GRAY,"secondaryColor": BLACK,"tertiaryColor": DARKER_GRAY,"movable": true,"solid": true, "damage":0.1,"health":4,"speed":2,"rarity":75,"digger":false,"pusher":true,"size":[1,1],"attack":null,"level":0,"exp":5,"requiredWeapons":[4,7,8],"spells":["poison","fireball"],"items":[26],"magic":8,"burndown":[3,5]},
  {"_id":12, "type":"black-mage","innerColor": BLACK,"secondaryColor": DARKER_GRAY,"tertiaryColor": DARKER_GRAY,"movable": true,"solid": true, "damage":0.1,"health":6,"speed":2,"rarity":100,"digger":false,"pusher":true,"size":[1,1],"attack":null,"level":0,"exp":5,"requiredWeapons":[4,7,8],"spells":["sleep","fireball"],"items":[26],"magic":16,"burndown":[2,3]},
  {"_id":13, "type":"white-mage","innerColor": WHITE,"secondaryColor": DARKER_RED,"tertiaryColor": OFF_WHITE,"movable": true,"solid": true, "damage":5,"health":10,"speed":4,"rarity":150,"digger":false,"pusher":true,"size":[1,1],"attack":null,"level":0,"exp":8,"requiredWeapons":[4,7,8],"spells":["heal","fireball"],"items":[14],"magic":3,"burndown":[5,10]},
  {"_id":13, "type":"yellow-mage","innerColor": YELLOW,"secondaryColor": BROWN,"tertiaryColor": OFF_WHITE,"movable": true,"solid": true, "damage":1,"health":4,"speed":2,"rarity":40,"digger":false,"pusher":true,"size":[1,1],"attack":null,"level":0,"exp":4,"requiredWeapons":[4,7,8],"spells":["confuse","fireball"],"items":[24],"magic":10,"burndown":[3,5]},
];

function Enemy(_id,_index,pos) {
  this._id = _id;
  this._index = _index;
  this.type = enemyTypes[this._id].type;
  this.pos = pos.copy();
  this.r = blockSize/2;
  this.isMoving = false;
  this.d = 'STILL';
  this.last_d = 'DOWN';
  this.vel = enemyTypes[this._id].speed;
  this.isMovable = enemyTypes[this._id].movable;
  this.isSolid = true;
  this.moveCount = 0;
  this.moveCountMax = 0;
  this.primeColor = enemyTypes[this._id].innerColor;
  this.secondaryColor = enemyTypes[this._id].secondaryColor;
  this.tertiaryColor = enemyTypes[this._id].tertiaryColor;
  this.damage = enemyTypes[this._id].damage;
  this.health = enemyTypes[this._id].health;
  this.isInvincible = false;
  this.invincibleCount = 0;
  this.items = [];
  this.canDig = enemyTypes[this._id].digger;
  this.canPush = enemyTypes[this._id].pusher;
  this.attackType = enemyTypes[this._id].attack;
  this.attackCount = 0;
  this.attackCountMax = randomInt(300,600);
  this.wallHitCount = 0;
  this.sizeOffset = enemyTypes[this._id].size;
  this.rarity = enemyTypes[_id].rarity;
  this.requiredWeapons = enemyTypes[_id].requiredWeapons;
  this.loc;
  this.locList = ["LEFT","RIGHT","UP","DOWN","STILL"];
  this.isStunned = false;
  this.stunnedCount = 0 ;
  this.spells = enemyTypes[_id].spells;
  this.castCount = 0;
  this.castCountMax = randomInt(enemyTypes[_id].burndown[0]*60,enemyTypes[_id].burndown[1]*60);
  this.castingSpell = false;
  this.magic = enemyTypes[_id].magic;
  this.isResting = false;
  this.restCount = 0;
  this.recoveryTime = 240;

  this.look = function() {
    noStroke();

    if (this.type.slice(-6) == "bomber" || this.type.slice(-4) == "mage") {
      noStroke();
      fill(this.primeColor);
      rect(this.pos.x,this.pos.y,this.r*2,this.r*2);
      if (this.d == 'DOWN' || this.d == 'STILL') {
        fill(this.primeColor);
        rect(this.pos.x,this.pos.y,this.r*2,this.r*2/2);
        fill(this.tertiaryColor);
        rect(this.pos.x,this.pos.y+this.r*2/2,pixelSize,pixelSize);
        rect(this.pos.x+pixelSize*3,this.pos.y+this.r*2/2,pixelSize,pixelSize);
        fill(this.secondaryColor);
        rect(this.pos.x+pixelSize,this.pos.y+pixelSize,pixelSize,pixelSize);
        rect(this.pos.x+this.r*2/2,this.pos.y+pixelSize,pixelSize,pixelSize);
      } else if (this.d == 'UP') {
        fill(this.primeColor);
        rect(this.pos.x,this.pos.y,this.r*2,this.r*2/2);
      } else if (this.d == 'RIGHT') {
        fill(this.primeColor);
        rect(this.pos.x,this.pos.y,this.r*2,this.r*2/2);
        fill(this.tertiaryColor);
        rect(this.pos.x+this.r*2/2,this.pos.y+this.r*2/2,pixelSize,pixelSize);
        rect(this.pos.x+pixelSize,this.pos.y+this.r*2/2,pixelSize,pixelSize);
        fill(this.secondaryColor);
        rect(this.pos.x+pixelSize*2,this.pos.y+pixelSize,pixelSize,pixelSize);
        rect(this.pos.x+pixelSize*3,this.pos.y+pixelSize,pixelSize,pixelSize);
      } else if (this.d == 'LEFT') {
        fill(this.primeColor);
        rect(this.pos.x,this.pos.y,this.r*2,this.r*2/2);
        fill(this.tertiaryColor);
        rect(this.pos.x+this.r*2/2,this.pos.y+this.r*2/2,pixelSize,pixelSize);
        rect(this.pos.x+pixelSize,this.pos.y+this.r*2/2,pixelSize,pixelSize);
        fill(this.secondaryColor);
        rect(this.pos.x,this.pos.y+pixelSize,pixelSize,pixelSize);
        rect(this.pos.x+pixelSize,this.pos.y+pixelSize,pixelSize,pixelSize);
      }
      if (this.type.slice(-4) == "mage") {
        fill(this.primeColor);
        rect(this.pos.x+pixelSize/2,this.pos.y-pixelSize/2,pixelSize*3,pixelSize);
      }

    // FLUTTER
    } else if (this.type.slice(-7) == "flutter") {
      fill([this.primeColor,this.secondaryColor][randomInt(0,2)]);
      rect(this.pos.x,this.pos.y,pixelSize,pixelSize);
      rect(this.pos.x+pixelSize*3,this.pos.y,pixelSize,pixelSize);
      fill([this.primeColor,this.secondaryColor][randomInt(0,2)]);
      rect(this.pos.x+pixelSize,this.pos.y+pixelSize,pixelSize,pixelSize);
      fill([this.primeColor,this.secondaryColor][randomInt(0,2)]);
      rect(this.pos.x+pixelSize*2,this.pos.y+pixelSize,pixelSize,pixelSize);
      fill([this.primeColor,this.secondaryColor][randomInt(0,2)]);
      rect(this.pos.x+pixelSize,this.pos.y+pixelSize*2,pixelSize,pixelSize);
      fill([this.primeColor,this.secondaryColor][randomInt(0,2)]);
      rect(this.pos.x+pixelSize*2,this.pos.y+pixelSize*2,pixelSize,pixelSize);
      fill([this.primeColor,this.secondaryColor][randomInt(0,2)]);
      rect(this.pos.x,this.pos.y+pixelSize*3,pixelSize,pixelSize);
      rect(this.pos.x+pixelSize*3,this.pos.y+pixelSize*3,pixelSize,pixelSize);

    // BLOOGS
    } else if (this.type.slice(-5) == "bloog") {
      if (this.type == "boss-bloog" || this.type == "prince-bloog" || this.type == "king-bloog") {
        fill(this.primeColor);
        rect(
          this.pos.x-blockSize,
          this.pos.y-blockSize,
          blockSize*3,
          blockSize*3
        );
        // rect(
        //   this.pos.x-blockSize,
        //   this.pos.y-blockSize,
        //   blockSize*3,
        //   blockSize
        // );
        // rect(
        //   this.pos.x-blockSize,
        //   this.pos.y+blockSize,
        //   blockSize*3,
        //   blockSize
        // );
        // fill(this.primeColor);
        // rect(
        //   this.pos.x-blockSize,
        //   this.pos.y,
        //   blockSize,
        //   blockSize
        // );
        // fill(this.primeColor);
        // rect(
        //   this.pos.x+blockSize,
        //   this.pos.y,
        //   blockSize,
        //   blockSize
        // );
        fill(this.tertiaryColor); // CENTER
        rect(
          this.pos.x,
          this.pos.y,
          blockSize,
          blockSize
        );
        fill(this.secondaryColor);
        if (this.d == 'DOWN' || this.d == 'STILL') {
          rect(
            this.pos.x-(blockSize/3),
            this.pos.y+(blockSize/1.5),
            blockSize*1.5,
            blockSize/1.5
          );
        } else if (this.d == 'RIGHT') {
          rect(
            this.pos.x+(blockSize/2),
            this.pos.y+(blockSize/1.5),
            blockSize*1.5,
            blockSize/1.5
          );
        } else if (this.d == 'LEFT') {
          rect(
            this.pos.x-(blockSize),
            this.pos.y+(blockSize/1.5),
            blockSize*1.5,
            blockSize/1.5
          );
        }
      } else {
        fill(this.primeColor);
        rect(
          this.pos.x,
          this.pos.y,
          this.r*2,
          this.r*2
        );
        if (this.d == 'DOWN' || this.d == 'STILL') {
          fill(this.secondaryColor);
          rect(
            this.pos.x+pixelSize,
            this.pos.y+pixelSize*2,
            pixelSize*2,
            pixelSize
          );
        } else if (this.d == 'RIGHT') {
          fill(this.secondaryColor);
          rect(
            this.pos.x+pixelSize*2,
            this.pos.y+pixelSize*2,
            pixelSize+pixelSize,
            pixelSize
          );
        } else if (this.d == 'LEFT') {
          fill(this.secondaryColor);
          rect(
            this.pos.x,
            this.pos.y+pixelSize*2,
            pixelSize+pixelSize,
            pixelSize
          );
        }
      }
    }
  }

  this.cast = function(spell) {
    var castingCost = 1;  // THIS SHIOULD BE SET TO LOOK UP AGAINST SPELL CHART
    if (this.spells.has(spell)) {
      if (this.magic >= castingCost) {
        this.castingSpell = true;

        // HEAL
        if (spell == "heal") {
          heal.play();
          if (character.health < totalHealth) {
            character.health += 2;
          }
          if (character.health > totalHealth) {
            character.health = totalHealth
          }
          this.magic -= 1;
        }

        // CONFUSE
        if (spell == "confuse") {
          confuse.play();
          character.isConfused = true;
          this.magic -= 1;
        }

        // POISION
        if (spell == "poison") {
          sleep.play();
          character.isPoisoned = true;
          this.magic -= 1;
        }

        // SLEEP
        if (spell == "sleep") {
          sleep.play();
          character.isAsleep = true;
          this.magic -= 1;
        }

        // FIREBALL
        if (spell == "fireball") {
          sleep.play();
          fire.play();
          loadedZone.missiles.enemy.push(new Missile(1, createVector(this.pos.x+blockSize,this.pos.y+blockSize), this.last_d, "enemy"));
          this.magic -= 1;
        }

        // SPAWNER
        if (spell == "spawner") {
          if (enemyTypes[this._id].spells.length > 0) {
            // var randomEnemy = randomInt(0,spawnableEnemies.length-1),loadedZone.enemies.length;
            if (loadedZone.enemies.length < 5) {
              pop1.setVolume(2); pop1.play();
              var spawn = new Enemy(4,loadedZone.enemies.length,this.pos); // white-bloog
              if (randomInt(0,2)==randomInt(0,2)) {
                spawn.items.push(5);
              }
              loadedZone.enemies.push(spawn);
            }
            this.magic -= 1;
          }
        }
      }
    }
    // console.log(this.magic);
  }

  this.attack = function() {
    // MISSILE
    if (this.attackType == "missile" && !this.isInvincible) {
      if (enemyTypes[this._id].type.slice(-5) == "bloog") {
        bigBeam.setVolume(0.3); bigBeam.play();
      } else {
        reverseBeam.play();
      }
      loadedZone.missiles.enemy.push(new Missile(0, this.pos, this.last_d, "enemy"));
    }

    // BOMB
    if (enemyTypes[this._id].type == "mad-bomber") {
      var bomb = new Bomb(this.pos,this.d, 0);
      bomb.set();
      loadedZone.bombs.push(bomb);
    }
  }

  this.move = function() {
    if (this.d == 'RIGHT')  {
      this.pos.x += this.vel;
      this.last_d = 'RIGHT';
    } else if (this.d == 'LEFT') {
      this.pos.x -= this.vel;
      this.last_d = 'LEFT';
    } else if (this.d == 'UP') {
      this.pos.y -= this.vel;
      this.last_d = 'UP';
    } else if (this.d == 'DOWN') {
      this.pos.y += this.vel;
      this.last_d = 'DOWN';
    } else if (this.d == 'STILL') {
      this.pos = this.pos;
    }
  }

  this.moving = function(b) {
    this.isMoving = b;
  }

  this.update = function() {
    // ENEMY INTERACTION
    for (var i=0;i<loadedZone.enemies.length;i++) {
      if (this.hits(loadedZone.enemies[i])) {
        if (loadedZone.enemies.indexOf(this) != loadedZone.enemies.indexOf(loadedZone.enemies[i])) {
          entityPush(this,loadedZone.enemies[i]);
        }
      }
    }

    // ENEMY CAST SPELL
    if (this.spells != null && this.magic > 0 || this.castingSpell || this.isResting) {
      this.castCount += 1;
      if (this.castingSpell) {
        this.primeColor = COLORS[randomInt(0,COLORS.length)];
      }
      if (this.castCount >= 20) {
        this.castingSpell = false;
        this.primeColor = enemyTypes[this._id].innerColor;
        this.secondaryColor = enemyTypes[this._id].secondaryColor;
      }
      if (this.castCount > this.castCountMax) {
        this.cast(this.spells[randomInt(0,this.spells.length)]);
        this.castCount = 0;
        this.castCountMax = randomInt(enemyTypes[_id].burndown[0]*100,enemyTypes[_id].burndown[1]*100);
      }
    }

    // ENEMY RESTING
    if (this.magic <= 0) {
      this.isResting = true;
      this.isStunned = true;
    }
    if (this.isResting) {
      this.restCount += 1;
      // console.log(this.magic);
      if (this.restCount > this.recoveryTime*this.magic) {
        this.magic += 1;
      }
      if (this.magic == enemyTypes[_id].magic) {
      // if (this.restCount > this.restCountMax) {
        this.isResting = false;
        this.isStunned = false;
        this.restCount = 0;
      }
    }

    // ENEMY ATTACK
    if (this.attackType != null) {
      this.attackCount += 1;
      if (this.attackCount > this.attackCountMax) {
        this.attackCount = randomInt(200,600);
        this.attack();
        this.attackCount = 0;
      }
    }

    // ENEMY MOVEMENT
    this.moveCount += 1;
    if (this.moveCount > this.moveCountMax) {
      if (this.type == "blue-flutter") {
        this.moveCountMax = randomInt(0,20);
        this.d = ["LEFT","RIGHT","UP","DOWN","STILL"][randomInt(0,5)];
        this.moveCount = 0;
      } else if (this.type == "boss-bloog") {
        this.moveCountMax = randomInt(0,100);
        this.d = this.locList[randomInt(0,this.locList.length)];
      //   if (this.locList.indexOf('TOP') > -1) { this.d = ["DOWN","STILL"][randomInt(0,2)]; }
      //   if (this.locList.indexOf('RIGHT') > -1) { this.d = ["LEFT","STILL"][randomInt(0,2)]; }
      //   if (this.locList.indexOf('LEFT') > -1) { this.d = ["RIGHT","STILL"][randomInt(0,2)]; }
      //   if (this.locList.indexOf('BOTTOM') > -1) { this.d = ["UP","STILL"][randomInt(0,2)]; }
        this.moveCount = 0;
      } else {
        this.moveCountMax = randomInt(0,100);
        if (this.loc == "LEFT") {
          this.d = ["RIGHT","STILL","DOWN","UP"][randomInt(0,4)];
        } else if (this.loc == "RIGHT") {
          this.d = ["LEFT","STILL","DOWN","UP"][randomInt(0,4)];
        } else if (this.loc == "TOP") {
          this.d = ["RIGHT","STILL","DOWN","LEFT"][randomInt(0,4)];
        } else if (this.loc == "BOTTOM") {
          this.d = ["RIGHT","STILL","LEFT","UP"][randomInt(0,4)];
        } else {
          this.d = ["LEFT","RIGHT","UP","DOWN","STILL"][randomInt(0,5)];
        }
      }
      this.moveCount = 0;
    }

    if (!this.isInvincible && !this.isStunned) {
      this.move();
    }

    // ENEMY IS HIT
    if (this.isInvincible) {
      this.primeColor = COLORS[randomInt(0,COLORS.length)];
      this.tertiaryColor = this.primeColor
      this.invincibleCount += 1;
      if (this.invincibleCount >= 50) {
        this.isInvincible = false;
        this.invincibleCount = 0;
        this.primeColor = enemyTypes[this._id].innerColor;
        this.tertiaryColor = enemyTypes[this._id].tertiaryColor;
      }
    }

    // ENEMY IS STUNNED
    if (this.isStunned) {
      // this.primeColor = COLORS[randomInt(0,COLORS.length)];
      // this.tertiaryColor = this.primeColor
      this.stunnedCount += 1;
      if (this.stunnedCount >= 300) {
        this.isStunned = false;
        this.stunnedCount = 0;
        // this.primeColor = enemyTypes[this._id].innerColor;
        // this.tertiaryColor = enemyTypes[this._id].tertiaryColor;
      }
    }
  }

  this.explode = function(i) {
    this.drop();
    loadedZone.enemies.splice(i,1);
    // createDebris(this.pos,randomInt(-5,5),50,RED);
    createDebris(this.pos,randomInt(-25,25),6,this.primeColor);
    if (this.type == "boss-bloog" || this.type == "prince-bloog" || this.type == "king-bloog") {
      stopLoop(bossScream,'bossScream');
    }
  }

  this.drop = function() {
    for (var i=0;i<this.items.length;i++) {
      dropItem(this.items[i],this.pos);
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
    if (enemyTypes[this._id].rarity != "unique") {
      if (this.pos.x > appWidth) { // RIGHT
        // console.log(loadedZone.coordinates[0]+1 < worldWidth);
        if (loadedZone.coordinates[0]+1 < worldWidth) {
          var newZone = newCoordsFromDir('RIGHT').toString().replace(',','-');
          var index = loadedZone.enemies.indexOf(this);
          if (world.zones[newZone] != undefined) {
            world.zones[newZone].enemies.push(this);
            var newIndex = world.zones[newZone].enemies.indexOf(this);
            world.zones[newZone].enemies[newIndex].pos = createVector(width/2,height/2);
          }
          loadedZone.enemies.splice(index,1);
        }
      } else if (this.pos.x < 0) { // LEFT
        // console.log(loadedZone.coordinates[0]-1 > -1);
        if (loadedZone.coordinates[0]-1 > -1) {
          var newZone = newCoordsFromDir('LEFT').toString().replace(',','-');
          var index = loadedZone.enemies.indexOf(this);
          if (world.zones[newZone] != undefined) {
            world.zones[newZone].enemies.push(this);
            var newIndex = world.zones[newZone].enemies.indexOf(this);
            world.zones[newZone].enemies[newIndex].pos = createVector(width/2,height/2);
          }
          loadedZone.enemies.splice(index,1);
        }
      } else if (this.pos.y > appHeight) { // BOTTOM
        // console.log(loadedZone.coordinates[1]+1 < worldWidth);
        if (loadedZone.coordinates[1]+1 < worldWidth) {
          var newZone = newCoordsFromDir('BOTTOM').toString().replace(',','-');
          var index = loadedZone.enemies.indexOf(this);
          if (world.zones[newZone] != undefined) {
            world.zones[newZone].enemies.push(this);
            var newIndex = world.zones[newZone].enemies.indexOf(this);
            world.zones[newZone].enemies[newIndex].pos = createVector(width/2,height/2);
          }
          loadedZone.enemies.splice(index,1);
        }
      } else if (this.pos.y < 0) { // TOP
        // console.log(loadedZone.coordinates[1]-1 > -1);
        if (loadedZone.coordinates[1]-1 > -1) {
          var newZone = newCoordsFromDir('TOP').toString().replace(',','-');
          var index = loadedZone.enemies.indexOf(this);
          if (world.zones[newZone] != undefined) {
            world.zones[newZone].enemies.push(this);
            var newIndex = world.zones[newZone].enemies.indexOf(this);
            world.zones[newZone].enemies[newIndex].pos = createVector(width/2,height/2);
          }
          loadedZone.enemies.splice(index,1);
        }
      }
    } else {
      // BOSS
      if (this.pos.x > width-(blockSize*4)) { // RIGHT
        this.loc = 'RIGHT';
        this.locList = ["LEFT","DOWN","UP","STILL"];
      } else if (this.pos.x < blockSize*4) { // LEFT
        this.loc = 'LEFT';
        this.locList = ["RIGHT","DOWN","UP","STILL"];
      } else if (this.pos.y > height-(blockSize*4)) { // BOTTOM
        this.loc = 'BOTTOM';
        this.locList = ["LEFT","RIGHT","UP","STILL"];
      } else if (this.pos.y < blockSize*4) { // TOP
        this.loc = 'TOP';
        this.locList = ["LEFT","DOWN","RIGHT","STILL"];
      }
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
    var enemy_id = randomInt(0,enemyTypes.length);
    if (enemyTypes[enemy_id].rarity != "unique" && enemyTypes[enemy_id].level <= level) {
      var diceRoll = randomInt(0,enemyTypes[enemy_id].rarity);
      if (diceRoll == randomInt(0,enemyTypes[enemy_id].rarity)) {
        console.log(enemyTypes[enemy_id].type)
        enemies.push(new Enemy(enemy_id,i,createVector(randomInt(blockSize*2,width-blockSize*2), randomInt(blockSize*2,height-blockSize*2))));
      }
    }
  }
  for (var i=0;i<enemies.length;i++) {
    // CUSTOM ITEMS FOR ENEMY
    if (enemyTypes[enemies[i]._id].items != undefined) {
      if (enemyTypes[enemies[i]._id].items.length > 0) {
        var diceRoll = randomInt(0,2);
        if (diceRoll == randomInt(0,2)) {
          enemies[i].items.push(enemyTypes[enemies[i]._id].items[randomInt(0,enemyTypes[enemies[i]._id].items.length)]);
        }
      }
    }
    var randomItem = createRandomItem();
    if (randomItem != false) {
      enemies[i].items.push(randomItem);
      // console.log(itemTypes[randomItem].type,itemTypes[randomItem].value)
      // console.log(enemyTypes[enemies[i]._id].type,enemies[i].items)
    }

    // ADD EXTRA
    var diceRollForExtraItem = randomInt(0,3);
    if (diceRollForExtraItem == 0) {
      var diceRollForExtraItemType = randomInt(0,2);
      if (diceRollForExtraItemType == 0) {
        enemies[i].items.push(6);
      } else {
        enemies[i].items.push(0);
      }
    }
    // enemies[i].items.push(5); // HEARTS ONLY
    // enemies[i].items.push(0); // 1 COIN ONLY
    // enemies[i].items.push(6); // 5 COIN ONLY
    // 26 = Medical Herb
    // console.log(enemies)
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


var spawnableEnemies = createSpawnableEnemiesList();
function createSpawnableEnemiesList() {
  var spawnableEnemies = [];
  for (i=0;i<enemyTypes.length;i++) {
    var enemyType = enemyTypes[i];
    if (enemyType.rarity != "unique") {
      spawnableEnemies.push(enemyType._id);
    }
  }
  return spawnableEnemies;
}


function respawnEnemies() {
  var spawnIndex = defaultCoords.toString().replace(',','-');
  for (var i=0;i<world.zones_index.length;i++) {
    if (world.zones_index[i] != spawnIndex) {
      var diceRoll = randomInt(0,4);
      if (diceRoll == 0) {
        // console.log("index:"+i,"enemies:"+world.zones[world.zones_index[i]].enemies.length,"world:"+world.zones_index.length,diceRoll == 0)
        var newEnemies = createEnemies(randomInt(0,4));
        for (var j=0;j<newEnemies.length;j++) {
          if (world.zones[world.zones_index[i]].enemies.length < 6) {
            world.zones[world.zones_index[i]].enemies.push(newEnemies[j]);
          }
        }
        // console.log(world.zones[world.zones_index[i]].enemies);
        // console.log("index:"+i,"enemies:"+world.zones[world.zones_index[i]].enemies.length,"world:"+world.zones_index.length,newEnemies.length)
      }
    }
  }
}

function createEnemiesByCoins() {
  var enemyCount = 0;
  while (world.coinsInWorld < 250*level) {
    var enemyZone = world.zones_index[randomInt(0,world.zones_index.length).toString().replace(',','-')];
    if (enemyZone == defaultCoords.toString().replace(',','-')) {} else {
      var newEnemies = createEnemies(randomInt(0,8));
      enemyCount += newEnemies.length;
      if (world.zones[enemyZone].enemies.length == 0) {
        // console.log('new')
        world.zones[enemyZone].enemies = newEnemies;
      } else {
        // console.log('concat')
        world.zones[enemyZone].enemies.concat(newEnemies);
      }
      world.coinsInWorld = countCoinsInWorld();
    }
    // console.log(world.coinsInWorld,enemyCount);
    if (enemyCount > 2000*level) { break; }
  }

  var enemiesFinalCount = 0;
  for (var i in world.zones) {
    if (world.zones[i].enemies == undefined) {} else {
      enemiesFinalCount += world.zones[i].enemies.length;
    }
  }
  world.enemiesInWorld = enemiesFinalCount;
}
