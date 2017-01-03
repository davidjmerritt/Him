function Menu() {
  this.pos = createVector(width/2,height/2);

  this.gameOver = function() {
    textFont(defaultFont);
    noStroke();
    c = color(255, 0, 0, 50);
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
    text("GAME OVER\n\nPress SPACEBAR to CONTINUE", width/2,height/2-25);
  }

  this.win = function() {
    fill(255, 255, 255);
    textSize(28);
    textAlign(CENTER);
    text("YOU WIN!\nPress SPACEBAR to try the NEXT LEVEL.", width/2,height/2);
  }

  this.render = function(m) {
    push();
    if (m == "GAMEOVER") { this.gameOver(); }
    if (m == "WIN") { this.win(); }
    pop();
  }
}


function drawMenu(m) {
  menu.render(m);
}
