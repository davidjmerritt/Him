var world = {};

function World(w,h) {
  this._id = guid();
  this.zones_index = [];
  this.zones = {};
  this.matrix = [];
  this.matrixWidth = w;
  this.matrixHeight = h;
  this.breadcrumbs = [];
  this.negativeSpace = [];
  this.keyZone;
  this.compassZone;
  this.mapZone;
  this.doorZone;
  this.enemies = [];
  this.shops_index = [];
  this.zonesWithoutShop = [];
  this.shops = {};
  this.swordShop;
  this.hundredShop;
  this.fiftyShop;
  this.coinsInWorld;
  this.npcs = [];
  this.jokeShop;
  this.lastShop;

  this.create = function() {
    this.matrix = maze.slice(0); //createMatrix(this.matrixWidth,this.matrixHeight);
    defaultCoords = [world.matrixWidth/2,world.matrixHeight-1];
    this.breadcrumbs.push(defaultCoords);
    this.negativeSpace = createMatrixString(this.matrixWidth,this.matrixHeight);

    var allCoords = [];
    var allCoordsString = [];
    this.coordsWithOutTopPassage = [];

    var c = 0;
    for (var i=0;i<this.matrix.length;i++) {
      c += 1;
      var coordinates = [this.matrix[i].i,this.matrix[i].j]; // this.matrix[i]
      var stringCoords = coordinates.toString().replace(',','-');
      if (stringCoords != defaultCoords.toString().replace(',','-')) { allCoords.push(coordinates); allCoordsString.push(stringCoords); }

      var zone = new Zone();
      zone.create(coordinates,this.matrix[i].walls);
      this.zones_index.push(zone._id);
      this.zonesWithoutShop.push(zone._id);
      this.zones[zone._id] = zone;

      if (this.zones[zone._id].walls[0] == true) {
        this.coordsWithOutTopPassage.push(coordinates);
      }

      if (this.negativeSpace.indexOf(coordinates.toString().replace(',','-')) > -1) {
        this.negativeSpace.splice(this.negativeSpace.indexOf(coordinates.toString().replace(',','-')),1);
      }

      // console.log(c,coordinates)

      // console.log(zone)
    }
    // CREATE KEY
    var randomKeyIndex = randomInt(0,allCoords.length);
    this.keyZone = allCoordsString[randomKeyIndex];
    this.zones[this.keyZone].items.push(createItem(3,"OFFSCREEN"));

    // CREATE BOSS AT KEY ZONE
    if (level == 1) {
      this.zones[this.keyZone].blocks.clusters = {};
      this.zones[this.keyZone].enemies.push(new Enemy(5,0,createVector(width/2,height/2))); // BOSS-BLOOG
    } else if (level == 2) {
      this.zones[this.keyZone].blocks.clusters = {};
      this.zones[this.keyZone].enemies.push(new Enemy(5,0,createVector(width/2,height/2))); // BOSS-BLOOG
      this.zones[this.keyZone].enemies.push(new Enemy(6,0,createVector(width/2,height/2))); // PRINCE-BLOOG
    } else if (level >= 3) {
      this.zones[this.keyZone].blocks.clusters = {};
      this.zones[this.keyZone].enemies.push(new Enemy(5,0,createVector(width/2,height/2))); // BOSS-BLOOG
      this.zones[this.keyZone].enemies.push(new Enemy(6,0,createVector(width/2,height/2))); // PRINCE-BLOOG
      this.zones[this.keyZone].enemies.push(new Enemy(7,0,createVector(width/2,height/2))); // KING-BLOOG
    }

    // CREATE COMPASS
    var randomCompassIndex = randomInt(0,allCoords.length);
    this.compassZone = allCoordsString[randomCompassIndex];
    this.zones[this.compassZone].items.push(createItem(11,"OFFSCREEN"));

    // CREATE MAP
    var randomMapIndex = randomInt(0,allCoords.length);
    this.mapZone = allCoordsString[randomMapIndex];
    this.zones[this.mapZone ].items.push(createItem(12,"OFFSCREEN"));

    // CREATE STAIRS
    var randomDoorIndex = randomInt(0,allCoords.length);
    this.doorZone = allCoordsString[randomDoorIndex];
    this.zones[this.doorZone].items.push(createItem(20,"OFFSCREEN"));

    // CREATE BLOCKADE AROUND STAIRS
    // var doorCluster = clusterLayout("WARP_STONES");
    // for (var i=0;i<doorCluster.length;i++){
    //   this.zones[this.doorZone].blocks[guid()] = doorCluster[i];
    // }


    // CREATE UPSTAIRS @ START
    // this.zones[defaultCoords.toString().replace(',','-')].items.push(createItem(20,"UPLEFT"));

    // CREATE DOWNSTAIRS @ START
    // this.zones[defaultCoords.toString().replace(',','-')].items.push(createItem(19,"UPRIGHT"));

    // CREATE FENCE @ START
    // this.zones[defaultCoords.toString().replace(',','-')].items.push(createItem(21,"CENTER"));
    // var fenceCluster = clusterLayout("BROWN_FENCE");
    // for (var i=0;i<fenceCluster.length;i++){
    //   this.zones[defaultCoords.toString().replace(',','-')].blocks[guid()] = fenceCluster[i];
    // }

    // SWORD SHOPS
    if (level == 1) {
      createShop(defaultCoords,4,5); // WOODEN SWORD SHOP
      var swordID = 7;
      var npcID = 1;
    } else if (level == 2) {
      var swordID = 8;
      var npcID = 2;
    } else {
      var swordID = false;
    }
    if (!swordID) {} else {
      this.swordShop = this.zonesWithoutShop[randomInt(0,this.zonesWithoutShop.length).toString().replace(',','-')].split('-');
      createShop(this.swordShop,swordID,npcID);
    }

    // 100 COINS SHOP
    this.hundredShop = this.zonesWithoutShop[randomInt(0,this.zonesWithoutShop.length).toString().replace(',','-')].split('-');
    createShop(this.hundredShop,15,3);

    // 50 COINS SHOP
    this.fiftyShop = this.zonesWithoutShop[randomInt(0,this.zonesWithoutShop.length).toString().replace(',','-')].split('-');
    createShop(this.fiftyShop,16,3);

    // BOOMERANG SHOP
    if (level == 1) {
      this.boomerangShop = this.zonesWithoutShop[randomInt(0,this.zonesWithoutShop.length).toString().replace(',','-')].split('-');
      createShop(this.boomerangShop,22,8);
    }

    // JOKE SHOP
    this.jokeShop = this.zonesWithoutShop[randomInt(0,this.zonesWithoutShop.length).toString().replace(',','-')].split('-');
    createShop(this.jokeShop,18,6);

    // CREATE NPCS
    for (var i=0;i<overworldNPCs.length;i++) {
      createNPCs(overworldNPCs[i]);
    }

    // COUNT MONEY IN WORLD
    this.coinsInWorld = countCoinsInWorld();

    console.log(world);
  }
}


function drawZone() {
  background(loadedZone.backgroundColor);
  drawBlocks();
  drawDebris();
  drawMissiles();
}


function loadZone(newCoords,dirEnteredFrom) {
  var zone_id = newCoords.toString().replace(',','-');
  if (zone_id in world.zones) {
    loadedZone = world.zones[zone_id];
    createShrubs();
  } else {
    // CREATE NEW ZONE WHEN ZONE DOESNT EXIST
    if (dirEnteredFrom == 'RIGHT') { var walls = [true,true,true,false]; } else
    if (dirEnteredFrom == 'LEFT') { var walls = [true,false,true,true]; } else
    if (dirEnteredFrom == 'BOTTOM') { var walls = [false,true,true,true]; } else
    if (dirEnteredFrom == 'TOP') { var walls = [true,true,false,true]; }

    var zone = new Zone();
    zone.create(newCoords,walls);
    world.zones_index.push(zone_id);
    world.zonesWithoutShop.push(zone_id);
    world.zones[zone_id] = zone;
    loadZone(newCoords);
  }
  checkForBoss();
  if (character != undefined && character.secondaryWeapon != {}) {
    character.secondaryWeapon = {"type":"boomerang","_id":0};
    character.secondaryWeaponOut = false;
    character.secondaryWeaponUsed = false;
    character.secondaryWeaponCount = 0;
    stopLoop(boomerang,'boomerang');
  }
  // playEnemySounds();
}


function countCoinsInWorld() {
  coinsInWorld = 0;
  for (var i=0;i<world.zones_index.length;i++) {
    for (var j=0;j<world.zones[world.zones_index[i]].enemies.length;j++) {
      for (var k=0;k<world.zones[world.zones_index[i]].enemies[j].items.length;k++) {
        if (itemTypes[world.zones[world.zones_index[i]].enemies[j].items[k]].type == "coin") {
          coinsInWorld += itemTypes[world.zones[world.zones_index[i]].enemies[j].items[k]].value;
        }
      }
    }
  }
  return coinsInWorld;
}


function checkForBoss() {
  var lzc = loadedZone.coordinates;
  var bzc = world.zones[world.keyZone].coordinates;
  var bossAlive = false;
  for(var i=0;i<world.zones[world.keyZone].enemies.length;i++) {
    console.log(t,bossAlive);
    var t = world.zones[world.keyZone].enemies[i].type;
    if (t == "boss-bloog" || t == "prince-bloog" || t == "king-bloog") {
      console.log(t,bossAlive);
      bossAlive = true;
      break;
    }
  }

  if (bossAlive) {
    if (
      lzc[0]-1 == bzc[0] && lzc[1]-1 == bzc[1]
      || lzc[0]-1 == bzc[0] && lzc[1] == bzc[1]
      || lzc[0] == bzc[0] && lzc[1]-1 == bzc[1]
      || lzc[0]+1 == bzc[0] && lzc[1]+1 == bzc[1]
      || lzc[0]+1 == bzc[0] && lzc[1] == bzc[1]
      || lzc[0] == bzc[0] && lzc[1]+1 == bzc[1]
      || lzc[0]+1 == bzc[0] && lzc[1]-1 == bzc[1]
      || lzc[0]-1 == bzc[0] && lzc[1]+1 == bzc[1]
    )
    {
      bossScream.setVolume(0.5);
      if (!('bossScream' in timeoutLoops)) {
        startLoop(bossScream,2000,'bossScream');
      }
    } else if (lzc[0] == bzc[0] && lzc[1] == bzc[1]) {
      bossScream.setVolume(1);
    } else {
      stopLoop(bossScream,'bossScream');
    }
  } else {
    stopLoop(bossScream,'bossScream');
  }
}
