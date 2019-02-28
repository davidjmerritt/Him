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

    // MINI-MAP BG
    noStroke();
    c = color(50, 50, 50, 100);
    fill(c);
    for (var i=0;i<world.zones.length;i++) {
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

    // ENEMY COUNT
    // if (character.hasMap) {
      // noStroke();
      // for (var i=0;i<world.zones_index.length;i++) {
      //   var coords = world.zones_index[i].split('-');
      //   var x_coord = parseInt(coords[0]);
      //   var y_coord = parseInt(coords[1]);
      //   if (world.zones[world.zones_index[i]].enemies.length > 0) {
          // fill(BLACK);
          // text(world.zones[world.zones_index[i]].enemies.length, (x_coord*this.blockWidth*2)+this.offset+3, (y_coord*this.blockWidth*2)+this.offset+12);
          // fill(255,0,0,100);
          // rect(
          //   (x_coord*this.blockWidth*2)+this.offset+1,
          //   (y_coord*this.blockWidth*2)+this.offset+1,
          //   (this.blockWidth*2)-2,
          //   (this.blockWidth*2)-2
          // );
          // rect(
          //   (x_coord*this.blockWidth*2)+this.offset+5,
          //   (y_coord*this.blockWidth*2)+this.offset+5,
          //   (this.blockWidth)-2,
          //   (this.blockWidth)-2
          // );
          // ellipse(
          //   (x_coord*this.blockWidth*2)+this.offset+7,
          //   (y_coord*this.blockWidth*2)+this.offset+8,
          //   (this.blockWidth)-2,
          //   (this.blockWidth)-2
          // );
      //   }
      // }
    // }

    noStroke();
    // BREADCRUMBS
    if (character.hasMap) {
      // fill(this.characterIconColor)
      fill(255,255,255,100);
      for (var i=0;i<world.breadcrumbs.length;i++) {
        rect(
          (world.breadcrumbs[i][0]*this.blockWidth*2)+this.offset+4.5,
          (world.breadcrumbs[i][1]*this.blockWidth*2)+this.offset+4.7,
          (this.blockWidth)-2,
          (this.blockWidth)-2
          // (world.breadcrumbs[i][0]*this.blockWidth*2)+this.offset+1,
          // (world.breadcrumbs[i][1]*this.blockWidth*2)+this.offset+1,
          // (this.blockWidth*2)-2,
          // (this.blockWidth*2)-2
        );
      }
    }

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
      fill([PURPLE,BLUE][randomInt(0,2)]);
      rect(
        (world.keyZone.split('-')[0]*this.blockWidth*2)+this.offset,
        (world.keyZone.split('-')[1]*this.blockWidth*2)+this.offset,
        this.blockWidth*2,
        this.blockWidth*2
      );
    }

    // DOOR ZONE
    if (character.hasCompass && character.hasMasterKey && !gameWon) {
      fill(COLORS[randomInt(0,COLORS.length)]);
      rect(
        (world.doorZone.split('-')[0]*this.blockWidth*2)+this.offset,
        (world.doorZone.split('-')[1]*this.blockWidth*2)+this.offset,
        this.blockWidth*2,
        this.blockWidth*2
      );
    }

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

    // DEATH COUNT
    var pos_x = 15;
    var pos_y = blockSize*3-10;
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
    var info = character.deathCount;
    var scale = 2;
    var offset = (pixelSize*scale)/2.5;
    var pos_x = offset+pos_x+2;
    var pos_y = offset+pos_y;
    text(info, blockSize-10, blockSize+pixelSize*12);
    fill(WHITE);
    rect(pos_x,pos_y+(pixelSize/scale),(pixelSize/scale),(pixelSize/scale)*2);
    rect(pos_x+(pixelSize/scale)*2,pos_y,(pixelSize/scale),(pixelSize/scale)*4);
    rect(pos_x+(pixelSize/scale),pos_y,(pixelSize/scale),(pixelSize/scale)*4);
    rect(pos_x+(pixelSize/scale)*3,pos_y+(pixelSize/scale),(pixelSize/scale),(pixelSize/scale)*2);
    fill(OFF_WHITE);
    rect(pos_x+(pixelSize/scale)*3,pos_y+(pixelSize/scale)*2,(pixelSize/scale),(pixelSize/scale));
    rect(pos_x,pos_y+(pixelSize/scale)*2,(pixelSize/scale),(pixelSize/scale));
    rect(pos_x+(pixelSize/scale),pos_y+(pixelSize/scale)*3,(pixelSize/scale),(pixelSize/scale));
    fill(BLACK);
    rect(pos_x+(pixelSize/scale)*.66,pos_y+(pixelSize/scale)*1,(pixelSize/scale),(pixelSize/scale));
    rect(pos_x+(pixelSize/scale)*2.33,pos_y+(pixelSize/scale),(pixelSize/scale),(pixelSize/scale));
    rect(pos_x+(pixelSize/scale)*1.75,pos_y+(pixelSize/scale)*2.25,(pixelSize/scale)/2,(pixelSize/scale)/2);
    // rect(pos_x+(pixelSize/scale)*2,pos_y+(pixelSize/scale)*2.25,(pixelSize/scale)/2,(pixelSize/scale)/2);
    rect(pos_x+(pixelSize/scale)*1.25,pos_y+(pixelSize/scale)*3.5,(pixelSize/scale)/2,(pixelSize/scale)/2);
    rect(pos_x+(pixelSize/scale)*2.25,pos_y+(pixelSize/scale)*3.5,(pixelSize/scale)/2,(pixelSize/scale)/2);


    // EXP
    var pos_x = 15;
    var pos_y = blockSize*4.5;
    c = color(50, 50, 50, 100)
    fill(c);
    rect(
      pos_x, // appWidth-185,
      pos_y-2,
      blockSize,
      blockSize
    );
    value = alpha(c);
    fill(value);
    fill(200, 200, 200);
    textSize(11);
    textAlign(CENTER);
    var info = "L-"+character.level;
    var scale = 2;
    var offset = (pixelSize*scale)/2.5;
    var pos_x = offset+pos_x+2;
    var pos_y = offset+pos_y;
    text(info, blockSize-10, blockSize+pixelSize*15.5);
    fill(255, 255, 255);
    textSize(10);
    var info = character.exp+'/'+character.next;
    var info = round((character.exp/character.next)*100)+'%';
    var scale = 2;
    var offset = (pixelSize*scale)/2.5;
    var pos_x = offset+pos_x+2;
    var pos_y = offset+pos_y;
    text(info, blockSize-9, blockSize+pixelSize*16.85);


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
  character.healthBar.update((character.health/character.healthMax)*100);
  if (character.health <= 0) {
    character.isAlive = false;
  }
}


function updateMazeAfterWallDestroyed(zoneCoords,otherWallCoords,wallSide,otherWallSide) { // THIS IS NOT WORKING
  var zoneIndex;
  var otherZoneIndex;
  for (var k=0;k<maze.length;k++) {
    var x = zoneCoords.split('-')[0];
    var y = zoneCoords.split('-')[1];
    var xx = otherWallCoords.split('-')[0];
    var yy = otherWallCoords.split('-')[1];
    if (x == maze[k].i && y == maze[k].j) {
      zoneIndex = k;
    }
    if (xx == maze[k].i && yy == maze[k].j) {
      otherZoneIndex = k;
    }
  }

  if (wallSide == "topBorder") { wallIndex = 0; } else
  if (wallSide == "rightBorder") { wallIndex = 1; } else
  if (wallSide == "bottomBorder") { wallIndex = 2; } else
  if (wallSide == "leftBorder") { wallIndex = 3; }
  if (maze.has(zoneIndex)) {
    maze[zoneIndex].walls[wallIndex] = false;
  }

  if (otherWallSide == "topBorder") { wallIndex = 0; } else
  if (otherWallSide == "rightBorder") { wallIndex = 1; } else
  if (otherWallSide == "bottomBorder") { wallIndex = 2; } else
  if (otherWallSide == "leftBorder") { wallIndex = 3; }
  if (maze.has(zoneIndex)) {
    maze[otherZoneIndex].walls[wallIndex] = false;
  }
}
