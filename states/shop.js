function shopSetup() {
  shopReset();
}


function shopReset() {
  console.log('shop reset');
}


function shopDraw() {
  background(25);
  drawBlocks();
  drawDebris();
  drawItems();
  drawMissiles();
  if (character.isAlive) { drawCharacter(); } else { drawMenu("GAMEOVER"); }
  if (gameWon) { drawMenu("WIN"); loadedZone.enemies = []; } else { gameCheck(); }
  checkCharacterMovement();
  if (character.hasMap) {
    for (var i=0;i<maze.length;i++) {
      maze[i].show();
    }
  }
  drawHud();
}


function createShop(coordinates,item_id,npc_id) {
  // INTERIOR
  var shop_id = coordinates.toString().replace(',','-');
  var shopZone = new Zone();
  world.shops_index.push(shop_id);
  shopZone.create(coordinates,[true, true, false, true]);
  world.shops[shop_id] = shopZone;
  world.shops[shop_id].type = "shop";
  world.shops[shop_id].enemies = [];
  world.shops[shop_id].blocks = {};
  world.shops[shop_id].blocks["topBorder"] = createBlockBorderTopThick(2);
  world.shops[shop_id].blocks["rightBorder"] = createBlockBorderRightThick(2);
  world.shops[shop_id].blocks["leftBorder"] = createBlockBorderLeftThick(2);
  world.shops[shop_id].blocks["bottomBorder"] = createBlockBorderBottomOpenDoubleThick(2);
  world.shops[shop_id].items.push(createItem(item_id,'CENTER')); // ITEM
  world.shops[shop_id].npcs.push(new Npc(npc_id,createVector(width/2,height/3))); // NPC
  if (npcTypes[world.shops[shop_id].npcs[0]._id].type == "george") {
    npcTypes[world.shops[shop_id].npcs[0]._id].messages = shuffleArray(jokes);
    world.shops[shop_id].npcs[0].items.push(6);
  }
  world.shops[shop_id].items.push(new Item(14)); // FAIRY

  // EXTERIOR
  var zone_id = shop_id;
  // console.log(zone_id)
  var block_id = world.zones[zone_id].blocks["topBorder"][0]._id;
  world.zones[zone_id].items.push(createItem(2,"TOPRIGHTWALL")); // PORTAL
  world.zones[zone_id].items.push(createItem(13,"TOPRIGHTWALLOVER")); // OVERHANG
  if (world.zones[zone_id].walls[0] == false) {
    world.zones[zone_id].blocks["topBorder"] = createBlockBorderTopOpenPortal(block_id);
  } else {
    world.zones[zone_id].blocks["topBorder"] = createBlockBorderTopClosedPortal(block_id);
  }
  world.zones[zone_id].hasShop = true;
  world.zonesWithoutShop.splice(world.zonesWithoutShop.indexOf(zone_id),1);
}


function loadShop(shopCoords) {
  var shopCoordsString = shopCoords.toString().replace(',','-');
  overworldTrack.stop();
  caveTrack.loop(); caveTrack.setVolume(0.3);
  loadedZone = world.shops[shopCoordsString];
  world.lastShop = shopCoordsString;
}
