function Zone() {
  this._id = '';//guid();
  this.coordinates = [];
  this.blocks = defaultZoneBlocks;
  this.backgroundColor = TAN;
  this.enemies = [];

  this.create = function(coordinates) {
    this._id = coordinates.toString().replace(',','-');
    this.coordinates = coordinates;
    var newZone = createZone(coordinates);
    this.blocks = newZone[0];
    this.backgroundColor = newZone[1];
    if (this._id != "0-0") { this.enemies = createEnemies(randomInt(0,6)); }
  }
}


function createZone(coordinates) {
  var blocks = {};
  var blockColorChoiceArr = [4,2,3,0];
  var block_id = blockColorChoiceArr[randomInt(0,blockColorChoiceArr.length)];
  var backgroundColor = TAN;
  if (coordinates[0] < 3 && coordinates[1] < 3) { block_id = 4; backgroundColor = GRAY; }
  if (coordinates[0] > 6 && coordinates[1] > 6) { block_id = 2; }
  if (coordinates[0] == 0) { blocks["leftBorder"] = createBlockBorderLeft(block_id); } else { if (randomInt(0,1) == 0) { blocks["leftBorder"] = createBlockBorderLeftOpen(block_id); } }
  if (coordinates[1] == 0) { blocks["topBorder"] = createBlockBorderTop(block_id); } else { if (randomInt(0,1) == 0) { blocks["topBorder"] = createBlockBorderTopOpen(block_id); } }
  if (coordinates[0] == world.matrixWidth-1) { blocks["rightBorder"] = createBlockBorderRight(block_id); } else { if (randomInt(0,1) == 0) { blocks["rightBorder"] = createBlockBorderRightOpen(block_id); } }
  if (coordinates[1] == world.matrixHeight-1) { blocks["bottomBorder"] = createBlockBorderBottom(block_id); } else { if (randomInt(0,1) == 0) { blocks["bottomBorder"] = createBlockBorderBottomOpen(block_id); } }

  for (var i=0;i<randomInt(0,4);i++){ // NUMBER OF
    blocks[guid()] = createBlockCluster(
      randomInt(2,appBlockWidth-4), // X
      randomInt(2,appBlockHeight-4), // Y
      randomInt(2,4), // W
      randomInt(2,4), // H
      "random"
    );
  }

  blocks["temporary"] = [];
  blocks["items"] = [];

  return [blocks,backgroundColor];
}
