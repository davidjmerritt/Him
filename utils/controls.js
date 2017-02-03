var keyCodeMap = [];


function checkCharacterMovement() {
  if (keyCodeMap.length == 0) {
    character.moving(false);
  }
}


function keyReleased() {
  if (character != undefined) {
    if (character.isAlive) {
      if (keyCode == SNES_RIGHT || keyCode == SNES_LEFT || keyCode == SNES_UP || keyCode == SNES_DOWN || keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW || keyCode == UP_ARROW || keyCode == DOWN_ARROW) {
        var index = keyCodeMap.indexOf(keyCode);
        keyCodeMap.splice(index,1);
      }
      if (keyCode == SNES_A) { character.vel = 4; }
    }
  }
}


function keyPressed() {
  if (controlsEnabled) {
    if (character != 'undefined') {
      if (character.isAlive) {
        if (keyCode == 13 || keyCode == SNES_START) { // RETURN
          if (gameWon) {
            if (level == 3) {} else {
              reset();
              character.useWeapon();
              character.hasMap = false;
              character.hasCompass = false;
              character.hasMasterKey = false;
            }
          }
        }

        if (gameWon) {} else {
          // WEAPON
          if (keyCode == 32 || keyCode == SNES_B) { // SPACEBAR
            character.useWeapon();
          }

          if (keyCode == SNES_Y) {
            character.useSecondaryWeapon();
          }

          if (keyCode == SNES_X) {
            character.useTertiaryWeapon();
          }

          if (keyCode == SNES_A) { character.vel = 10; }

        // MOVEMENT
          if (keyCode == RIGHT_ARROW || keyCode == SNES_RIGHT) { // keyCode == 68
            keyCodeMap.push(keyCode);
            character.d = 'RIGHT' ;
            character.last_d = 'RIGHT';
            character.moving(true);
          } else if (keyCode == LEFT_ARROW || keyCode == SNES_LEFT) { // || keyCode == 65
            keyCodeMap.push(keyCode);
            character.d = 'LEFT' ;
            character.last_d = 'LEFT';
            character.moving(true);
          } else if (keyCode == UP_ARROW || keyCode == SNES_UP) { // || keyCode == 87
            keyCodeMap.push(keyCode);
            character.d = 'UP' ;
            character.last_d = 'UP';
            character.moving(true);
          } else if (keyCode == DOWN_ARROW || keyCode == SNES_DOWN) { // || keyCode == 83
            keyCodeMap.push(keyCode);
            character.d = 'DOWN';
            character.last_d = 'DOWN';
            character.moving(true);

          // // AIM
          // if (keyCode == RIGHT_ARROW && keyCode == UP_ARROW) { // keyCode == 68, 83
          //   keyCodeMap.push(keyCode);
          //   character.aim = 'UPPER_RIGHT' ;
          // }
          // console.log(keyCodeMap,character.aim)



          // RESET CHARACTER
          } else if (keyCode == 81 || keyCode == SNES_SELECT) { // Q
              resetCharacter();
          }
        }
      } else {
        // DEAD
        if (keyCode == 13 || keyCode == SNES_START) { // RETURN
          deathCount = 0;
          stopAllSounds();
          resetCharacter();
          overworldTrack.loop(); overworldTrack.setVolume(0.3);
        }
      }
    }
  }
}
