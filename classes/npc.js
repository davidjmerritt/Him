var npcTypes = [
  {"_id":0, "type":"ollie","primeColor": DARK_BLUE,"secondaryColor": DARK_BROWN ,"tertiaryColor": LIGHT_YELLOW,"movable": false,"solid": true, "damage":1,"health":.9,"speed":1,"rarity":2,"digger":false,"pusher":false,"size":[1,1],"attack":null,"level":0,"messages":["Hello! My name is Ollie.","I hear there is a sword for sale in the {CUSTOM}.","Did you meet my sister Jolly?","I ate beans for lunch...\nWatch out!"]},
  {"_id":1, "type":"whiteswordmaster","primeColor": DARK_BLUE,"secondaryColor": OFF_WHITE,"tertiaryColor": DARK_BROWN,"movable": false,"solid": true, "damage":1,"health":.9,"speed":1,"rarity":2,"digger":false,"pusher":false,"size":[1,1],"attack":null,"level":0,"messages":["Buy a White Sword? Only. 250 Coins.","I made it myself.","I hear there that Boss Bloog has a key."]},
  {"_id":2, "type":"goldswordmaster","primeColor": DARK_BROWN,"secondaryColor": DARK_RED,"tertiaryColor": LIGHT_TAN,"movable": false,"solid": true, "damage":1,"health":.9,"speed":1,"rarity":2,"digger":false,"pusher":false,"size":[1,1],"attack":null,"level":0,"messages":["Buy a Gold Sword? Only 500 Coins.","Do you smell gas?","These are rare."]},
  {"_id":3, "type":"coinmaster","primeColor": DARK_GREEN,"secondaryColor": DARK_GRAY,"tertiaryColor": DARK_BROWN,"movable": false,"solid": true, "damage":1,"health":.9,"speed":1,"rarity":2,"digger":false,"pusher":false,"size":[1,1],"attack":null,"level":0,"messages":["Take this and tell no one.","I have been seeing a lot more bloogs around here."]},
  {"_id":4, "type":"jolly","primeColor": DARK_RED,"secondaryColor": BLACK,"tertiaryColor": LIGHT_TAN,"movable": false,"solid": true, "damage":1,"health":.9,"speed":1,"rarity":2,"digger":false,"pusher":false,"size":[1,1],"attack":null,"level":0,"messages":["Hiya. I'm Jolly!\nMy brother is Ollie.", "A special weapon can be used to defeat the Boss Bloog.","Beware the ides of... shh... do you smell something?"]},
  {"_id":5, "type":"woodenswordmaster","primeColor": DARK_RED,"secondaryColor": LIGHT_TAN,"tertiaryColor": LIGHT_YELLOW,"movable": false,"solid": true, "damage":1,"health":.9,"speed":1,"rarity":2,"digger":false,"pusher":false,"size":[1,1],"attack":null,"level":0,"messages":["It's a dangerous to go alone.  Take this.","Use it to fight the bloogs.","If you remove all bloogs in an area you will be rewarded.","Thanks for not killing me."]},
];

var overworldNPCs = [0,4];

function Npc(_id,pos) {
  this._id = _id;
  this.type = npcTypes[this._id].type;
  this.pos = pos.copy();
  this.r = blockSize/2;
  this.isMoving = true;
  this.d = 'STILL';
  this.last_d = 'DOWN';
  this.vel = npcTypes[this._id].speed;
  this.isMovable = npcTypes[this._id].movable;
  this.isSolid = true;
  this.moveCount = 0;
  this.moveCountMax = 0;
  this.primeColor = npcTypes[this._id].primeColor;
  this.secondaryColor = npcTypes[this._id].secondaryColor;
  this.tertiaryColor = npcTypes[this._id].tertiaryColor;
  this.damage = npcTypes[this._id].damage;
  this.health = npcTypes[this._id].health;
  this.isInvincible = false;
  this.invincibleCount = 0;
  this.items = [];
  this.canDig = npcTypes[this._id].digger;
  this.canPush = npcTypes[this._id].pusher;
  this.attackType = npcTypes[this._id].attack;
  this.attackCount = 0;
  this.attackCountMax = 300;
  this.wallHitCount = 0;
  this.rarity = npcTypes[_id].rarity;
  this.isTalking = false;
  this.talkingCount = 0;
  this.talkingDuration = 200;
  this.lastMessage = 0;

  this.talk = function(message) {
    textFont(defaultFont);
    noStroke();
    // value = alpha(c);
    // fill(value);
    // fill(245, 245, 235,100);
    // rect(
    //   this.pos.x-pixelSize,
    //   (this.pos.y-(blockSize+pixelSize)-textWidth(message)/8)-pixelSize,
    //   blockSize*3+(pixelSize*2),
    //   blockSize*2+(pixelSize*2)
    // );

    if (STATE == 'OVERWORLD') { fill(BLACK); } else
    if (STATE == 'SHOP') { fill(OFF_WHITE); }
    textSize(18);
    textAlign(LEFT);
    if (level == 1) {
      if (message.indexOf("{CUSTOM}") > -1) {
        if (character.weapon._id > 4) {
          message = 'I like your new sword!';
        } else if (character.weapon._id <= 4) {
          message = message.replace('{CUSTOM}',getRegionFromCoords(world.swordShop.split('-')));
        } else {
          message = "Dude!  You need a weapon.  It's dangerous out here.";
        }
      }
    } else if (level == 2) {
      if (message.indexOf("{CUSTOM}") > -1) {
        if (character.weapon._id > 5) {
          message = 'I like your new sword!';
        } else if (character.weapon._id <= 5) {
          message = message.replace('{CUSTOM}',getRegionFromCoords(world.swordShop.split('-')));
        } else {
          message = "Dude! You need a weapon.  It's dangerous out here.";
        }
      }
    } else if (level == 3) {
      if (message.indexOf("{CUSTOM}") > -1) {
        if (character.weapon._id > 5) {
          message = 'Wow sweet sword!';
        } else {
          message = "Dude! You need a weapon.  It's dangerous out here.";
        }
      }
    }

    text(message,
      this.pos.x-blockSize/2,
      this.pos.y-(blockSize+pixelSize)-textWidth(message)/8,
      blockSize*3,
      blockSize*2
    );
  }

  this.look = function() {
    noStroke();
    fill(this.primeColor);
    rect(this.pos.x,this.pos.y,this.r*2,this.r*2);
    if (this.d == 'DOWN' || this.d == 'STILL') {
      fill(this.secondaryColor);
      rect(this.pos.x,this.pos.y,this.r*2,this.r*2/2);
      fill(this.tertiaryColor);
      rect(this.pos.x,this.pos.y+this.r*2/2,pixelSize,pixelSize);
      rect(this.pos.x+pixelSize*3,this.pos.y+this.r*2/2,pixelSize,pixelSize);
      fill(this.tertiaryColor);
      rect(this.pos.x+pixelSize,this.pos.y+pixelSize,pixelSize,pixelSize);
      rect(this.pos.x+this.r*2/2,this.pos.y+pixelSize,pixelSize,pixelSize);
    } else if (this.d == 'UP') {
      fill(this.secondaryColor);
      rect(this.pos.x,this.pos.y,this.r*2,this.r*2/2);
    } else if (this.d == 'RIGHT') {
      fill(this.secondaryColor);
      rect(this.pos.x,this.pos.y,this.r*2,this.r*2/2);
      fill(this.tertiaryColor);
      rect(this.pos.x+this.r*2/2,this.pos.y+this.r*2/2,pixelSize,pixelSize);
      rect(this.pos.x+pixelSize,this.pos.y+this.r*2/2,pixelSize,pixelSize);
      fill(this.tertiaryColor);
      rect(this.pos.x+pixelSize*2,this.pos.y+pixelSize,pixelSize,pixelSize);
      rect(this.pos.x+pixelSize*3,this.pos.y+pixelSize,pixelSize,pixelSize);
    } else if (this.d == 'LEFT') {
      fill(this.secondaryColor);
      rect(this.pos.x,this.pos.y,this.r*2,this.r*2/2);
      fill(this.tertiaryColor);
      rect(this.pos.x+this.r*2/2,this.pos.y+this.r*2/2,pixelSize,pixelSize);
      rect(this.pos.x+pixelSize,this.pos.y+this.r*2/2,pixelSize,pixelSize);
      fill(this.tertiaryColor);
      rect(this.pos.x,this.pos.y+pixelSize,pixelSize,pixelSize);
      rect(this.pos.x+pixelSize,this.pos.y+pixelSize,pixelSize,pixelSize);
    }
  }

  this.move = function() {
    if (this.d == 'RIGHT')  {
      this.pos.x+= this.vel;
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

  this.hits = function(entity) {
    var d = dist(this.pos.x, this.pos.y, entity.pos.x, entity.pos.y);
    if (d < (this.r + entity.r)) {
      return true;
    } else {
      return false;
    }
  }

  this.edges = function() {
    if (npcTypes[this._id].rarity != "unique") {
      if (this.pos.x > appWidth) { // RIGHT
        // console.log(loadedZone.coordinates[0]+1 < worldWidth);
        if (loadedZone.coordinates[0]+1 < worldWidth) {
          var newZone = newCoordsFromDir('RIGHT').toString().replace(',','-');
          var index = loadedZone.npcs.indexOf(this);
          if (world.zones[newZone] != undefined) {
            world.zones[newZone].npcs.push(this);
            var newIndex = world.zones[newZone].npcs.indexOf(this);
            world.zones[newZone].npcs[newIndex].pos = createVector(width/2,height/2);
          }
          loadedZone.npcs.splice(index,1);
        }
      } else if (this.pos.x < 0) { // LEFT
        // console.log(loadedZone.coordinates[0]-1 > -1);
        if (loadedZone.coordinates[0]-1 > -1) {
          var newZone = newCoordsFromDir('LEFT').toString().replace(',','-');
          var index = loadedZone.npcs.indexOf(this);
          if (world.zones[newZone] != undefined) {
            world.zones[newZone].npcs.push(this);
            var newIndex = world.zones[newZone].npcs.indexOf(this);
            world.zones[newZone].npcs[newIndex].pos = createVector(width/2,height/2);
          }
          loadedZone.npcs.splice(index,1);
        }
      } else if (this.pos.y > appHeight) { // BOTTOM
        // console.log(loadedZone.coordinates[1]+1 < worldWidth);
        if (loadedZone.coordinates[1]+1 < worldWidth) {
          var newZone = newCoordsFromDir('BOTTOM').toString().replace(',','-');
          var index = loadedZone.npcs.indexOf(this);
          if (world.zones[newZone] != undefined) {
            world.zones[newZone].npcs.push(this);
            var newIndex = world.zones[newZone].npcs.indexOf(this);
            world.zones[newZone].npcs[newIndex].pos = createVector(width/2,height/2);
          }
          loadedZone.npcs.splice(index,1);
        }
      } else if (this.pos.y < 0) { // TOP
        // console.log(loadedZone.coordinates[1]-1 > -1);
        if (loadedZone.coordinates[1]-1 > -1) {
          var newZone = newCoordsFromDir('TOP').toString().replace(',','-');
          var index = loadedZone.npcs.indexOf(this);
          if (world.zones[newZone] != undefined) {
            world.zones[newZone].npcs.push(this);
            var newIndex = world.zones[newZone].npcs.indexOf(this);
            world.zones[newZone].npcs[newIndex].pos = createVector(width/2,height/2);
          }
          loadedZone.npcs.splice(index,1);
        }
      }
    } else {
      if (this.pos.x > appWidth-(blockSize*this.sizeOffset)) { // RIGHT
        this.pos.x = this.pos.x ;
      } else if (this.pos.x < -(blockSize*this.sizeOffset)) { // LEFT
        this.pos.x = this.pos.x ;
      }
      if (this.pos.y > appHeight-(blockSize*this.sizeOffset)) { // BOTTOM
        this.pos.y = this.pos.y ;
      } else if (this.pos.y < (blockSize*this.sizeOffset)) { // TOP
        this.pos.y = this.pos.y ;
      }
    }
  }

  this.update = function() {
    // TALK
    if (!this.isTalking) { this.message = npcTypes[this._id].messages[this.lastMessage]; } else
    if (this.isTalking) {
      this.talkingCount += 1;
      this.talk(this.message);
      this.moving(false);
      if (this.talkingCount > this.talkingDuration) {
        this.isTalking = false;
        this.talkingCount = 0;
        this.moving(true);
        this.lastMessage += 1;
        if (this.lastMessage > npcTypes[this._id].messages.length-1) { this.lastMessage = 0; }
      }
    }

    // ATTACK
    if (this.attackType != null) {
      this.attackCount += 1;
      if (this.attackCount > this.attackCountMax) {
        this.moveCountMax = randomInt(200,600);
        this.attack();
        this.attackCount = 0;
      }
    }

    // MOVE
    // if (!this.isTalking) {
    //   if (this.isMoving) {
    //     this.moveCount += 1;
    //     if (this.moveCount > this.moveCountMax) {
    //       this.moveCountMax = randomInt(0,100);
    //       this.d = ["LEFT","RIGHT","UP","DOWN","STILL"][randomInt(0,4)];
    //       this.moveCount = 0;
    //     }
    //   }
    // }

    // WATCH PLAYER
    if (character.pos.x > this.pos.x+blockSize*2 && character.pos.y > this.pos.y) {
      this.d = "RIGHT";
    } else if (character.pos.x < this.pos.x-blockSize*2 && character.pos.y > this.pos.y) {
      this.d = "LEFT";
    } else if (character.pos.x < this.pos.x+blockSize*2 && character.pos.x > this.pos.x-blockSize*2 && character.pos.y > this.pos.y+blockSize) {
      this.d = "DOWN";
    } else if (character.pos.y < this.pos.y-blockSize) {
      this.d = "UP";
    }

    // if (!this.isInvincible) {
    //   this.move();
    // }
    // if (this.hits(character)) {
    //   entityPush(this,character);
    // }
    // GETS HIT
    if (this.isInvincible) {
      this.primeColor = COLORS[randomInt(0,COLORS.length)];
      this.invincibleCount += 1;
      if (this.invincibleCount >= 50) {
        this.isInvincible = false;
        this.invincibleCount = 0;
        this.primeColor = npcTypes[this._id].innerColor;
      }
    }
  }

  this.render = function() {
    push();
    this.look();
    pop();
  }
}


function createRandomNPC() {
  var npc = new Npc(
    randomInt(0,npcTypes.length),
    createVector(
      randomInt(blockSize*2,width-blockSize*2),
      randomInt(blockSize*2,height-blockSize*2)
    )
  );
  return npc;
}


function drawNPCs() {
  for (var i=0;i<loadedZone.npcs.length;i++) {
    loadedZone.npcs[i].render();
    loadedZone.npcs[i].update();
    loadedZone.npcs[i].edges();
  }
}


function createNPCs(npc_id,coordsWithOutTopPassage) {
  var npcCoords = coordsWithOutTopPassage[randomInt(0,coordsWithOutTopPassage.length)].toString().replace(',','-');
  for (var i=0;i<coordsWithOutTopPassage.length;i++) {
    var coords = coordsWithOutTopPassage[i].toString().replace(',','-');
    for (var j=0;j<world.zones[coords].enemies.length;j++) {
      var enemies = world.zones[coords].enemies[j];
      if (enemies.rarity == "unique") {
        if (npcCoords == coords) {
          coordsWithOutTopPassage.splice(coordsWithOutTopPassage.indexOf(npcCoords),1);
          var npcCoords = coordsWithOutTopPassage[randomInt(0,coordsWithOutTopPassage.length)].toString().replace(',','-');
          break;
        }
      }
    }
  }
  world.npcs.push(npcCoords);
  world.zones[npcCoords].npcs.push(new Npc(npc_id,createVector(width/2,blockSize*3))); // NPC
  if (world.zones[npcCoords].enemies.length > 0) {
    // console.log(npcCoords,CoordsWithOutTopPassage.length)
    coordsWithOutTopPassage.splice(coordsWithOutTopPassage.indexOf(npcCoords),1);
    var newEnemyCoords = coordsWithOutTopPassage[randomInt(0,coordsWithOutTopPassage.length)].toString().replace(',','-');
    for (var i=0;i<world.zones[npcCoords].enemies.length;i++) {
      world.zones[newEnemyCoords].enemies.push(world.zones[npcCoords].enemies[i]);
      world.zones[npcCoords].enemies.splice(world.zones[npcCoords].enemies.indexOf(world.zones[npcCoords].enemies[i]),1);
    }
    // console.log(newEnemyCoords,CoordsWithOutTopPassage.length)
  }
}
