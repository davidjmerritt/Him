function Progressbar(x,y,w,h) {
  this.offset = 15;
  this.pos = createVector(x,y);
  this.percent = 50;
  this.w = w;
  this.h = h;
  this.fillCol = BLUE;
  this.backCol = [50, 50, 50, 100];
  this.d = -1;

  this.update = function(p) {
    this.percent = p;
  }

  this.look = function() {
    noStroke();
    // BACKGROUND
    c = color(this.backCol);
    fill(c);
    rect(
      this.pos.x,
      this.pos.y,
      this.w,
      this.h
    );
    value = alpha(c);
    fill(value);
    // FILL
    fill(this.fillCol);
    rect(
      this.pos.x,
      this.pos.y,
      (this.w/100)*this.percent, //this.percent*(progressBarWidth*.00645),
      this.h
    );
    // console.log(this.percent)
  }

  this.render = function() {
    push();
    this.look();
    pop();
  }
}
