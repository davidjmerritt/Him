function setup() {
  frameRate(60);
  createCanvas(appWidth, appHeight);
  if (STATE == "OVERWORLD") { overworldSetup(); } else
  if (STATE == "SHOP") { shopSetup(); }
}


function reset() {
  if (STATE == "OVERWORLD") { overworldReset(); } else
  if (STATE == "SHOP") { shopReset(); }
}


function draw() {
  if (STATE == 'PAUSED') {
    drawMenu("PAUSE");
  } else {
    if (STATE == "OVERWORLD") { overworldDraw(); } else
    if (STATE == "SHOP") { shopDraw(); }
  }
}
