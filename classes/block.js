var blockDefaultRadius = blockSize/2;
var blockDefaultWidth = blockDefaultRadius*2;
var blockDefaultHeight = blockDefaultWidth;
var blockTypes = [
  {"_id":0, "type": "block","innerColor": GRAY,"secondaryColor":WHITE,"backColor":WHITE,"movable": false,"solid": true,"diggable": false,"unique":false},
  {"_id":1, "type": "block","innerColor": BLUE,"secondaryColor":DARK_BLUE,"backColor":TAN,"movable": false,"solid": true,"diggable": false,"unique":false},
  {"_id":2, "type": "block","innerColor": BROWN,"secondaryColor":DARK_BROWN,"backColor":TAN,"movable": false,"solid": true,"diggable": false,"unique":false},
  {"_id":3, "type": "block","innerColor": GREEN,"secondaryColor":DARK_GREEN,"backColor":TAN,"movable": false,"solid": true,"diggable": false,"unique":false},
  {"_id":4, "type": "block","innerColor": WHITE,"secondaryColor":GRAY,"backColor":GRAY,"movable": false,"solid": true,"diggable": false,"unique":false},
  {"_id":5, "type": "block","innerColor": RED,"secondaryColor":DARKER_RED,"backColor":TAN,"movable": false,"solid": true,"diggable": false,"unique":false},
  {"_id":6, "type": "block","innerColor": ORANGE,"secondaryColor":RED,"backColor":TAN,"movable": false,"solid": true,"diggable": false,"unique":false},
  {"_id":7, "type": "block","innerColor": GREEN,"secondaryColor":DARK_GREEN,"backColor":TAN,"movable": false,"solid": true,"diggable": false,"unique":false},
  {"_id":8, "type": "block","innerColor": OFF_GREEN,"secondaryColor":DARK_GREEN,"backColor":TAN,"movable": true,"solid": true,"diggable": false,"unique":false},
  {"_id":9, "type": "block","innerColor": OFF_BROWN,"secondaryColor":BROWN,"backColor":TAN,"movable": true,"solid": true,"diggable": false,"unique":false},
  {"_id":10, "type": "block","innerColor": OFF_WHITE,"secondaryColor":WHITE,"backColor":GRAY,"movable": false,"solid": true,"diggable": true,"unique":false},
  {"_id":11, "type": "block","innerColor": DARK_GRAY,"secondaryColor":GRAY,"backColor":WHITE,"movable": false,"solid": true,"diggable": false,"unique":false},
  {"_id":12, "type": "block","innerColor": BROWN,"secondaryColor":DARK_BROWN,"backColor":TAN,"movable": false,"solid": false,"diggable": false,"unique":false},
];


function Block(_id) {
  this._id = _id;
  this.pos = createVector(width / 2, height / 2);
  this.r = blockDefaultRadius;
  this.isMoving = false;
  this.d = 'STILL';
  this.vel = 4;
  this.isMovable = blockTypes[this._id].moveable;
  this.isSolid = blockTypes[this._id].solid;
  this.isDiggable = blockTypes[this._id].diggable;
  this.isSpecial = false;

  this.look = function() {
    // stroke(blockTypes[this._id].innerColor);
    noStroke()
    fill(blockTypes[this._id].innerColor);
    rect(this.pos.x,this.pos.y,blockSize,blockSize);

    // fill(blockTypes[this._id].innerColor);
    // rect(this.pos.x,this.pos.y,pixelSize,pixelSize);
    // fill(blockTypes[this._id].secondaryColor);
    // rect(this.pos.x+pixelSize,this.pos.y,pixelSize,pixelSize);
    // fill(blockTypes[this._id].innerColor);
    // rect(this.pos.x+pixelSize*2,this.pos.y,pixelSize,pixelSize);
    // fill(blockTypes[this._id].secondaryColor);
    // rect(this.pos.x+pixelSize*3,this.pos.y,pixelSize,pixelSize);
    //
    // fill(blockTypes[this._id].secondaryColor);
    // rect(this.pos.x,this.pos.y+pixelSize,pixelSize,pixelSize);
    // fill(blockTypes[this._id].innerColor);
    // rect(this.pos.x+pixelSize,this.pos.y+pixelSize,pixelSize,pixelSize);
    // fill(blockTypes[this._id].secondaryColor);
    // rect(this.pos.x+pixelSize*2,this.pos.y+pixelSize,pixelSize,pixelSize);
    // fill(blockTypes[this._id].innerColor);
    // rect(this.pos.x+pixelSize*3,this.pos.y+pixelSize,pixelSize,pixelSize);
    //
    // fill(blockTypes[this._id].innerColor);
    // rect(this.pos.x,this.pos.y+pixelSize*2,pixelSize,pixelSize);
    // fill(blockTypes[this._id].secondaryColor);
    // rect(this.pos.x+pixelSize,this.pos.y+pixelSize*2,pixelSize,pixelSize);
    // fill(blockTypes[this._id].innerColor);
    // rect(this.pos.x+pixelSize*2,this.pos.y+pixelSize*2,pixelSize,pixelSize);
    // fill(blockTypes[this._id].secondaryColor);
    // rect(this.pos.x+pixelSize*3,this.pos.y+pixelSize*2,pixelSize,pixelSize);
    //
    // fill(blockTypes[this._id].secondaryColor);
    // rect(this.pos.x,this.pos.y+pixelSize*3,pixelSize,pixelSize);
    // fill(blockTypes[this._id].innerColor);
    // rect(this.pos.x+pixelSize,this.pos.y+pixelSize*3,pixelSize,pixelSize);
    // fill(blockTypes[this._id].secondaryColor);
    // rect(this.pos.x+pixelSize*2,this.pos.y+pixelSize*3,pixelSize,pixelSize);
    // fill(blockTypes[this._id].innerColor);
    // rect(this.pos.x+pixelSize*3,this.pos.y+pixelSize*3,pixelSize,pixelSize);

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
      this.pos.y = height + this.r;
    }
  }

  this.render = function() {
    push();
    this.look();
    pop();
  }
}


function drawBlocks() {
  var clusters = loadedZone.blocks;
  for (var c in clusters) {
    var blocks = clusters[c];
    for (var b=0;b<blocks.length;b++) {
      if (block != 'items') {
        var block = blocks[b];
        block.render();
      }
    }
  }
}


function createBlockBorderTop(block_id) {
  var blocks = [];
  for (var i=0;i<appWidth/(blockDefaultWidth);i++) {
    blocks.push(new Block(block_id));
    blocks[i].pos.x = blockDefaultWidth * i;
    blocks[i].pos.y = 0;
    blocks[i].isMovable = false;
    blocks[i].isSolid = true;
  }
  return blocks;
}


function createBlockBorderBottom(block_id) {
  var blocks = [];
  for (var i=0;i<appWidth/(blockDefaultWidth);i++) {
    blocks.push(new Block(block_id));
    blocks[i].pos.x = blockDefaultWidth * i;
    blocks[i].pos.y = height-blockDefaultHeight;
    blocks[i].isMovable = false;
    blocks[i].isSolid = true;
  }
  return blocks;
}


function createBlockBorderLeft(block_id) {
  var blocks = [];
  for (var i=0;i<appHeight/(blockDefaultHeight);i++) {
    blocks.push(new Block(block_id));
    blocks[i].pos.x = 0;
    blocks[i].pos.y = blockDefaultHeight * i;
    blocks[i].isMovable = false;
    blocks[i].isSolid = true;
  }
  return blocks;
}


function createBlockBorderRight(block_id) {
  var blocks = [];
  for (var i=0;i<appHeight/(blockDefaultHeight);i++) {
    blocks.push(new Block(block_id));
    blocks[i].pos.x = width-blockDefaultWidth;
    blocks[i].pos.y = blockDefaultHeight * i;
    blocks[i].isMovable = false;
    blocks[i].isSolid = true;
  }
  return blocks;
}


function createBlockBorderTopThick(block_id) {
  var blocks = [];
  for (var i=0;i<appWidth/(blockDefaultWidth);i++) {
    blocks.push(new Block(block_id));
    blocks[i].pos.x = blockDefaultWidth * i;
    blocks[i].pos.y = blockDefaultHeight;
    blocks[i].isMovable = false;
    blocks[i].isSolid = true;
  }
  return blocks.concat(createBlockBorderTop(block_id));
}


function createBlockBorderLeftThick(block_id) {
  var blocks = [];
  for (var i=0;i<appHeight/(blockDefaultHeight);i++) {
    blocks.push(new Block(block_id));
    blocks[i].pos.x = blockDefaultWidth;
    blocks[i].pos.y = blockDefaultHeight * i;
    blocks[i].isMovable = false;
    blocks[i].isSolid = true;
  }
  return blocks.concat(createBlockBorderLeft(block_id));
}


function createBlockBorderRightThick(block_id) {
  var blocks = [];
  for (var i=0;i<appHeight/(blockDefaultHeight);i++) {
    blocks.push(new Block(block_id));
    blocks[i].pos.x = width-(blockDefaultWidth*2);
    blocks[i].pos.y = blockDefaultHeight * i;
    blocks[i].isMovable = false;
    blocks[i].isSolid = true;
  }
  return blocks.concat(createBlockBorderRight(block_id));;
}


function createBlockCluster(x,y,w,h,b,custom) {
  var blocks = [];
  var matrix = createMatrix(w,h);
  var blockTypeID = b;
  if (b == "random") { blockTypeID = randomInt(0,blockTypes.length); }
  for (var i=0;i<matrix.length;i++) {
    var _x = matrix[i][0];
    var _y = matrix[i][1];
    blocks.push(new Block(blockTypeID));
    blocks[i].pos.x = (_x * blockDefaultWidth) + (x*blockDefaultWidth);
    blocks[i].pos.y = (_y * blockDefaultHeight) + (y*blockDefaultHeight);
    if (custom) {
      blocks[i].isMovable = blockTypes[blocks[i]._id].movable;
      blocks[i].isSolid = blockTypes[blocks[i]._id].solid;
    } else {
      blocks[i].isMovable = false;
      blocks[i].isSolid = true;
    }
  }
  return blocks;
}

function createBlockBorderLeftOpen(block_id) {
  return createBlockCluster(0,0,1,appBlockHeight/3,block_id).concat(
    createBlockCluster(0,(appBlockHeight+3)/2,1,appBlockHeight/2,block_id)
  );
}

function createBlockBorderRightOpen(block_id) {
  return createBlockCluster(appBlockWidth-1,0,1,(appBlockHeight-5)/2,block_id).concat(
    createBlockCluster(appBlockWidth-1,(appBlockHeight+3)/2,1,(appBlockHeight)/2,block_id)
  );
}

function createBlockBorderTopOpen(block_id) {
  return createBlockCluster(0,0,(appBlockWidth-5)/2,1,block_id).concat(
    createBlockCluster(0,1,(appBlockWidth-5)/2,1,block_id)).concat(
    createBlockCluster((appBlockWidth+5)/2,0,(appBlockWidth-2)/2,1,block_id).concat(
      createBlockCluster((appBlockWidth+5)/2,1,(appBlockWidth-2)/2,1,block_id)
    )
  );
}

function createBlockBorderTopOpenPortal(block_id) {
  return createBlockCluster(0,0,(appBlockWidth-5)/2,1,block_id).concat(
    createBlockCluster(0,1,(appBlockWidth-5)/2,1,block_id)).concat(
      createBlockCluster((appBlockWidth+15)/2,0,(appBlockWidth-2)/2,1,block_id).concat(
        createBlockCluster((appBlockWidth+5)/2,0,3,1,block_id).concat(
      createBlockCluster((appBlockWidth+15)/2,1,(appBlockWidth-2)/2,1,block_id).concat(
        createBlockCluster((appBlockWidth+5)/2,1,3,1,block_id)
      )))
  );
}

function createBlockBorderTopClosedPortal(block_id) {
  return createBlockCluster(-.9,0,16,2,block_id).concat(
      createBlockCluster((appBlockWidth+15)/2,0,(appBlockWidth-2)/2,2,block_id)
  );
}

function createBlockBorderBottomOpen(block_id) {
  return createBlockCluster(0,appBlockHeight-1,(appBlockWidth-5)/2,1,block_id).concat(
    createBlockCluster((appBlockWidth+5)/2,appBlockHeight-1,(appBlockWidth-2)/2,1,block_id)
  );
}

function createBlockBorderBottomOpenDoubleThick(block_id) {
  return createBlockCluster(0,appBlockHeight-1,(appBlockWidth-5)/2,1,block_id).concat(
    createBlockCluster((appBlockWidth+5)/2,appBlockHeight-1,(appBlockWidth-2)/2,1,block_id).concat(
    createBlockCluster(0,appBlockHeight-2,(appBlockWidth-5)/2,1,block_id).concat(
    createBlockCluster((appBlockWidth+5)/2,appBlockHeight-2,(appBlockWidth-2)/2,1,block_id)
  )));
}

function createBorders() {
  // createBlockBorderTop();
  // createBlockBorderBottom();
  // createBlockBorderLeft();
  // createBlockBorderRight();
  createBlockCluster(2,2,10,5,"random");
  // createBlockCluster(appBlockWidth-2-10,appBlockHeight-2-5,10,5,2);
  // createBlockBorderTopOpen();
}
