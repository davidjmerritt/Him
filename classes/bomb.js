bombTypes = [
  {"_id":0, "type":"bomb","primaryColor": DARK_BLUE,"secondaryColor":BLUE,"tertiaryColor":OFF_WHITE,"movable": true,"solid": true, "damage":4,"rarity":1,"value":1,"decays":true,"fuse":300,"range":25},
  {"_id":1, "type":"bomb","primaryColor": DARKER_RED,"secondaryColor":RED,"tertiaryColor":OFF_WHITE,"movable": true,"solid": true, "damage":8,"rarity":1,"value":1,"decays":true,"fuse":300,"range":50},
];

function Bomb(pos, dir, _id) {
  this._id = _id;
  this.pos = pos.copy();
  this.d = dir;
  this.r = blockSize/3;
  this.primaryColor = bombTypes[this._id].primaryColor;
  this.secondaryColor = bombTypes[this._id].secondaryColor;
  this.tertiaryColor = bombTypes[this._id].tertiaryColor;
  this.range = bombTypes[this._id].range;
  this.fuseLength = bombTypes[this._id].fuse;
  this.isSet = false;
  this.isMovable = true;
  this.isSolid = true;
  this.damage = bombTypes[this._id].damage;
  this.type = bombTypes[this._id].type;

  this.set = function() {
    bombDrop.play();
    if (this.d == "RIGHT") {
      this.pos.x = this.pos.x + blockSize;
    } else if (this.d == "LEFT") {
      this.pos.x = this.pos.x - blockSize;
    } else if (this.d == "UP") {
      this.pos.y = this.pos.y - blockSize;
    } else if (this.d == "DOWN" || "STILL") {
      this.pos.y = this.pos.y + blockSize;
    }
    this.isSet = true;
  }

  this.update = function(dir,_id) {
    if (this.isSet) {
      this.fuseLength -= 1;
      if (this.fuseLength <=0) {
        this.explode();
      }
    }
  }

  this.explode = function() {
    bombBlow.play();
    var index = loadedZone.bombs.indexOf(this);
    loadedZone.bombs.splice(index,1);
    createBombDebris(this.pos, this.range, 50, [this.primaryColor,this.secondaryColor,this.tertiaryColor,BLACK,DARK_GRAY], this.damage);
    this.isSet = false;
  }

  this.look = function() {
    noStroke();
    if (this.isSet) {
      if (this.fuseLength > 90) {
        fill([ORANGE,YELLOW,WHITE][randomInt(0,3)]);
        rect(this.pos.x,this.pos.y,pixelSize,pixelSize);
        fill(this.tertiaryColor);
        rect(this.pos.x+pixelSize,this.pos.y,pixelSize,pixelSize);
        fill(this.primaryColor);
        rect(this.pos.x+pixelSize,this.pos.y+pixelSize,pixelSize*2,pixelSize*2);
      } else if (this.fuseLength <= 90 && this.fuseLength > 30) {
        fill([ORANGE,YELLOW,WHITE][randomInt(0,3)]);
        rect(this.pos.x+pixelSize,this.pos.y,pixelSize,pixelSize);
        fill(this.primaryColor);
        rect(this.pos.x+pixelSize,this.pos.y+pixelSize,pixelSize*2,pixelSize*2);
      } else if (this.fuseLength <= 30) {
        fill(this.primaryColor);
        rect(this.pos.x+pixelSize,this.pos.y+pixelSize,pixelSize*2,pixelSize*2);
      }
    }
  }

  this.render = function() {
    push();
    this.look();
    pop();
  }
}


function drawBombs() {
  for (var i=0; i < loadedZone.bombs.length; i++) {
    loadedZone.bombs[i].render();
    loadedZone.bombs[i].update();
  }
}
