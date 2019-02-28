function Zone() {
  this._id = '';//guid();
  this.coordinates = [];
  this.blocks = defaultZoneBlocks;
  this.backgroundColor = TAN;
  this.enemies = [];
  this.debris = [];
  this.missiles = {"enemy":[],"weapon":[]};
  this.walls = [];
  this.items = [];
  this.bombs = [];
  this.hasShop = false;
  this.npcs = [];
  this.type = "overworld";
  this.secretSoundPlayed = false;
  this.lastShrubGrowth = 0;

  this.create = function(coordinates,walls) {
    this._id = coordinates.toString().replace(',','-');
    this.coordinates = coordinates;
    this.walls = walls;
    var newZone = createZone(coordinates,walls);
    this.blocks = newZone.blocks;
    this.backgroundColor = newZone.backgroundColor;
    this.hasShop = newZone.hasShop;

    // closeWallsToNoWhere(coordinates,walls);

    // if (this._id != defaultCoords.toString().replace(',','-')) { // OLD WAY TO CREATE ENEMIES
    //   this.enemies = createEnemies(randomInt(0,8));
    // }
  }
}

function closeWallsToNoWhere(coordinates,walls) {
  console.log(coordinates,walls);
}


function createZone(coordinates,walls) {
  var blocks = {};
  var block_id;
  var backgroundColor;
  var hasShop = false;
  var shopZones = [];

  // RANDOM BLOCK CHOICE
  var blockColorChoiceArr = [];
  for (var i=0;i<blockTypes.length;i++) {
      if (blockTypes[i].solid && !blockTypes[i].moveable && !blockTypes[i].diggable && blockTypes[i].rarity != "unique") {
        blockColorChoiceArr.push(i);
      }
  }
  var randomBlockID = randomInt(0,blockColorChoiceArr.length);
  block_id = blockColorChoiceArr[randomBlockID];
  backgroundColor = blockTypes[randomBlockID].backColor;

  // RANGES (BIOMES) / CHOOSE BLOCK COLOR ** THESE OVERRIDE RANDOM CHOICES MADE **
  if (coordinates[0] >= 5 && coordinates[1] >= 5) { block_id = 3; backgroundColor = blockTypes[block_id].backColor; } // FORREST
  if (coordinates[0] >= appBlockWidth-1 && coordinates[1] >= appBlockHeght-1) { block_id = 1; backgroundColor = blockTypes[block_id].backColor; } // COAST
  if (coordinates[0] <= 5 && coordinates[1] <= 7 && coordinates[0] > 2 && coordinates[1] > 2) { block_id = 2; backgroundColor = blockTypes[block_id].backColor; } // DESERT
  if (coordinates[0] <= 2 && coordinates[1] <= 2) { block_id = 4; backgroundColor = blockTypes[block_id].backColor; } // GAVE YARD

  // RIGHT WALL
  if (coordinates[0] == world.matrixWidth-1) {
    blocks["rightBorder"] = createBlockBorderRightBoundry(block_id);
  } else {
    if (!walls[1]) {
      blocks["rightBorder"] = createBlockBorderRightOpen(block_id);
    } else {
      blocks["rightBorder"] = createBlockBorderRight(block_id);
    }
  }

  // BOTTOM WALL
  if (coordinates[1] == world.matrixHeight-1) {
    blocks["bottomBorder"] = createBlockBorderBottomBoundry(block_id);
  } else {
    if (!walls[2]) {
      blocks["bottomBorder"] = createBlockBorderBottomOpen(block_id);
    } else {
      blocks["bottomBorder"] = createBlockBorderBottom(block_id);
    }
  }

  // LEFT WALL
  if (coordinates[0] == 0) {
    blocks["leftBorder"] = createBlockBorderLeftBoundry(block_id);
  } else {
    if (!walls[3]) {
      blocks["leftBorder"] = createBlockBorderLeftOpen(block_id);
    } else {
      blocks["leftBorder"] = createBlockBorderLeft(block_id);
    }
  }

  // TOP WALL
  if (coordinates[1] == 0) {
    blocks["topBorder"] = createBlockBorderTopBoundry(block_id);
  } else {
    if (!walls[0]) {
        blocks["topBorder"] = createBlockBorderTopOpen(block_id);
    } else {
      blocks["topBorder"] = createBlockBorderTop(block_id);
    }
  }

  // CREATE RANDOM CUSTOM CLUSTERS
  var layouts = clusterLayout(clusterTypesIndex[randomInt(0,clusterTypesIndex.length)]);
  for (var i=0;i<layouts.length;i++){
    blocks[guid()] = layouts[i];
  }

  var results = {
    "blocks":blocks,
    "backgroundColor":backgroundColor,
    "hasShop": hasShop
  };
  return results;
}
