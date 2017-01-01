function Menu() {
  this.pos = createVector(width/2,height/2);

  this.gameOver = function() {
    fill(255, 255, 255);
    textSize(28);
    textAlign(CENTER);
    text("GAME OVER\nPress SPACEBAR to START OVER.", width/2,height/2);
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
