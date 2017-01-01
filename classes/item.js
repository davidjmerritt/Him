var itemTypes = [
  {"_id":0, "type":"coin","innerColor": YELLOW,"movable": false,"solid": false},
  {"_id":1, "type":"stairs","innerColor": [150,50,50],"movable": false,"solid": false}
];

function Item(_id) {
  this._id = _id;
  this.pos = createVector(width / 2, height / 2);
  this.r = blockDefaultRadius;
  this.isMoving = false;
  this.d = null;
  this.vel = 4;
  this.isMovable = false;
  this.isSolid = false;
  this.type = itemTypes[this._id].type;

  this.look = function() {
    fill(itemTypes[this._id].innerColor);
    stroke(itemTypes[this._id].innerColor);
    rect(
      this.pos.x,
      this.pos.y,
      this.r*2,
      this.r*2
    );
  }

  this.hits = function(entity) {
    p([this,entity]);
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

  this.render = function() {
    push();
    this.look();
    pop();
  }
}


function drawItems() {
  var items = loadedZone.blocks.items;
  for (var i=0;i<items.length;i++) {
    items[i].render();
  }
}


function createItem(item_id) {
  var item = new Item(item_id);
  item.pos = createVector(
    randomInt(blockSize*4,width-blockSize*4),
    randomInt(blockSize*4,height-blockSize*4)
  );
  return item;
}
