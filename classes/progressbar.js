function Progressbar(x,y,w,h) {
  this.offset = 15;
  this.pos = createVector(x,y);
  this.percent = 50;
  this.w = w;
  this.h = h;
  this.fillCol = [50, 50, 255, 100];
  this.backCol = [50, 50, 50, 100];
  this.d = -1;

  this.update = function(p) {
    if (p < 0) { p = 0; }
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
    c = color(this.fillCol);
    fill(c);
    rect(
      this.pos.x,
      this.pos.y,
      (this.w/100)*this.percent,
      this.h
    );
    value = alpha(c);
    fill(value);

  }

  this.render = function() {
    push();
    this.look();
    pop();
  }
}
