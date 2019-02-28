function Menu() {
  this.pos = createVector(width/2,height/2);

  this.gameOver = function() {
    textFont(defaultFont);
    noStroke();
    c = color(255, 0, 0, 150);
    fill(c);
    rect(
      0,
      0,
      width,
      height
    );
    value = alpha(c);
    fill(value);
    fill(BLACK);
    rect(
      width/2-640/2,
      height/2-240/2,
      640,
      240
    );
    fill(250, 250, 250);
    textSize(28);
    textAlign(CENTER);
    text("GAME OVER\n\nPress the START button to CONTINUE", width/2,height/2-25);
  }

  this.loadingWorld = function(data) {
    textFont(defaultFont);
    noStroke();
    c = color(255, 0, 0, 150);
    fill(c);
    rect(
      0,
      0,
      width,
      height
    );
    value = alpha(c);
    fill(value);
    fill(BLACK);
    rect(
      width/2-640/2,
      height/2-240/2,
      640,
      240
    );
    fill(250, 250, 250);
    textSize(28);
    textAlign(CENTER);
    text("Loading..."+data, width/2,height/2-25);
  }

  this.win = function() {
    textFont(defaultFont);
    noStroke();
    c = color(255, 255, 255, 200);
    fill(c);
    rect(
      0,
      0,
      width,
      height
    );
    value = alpha(c);
    fill(value);
    fill(BLACK);
    rect(
      width/2-640/2,
      height/2-240/2,
      640,
      240
    );
    fill(250, 250, 250);
    textSize(28);
    textAlign(CENTER);
    if (level < 3) {
      text("WAY TO GO!\n\nPress the START button to try a NEW LEVEL", width/2,height/2-25);
    } else if (level == 3) {
      text("THANKS FOR PLAYING!\n\nMore LEVELS coming soon!", width/2,height/2-25);
    }
  }

  this.pause = function() {
    textFont(defaultFont);
    noStroke();
    c = color(0, 0, 0, 0);
    fill(c);
    rect(
      0,
      0,
      width,
      height
    );
    value = alpha(c);
    fill(value);
    fill(BLACK);
    rect(
      width/2-(160/2),
      height/2-(65),
      160,
      60
    );
    fill(250, 250, 250);
    textSize(28);
    textAlign(CENTER);

    text("PAUSED", width/2,height/2-25);
  }

  this.render = function(m) {
    push();
    if (m == "PAUSE") { this.pause(); }
    if (m == "GAMEOVER") { this.gameOver(); }
    if (m == "WIN") { this.win(); }
    if (m == "LOADING") { this.loadingWorld(); }
    pop();
  }
}


function drawMenu(m) {
  menu.render(m);
}
