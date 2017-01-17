function overworldSetup() {
  createMaze();
  reset();
}


function overworldReset() {
  stopAllSounds();
  overworldTrack.loop(); overworldTrack.setVolume(0.3);
  level += 1;
  gameWon = false;
  keyCodeMap = [];

  world = new World(worldWidth,worldHeight);
  world.create();

  loadZone(defaultCoords);
  hud = new Hud();
  menu = new Menu();

  if (character === undefined) {
    createCharacter();
  }
}


function overworldDraw() {
  drawZone();
  drawItems();
  drawEnemies();

  if (character.isAlive) { drawCharacter(); } else { drawMenu("GAMEOVER"); }
  if (gameWon) { drawMenu("WIN"); } else { gameCheck(); }

  checkCharacterMovement();

  if (character.hasMap) {
    for (var i=0;i<maze.length;i++) {
      maze[i].show();
    }
  }
  drawOverlayItems();
  drawHud();
}


function gameCheck() {
  if (matrixTest.includes(loadedZone._id)) {
    matrixTest.remove(loadedZone._id)
  }
  if (matrixTest.length < 1 && character.coins > 0) {
    // loadedZone.blocks.temporary.push(new Item(1));
  } else {
    gameWon = false;
  }
}


function levelComplete() {
  loadedZone.enemies = [];
  character.hasMasterKey = false;
  gameWon = true;
  overworldTrack.stop();
  fanfare2.play();
  var to = window.setTimeout(function() {
    selectTrack.loop();
    gameWonCount = 0;
    window.clearTimeout(to);
  }, 3000);
}
