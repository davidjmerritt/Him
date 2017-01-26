var itemTypes = [
  {"_id":0, "type":"coin","innerColor": LIGHT_GREEN,"secondaryColor":GREEN,"tertiaryColor":WHITE,"movable": false,"solid": false, "damage":0,"rarity":1,"value":1,"decays":true},
  {"_id":1, "type":"door","innerColor": DARK_BROWN,"secondaryColor":BLACK,"movable": false,"solid": false, "damage":0,"rarity":"unique","value":0,"decays":false},
  {"_id":2, "type":"portal","innerColor": BLACK,"movable": false,"solid": false, "damage":0,"rarity":"special","value":0,"decays":false,size:[2,1]},
  {"_id":3, "type":"key","innerColor": ORANGE,"secondaryColor":YELLOW,"movable": true,"solid": true, "damage":0,"rarity":"unique","value":20,"decays":false},
  {"_id":4, "type":"sword","innerColor": WOOD_BROWN,"secondaryColor": DARK_GREEN,"movable": false,"solid": true, "damage":1,"rarity":"unique","value":0,"decays":false,"burndown":1},
  {"_id":5, "type":"heart","innerColor": RED,"secondaryColor":BLUE,"movable": false,"solid": false,"damage":0,"rarity":1,"value":0,"decays":true},
  {"_id":6, "type":"coin","innerColor": LIGHT_BLUE,"secondaryColor":BLUE,"tertiaryColor":WHITE,"movable": false,"solid": false, "damage":0,"rarity":2,"value":5,"decays":true},
  {"_id":7, "type":"sword","innerColor": OFF_WHITE,"secondaryColor": DARK_BLUE,"movable": false,"solid": true, "damage":2,"rarity":"unique","value":250,"decays":false,"burndown":2},
  {"_id":8, "type":"sword","innerColor": GOLD,"secondaryColor": DARKER_RED,"movable": false,"solid": true, "damage":4,"rarity":"unique","value":500,"decays":false,"burndown":4},
  {"_id":9, "type":"coin","innerColor": YELLOW,"secondaryColor":ORANGE,"tertiaryColor":WHITE,"movable": false,"solid": false, "damage":0,"rarity":3,"value":10,"decays":true},
  {"_id":10, "type":"coin","innerColor": PINK,"secondaryColor":DARK_RED,"tertiaryColor":WHITE,"movable": false,"solid": false, "damage":0,"rarity":5,"value":25,"decays":true},
  {"_id":11, "type":"compass","innerColor": BLUE,"secondaryColor":LIGHT_BLUE,"movable": true,"solid": true, "damage":0,"rarity":"unique","value":0,"decays":false},
  {"_id":12, "type":"map","innerColor": WOOD_BROWN,"secondaryColor":BLACK,"movable": true,"solid": true, "damage":0,"rarity":"unique","value":0,"decays":false},
  {"_id":13, "type":"overhang","innerColor": WOOD_BROWN,"movable": false,"solid": false, "damage":0,"rarity":"special","value":0,"decays":false,size:[2,2],"overlay":true},
  {"_id":14, "type":"fairy","innerColor": PINK,"secondaryColor":LIGHT_BLUE,"movable": false,"solid": false,"damage":0,"rarity":5,"value":0,"decays":true,size:[1,1]},
  {"_id":15, "type":"coin","innerColor": OFF_WHITE,"secondaryColor":LIGHT_BLUE,"tertiaryColor":WHITE,"movable": false,"solid": false, "damage":0,"rarity":"unique","value":100,"decays":false},
  {"_id":16, "type":"coin","innerColor": OFF_WHITE,"secondaryColor":YELLOW,"tertiaryColor":WHITE,"movable": false,"solid": false, "damage":0,"rarity":"unique","value":50,"decays":false},
  {"_id":17, "type":"shrub","innerColor": OFF_GREEN,"secondaryColor":DARK_GREEN,"tertiaryColor":DARK_BROWN,"movable": false,"solid": true, "damage":0,"rarity":"special","value":0,"decays":false},
  {"_id":18, "type":"coin","innerColor": COOL_BLUE,"secondaryColor":PURPLE,"tertiaryColor":WHITE,"movable": false,"solid": false, "damage":0,"rarity":1,"value":-5,"decays":false},
  {"_id":19, "type":"downstairs","innerColor": OFF_WHITE,"secondaryColor":BLACK,"tertiaryColor":DARK_GRAY,"movable": false,"solid": false, "damage":0,"rarity":"unique","value":0,"decays":false},
  {"_id":20, "type":"upstairs","innerColor": OFF_WHITE,"secondaryColor":BLACK,"tertiaryColor":DARK_GRAY,"movable": false,"solid": false, "damage":0,"rarity":"unique","value":0,"decays":false},
  {"_id":21, "type":"fence","innerColor": DARK_BROWN,"movable": false,"solid": true, "damage":0,"rarity":"special","value":0,"decays":false,size:[4,4],"overlay":false},
  {"_id":22, "type":"boomerang","innerColor": YELLOW,"secondaryColor":COOL_BLUE,"tertiaryColor":DARK_RED,"movable": false,"solid": false, "damage":0,"rarity":"unique","value":100,"decays":false},
];

function Item(_id) {
  this._id = _id;
  this.pos = createVector(width / 2, height / 2);
  this.r = blockDefaultRadius;
  this.isMoving = false;
  this.d = 'RIGHT';
  this.last_d = 'RIGHT';
  this.vel = 4;
  this.isMovable = itemTypes[this._id].movable;
  this.isSolid = itemTypes[this._id].solid;
  this.type = itemTypes[this._id].type;
  this.innerColor = itemTypes[this._id].innerColor;
  this.secondaryColor = itemTypes[this._id].secondaryColor;
  this.tertiaryColor = itemTypes[this._id].tertiaryColor;
  this.damage = itemTypes[this._id].damage;
  this.rotation = 1;
  this.isDecaying = false;
  this.decayTime = 600; // 10 Seconds
  this.sizeOffset = itemTypes[this._id].size;
  this.overlay = itemTypes[this._id].overlay;
  this.moveCountMax = 2;
  this.moveCount = 0;
  this.items = [];

  this.update = function(item_id) {
    // DECAY
    if (itemTypes[this._id].decays) {
      if (this.isDecaying) {
        this.decayTime -= 1;
        if (this.decayTime <=0) {
          loadedZone.items.splice(item_id,1);
          this.isDecaying = false;
        }
      }
    }
    // REVEAL UNIQUE ITEMS AFTER ALL ENEMEIES ARE REMOVED
    if (loadedZone.enemies.length > 0) { } else {
      if (itemTypes[this._id].rarity == 'unique') {
        this.pos.x = width/2;
        this.pos.y = height/2;
        if (!secretFound.isPlaying() && !loadedZone.secretSoundPlayed && this.type != "sword") {
          secretFound.play();
          loadedZone.secretSoundPlayed = true;
        }
      }
    }
    // FAIRY MOVEMENT
    if (this.type == 'fairy') {
      this.moveCount += 1;
      if (this.moveCount > this.moveCountMax) {
        this.moveCountMax = randomInt(0,20);
        this.d = ["LEFT","RIGHT","UP","DOWN","STILL"][randomInt(0,4)];
        this.moveCount = 0;
      }
      this.move();
    }
  }

  this.explode = function(i) {
    this.drop();
    loadedZone.items.splice(i,1);
    createDebris(this.pos,randomInt(-25,25),4,this.innerColor);
  }

  this.drop = function() {
    for (var i=0;i<this.items.length;i++) {
      dropItem(this.items[i],this.pos);
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

  this.render = function() {
    push();
    this.look();
    pop();
  }

  this.look = function() {
    noStroke();

    if (this.decayTime <= 200) {
      this.innerColor = [itemTypes[this._id].innerColor,[0,0,0,0]][randomInt(0,2)];
      this.secondaryColor = [itemTypes[this._id].secondaryColor,[0,0,0,0]][randomInt(0,2)];
      if (this.tertiaryColor) { this.tertiaryColor = [itemTypes[this._id].tertiaryColor,[0,0,0,0]][randomInt(0,2)]; }
    }

    if (this.type == "sword") {
      fill(this.innerColor);
      if (this._id == character.weapon._id) {
        if (character.last_d == "LEFT") {
          // SHAFT
          fill(this.innerColor);
          rect(this.pos.x+pixelSize*3,this.pos.y+pixelSize*1.5,pixelSize,pixelSize);
          rect(this.pos.x+pixelSize*2,this.pos.y+pixelSize*1.5,pixelSize,pixelSize);
          rect(this.pos.x+pixelSize,this.pos.y+pixelSize*1.5,pixelSize,pixelSize);
          rect(this.pos.x,this.pos.y+pixelSize*1.5,pixelSize,pixelSize);
          // HILT
          fill(this.secondaryColor);
          rect(this.pos.x+pixelSize*3,this.pos.y+pixelSize,pixelSize,pixelSize);
          rect(this.pos.x+pixelSize*3,this.pos.y+pixelSize*2,pixelSize,pixelSize);
        } else if (character.last_d == "RIGHT") {
          // SHAFT
          fill(this.innerColor);
          rect(this.pos.x+pixelSize*3,this.pos.y+pixelSize*1.5,pixelSize,pixelSize);
          rect(this.pos.x+pixelSize*2,this.pos.y+pixelSize*1.5,pixelSize,pixelSize);
          rect(this.pos.x+pixelSize,this.pos.y+pixelSize*1.5,pixelSize,pixelSize);
          rect(this.pos.x,this.pos.y+pixelSize*1.5,pixelSize,pixelSize);
          // HILT
          fill(this.secondaryColor);
          rect(this.pos.x,this.pos.y+pixelSize,pixelSize,pixelSize);
          rect(this.pos.x,this.pos.y+pixelSize*2,pixelSize,pixelSize);
        } else if (character.last_d == "UP") {
          // SHAFT
          fill(this.innerColor);
          rect(this.pos.x+pixelSize*1.5,this.pos.y+pixelSize*3,pixelSize,pixelSize);
          rect(this.pos.x+pixelSize*1.5,this.pos.y+pixelSize*2,pixelSize,pixelSize);
          rect(this.pos.x+pixelSize*1.5,this.pos.y+pixelSize,pixelSize,pixelSize);
        } else if (character.last_d == "DOWN") {
          // SHAFT
          fill(this.innerColor);
          rect(this.pos.x+pixelSize*1.5,this.pos.y+pixelSize*2,pixelSize,pixelSize);
          rect(this.pos.x+pixelSize*1.5,this.pos.y+pixelSize*1,pixelSize,pixelSize);
          rect(this.pos.x+pixelSize*1.5,this.pos.y,pixelSize,pixelSize);
          rect(this.pos.x+pixelSize*1.5,this.pos.y,pixelSize,pixelSize);
          // HILT
          fill(this.secondaryColor);
          rect(this.pos.x+pixelSize,this.pos.y,pixelSize,pixelSize);
          rect(this.pos.x+pixelSize*2,this.pos.y,pixelSize,pixelSize);
        }
      } else {
        // SHAFT
        fill(this.innerColor);
        rect(this.pos.x+pixelSize*1.5,this.pos.y,pixelSize,pixelSize*4);
        // HILT
        fill(this.secondaryColor);
        rect(this.pos.x+pixelSize*.5,this.pos.y+pixelSize*3,pixelSize*3,pixelSize);
        rect(this.pos.x+pixelSize*1.5,this.pos.y+pixelSize*3.5,pixelSize,pixelSize*2);
      }
    } else if (this.type == "heart") {
      fill([this.innerColor,this.secondaryColor][randomInt(0,2)]);
      // fill(this.innerColor);
      rect(this.pos.x+pixelSize,this.pos.y+pixelSize*2,pixelSize,pixelSize*2);
      rect(this.pos.x+pixelSize,this.pos.y+pixelSize*2,pixelSize,pixelSize*2);
      rect(this.pos.x+pixelSize*2,this.pos.y+pixelSize,pixelSize,pixelSize*3);
      rect(this.pos.x+pixelSize*3,this.pos.y+pixelSize,pixelSize,pixelSize*3);
    } else if (this.type == "coin") {
      fill(this.innerColor);
      rect(this.pos.x,this.pos.y+pixelSize,pixelSize,pixelSize*2);
      rect(this.pos.x+pixelSize*2,this.pos.y,pixelSize,pixelSize*4);
      rect(this.pos.x+pixelSize,this.pos.y,pixelSize,pixelSize*4);
      rect(this.pos.x+pixelSize*3,this.pos.y+pixelSize,pixelSize,pixelSize*2);
      fill(this.tertiaryColor);
      rect(this.pos.x+pixelSize*2,this.pos.y,pixelSize,pixelSize);
      rect(this.pos.x+pixelSize*3,this.pos.y+pixelSize,pixelSize,pixelSize);
      fill(this.secondaryColor);
      rect(this.pos.x+pixelSize*3,this.pos.y+pixelSize*2,pixelSize,pixelSize);
      rect(this.pos.x,this.pos.y+pixelSize*2,pixelSize,pixelSize);
      rect(this.pos.x+pixelSize,this.pos.y+pixelSize*3,pixelSize,pixelSize);
    } else if (this.type == "door") {
      if (character.hasMasterKey) {
        fill(COLORS[randomInt(0,COLORS.length)]);
      } else {
        fill(this.innerColor);
      }
      rect(this.pos.x,this.pos.y,blockSize,blockSize);
      fill(this.secondaryColor);
      rect(this.pos.x+pixelSize,this.pos.y+pixelSize*2,pixelSize,pixelSize);
      rect(this.pos.x+pixelSize*2,this.pos.y+pixelSize,pixelSize,pixelSize*2);
    } else if (this.type == "compass") {
      fill([this.innerColor,this.secondaryColor][randomInt(0,2)]);
      rect(this.pos.x,this.pos.y,blockSize,blockSize);
      fill(WHITE);
      rect(this.pos.x+pixelSize,this.pos.y+pixelSize,pixelSize*2,pixelSize*2);
      fill(this.secondaryColor);
      rect(this.pos.x+pixelSize,this.pos.y+pixelSize,pixelSize,pixelSize);
      rect(this.pos.x+pixelSize*2,this.pos.y+pixelSize*2,pixelSize,pixelSize);
      fill(RED);
      rect(this.pos.x+pixelSize*3,this.pos.y,pixelSize,pixelSize);
    } else if (this.type == "map") {
      fill([this.innerColor,DARK_BROWN][randomInt(0,2)]);
      rect(this.pos.x,this.pos.y,blockSize,blockSize);
      fill(this.secondaryColor);
      rect(this.pos.x,this.pos.y+pixelSize,pixelSize,pixelSize*2);
      rect(this.pos.x+pixelSize,this.pos.y+pixelSize*2,pixelSize,pixelSize);
      rect(this.pos.x+pixelSize*2,this.pos.y,pixelSize,pixelSize);
      rect(this.pos.x+pixelSize*3,this.pos.y,pixelSize,pixelSize*4);
    } else if (this.type == "key") {
      fill([this.innerColor,this.secondaryColor][randomInt(0,2)]);
      rect(this.pos.x,this.pos.y,pixelSize,pixelSize*3);
      rect(this.pos.x+pixelSize,this.pos.y,pixelSize,pixelSize);
      rect(this.pos.x+pixelSize,this.pos.y+pixelSize*2,pixelSize,pixelSize);
      rect(this.pos.x+pixelSize*2,this.pos.y,pixelSize,pixelSize*4);
      rect(this.pos.x+pixelSize*3,this.pos.y+pixelSize*2,pixelSize,pixelSize*2);
    } else if (this.type == "fairy") {
      fill([this.innerColor,this.secondaryColor][randomInt(0,2)]);
      rect(this.pos.x,this.pos.y,pixelSize,pixelSize);
      rect(this.pos.x+pixelSize*3,this.pos.y,pixelSize,pixelSize);
      fill([this.innerColor,this.secondaryColor][randomInt(0,2)]);
      rect(this.pos.x+pixelSize,this.pos.y+pixelSize,pixelSize,pixelSize);
      fill([this.innerColor,this.secondaryColor][randomInt(0,2)]);
      rect(this.pos.x+pixelSize*2,this.pos.y+pixelSize,pixelSize,pixelSize);
      fill([this.innerColor,this.secondaryColor][randomInt(0,2)]);
      rect(this.pos.x+pixelSize,this.pos.y+pixelSize*2,pixelSize,pixelSize);
      fill([this.innerColor,this.secondaryColor][randomInt(0,2)]);
      rect(this.pos.x+pixelSize*2,this.pos.y+pixelSize*2,pixelSize,pixelSize);
      fill([this.innerColor,this.secondaryColor][randomInt(0,2)]);
      rect(this.pos.x,this.pos.y+pixelSize*3,pixelSize,pixelSize);
      rect(this.pos.x+pixelSize*3,this.pos.y+pixelSize*3,pixelSize,pixelSize);
    } else if (this.type == "shrub") {
      fill(this.secondaryColor);
      rect(this.pos.x,this.pos.y,pixelSize,pixelSize*2);

      fill(this.innerColor);
      rect(this.pos.x+pixelSize,this.pos.y,pixelSize,pixelSize);

      fill(this.secondaryColor);
      rect(this.pos.x+pixelSize*3,this.pos.y,pixelSize,pixelSize*2);

      fill(this.tertiaryColor);
      rect(this.pos.x+pixelSize,this.pos.y+pixelSize,pixelSize,pixelSize);

      fill(this.secondaryColor);
      rect(this.pos.x+pixelSize*2,this.pos.y+pixelSize,pixelSize,pixelSize);

      fill(this.innerColor);
      rect(this.pos.x+pixelSize,this.pos.y+pixelSize*2,pixelSize,pixelSize);

      fill(this.tertiaryColor);
      rect(this.pos.x+pixelSize*2,this.pos.y+pixelSize*2,pixelSize,pixelSize);

      fill(this.innerColor);
      rect(this.pos.x,this.pos.y+pixelSize*3,pixelSize,pixelSize);

      fill(this.secondaryColor);
      rect(this.pos.x+pixelSize*2,this.pos.y+pixelSize*3,pixelSize,pixelSize);

      fill(this.innerColor);
      rect(this.pos.x+pixelSize*3,this.pos.y+pixelSize*3,pixelSize,pixelSize);
    } else if (this.type == "downstairs") {
      fill(this.secondaryColor);
      rect(this.pos.x,this.pos.y,blockSize,blockSize);
      stroke(this.secondaryColor);
      strokeWeight(1)
      fill(this.innerColor);
      rect(this.pos.x,this.pos.y+pixelSize/2,pixelSize+pixelSize/3,pixelSize+(pixelSize*3)-pixelSize/3-2);
      rect(this.pos.x+pixelSize+pixelSize/3,this.pos.y+pixelSize+pixelSize/2,pixelSize+pixelSize/3,pixelSize+(pixelSize*2)-pixelSize/3-2);
      rect(this.pos.x+(pixelSize*2)+pixelSize*2/3,this.pos.y+(pixelSize*2)+pixelSize/2,pixelSize+pixelSize/3-1,pixelSize+pixelSize-pixelSize/3-2);
    } else if (this.type == "upstairs") {
      fill(this.secondaryColor);
      rect(this.pos.x,this.pos.y+blockSize/2+pixelSize/2-2,blockSize+1,blockSize/2);
      stroke(this.secondaryColor);
      strokeWeight(1)
      fill(this.innerColor);
      rect(this.pos.x,this.pos.y+(pixelSize/2)*4-pixelSize-2,pixelSize,pixelSize*3);
      rect(this.pos.x+pixelSize,this.pos.y+(pixelSize/2)*3-pixelSize-2,pixelSize,pixelSize*3);
      rect(this.pos.x+pixelSize*2,this.pos.y+(pixelSize/2)*2-pixelSize-2,pixelSize,pixelSize*3);
      rect(this.pos.x+pixelSize*3,this.pos.y+(pixelSize/2)-pixelSize-2,pixelSize,pixelSize*3);
    } else if (this.type == "fence") {
      fill(this.innerColor);
      rect(this.pos.x-blockSize*2,this.pos.y-blockSize*1.5,blockSize*5,blockSize/2);
      rect(this.pos.x-blockSize*2,this.pos.y+blockSize*2,blockSize*5,blockSize/2);
      rect(this.pos.x-blockSize*1.5,this.pos.y-blockSize*2,blockSize/2,blockSize*5);
      rect(this.pos.x+blockSize*2,this.pos.y-blockSize*2,blockSize/2,blockSize*5);
    } else if (this.type == "boomerang") {
      fill(this.innerColor);
      rect(this.pos.x+pixelSize,this.pos.y+pixelSize,pixelSize*2,pixelSize);
      rect(this.pos.x+pixelSize,this.pos.y+pixelSize,pixelSize,pixelSize*2);
    } else {
      fill(this.innerColor);
      rect(
        this.pos.x,
        this.pos.y,
        blockSize*this.sizeOffset[0],
        blockSize*this.sizeOffset[1]
      );
    }
  }

  this.hits = function(entity) {
    var d = dist(this.pos.x, this.pos.y, entity.pos.x, entity.pos.y);
    if (d < this.r + entity.r) {
      return true;
    } else {
      return false;
    }
  }

  this.edges = function() {
    if (this.type == "fairy") {
      if (this.pos.x > width + blockSize) {
        var index = loadedZone.items.indexOf(this);
        loadedZone.items.splice(index,1);
        console.log(this)
      } else if (this.pos.x < -blockSize) {
        var index = loadedZone.items.indexOf(this);
        loadedZone.items.splice(index,1);
      } else if (this.pos.y > height + blockSize) {
        var index = loadedZone.items.indexOf(this);
        loadedZone.items.splice(index,1);
      } else if (this.pos.y < -blockSize) { // topBorder
        var index = loadedZone.items.indexOf(this);
        loadedZone.items.splice(index,1);
      }
    }
  }
}

function drawOverlayItems() {
  var items = loadedZone.items;
  for (var i=0;i<items.length;i++) {
    var item = items[i];
    if (item.overlay) {
      item.render();
      item.update(i);
    }
  }
}


function drawItems() {
  var items = loadedZone.items;
    for (var i=0;i<items.length;i++) {
      var item = items[i];
      if (!item.overlay) {
        item.render();
        item.update(i);
        item.edges();
      }
  }


  var items = loadedZone.items;
  for (var i=0;i<items.length;i++) {
    var item = items[i];
    var b = loadedZone.items.indexOf(item);
    if (character.hasWeapon) {
      if (character.weapon.hits(item)) {
        if (item.type == "shrub") {
          cutGrass.play();
          item.explode(b);
        } else {
          droppedItemsInteractions(item,b);
        }
      }
    }
    if (character.secondaryWeaponOut) {
      if (character.secondaryWeapon.hits(item)) {
        droppedItemsInteractions(item,b);
      }
    }
    if (character.hits(item)) {
      if (item.type == "key") {
        getKey.play();
        items.splice(b,1);
        hud.characterIconColor = item.innerColor;
        character.hasMasterKey = true;
      } else if (item.type == "compass") {
        getKey.play();
        items.splice(b,1);
        character.hasCompass = true;
      } else if (item.type == "map") {
        getKey.play();
        items.splice(b,1);
        character.hasMap = true;
      } else if (item.type == "upstairs" && character.hasMasterKey) {
          levelComplete();
      } else if (item.type == "portal" && character.d == 'UP') {
          character.enteringPortal = true;
      } else if (item.type == "portal" && character.d != 'UP') {
        character.enteringPortal = false;
      } else if (item.type == "sword" && character.coins >= itemTypes[item._id].value) {
        character.burndownFactor = itemTypes[item._id].burndown;
        character.hasWeapon = true;
        character.coins -= itemTypes[item._id].value;
        character.weapon = createItem(item._id);
        items.splice(b,1);
        fanfare1.play();
      } else if (item.type == "boomerang" && character.coins >= itemTypes[item._id].value) {
        character.hasSecondaryWeapon = true;
        character.coins -= itemTypes[item._id].value;
        items.splice(b,1);
        fanfare1.play();
      } else {
        if (item.type == "shrub") {
          entityPush(character,item);
        } else {
          droppedItemsInteractions(item,b);
        }
      }
    }
  }
}


function droppedItemsInteractions(item,b) {
  var items = loadedZone.items;
  if (item.type == "heart") {
    getHeart.play();
    items.splice(b,1);
    if (character.health < totalHealth) {
      character.health += 1;
    }
    if (character.health > totalHealth) {
      character.health = totalHealth
    }
  } else if (item.type == "fairy") {
      items.splice(b,1);
      character.health = totalHealth;
      getFairy.play();
  } else if (item.type == "coin") {
    if (itemTypes[item._id].value < 0) { loseCoin.play(); } else { getCoin.play(); }
    items.splice(b,1);
    if (character.coins+itemTypes[item._id].value >= maxCoins) {
      character.coins = maxCoins;
    } else {
      character.coins += itemTypes[item._id].value;
    }
  }
}


function createItem(item_id,pos) {
  var item = new Item(item_id);
  if (typeof pos == 'undefined' || pos == "RANDOM") {
    item.pos = createVector(
      randomInt(blockSize*4,width-blockSize*4),
      randomInt(blockSize*4,height-blockSize*4)
    );
  } else if (pos == 'CENTER') {
    item.pos = createVector(width/2,height/2);
  } else if (pos == 'OFFSCREEN') {
    item.pos = createVector(9999,9999);
  } else if (pos == 'TOPRIGHTWALL') {
    item.pos = createVector(width-blockSize*4.1,blockSize);
  } else if (pos == 'TOPRIGHTWALLOVER') {
    item.pos = createVector(width-blockSize*4.1,-blockSize);
  } else if (pos == 'UPLEFT') {
    item.pos = createVector(width/4,height/4);
  } else if (pos == 'UPCENTER') {
    item.pos = createVector(width-width/2,height/4);
  } else if (pos == 'UPRIGHT') {
    item.pos = createVector(width-width/4,height/4);
  }
  return item;
}


function dropItem(item_id,pos) {
  var item = new Item(item_id);
  item.pos.x = pos.x+randomInt(-blockSize,blockSize);
  item.pos.y = pos.y+randomInt(-blockSize,blockSize);
  if (itemTypes[item_id].decays) { item.isDecaying = true; }
  loadedZone.items.push(item);
}


function createRandomItem() {
  var nonRareItemIDs = [];
  for (var i=0;i<itemTypes.length;i++) {
    var itemType = itemTypes[i];
    if (itemType.rarity != "unique" && itemType.rarity != "special" ) {
      nonRareItemIDs.push(itemType._id);
    }
  }
  var nonRareItemTypePicked = nonRareItemIDs[randomInt(0,nonRareItemIDs.length)];
  var diceRoll = randomInt(0,itemTypes[nonRareItemTypePicked].rarity);
  if (diceRoll == 0) {
    // console.log(itemTypes[nonRareItemTypePicked].value,itemTypes[nonRareItemTypePicked].type,diceRoll == itemTypes[nonRareItemTypePicked].rarity,diceRoll, itemTypes[nonRareItemTypePicked].rarity);
    // console.log(itemTypes[nonRareItemTypePicked].type,itemTypes[nonRareItemTypePicked].value)
    return itemTypes[nonRareItemTypePicked]._id;
  } else {
    return false;
  }
}


function createItemCluster(x,y,w,h,it) {
  var items = [];
  var matrix = createMatrix(w,h);
  var itemTypeID = it;
  if (it == "random") { itemTypeID = randomInt(0,itemTypes.length); }
  for (var i=0;i<matrix.length;i++) {
    var _x = matrix[i][0];
    var _y = matrix[i][1];
    items.push(createItem(itemTypeID));
    var diceRoll = randomInt(0,4);
    if (diceRoll == 0) {
      items[i].items = [[0,5][randomInt(0,2)]];
    }
    items[i].pos.x = (_x * blockDefaultWidth) + (x*blockDefaultWidth);
    items[i].pos.y = (_y * blockDefaultHeight) + (y*blockDefaultHeight);
  }
  return items;
}


function createShrubs() {
  var maxLengthOfRow = 6;
  var topLeft = [appBlockWidth/2-maxLengthOfRow/2,2,randomInt(0,maxLengthOfRow),randomInt(0,2)+1,17];
  var bottomLeft = [appBlockWidth/2-maxLengthOfRow/2,appBlockHeight-3,randomInt(0,maxLengthOfRow),randomInt(0,2)+1,17];
  var growth = [topLeft,bottomLeft][randomInt(0,2)];
  var shrubs = createItemCluster(growth[0],growth[1],growth[2],growth[3],growth[4]);

  var c = 0;
  for (var i=0;i<loadedZone.items.length;i++) {
    if (loadedZone.items[i].type == "shrub") { c += 1; }
  }
  var diceRoll = randomInt(0,10); // 1 in 10 CHANCE OF SEEDINGS GROWTH
  // console.log('SEED',loadedZone.lastShrubGrowth === 0,diceRoll === 0,c === 0,loadedZone.lastShrubGrowth,diceRoll,c);
  if (loadedZone.lastShrubGrowth === 0 && diceRoll === 0 && c === 0) {
    var oldItems = loadedZone.items.splice(0);
    loadedZone.items = oldItems.concat(shrubs);
    loadedZone.lastShrubGrowth = epoch();
  } else {
    var e = epoch();
    // console.log('GROW',e-loadedZone.lastShrubGrowth > (5*60) && c < 12 && loadedZone.lastShrubGrowth > 0,e-loadedZone.lastShrubGrowth,(5*60))
    if (e-loadedZone.lastShrubGrowth > (5*60) && c < 12 && loadedZone.lastShrubGrowth > 0) { // EVERY 5 MINS NEW GROWTH
      var oldItems = loadedZone.items.splice(0);
      loadedZone.items = oldItems.concat(shrubs);
      loadedZone.lastShrubGrowth = epoch();
    }
  }
}
