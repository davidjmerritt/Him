function overworldSetup() {
  createMaze();
  reset();
}


function overworldReset() {
  deathCount = 0;
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
  stopAllSounds();
  overworldTrack.loop(); overworldTrack.setVolume(0.3);
}


function overworldDraw() {
  drawZone();
  drawItems();
  drawEnemies();

  if (character.isAlive) { drawCharacter(); } else {
    if (deathCount == 0) {
      stopAllSounds();
      stopAllLoops();
      character.explode();
      controlsEnabled = false;
    } else if (deathCount == 1) {
      deathTrack.play();
    } else if (deathCount > 60*3) {
      drawMenu("GAMEOVER");
      controlsEnabled = true;
    }
    deathCount += 1;
  }
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
  controlsEnabled = false;
  loadedZone.enemies = [];
  character.hasMasterKey = false;
  gameWon = true;
  overworldTrack.stop();
  fanfare2.play();
  var to = window.setTimeout(function() {
    if (level == 3) {
      endingTrack.loop();
    } else {
      selectTrack.loop();
    }
    gameWonCount = 0;
    window.clearTimeout(to);
    controlsEnabled = true;
  }, 3000);
}
