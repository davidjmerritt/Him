function setup() {
  reset();
}


function reset() {
  level += 1;
  gameWon = false;
  matrixTest = [];

  createCanvas(appWidth, appHeight);

  world = new World(worldWidth*level,worldHeight*level);
  world.create();

  loadZone(defaultCoords);

  hud = new Hud();
  menu = new Menu();
  createCharacter();

  matrixTestCreate();
}


function draw() {
  drawZone();
  hud.render();

  drawItems();

  if (character.isAlive) {
    drawCharacter();
  } else {
    drawMenu("GAMEOVER");
  }

  if (gameWon) {
    drawMenu("WIN");
    reset();
    loadedZone.enemies = []
  } else {
    gameCheck();
  }

  drawEnemies();

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


var keysPressed = [];


function keyReleased() {
  if (character.isAlive) {
    keysPressed.remove(keyCode);
    character.moving(false);
  }
}


function keyPressed() {
  if (character.isAlive) {
    keysPressed.push(keyCode);
    if (keyCode == 32) { // SPACEBAR
      if (gameWon) { reset(); } else {
        character.dig();
      }
    }
    if (keyCode == RIGHT_ARROW || keyCode == 68) {
      character.d = 'RIGHT' ;
      character.moving(true);
    } else if (keyCode == LEFT_ARROW || keyCode == 65) {
      character.d = 'LEFT' ;
      character.moving(true);
    } else if (keyCode == UP_ARROW || keyCode == 87) {
      character.d = 'UP' ;
      character.moving(true);
    } else if (keyCode == DOWN_ARROW || keyCode == 83) {
      character.d = 'DOWN';
      character.moving(true);
    }
  } else {
    if (keyCode == 32) { // SPACEBAR
      location.reload();
    }
  }
}
