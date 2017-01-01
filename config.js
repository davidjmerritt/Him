var BLUE = [32, 56, 236];
var WHITE = [252, 252, 252];
var BROWN = [200, 76, 12];
var GREEN = [0, 168, 0];
var GRAY = [116, 116, 116];
var TAN = [252, 216, 168];
var BLACK = [0, 0, 0];
var RED = [200,0,0];
var ORANGE = [255,100,0];
var YELLOW = [255,180,50];
var COLORS = [BLUE,WHITE,BROWN,GREEN,GRAY,TAN,BLACK,RED,ORANGE,YELLOW];

var blockSize = 50;
var appWidth = 960;
var appBlockWidth = appWidth/blockSize;
var appHeight = 720;
var appBlockHeight = appHeight/blockSize;


var level = 0;
var worldWidth = 4; //16
var worldHeight = 2; //8
var defaultCoords = [0,0]; // [world.matrixWidth/2,world.matrixHeight-1];
var loadedZone;

var gameWon = false;
var matrixTest = [];


var defaultZoneBlocks = {
  topBorder: [],
  bottomBorder: [],
  leftBorder: [],
  rightBorder: [],
  "temporary": [],
  "items": []
};

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
