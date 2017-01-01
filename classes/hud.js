function Hud() {
  this.offset = 15;
  this.blockWidth = 7;
  this.pos = createVector(this.offset, this.offset);
  this.w = world.matrixWidth*this.blockWidth ;
  this.h = world.matrixHeight*this.blockWidth ;
  this.characterIconColor = GRAY;

  this.look = function() {
    noStroke();
    c = color(50, 50, 50, 100);
    fill(c);
    rect(
      this.pos.x,
      this.pos.y,
      this.w,
      this.h
    );
    value = alpha(c);
    fill(value);

    fill(this.characterIconColor);
    rect(
      (loadedZone.coordinates[0]*this.blockWidth)+this.offset,
      (loadedZone.coordinates[1]*this.blockWidth)+this.offset,
      this.blockWidth,
      this.blockWidth
    );

    noStroke();
    c = color(50, 50, 50, 100);
    fill(c);
    rect(
      appWidth-90,
      this.pos.y,
      45+30,
      45
    );
    value = alpha(c);
    fill(value);

    fill(255, 255, 255);
    textSize(16);
    textAlign(CENTER);
    // textSize(20);
    // var info = numberToAlpha(loadedZone.coordinates[0])+'-'+loadedZone.coordinates[1];
    // var info = matrixTest.length+"/"+world.matrix.length;
    var info = level;
    text(info, appWidth-55, 45);

  }

  this.render = function() {
    push();
    this.look();
    pop();
  }
}
