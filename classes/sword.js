function Sword() {
  this.w = 40;
  this.h = 5;
  this.x = width/2-this.w/2;
  this.y = height/2-this.h/2;
  this.heading = 0.1;

  this.stab = function() {
    this.x += 10;
    this.x -= 10;
  }

  this.look = function() {
    fill(255,0,0);
    stroke(255,0,0);
    // translate(width/2, height/2);
    rotate(PI/3.0);
    rect(
      this.x,
      this.y,
      40,
      5
    );
  }

  this.render = function() {
    this.look();
  }

}
