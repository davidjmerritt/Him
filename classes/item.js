var itemTypes = [
  {"_id":0, "type":"coin","innerColor": LIGHT_GREEN,"secondaryColor":GREEN,"movable": false,"solid": false, "damage":0,"rarity":2,"value":1},
  {"_id":1, "type":"door","innerColor": DARK_BROWN,"secondaryColor":BLACK,"movable": false,"solid": false, "damage":0,"rarity":"unique","value":0},
  {"_id":2, "type":"hole","innerColor": BLACK,"movable": false,"solid": false, "damage":0,"rarity":"unique","value":0},
  {"_id":3, "type":"key","innerColor": ORANGE,"secondaryColor":YELLOW,"movable": true,"solid": true, "damage":0,"rarity":"unique","value":20},
  {"_id":4, "type":"sword","innerColor": WOOD_BROWN,"secondaryColor": DARK_GREEN,"movable": false,"solid": true, "damage":1,"rarity":"unique","value":0},
  {"_id":5, "type":"heart","innerColor": RED,"secondaryColor":DARK_RED,"movable": false,"solid": false,"damage":0,"rarity":2,"value":0},
  {"_id":6, "type":"coin","innerColor": LIGHT_BLUE,"secondaryColor":BLUE,"movable": false,"solid": false, "damage":0,"rarity":3,"value":5},
  {"_id":7, "type":"sword","innerColor": WHITE,"secondaryColor": DARK_BLUE,"movable": false,"solid": true, "damage":2,"rarity":"unique","value":0},
  {"_id":8, "type":"sword","innerColor": GOLD,"secondaryColor": DARKER_RED,"movable": false,"solid": true, "damage":4,"rarity":"unique","value":0},
  {"_id":9, "type":"coin","innerColor": YELLOW,"secondaryColor":ORANGE,"movable": false,"solid": false, "damage":0,"rarity":5,"value":10},
  {"_id":10, "type":"coin","innerColor": PINK,"secondaryColor":DARK_RED,"movable": false,"solid": false, "damage":0,"rarity":10,"value":20},
];

function Item(_id) {
  this._id = _id;
  this.pos = createVector(width / 2, height / 2);
  this.r = blockDefaultRadius;
  this.isMoving = false;
  this.d = null;
  this.vel = 4;
  this.isMovable = itemTypes[this._id].movable;
  this.isSolid = itemTypes[this._id].solid;
  this.type = itemTypes[this._id].type;
  this.innerColor = itemTypes[this._id].innerColor;
  this.secondaryColor = itemTypes[this._id].secondaryColor;
  this.damage = itemTypes[this._id].damage;
  this.rotation = 1;

  this.render = function() {
    push();
    this.look();
    pop();
  }

  this.look = function() {
    noStroke();
    if (this.type == "sword") {
      fill(this.innerColor);
      // stroke(BLACK)
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
        // rect(this.pos.x+pixelSize*1.5,this.pos.y,pixelSize,pixelSize);
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
    } else if (this.type == "heart") {
      // fill([this.innerColor,this.secondaryColor][randomInt(0,2)]);
      fill(this.innerColor);
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
      fill(WHITE);
      rect(this.pos.x+pixelSize*2,this.pos.y,pixelSize,pixelSize);
      rect(this.pos.x+pixelSize*3,this.pos.y+pixelSize,pixelSize,pixelSize);
      fill(this.secondaryColor);
      rect(this.pos.x+pixelSize*3,this.pos.y+pixelSize*2,pixelSize,pixelSize);
      rect(this.pos.x,this.pos.y+pixelSize*2,pixelSize,pixelSize);
      rect(this.pos.x+pixelSize,this.pos.y+pixelSize*3,pixelSize,pixelSize);
    } else if (this.type == "door") {
      fill(this.innerColor);
      rect(this.pos.x,this.pos.y,blockSize,blockSize);
      fill(this.secondaryColor);
      rect(this.pos.x+pixelSize,this.pos.y+pixelSize*2,pixelSize,pixelSize);
      rect(this.pos.x+pixelSize*2,this.pos.y+pixelSize,pixelSize,pixelSize*2);
    } else if (this.type == "key") {
        fill([this.innerColor,this.secondaryColor][randomInt(0,2)]);
        rect(this.pos.x,this.pos.y,pixelSize,pixelSize*3);
        rect(this.pos.x+pixelSize,this.pos.y,pixelSize,pixelSize);
        rect(this.pos.x+pixelSize,this.pos.y+pixelSize*2,pixelSize,pixelSize);
        rect(this.pos.x+pixelSize*2,this.pos.y,pixelSize,pixelSize*4);
        rect(this.pos.x+pixelSize*3,this.pos.y+pixelSize*2,pixelSize,pixelSize*2);
      } else {
      fill(this.innerColor);
      rect(
        this.pos.x,
        this.pos.y,
        blockSize,
        blockSize
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
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) { // topBorder
      level.set();
      this.pos.y = height + this.r;
    }
  }

}


function drawItems() {
  var items = loadedZone.blocks.items;
  for (var i=0;i<items.length;i++) {
    items[i].render();
  }
}


function createItem(item_id,pos) {
  var item = new Item(item_id);
  if (pos != undefined) {
    if (pos == 'CENTER') {
      item.pos = createVector(width/2,height/2);
    }
  } else {
    item.pos = createVector(
      randomInt(blockSize*4,width-blockSize*4),
      randomInt(blockSize*4,height-blockSize*4)
    );
  }
  return item;
}


function dropItem(item_id,pos) {
  var item = new Item(item_id);
  item.pos.x = pos.x+randomInt(-blockSize,blockSize);
  item.pos.y = pos.y+randomInt(-blockSize,blockSize)
  loadedZone.blocks.items.push(item);
}


function createRandomItem() {
  var nonRareItemIDs = [];
  for (var i=0;i<itemTypes.length;i++) {
    var itemType = itemTypes[i];
    if (itemType.rarity != "unique") {
      nonRareItemIDs.push(itemType._id);
    }
  }
  var nonRareItemTypePicked = nonRareItemIDs[randomInt(0,nonRareItemIDs.length)];
  var diceRoll = randomInt(0,itemTypes[nonRareItemTypePicked].rarity+1);
  // console.log(itemTypes[nonRareItemTypePicked].value,itemTypes[nonRareItemTypePicked].type,diceRoll == itemTypes[nonRareItemTypePicked].rarity,diceRoll, itemTypes[nonRareItemTypePicked].rarity);
  if (diceRoll == itemTypes[nonRareItemTypePicked].rarity) {
    return itemTypes[nonRareItemTypePicked]._id;
  } else {
    return false
  }
}
