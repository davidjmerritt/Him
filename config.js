var BLUE = [32, 56, 236];
var DARK_BLUE = [32, 56, 136];
var WHITE = [252, 252, 252];
var OFF_WHITE = [245, 245, 235];
var BROWN = [200, 76, 12];
var OFF_BROWN = [180, 70, 10];
var GREEN = [0, 168, 0];
var DARK_GREEN = [40, 80, 40];
var OFF_GREEN = [100, 150, 0];
var GRAY = [116, 116, 116];
var TAN = [252, 216, 168];
var LIGHT_TAN = [255, 225, 200];
var BLACK = [0, 0, 0];
var RED = [200,0,0];
var DARK_RED = [190,0,50];
var DARKER_RED = [150,0,40];
var ORANGE = [255,100,0];
var OFF_ORANGE = [255,80,0];
var YELLOW = [255,180,50];
var LIGHT_YELLOW = [255,210,150];
var DARK_GRAY = [100, 100, 100];
var DARKER_GRAY = [75, 75, 75];
var WOOD_BROWN = [150, 120, 70];
var DARK_BROWN = [100, 70, 50];
var LIGHT_BLUE = [50, 200, 255];
var LIGHTER_BLUE = [100, 250, 255];
var GOLD = [255,230,100];
var PINK = [255,0,100];
var OFF_PINK = [255,0,80];
var LIGHT_GREEN = [100,255,100];
var PURPLE = [140, 0, 142];
var OFF_PURPLE = [130, 0, 132];
var COLORS = [DARKER_GRAY,PURPLE,OFF_WHITE,LIGHT_GREEN,PINK,BLUE,WHITE,BROWN,GREEN,GRAY,TAN,BLACK,RED,ORANGE,YELLOW,WOOD_BROWN,DARK_GRAY,LIGHT_BLUE,LIGHT_TAN,DARK_RED,DARK_BLUE,GOLD,DARK_GREEN,DARKER_RED];


var pixelSize = 12.5;
var blockSize = 50;
var appWidth = 960;
var appBlockWidth = appWidth/blockSize;
var appHeight = 720;
var appBlockHeight = appHeight/blockSize;


var level = 0;
var worldWidth = 16; //4
var worldHeight = 8; //8 //2
var defaultCoords = [0,0]; // [world.matrixWidth/2,world.matrixHeight-1];;
var loadedZone;

var startingSword = 4; // 4=WOOD, 7=WHITE, 8=MASTER
var startItems = [5,6,14]; // 5=HEART, 6=5-COIN, 14=FAIRY

var gameWon = false;
var matrixTest = [];

var startHealth = 6;
var totalHealth = 12;

var maxCoins = 999;

var progressBarWidth = 250;

var defaultFont = "Helvetica";

var numberOfShopsMax = 4;

var clusterTypesIndex = ["SNOW_TOP","DIRT_TOP","TRI_ROOM","LONE_BROWN_STONE","LONE_GRAY_STONE","LONG_SHRUB","WARP_STONES","TWO_POOLS","GREEN_GRID","TWO_GREEN","LARGE_WARP_STONES","GRAY_STRIPS"];

var gameWonCount = 0;

var defaultZoneBlocks = {
  topBorder: [],
  bottomBorder: [],
  leftBorder: [],
  rightBorder: [],
  "temporary": [],
  "items": []
};

var STATE = 'OVERWORLD'

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
