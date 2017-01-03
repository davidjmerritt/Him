var world = {};

function World(w,h) {
  this._id = guid();
  this._index = [];
  this.zones = {};
  this.matrix = [];
  this.matrixWidth = w;
  this.matrixHeight = h;
  this.breadcrumbs = [];

  this.create = function() {
    this.matrix = createMatrix(this.matrixWidth,this.matrixHeight);
    defaultCoords = [world.matrixWidth/2,world.matrixHeight-1];
    for (var i=0;i<this.matrix.length;i++) {
      var zone = new Zone();
      var coordinates = this.matrix[i];
      zone.create(coordinates);
      this._index.push(zone._id);
      this.zones[zone._id] = zone;
    }

    this.zones[world.matrix[randomInt(0,world.matrix.length)].toString().replace(',','-')].blocks.items.push(createItem(3,"CENTER")); // KEY
    this.zones[defaultCoords.toString().replace(',','-')].blocks.items.push(createItem(1,"CENTER")); // DOOR
    this.zones[defaultCoords.toString().replace(',','-')].blocks.items.push(createItem(5)); // HEART
    // this.zones["0-0"].blocks.items.push(createItem(3));
    console.log(world);
  }
}


function drawZone() {
  background(loadedZone.backgroundColor);
  drawBlocks();
  drawDebris();
  drawMissiles();
}


function loadRandomZone() {
  loadedZone = {};
  loadedZone = world.zones[randomInt(0,world._index.length)];
  // loadedZone = world.zones[randomInt(0,world._index.length)];
  // p(loadedZone.coordinates)
}


function newCoordsFromDir(dir) {
  var newCoords = loadedZone.coordinates.slice();
  if (dir == "LEFT") {
    newCoords[0] -= 1;
  }
  if (dir == "RIGHT") {
    newCoords[0] += 1;
  }
  if (dir == "TOP") {
    newCoords[1] -= 1;
  }
  if (dir == "BOTTOM") {
    newCoords[1] += 1;
  }
  // p([dir,newCoords.toString()])
  return newCoords;
}


function loadZone(newCoords,dir) {
  var zone_id = newCoords.toString().replace(',','-');
  if (zone_id in world.zones) { loadedZone = world.zones[zone_id]; }
}
