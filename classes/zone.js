function Zone() {
  this._id = '';//guid();
  this.coordinates = [];
  this.blocks = defaultZoneBlocks;
  this.backgroundColor = TAN;
  this.enemies = [];
  this.debris = [];
  this.missiles = {"enemy":[],"weapon":[]};

  this.create = function(coordinates) {
    this._id = coordinates.toString().replace(',','-');
    this.coordinates = coordinates;
    var newZone = createZone(coordinates);
    this.blocks = newZone.blocks;
    this.backgroundColor = newZone.backgroundColor;
    this.doorMap = newZone.doorMap;
    if (this._id != defaultCoords.toString().replace(',','-')) { this.enemies = createEnemies(randomInt(0,6)); }
  }
}


function createZone(coordinates) {
  var doorMap = {};
  doorMap[coordinates] = {};
  var blocks = {};
  var blockColorChoiceArr = [4,2,3,0];
  var block_id = blockColorChoiceArr[randomInt(0,blockColorChoiceArr.length)];
  var backgroundColor = TAN;

  // RANGES (BIOMES)
  // if (coordinates[0] < 3 && coordinates[1] < 3) { block_id = 4; backgroundColor = GRAY; }
  // if (coordinates[0] > 6 && coordinates[1] > 6) { block_id = 2; }

  var oddsForOpen = 1;
  // LEFT
  if (coordinates[0] == 0) {
    blocks["leftBorder"] = createBlockBorderLeft(block_id);
    doorMap[coordinates]["LEFT"] = "CLOSED";
  } else {
    if (randomInt(0,oddsForOpen) == 0) {
      blocks["leftBorder"] = createBlockBorderLeftOpen(block_id);
      doorMap[coordinates]["LEFT"] = "OPEN";
    } else {
      blocks["leftBorder"] = createBlockBorderLeft(block_id);
      doorMap[coordinates]["LEFT"] = "CLOSED";
    }
  }

  // TOP
  if (coordinates[1] == 0) {
    blocks["topBorder"] = createBlockBorderTop(block_id);
    doorMap[coordinates]["TOP"] = "CLOSED";
  } else {
    if (randomInt(0,oddsForOpen) == 0) {
      blocks["topBorder"] = createBlockBorderTopOpen(block_id);
      doorMap[coordinates]["TOP"] = "OPEN";
    } else {
      blocks["topBorder"] = createBlockBorderTop(block_id);
      doorMap[coordinates]["TOP"] = "CLOSED";
    }
  }

  // RIGHT
  if (coordinates[0] == world.matrixWidth-1) {
    blocks["rightBorder"] = createBlockBorderRight(block_id);
    doorMap[coordinates]["RIGHT"] = "CLOSED";
  } else {
    if (randomInt(0,oddsForOpen) == 0) {
      blocks["rightBorder"] = createBlockBorderRightOpen(block_id);
      doorMap[coordinates]["OPEN"] = "CLOSED";
    } else {
      blocks["rightBorder"] = createBlockBorderRight(block_id);
      doorMap[coordinates]["RIGHT"] = "CLOSED";
    }
  }

  // BOTTOM
  if (coordinates[1] == world.matrixHeight-1) {
    blocks["bottomBorder"] = createBlockBorderBottom(block_id);
    doorMap[coordinates]["BOTTOM"] = "CLOSED";
  } else {
    if (randomInt(0,oddsForOpen) == 0) {
      blocks["bottomBorder"] = createBlockBorderBottomOpen(block_id);
      doorMap[coordinates]["BOTTOM"] = "OPEN";
    } else {
      blocks["bottomBorder"] = createBlockBorderBottom(block_id);
      doorMap[coordinates]["BOTTOM"] = "CLOSED";
    }
  }

  for (var i=0;i<randomInt(0,10);i++){ // NUMBER OF CLUSTERS
    blocks[guid()] = createBlockCluster(
      randomInt(2,appBlockWidth-5), // X
      randomInt(2,appBlockHeight-5), // Y
      randomInt(2,5), // W
      randomInt(2,5), // H
      "random"
    );
  }

  blocks["temporary"] = [];
  blocks["items"] = [];

  return {
    "blocks":blocks,
    "backgroundColor":backgroundColor,
    "doorMap":doorMap
  }
}
