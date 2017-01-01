function Health(index) {
  this._index = index;
  this.offset = 15;
  this.r = blockSize/2;
  this.pos = createVector((appWidth-230+this.offset*1.5)+((this.r+this.offset/2)*this._index+1), this.offset);

  this.look = function() {
    noStroke();
    fill(RED);
    rect(
      this.pos.x,
      this.pos.y,
      this.r,
      this.r
    );
  }

  this.render = function() {
    push();
    this.look();
    pop();
  }
}


function drawHealth() {
  if (character.health.length > 0) {
    for (var i=0; i < character.health.length; i++) {
      character.health[i].render();
    }
  } else {
    character.isAlive = false;
  }
}