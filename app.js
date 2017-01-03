function setup() {
  reset();
}


function reset() {
  level += 1;
  gameWon = false;
  matrixTest = [];

  frameRate(60);
  createCanvas(appWidth, appHeight);

  world = new World(worldWidth*level,worldHeight*level);
  world.create();

  loadZone(defaultCoords);
  hud = new Hud();
  menu = new Menu();

  if (level == 1) {
    createCharacter();
  }

  matrixTestCreate();

}


function draw() {
  drawZone();

  drawItems();
  drawEnemies();

  if (character.isAlive) { drawCharacter(); } else { drawMenu("GAMEOVER"); }
  if (gameWon) { drawMenu("WIN"); reset(); loadedZone.enemies = [] } else { gameCheck(); }

  hud.render();
  checkIdle();
}


function matrixTestCreate() {
  for (var m=0;m<world.matrix.length;m++) {
    matrixTest.push(world.matrix[m].toString().replace(',','-'));
  }
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


function checkIdle() {
  if (character.d == "STILL") {
    keysPressed = [];
  }
}

var keyCodeMap = {};

function keyReleased() {
  if (character.isAlive) {
    character.moving(false);
  }
}


function keyPressed() {
  if (character.isAlive) {
    keyCodeMap[keyCode] = true;
    if (keyCode == 32 || keyCode == SNES_Y) { // SPACEBAR
      if (gameWon) { reset(); } else {
        character.useWeapon();
      }
    }

    // MOVEMENT
    if (keyCode == RIGHT_ARROW || keyCode == SNES_RIGHT) { // keyCode == 68
      character.d = 'RIGHT' ;
      character.last_d = 'RIGHT';
      character.moving(true);
    } else if (keyCode == LEFT_ARROW || keyCode == SNES_LEFT) { // || keyCode == 65
      character.d = 'LEFT' ;
      character.last_d = 'LEFT';
      character.moving(true);
    } else if (keyCode == UP_ARROW || keyCode == SNES_UP) { // || keyCode == 87
      character.d = 'UP' ;
      character.last_d = 'UP';
      character.moving(true);
    } else if (keyCode == DOWN_ARROW || keyCode == SNES_DOWN) { // || keyCode == 83
      character.d = 'DOWN';
      character.last_d = 'DOWN';
      character.moving(true);

    // RESET CHARACTER
  } else if (keyCode == 27 || keyCode == SNES_SELECT) { // ESC
      resetCharacter()
    }
  } else {
    // DEAD
    if (keyCode == 32 || keyCode == SNES_Y) { // SPACEBAR
      // location.reload();
      resetCharacter();
    }
  }
}
