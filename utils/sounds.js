var LOZ = 'snd/loz/';
var LOZLTTP = 'snd/loz-ltp/';
var LOZOOT = 'snd/loz-oot/';
var MINECRAFT = 'snd/minecraft/';
var FFIV = 'snd/ff-iv/';


function preload() {
  caveTrack = loadSound(LOZLTTP+'16-cave.mp3');
  overworldTrack = loadSound(LOZLTTP+'04-overworld.mp3');
  darkworldTrack = loadSound(LOZLTTP+'12-dark-world.mp3');
  selectTrack = loadSound(LOZLTTP+'11-select-screen.mp3');
  deathTrack = loadSound(LOZ+'07-game-over.mp3');
  endingTrack = loadSound(LOZLTTP+'30-ending.mp3');
  shopTrack = loadSound(LOZLTTP+'21-fortune-teller.mp3');
  fairyTrack = loadSound(LOZLTTP+'24-the-goddess-appears.mp3');

  boomerang = loadSound(LOZLTTP+'LTTP_Boomerang.wav');
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
  loseCoin = loadSound(LOZLTTP+'LTTP_Rupee2.wav');
  getKey = loadSound(LOZLTTP+'LTTP_Get_Key.wav');
  lowHealth = loadSound(LOZLTTP+'LTTP_LowHealth.wav');
  pushBlock = loadSound(LOZLTTP+'LTTP_Link_Push.wav');
  secretFound = loadSound(LOZLTTP+'LTTP_Secret.wav');
  swordSlash1 = loadSound(LOZLTTP+'LTTP_Sword1.wav');
  swordSlash2 = loadSound(LOZLTTP+'LTTP_Sword2.wav');
  swordSlash3 = loadSound(LOZLTTP+'LTTP_Sword3.wav');
  swordSlash4 = loadSound(LOZLTTP+'LTTP_Sword4.wav');

  bombBlow = loadSound(LOZ+'LOZ_Bomb_Blow.wav');
  bombDrop = loadSound(LOZ+'LOZ_Bomb_Drop.wav');
  bossScream = loadSound(LOZ+'LOZ_Boss_Scream1.wav');
  swordBeam = loadSound(LOZ+'LOZ_Sword_Shoot.wav');
  reverseBeam = loadSound(LOZ+'LOZ_Sword_Shoot-reverse.wav');
  fanfare1 = loadSound(LOZ+'LOZ_Fanfare.wav');
  getItem = loadSound(LOZ+'LOZ_Get_Heart.wav');
  fire = loadSound(LOZ+'LOZ_Candle.wav');

  fanfare2 = loadSound(LOZOOT+'OOT_Fanfare_SmallItem.wav');
  pop1 = loadSound(LOZOOT+'OOT_Bottle_Pop.wav');

  eat = loadSound(MINECRAFT+'eat.wav');
  eat1 = loadSound(MINECRAFT+'eat1.wav');
  eat2 = loadSound(MINECRAFT+'eat2.wav');
  eat3 = loadSound(MINECRAFT+'eat3.wav');
  burp = loadSound(MINECRAFT+'burp.wav');

  sleep = loadSound(FFIV+'healmag-reverse.wav');
  bigBeam = loadSound(FFIV+'redmag.wav');


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
  fairyTrack.stop();
  shopTrack.stop();
  caveTrack.stop();
  overworldTrack.stop();
  selectTrack.stop();
  deathTrack.stop();
  endingTrack.stop();
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


function stopAllLoops() {
  for (var i in timeoutLoops) {
    window.clearTimeout(timeoutLoops[i]);
  }
  timeoutLoops = {};
}


function successCallback() {
  console.log('Complete!');
}

function errorCallback() {
  console.log('Error Loading File!');
}

function whileLoading() {
  console.log('Loading File...');
}
