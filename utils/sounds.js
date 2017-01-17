var LOZ = 'snd/loz/';
var LOZLTTP = 'snd/loz-ltp/';
var LOZOOT = 'snd/loz-oot/';

function preload() {
  caveTrack = loadSound(LOZLTTP+'16-cave.mp3');
  overworldTrack = loadSound(LOZLTTP+'04-overworld.mp3');
  selectTrack = loadSound(LOZLTTP+'11-select-screen.mp3');

  burnDownPeak = loadSound(LOZLTTP+'LTTP_Menu_Cursor.wav');
  characterHit = loadSound(LOZLTTP+'LTTP_Link_Hurt.wav');
  cutGrass = loadSound(LOZLTTP+'LTTP_Grass_Cut.wav');
  digBlock = loadSound(LOZLTTP+'LTTP_Shovel.wav');
  enemyHit = loadSound(LOZLTTP+'LTTP_Enemy_Hit.wav');
  enemyExplode = loadSound(LOZLTTP+'LTTP_Enemy_Kill.wav');
  flutterSound = loadSound(LOZLTTP+'LTTP_Bee.wav');
  getFairy = loadSound(LOZLTTP+'LTTP_Get_Fairy.wav');
  getHeart = loadSound(LOZLTTP+'LTTP_Get_HeartPiece.wav');
  getCoin = loadSound(LOZLTTP+'LTTP_Rupee1.wav');
  getKey = loadSound(LOZLTTP+'LTTP_Get_Key.wav');
  lowHealth = loadSound(LOZLTTP+'LTTP_LowHealth.wav');
  pushBlock = loadSound(LOZLTTP+'LTTP_Link_Push.wav');
  secretFound = loadSound(LOZLTTP+'LTTP_Secret.wav');
  swordSlash1 = loadSound(LOZLTTP+'LTTP_Sword1.wav');
  swordSlash2 = loadSound(LOZLTTP+'LTTP_Sword2.wav');
  swordSlash3 = loadSound(LOZLTTP+'LTTP_Sword3.wav');
  swordSlash4 = loadSound(LOZLTTP+'LTTP_Sword4.wav');

  bossScream = loadSound(LOZ+'LOZ_Boss_Scream1.wav');
  swordBeam = loadSound(LOZ+'LOZ_Sword_Shoot.wav');
  fanfare1 = loadSound(LOZ+'LOZ_Fanfare.wav');

  fanfare2 = loadSound(LOZOOT+'OOT_Fanfare_SmallItem.wav');

  // LTTP_Boss_Fireball.wav
  // LTTP_Boss_Hit.wav
  // LTTP_Enemy_Skitter.wav
  // LTTP_Sword1.wav
  // LTTP_Sword2.wav
  // LTTP_Sword3.wav
  // LTTP_Sword4.wav
  // LTTP_Zora_Fireball.wav

  // swordSlash.play();
  // swordSlash.stop();
  // swordSlash.setVolume(0.5);
  // swordSlash.loop();
}

function stopAllSounds() {
  caveTrack.stop();
  overworldTrack.stop();
  selectTrack.stop();
}


// function playEnemySounds() {
//   for (var i;i<loadedZone.enemies.length;i++) {
//     flutterSound.stop();
//     var enemy = loadedZone.enemies[i];
//     console.log(enemy._id )
//     if (enemy._id == 8) {
//       flutterSound.loop();
//     }
//   }
// }

var timeoutLoops = {};
function startLoop(snd,milliDelay,whichLoop) {
  // console.log(whichLoop)
  snd.play();
  timeoutLoops[whichLoop] = window.setTimeout(function() {
    window.clearTimeout(timeoutLoops[whichLoop]);
    startLoop(snd,milliDelay,whichLoop);
  }, milliDelay);
}


function stopLoop(snd,whichLoop) {
  snd.stop();
  window.clearTimeout(timeoutLoops[whichLoop]);
  delete timeoutLoops[whichLoop];
}
