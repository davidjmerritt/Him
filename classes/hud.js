function Hud() {
  this.offset = 15;
  this.blockWidth = 7;
  this.pos = createVector(this.offset, this.offset);
  this.w = world.matrixWidth*this.blockWidth*2;
  this.h = world.matrixHeight*this.blockWidth*2;
  this.characterIconColor = LIGHTER_BLUE;

  this.miniMap = function() {
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
        (this.blockWidth*2),
        10
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
  }

  this.look = function() {

    this.miniMap();

    var x_offset = appWidth-blockSize-15; // LEFT SIDE

    // COINS
    var pos_x = blockSize*5;
    var pos_y = this.pos.y+blockSize/2+15;
    c = color(50, 50, 50, 100)
    fill(c);
    rect(
      pos_x, // appWidth-185,
      pos_y-2,
      blockSize,
      blockSize+pixelSize+10+2
    );
    value = alpha(c);
    fill(value);
    fill(255, 255, 255);
    textSize(16);
    textAlign(CENTER);
    var info = character.coins;
    // text(info, appWidth-160, 45);
    // text(info, appWidth-40, 45);
    var scale = 2;
    var offset = (pixelSize*scale)/2.5;
    var pos_x = offset+pos_x+2;
    var pos_y = offset+pos_y;
    text(info, blockSize*5.5, blockSize+pixelSize*5.2);
    fill(LIGHT_GREEN);
    rect(pos_x,pos_y+(pixelSize/scale),(pixelSize/scale),(pixelSize/scale)*2);
    rect(pos_x+(pixelSize/scale)*2,pos_y,(pixelSize/scale),(pixelSize/scale)*4);
    rect(pos_x+(pixelSize/scale),pos_y,(pixelSize/scale),(pixelSize/scale)*4);
    rect(pos_x+(pixelSize/scale)*3,pos_y+(pixelSize/scale),(pixelSize/scale),(pixelSize/scale)*2);
    fill(WHITE);
    rect(pos_x+(pixelSize/scale)*2,pos_y,(pixelSize/scale),(pixelSize/scale));
    rect(pos_x+(pixelSize/scale)*3,pos_y+(pixelSize/scale),(pixelSize/scale),(pixelSize/scale));
    fill(DARK_GREEN);
    rect(pos_x+(pixelSize/scale)*3,pos_y+(pixelSize/scale)*2,(pixelSize/scale),(pixelSize/scale));
    rect(pos_x,pos_y+(pixelSize/scale)*2,(pixelSize/scale),(pixelSize/scale));
    rect(pos_x+(pixelSize/scale),pos_y+(pixelSize/scale)*3,(pixelSize/scale),(pixelSize/scale));

    // BOMBS
    var pos_x = blockSize*6+10;
    var pos_y = this.pos.y+blockSize/2+15;
    c = color(50, 50, 50, 100)
    fill(c);
    rect(
      pos_x, // appWidth-185,
      pos_y-2,
      blockSize,
      blockSize+pixelSize+10+2
    );
    value = alpha(c);
    fill(value);
    fill(255, 255, 255);
    textSize(16);
    textAlign(CENTER);
    var info = character.bombs;
    var scale = 1.5
    var offset = (pixelSize*scale)/2;
    var pos_x = pos_x+offset;
    var pos_y = pos_y+offset;
    text(info, blockSize*6.7, blockSize+pixelSize*5.2);
    fill(OFF_YELLOW);
    rect(pos_x,pos_y,pixelSize/scale,pixelSize/scale);
    fill(OFF_WHITE);
    rect(pos_x+pixelSize/scale,pos_y,pixelSize/scale,pixelSize/scale);
    fill(DARK_BLUE);
    rect(pos_x+pixelSize/scale,pos_y+pixelSize/scale,(pixelSize*2)/scale,(pixelSize*2)/scale);

    // PRIMARY WEAPON
    if (character.hasWeapon) {
      c = color(50, 50, 50, 100)
      fill(c);
      rect(
        x_offset,
        15,
        blockSize,
        blockSize*2+10
      );
      value = alpha(c);
      fill(value);
      fill(character.weapon.innerColor);
      var y_offset = 20;
      rect(this.pos.x+pixelSize+(x_offset-pixelSize/1.5),this.pos.y+y_offset-pixelSize+10,pixelSize,pixelSize*4);
      fill(character.weapon.secondaryColor);
      rect(this.pos.x+pixelSize+(x_offset-pixelSize/1.5),this.pos.y+pixelSize*4+y_offset+5,pixelSize,pixelSize*1.6);
      rect(this.pos.x+(x_offset-pixelSize/1.5),this.pos.y+pixelSize*3+y_offset+5,pixelSize*3,pixelSize);
    }

    // SECONDARY ITEM
    if (character.hasSecondaryWeapon) {
      var x_offset = appWidth-blockSize-15; //appWidth-blockSize*2-25;
      var y_offset = 135;
      c = color(50, 50, 50, 100)
      fill(c);
      rect(
        x_offset,
        y_offset,
        blockSize,
        blockSize
      );
      value = alpha(c);
      fill(value);
      if (character.secondaryWeapon.type == 'boomerang') {
        fill(heatseekerTypes[character.secondaryWeapon._id].primaryColor);
        rect(x_offset+pixelSize,y_offset+pixelSize,pixelSize*2,pixelSize);
        rect(x_offset+pixelSize,y_offset+pixelSize,pixelSize,pixelSize*2);
      }
    }
    // TERTIARY ITEM
    if (character.hasTertiaryWeapon) {
      var pos_x = appWidth-blockSize-15; //appWidth-blockSize*2-25;
      var pos_y = 195;
      c = color(50, 50, 50, 100)
      fill(c);
      rect(
        pos_x,
        pos_y,
        blockSize,
        blockSize
      );
      value = alpha(c);
      fill(value);

      if (character.tertiaryWeapon.type == 'bomb') {
        if (character.bombs > 0) {
          var scale = 1.25;
          var offset = (pixelSize*scale)/2;
          var pos_x = pos_x+offset+2;
          var pos_y = pos_y+offset+2;
          fill(OFF_YELLOW);
          rect(pos_x,pos_y,pixelSize/scale,pixelSize/scale);
          fill(OFF_WHITE);
          rect(pos_x+pixelSize/scale,pos_y,pixelSize/scale,pixelSize/scale);
          fill(DARK_BLUE);
          rect(pos_x+pixelSize/scale,pos_y+pixelSize/scale,(pixelSize*2)/scale,(pixelSize*2)/scale);
        }
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
