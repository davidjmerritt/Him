function Hud() {
  this.offset = 15;
  this.blockWidth = 7;
  this.pos = createVector(this.offset, this.offset);
  this.w = world.matrixWidth*this.blockWidth*2;
  this.h = world.matrixHeight*this.blockWidth*2;
  this.characterIconColor = LIGHTER_BLUE;

  this.look = function() {
    textFont(defaultFont);

    stroke(BLACK)
    // NEGATIVE SPACE
    if (character.hasMap) {
      fill(BLACK);
      for (var i=0;i<world.negativeSpace.length;+i++) {
        rect(
          (world.negativeSpace[i].split('-')[0]*this.blockWidth*2)+this.offset,
          (world.negativeSpace[i].split('-')[1]*this.blockWidth*2)+this.offset,
          (this.blockWidth*2),
          (this.blockWidth*2)
        );
      }
    }

    noStroke();
    // BREADCRUMBS
    if (character.hasMap) {
      fill(255,255,255,150);
      for (var i=0;i<world.breadcrumbs.length;+i++) {
        rect(
          (world.breadcrumbs[i][0]*this.blockWidth*2)+this.offset+1,
          (world.breadcrumbs[i][1]*this.blockWidth*2)+this.offset+1,
          (this.blockWidth*2)-2,
          (this.blockWidth*2)-2
        );
      }
    }
    // MINI-MAP BG
    c = color(50, 50, 50, 100);
    fill(c);
    for (var i=0;i<world.zones.length;+i++) {
      rect(
        (world.zones_index[i].split('-')[0]*this.blockWidth*2)+this.offset,
        (world.zones_index[i].split('-')[1]*this.blockWidth*2)+this.offset,
        (this.blockWidth*2),
        (this.blockWidth*2)
      );
    }
    rect(
      this.pos.x,
      this.pos.y,
      this.w,
      this.h
    );
    value = alpha(c);
    fill(value);

    // c = color(50, 50, 50, 100);
    // fill(c);
    // rect(
    //   this.pos.x,
    //   this.pos.y,
    //   this.w,
    //   this.h
    // );
    // value = alpha(c);
    // fill(value);


    // CHARACTER
    noFill();
    strokeWeight(2);
    stroke(this.characterIconColor)
    // fill(this.characterIconColor);
    rect(
      (loadedZone.coordinates[0]*this.blockWidth*2)+this.offset+2,
      (loadedZone.coordinates[1]*this.blockWidth*2)+this.offset+2,
      (this.blockWidth*2)-4,
      (this.blockWidth*2)-4
    );
    noStroke();

    // KEY ZONE
    if (character.hasCompass && !character.hasMasterKey && !gameWon) {
      fill([ORANGE,YELLOW][randomInt(0,2)]);
      rect(
        (world.keyZone.split('-')[0]*this.blockWidth*2)+this.offset,
        (world.keyZone.split('-')[1]*this.blockWidth*2)+this.offset,
        this.blockWidth*2,
        this.blockWidth*2
      );
    }

    // DOOR ZONE
    // if (character.hasCompass) {
      // fill(COLORS[randomInt(0,COLORS.length)]);
      // rect(
      //   (world.doorZone[0]*this.blockWidth*2)+this.offset,
      //   (world.doorZone[1]*this.blockWidth*2)+this.offset,
      //   this.blockWidth*2,
      //   this.blockWidth*2
      // );
    // }

    // COORDS
    // c = color(50, 50, 50, 100);
    // fill(c);
    // rect(
    //   this.offset + 174,// appWidth-65,
    //   this.pos.y,
    //   blockSize,
    //   blockSize
    // );
    // value = alpha(c);
    // fill(value);
    fill(255, 255, 255,200);
    textAlign(CENTER);
    textSize(16);
    var info = loadedZone.coordinates[0]+'-'+loadedZone.coordinates[1];
    // text(info, appWidth-40, 45);
    text(info, this.offset + 200, 45);

    // LEVEL
    // c = color(50, 50, 50, 100);
    // fill(c);
    // rect(
    //   this.offset, // appWidth-125,
    //   this.pos.y,
    //   blockSize,
    //   blockSize
    // );
    // value = alpha(c);
    // fill(value);
    fill(255, 255, 255,200);
    textSize(16);
    textAlign(CENTER);
    if (STATE == 'OVERWORLD') { var info = "L-"+level; } else
    if (STATE == 'SHOP') { var info = "S-"+level; }
    // text(info, appWidth-100, 45);
    text(info, this.offset+25, 45);


    var x_offset = appWidth-blockSize-15;

    // COINS
    c = color(50, 50, 50, 100)
    fill(c);
    rect(
      x_offset, // appWidth-185,
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
    // text(info, appWidth-160, 45);
    text(info, appWidth-40, 45);

    // PRIMARY WEAPON
    if (character.hasWeapon) {
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
      rect(this.pos.x+pixelSize+(x_offset-pixelSize/1.5),this.pos.y+y_offset-pixelSize+10,pixelSize,pixelSize*4);
      fill(character.weapon.secondaryColor);
      rect(this.pos.x+pixelSize+(x_offset-pixelSize/1.5),this.pos.y+pixelSize*4+y_offset+5,pixelSize,pixelSize*1.6);
      rect(this.pos.x+(x_offset-pixelSize/1.5),this.pos.y+pixelSize*3+y_offset+5,pixelSize*3,pixelSize);
    }

    // SECONDARY ITEM
    if (character.hasSecondaryWeapon) {
      var x_offset = appWidth-blockSize-15; //appWidth-blockSize*2-25;
      c = color(50, 50, 50, 100)
      fill(c);
      rect(
        x_offset,
        195,
        blockSize,
        blockSize
      );
      value = alpha(c);
      fill(value);
      if (character.secondaryWeapon.type == 'boomerang') {
        fill(heatseekerTypes[character.secondaryWeapon._id].primaryColor);
        rect(x_offset+pixelSize,195+pixelSize,pixelSize*2,pixelSize);
        rect(x_offset+pixelSize,195+pixelSize,pixelSize,pixelSize*2);
      }
    }
  }

  this.render = function() {
    push();
    this.look();
    pop();
  }
}


function drawHud() {
  hud.render();
  character.burndownBar.render();
  character.healthBar.render();
  character.healthBar.update((character.health/totalHealth)*100);
  if (character.health <= 0) {
    character.isAlive = false;
  }
}
