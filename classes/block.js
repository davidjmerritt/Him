var blockDefaultRadius = blockSize/2;
var blockDefaultWidth = blockDefaultRadius*2;
var blockDefaultHeight = blockDefaultWidth;
var blockTypes = [
  {"_id":0, "type": "block","innerColor": GRAY,"secondaryColor":WHITE,"backColor":WHITE,"movable": false,"solid": true,"diggable": false,"unique":false,"removable":true},
  {"_id":1, "type": "block","innerColor": BLUE,"secondaryColor":DARK_BLUE,"backColor":TAN,"movable": false,"solid": true,"diggable": false,"unique":false,"removable":true},
  {"_id":2, "type": "block","innerColor": BROWN,"secondaryColor":DARK_BROWN,"backColor":TAN,"movable": false,"solid": true,"diggable": false,"unique":false,"removable":true},
  {"_id":3, "type": "block","innerColor": GREEN,"secondaryColor":DARK_GREEN,"backColor":TAN,"movable": false,"solid": true,"diggable": false,"unique":false,"removable":true},
  {"_id":4, "type": "block","innerColor": WHITE,"secondaryColor":GRAY,"backColor":GRAY,"movable": false,"solid": true,"diggable": false,"unique":false,"removable":true},
  {"_id":5, "type": "block","innerColor": RED,"secondaryColor":DARKER_RED,"backColor":TAN,"movable": false,"solid": true,"diggable": false,"unique":false,"removable":true},
  {"_id":6, "type": "block","innerColor": ORANGE,"secondaryColor":RED,"backColor":TAN,"movable": false,"solid": true,"diggable": false,"unique":false,"removable":true},
  {"_id":7, "type": "block","innerColor": DARK_GREEN,"secondaryColor":GREEN,"backColor":TAN,"movable": false,"solid": true,"diggable": false,"unique":false,"removable":true},
  {"_id":8, "type": "block","innerColor": OFF_GREEN,"secondaryColor":DARK_GREEN,"backColor":TAN,"movable": true,"solid": true,"diggable": false,"unique":false,"removable":true},
  {"_id":9, "type": "block","innerColor": OFF_BROWN,"secondaryColor":BROWN,"backColor":TAN,"movable": true,"solid": true,"diggable": false,"unique":false,"removable":true},
  {"_id":10, "type": "block","innerColor": OFF_WHITE,"secondaryColor":WHITE,"backColor":GRAY,"movable": false,"solid": true,"diggable": true,"unique":false,"removable":true},
  {"_id":11, "type": "block","innerColor": DARK_GRAY,"secondaryColor":GRAY,"backColor":WHITE,"movable": false,"solid": true,"diggable": false,"unique":false,"removable":true},
  {"_id":12, "type": "block","innerColor": BROWN,"secondaryColor":DARK_BROWN,"backColor":TAN,"movable": false,"solid": false,"diggable": false,"unique":false,"removable":true},
  {"_id":13, "type": "block","innerColor": BROWN,"secondaryColor":DARK_BROWN,"backColor":TAN,"movable": false,"solid": true,"diggable": false,"unique":false,"removable":false},
  {"_id":14, "type": "block","innerColor": BLUE,"secondaryColor":DARK_BLUE,"backColor":TAN,"movable": false,"solid": true,"diggable": true,"unique":false,"removable":true},
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
  this.isRemovable = blockTypes[this._id].removable;

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

    // this.explode = function() {
    //   createDebris(this.pos,randomInt(-25,25),4,blockTypes[this._id].innerColor);
    // }

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

function createBlockBorderTopBoundry(block_id) {
  var blocks = [];
  for (var i=0;i<appWidth/(blockDefaultWidth);i++) {
    blocks.push(new Block(block_id));
    blocks[i].pos.x = blockDefaultWidth * i;
    blocks[i].pos.y = 0;
    blocks[i].isMovable = false;
    blocks[i].isSolid = true;
    blocks[i].isRemovable = false;
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


function createBlockBorderBottomBoundry(block_id) {
  var blocks = [];
  for (var i=0;i<appWidth/(blockDefaultWidth);i++) {
    blocks.push(new Block(block_id));
    blocks[i].pos.x = blockDefaultWidth * i;
    blocks[i].pos.y = height-blockDefaultHeight;
    blocks[i].isMovable = false;
    blocks[i].isSolid = true;
    blocks[i].isRemovable = false;
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


function createBlockBorderLeftBoundry(block_id) {
  var blocks = [];
  for (var i=0;i<appHeight/(blockDefaultHeight);i++) {
    blocks.push(new Block(block_id));
    blocks[i].pos.x = 0;
    blocks[i].pos.y = blockDefaultHeight * i;
    blocks[i].isMovable = false;
    blocks[i].isSolid = true;
    blocks[i].isRemovable = false;
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


function createBlockBorderRightBoundry(block_id) {
  var blocks = [];
  for (var i=0;i<appHeight/(blockDefaultHeight);i++) {
    blocks.push(new Block(block_id));
    blocks[i].pos.x = width-blockDefaultWidth;
    blocks[i].pos.y = blockDefaultHeight * i;
    blocks[i].isMovable = false;
    blocks[i].isSolid = true;
    blocks[i].isRemovable = false;
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


function createBlockBorderTopThickBoundry(block_id) {
  var blocks = [];
  for (var i=0;i<appWidth/(blockDefaultWidth);i++) {
    blocks.push(new Block(block_id));
    blocks[i].pos.x = blockDefaultWidth * i;
    blocks[i].pos.y = blockDefaultHeight;
    blocks[i].isMovable = false;
    blocks[i].isSolid = true;
    blocks[i].isRemovable = false;
  }
  return blocks.concat(createBlockBorderTopBoundry(block_id));
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


function createBlockBorderLeftThickBoundry(block_id) {
  var blocks = [];
  for (var i=0;i<appHeight/(blockDefaultHeight);i++) {
    blocks.push(new Block(block_id));
    blocks[i].pos.x = blockDefaultWidth;
    blocks[i].pos.y = blockDefaultHeight * i;
    blocks[i].isMovable = false;
    blocks[i].isSolid = true;
    blocks[i].isRemovable = false;
  }
  return blocks.concat(createBlockBorderLeftBoundry(block_id));
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
  return blocks.concat(createBlockBorderRight(block_id));
}


function createBlockBorderRightThickBoundry(block_id) {
  var blocks = [];
  for (var i=0;i<appHeight/(blockDefaultHeight);i++) {
    blocks.push(new Block(block_id));
    blocks[i].pos.x = width-(blockDefaultWidth*2);
    blocks[i].pos.y = blockDefaultHeight * i;
    blocks[i].isMovable = false;
    blocks[i].isSolid = true;
    blocks[i].isRemovable = false;
  }
  return blocks.concat(createBlockBorderRightBoundry(block_id));
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


function destroyOtherWallBlock(wall,block) {
  if (wall == 'topBorder') {
    var otherWall = 'bottomBorder';
    var otherWallCoords = [loadedZone.coordinates[0],loadedZone.coordinates[1]-1].toString().replace(',','-');
    var nextZone = world.zones[otherWallCoords];
    if (nextZone != undefined) {
      var nextZoneBottomBlocks = world.zones[otherWallCoords].blocks.bottomBorder;
      for (var bb=0;bb<nextZoneBottomBlocks.length;bb++) {
        var bb_blocks = nextZoneBottomBlocks[bb];
        if (bb_blocks.pos.x+5==block.pos.x || bb_blocks.pos.x-5==block.pos.x || bb_blocks.pos.x==block.pos.x) {
          var bb_blocks_index = nextZoneBottomBlocks.indexOf(bb_blocks);
          nextZoneBottomBlocks.splice(bb_blocks_index,1);
        }
      }
    }
  } else if (wall == 'bottomBorder') {
    var otherWall = 'topBorder';
    var otherWallCoords = [loadedZone.coordinates[0],loadedZone.coordinates[1]+1].toString().replace(',','-');
    var nextZone = world.zones[otherWallCoords];
    if (nextZone != undefined) {
      var nextZoneBottomBlocks = world.zones[otherWallCoords].blocks.topBorder;
      for (var bb=0;bb<nextZoneBottomBlocks.length;bb++) {
        var bb_blocks = nextZoneBottomBlocks[bb];
        if (bb_blocks.pos.x+5==block.pos.x || bb_blocks.pos.x-5==block.pos.x || bb_blocks.pos.x==block.pos.x) {
          var bb_blocks_index = nextZoneBottomBlocks.indexOf(bb_blocks);
          nextZoneBottomBlocks.splice(bb_blocks_index,1);
        }
      }
    }
  } else if (wall == 'rightBorder') {
    var otherWall = 'leftBorder';
    var otherWallCoords = [loadedZone.coordinates[0]+1,loadedZone.coordinates[1]].toString().replace(',','-');
    var nextZone = world.zones[otherWallCoords];
    if (nextZone != undefined) {
      var nextZoneBottomBlocks = world.zones[otherWallCoords].blocks.leftBorder;
      for (var bb=0;bb<nextZoneBottomBlocks.length;bb++) {
        var bb_blocks = nextZoneBottomBlocks[bb];
        if (bb_blocks.pos.y+5==block.pos.y || bb_blocks.pos.y-5==block.pos.y || bb_blocks.pos.y==block.pos.y) {
          var bb_blocks_index = nextZoneBottomBlocks.indexOf(bb_blocks);
          nextZoneBottomBlocks.splice(bb_blocks_index,1);
        }
      }
    }
  } else if (wall == 'leftBorder') {
    var otherWall = 'rightBorder';
    var otherWallCoords = [loadedZone.coordinates[0]-1,loadedZone.coordinates[1]].toString().replace(',','-');
    var nextZone = world.zones[otherWallCoords];
    if (nextZone != undefined) {
      var nextZoneBottomBlocks = world.zones[otherWallCoords].blocks.rightBorder;
      for (var bb=0;bb<nextZoneBottomBlocks.length;bb++) {
        var bb_blocks = nextZoneBottomBlocks[bb];
        if (bb_blocks.pos.y+5==block.pos.y || bb_blocks.pos.y-5==block.pos.y || bb_blocks.pos.y==block.pos.y) {
          var bb_blocks_index = nextZoneBottomBlocks.indexOf(bb_blocks);
          nextZoneBottomBlocks.splice(bb_blocks_index,1);
        }
      }
    }
  }
  if (nextZone != undefined) {
    updateMazeAfterWallDestroyed(loadedZone._id,otherWallCoords,wall,otherWall);
    return true;
  } else {
    return false;
  }
}
