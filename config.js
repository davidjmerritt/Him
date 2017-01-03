var BLUE = [32, 56, 236];
var DARK_BLUE = [32, 56, 136];
var WHITE = [252, 252, 252];
var BROWN = [200, 76, 12];
var GREEN = [0, 168, 0];
var DARK_GREEN = [40, 80, 40];
var GRAY = [116, 116, 116];
var TAN = [252, 216, 168];
var LIGHT_TAN = [255, 225, 200];
var BLACK = [0, 0, 0];
var RED = [200,0,0];
var DARK_RED = [190,0,50];
var DARKER_RED = [150,0,40];
var ORANGE = [255,100,0];
var YELLOW = [255,180,50];
var DARK_GRAY = [100, 100, 100];
var WOOD_BROWN = [150, 120, 70];
var DARK_BROWN = [100, 70, 50];
var LIGHT_BLUE = [50, 200, 255];
var GOLD = [255,230,100];
var PINK = [255,0,100];
var LIGHT_GREEN = [100,255,100];
var COLORS = [LIGHT_GREEN,PINK,BLUE,WHITE,BROWN,GREEN,GRAY,TAN,BLACK,RED,ORANGE,YELLOW,WOOD_BROWN,DARK_GRAY,LIGHT_BLUE,LIGHT_TAN,DARK_RED,DARK_BLUE,GOLD,DARK_GREEN,DARKER_RED];


var pixelSize = 12.5;
var blockSize = 50;
var appWidth = 960;
var appBlockWidth = appWidth/blockSize;
var appHeight = 720;
var appBlockHeight = appHeight/blockSize;


var level = 0;
var worldWidth = 16; //4
var worldHeight = 8; //8 //2
var defaultCoords = [0,0]; // [world.matrixWidth/2,world.matrixHeight-1];
var loadedZone;

var startingSword = 4; // 4=WOOD, 7=WHITE, 8=MASTER
var startItems = [0,5,6,9,10];

var gameWon = false;
var matrixTest = [];

var startHealth = 12;
var totalHealth = 12;

var progressBarWidth = 200;

var defaultFont = "Helvetica";

var defaultZoneBlocks = {
  topBorder: [],
  bottomBorder: [],
  leftBorder: [],
  rightBorder: [],
  "temporary": [],
  "items": []
};



SNES_UP     = 67; // c
SNES_DOWN   = 68; // d
SNES_LEFT   = 69; // e
SNES_RIGHT  = 70; // f
SNES_A      = 71; // g
SNES_X      = 72; // h
SNES_Y      = 73; // i
SNES_X      = 74; // j
SNES_L      = 75; // k
SNES_R      = 77; // m
SNES_SELECT = 78; // n
SNES_START  = 79; // o

// this.edges = function() {
//   if (this.pos.x > appWidth + this.r) { // RIGHT
//     thresholdTimeout += 1;
//     loadZone(newCoordsFromDir("RIGHT"),"RIGHT",function(){
//       character.pos.x = character.r*2;
//     });
//   } else if (this.pos.x < -this.r) { // LEFT
//     loadZone(newCoordsFromDir("LEFT"),"LEFT",function(){
//       character.pos.x = appWidth - character.r*2;
//     });
//
//   }
//   if (this.pos.y > appHeight + this.r) { // BOTTOM
//     loadZone(newCoordsFromDir("BOTTOM"),"BOTTOM",function(){
//         character.pos.y = character.r*2;
//     });
//   } else if (this.pos.y < -this.r) { // TOP
//     loadZone(newCoordsFromDir("TOP"),"TOP",function(){
//       character.pos.y = appHeight - character.r*2;
//     });
//   }
// }
