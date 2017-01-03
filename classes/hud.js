function Hud() {
  this.offset = 15;
  this.blockWidth = 7;
  this.pos = createVector(this.offset, this.offset);
  this.w = world.matrixWidth*this.blockWidth ;
  this.h = world.matrixHeight*this.blockWidth ;
  this.characterIconColor = BLACK;

  this.look = function() {
    textFont(defaultFont);
    // MINI-MAP
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

    // COORDS
    c = color(50, 50, 50, 100);
    fill(c);
    rect(
      appWidth-65,
      this.pos.y,
      blockSize,
      blockSize
    );
    value = alpha(c);
    fill(value);

    fill(255, 255, 255);
    textAlign(CENTER);
    textSize(16);
    var info = loadedZone.coordinates[0]+'-'+loadedZone.coordinates[1];
    text(info, appWidth-40, 45);

    // LEVEL
    c = color(50, 50, 50, 100);
    fill(c);
    rect(
      appWidth-125,
      this.pos.y,
      blockSize,
      blockSize
    );
    value = alpha(c);
    fill(value);
    fill(255, 255, 255);
    textSize(16);
    textAlign(CENTER);
    var info = "L-"+level;
    text(info, appWidth-100, 45);

    // COINS
    c = color(50, 50, 50, 100)
    fill(c);
    rect(
      appWidth-185,
      this.pos.y,
      blockSize,
      blockSize
    );
    value = alpha(c);
    fill(value);
    fill(255, 255, 255);
    textSize(16);
    textAlign(CENTER);
    var info = character.coins;
    text(info, appWidth-160, 45);

    // PRIMARY WEAPON
    var x_offset = appWidth-blockSize*2-25;
    c = color(50, 50, 50, 100)
    fill(c);
    rect(
      x_offset,
      75,
      blockSize,
      blockSize*2+10
    );
    value = alpha(c);
    fill(value);
    fill(character.weapon.innerColor);
    var y_offset = 80;
    // rect(this.pos.x+pixelSize+(x_offset-pixelSize/1.5),this.pos.y+pixelSize*2+y_offset,pixelSize,pixelSize);
    // rect(this.pos.x+pixelSize+(x_offset-pixelSize/1.5),this.pos.y+pixelSize+y_offset,pixelSize,pixelSize);
    rect(this.pos.x+pixelSize+(x_offset-pixelSize/1.5),this.pos.y+y_offset-pixelSize+10,pixelSize,pixelSize*4);
    fill(character.weapon.secondaryColor);
    rect(this.pos.x+pixelSize+(x_offset-pixelSize/1.5),this.pos.y+pixelSize*4+y_offset+5,pixelSize,pixelSize*1.6);
    rect(this.pos.x+(x_offset-pixelSize/1.5),this.pos.y+pixelSize*3+y_offset+5,pixelSize*3,pixelSize);

    // SECONDARY ITEM
    c = color(50, 50, 50, 100)
    fill(c);
    rect(
      x_offset+10+blockSize,
      75,
      blockSize,
      blockSize
    );
    value = alpha(c);
    fill(value);

    // TIERTIARY ITEM
    c = color(50, 50, 50, 100)
    fill(c);
    rect(
      x_offset+10+blockSize,
      70+blockSize+this.offset,
      blockSize,
      blockSize
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
