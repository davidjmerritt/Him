function Progressbar() {
  this.offset = 15;
  this.pos = createVector(progressBarWidth, this.offset+blockSize/2);
  this.percent = 50;
  this.h = blockSize/2

  this.look = function() {
    noStroke();
    c = color(0, 0, 0 , 100);
    fill(c);
    rect(
      progressBarWidth,
      this.offset+blockSize/2,
      (blockSize/2)*healthMax,
      this.h
    );
    value = alpha(c);
    fill(value);
    fill(BLUE);
    rect(
      this.pos.x,
      this.pos.y,
      this.percent*(progressBarWidth*.00645),
      this.h
    );
  }

  this.render = function() {
    push();
    this.look();
    pop();
  }
}
