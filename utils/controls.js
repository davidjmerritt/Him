var keyCodeMap = [];
var keyCodeHistory = [];


function checkCharacterMovement() {
  if (keyCodeMap.length == 0) {
    character.moving(false);
    character.running(false);

  }
  if (!keyCodeMap.has(SNES_A)) {
    character.running(false);
  }
  // console.log(character.isRunning)
}


function keyReleased() {
  if (character != undefined) {
    if (character.isAlive) {
      if (keyCode == SNES_RIGHT || keyCode == SNES_LEFT || keyCode == SNES_UP || keyCode == SNES_DOWN || keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW || keyCode == UP_ARROW || keyCode == DOWN_ARROW || keyCode == SNES_A) {
        var index = keyCodeMap.indexOf(keyCode);
        keyCodeMap.splice(index,1);
      }
    }
  }
}


function checkForAdminInputs() {
  // console.log(keyCodeHistory,keyCodeHistory.slice(Math.max(keyCodeHistory.length - 12, 0)));

  // KONAMI CODE
  if (arraysEqual(keyCodeHistory.slice(Math.max(keyCodeHistory.length - 12, 0)),[38, 38, 40, 40, 37, 39, 37, 39, 74, 71, 78, 79])) {
    character.isGod();
    mushroom.play();
  }
}


function keyPressed() {
  keyCodeHistory.push(keyCode);
  checkForAdminInputs();

  if (controlsEnabled) {
    if (character != 'undefined') {

      // ALIVE
      if (character.isAlive) {
        if (keyCode == 13 || keyCode == SNES_START) { // RETURN

          // START NEW LEVEL
          if (gameWon) {
            if (level == 3) {} else {
              reset();
              // character.useWeapon();
              character.hasMap = false;
              character.hasCompass = false;
              character.hasMasterKey = false;
            }
          } else {

            // PAUSE GAME
              if (keyCode == SNES_START) {
                if (STATE != 'PAUSED') {
                    PREVIOUS_STATE = STATE;
                    if (STATE == 'OVERWORLD') { overworldTrack.setVolume(0.05); }
                    if (STATE == 'SHOP') { lowerShopSounds(); }
                    STATE = 'PAUSED';
                    pause.play();
                } else {
                  STATE = PREVIOUS_STATE;
                  unpause.play();
                  if (STATE == 'OVERWORLD') {
                    overworldTrack.setVolume(0.3);
                  } else if (STATE == 'SHOP') {
                    raiseShopSounds();
                  }
                }
              }
          }
        } else {

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

          if (keyCode == SNES_A) {
            keyCodeMap.push(keyCode);
            if (character.hasSpeedShoes) {
              character.useWeapon();
              character.running(true);
            }
          }


        // MOVEMENT
          if (keyCode == RIGHT_ARROW || keyCode == SNES_RIGHT) { // keyCode == 68
            keyCodeMap.push(keyCode);
            if (!character.isConfused) {
              character.d = 'RIGHT' ;
              character.last_d = 'RIGHT';
            } else {
              keyCodeMap.push(keyCode);
              character.d = 'LEFT' ;
              character.last_d = 'LEFT';
            }
            character.moving(true);
          } else if (keyCode == LEFT_ARROW || keyCode == SNES_LEFT) { // || keyCode == 65
            keyCodeMap.push(keyCode);
            if (!character.isConfused) {
              character.d = 'LEFT' ;
              character.last_d = 'LEFT';
            } else {
              keyCodeMap.push(keyCode);
              character.d = 'RIGHT' ;
              character.last_d = 'RIGHT';
            }
            character.moving(true);
          } else if (keyCode == UP_ARROW || keyCode == SNES_UP) { // || keyCode == 87
            keyCodeMap.push(keyCode);
            if (!character.isConfused) {
              character.d = 'UP' ;
              character.last_d = 'UP';
            } else {
              keyCodeMap.push(keyCode);
              character.d = 'DOWN' ;
              character.last_d = 'DOWN';
            }
            character.moving(true);
          } else if (keyCode == DOWN_ARROW || keyCode == SNES_DOWN) { // || keyCode == 83
            keyCodeMap.push(keyCode);
            if (!character.isConfused) {
              character.d = 'DOWN' ;
              character.last_d = 'DOWN';
            } else {
              keyCodeMap.push(keyCode);
              character.d = 'UP' ;
              character.last_d = 'UP';
            }
            character.moving(true);

          }

          // // AIM
          // if (keyCode == RIGHT_ARROW && keyCode == UP_ARROW) { // keyCode == 68, 83
          //   keyCodeMap.push(keyCode);
          //   character.aim = 'UPPER_RIGHT' ;
          // }
          // console.log(keyCodeMap,character.aim)

        }
      } else {
        // DEAD
        if (keyCode == 13 || keyCode == SNES_START) { // RETURN
          deathTrack = 0;
          stopAllSounds();
          resetCharacter();
          overworldTrack.loop(); overworldTrack.setVolume(0.3);
        }

      }
    }
  }
}
