var enemyTypes = [
  {"_id":0, "type":"red-bloog","innerColor": RED,"secondaryColor": BLACK,"movable": true,"solid": true, "damage":1,"health":1,"speed":2,"rarity":2,"digger":false,"pusher":false,"size":[1,1]},
  {"_id":1, "type":"blue-bloog","innerColor": BLUE,"secondaryColor": BLACK,"movable": true,"solid": true, "damage":2,"health":2,"speed":4,"rarity":3,"digger":false,"pusher":false,"size":[1,1]},
  {"_id":2, "type":"green-bloog","innerColor": GREEN,"secondaryColor": BLACK,"movable": true,"solid": true, "damage":3,"health":2,"speed":1,"rarity":5,"digger":false,"pusher":true,"size":[1,1]},
  {"_id":3, "type":"black-bloog","innerColor": BLACK,"secondaryColor": WHITE,"movable": true,"solid": true, "damage":5,"health":3,"speed":3,"rarity":10,"digger":true,"pusher":false,"size":[1,1]}
];

function Enemy(_id,_index) {
  this._id = _id;
  this._index = _index;
  this.type = enemyTypes[this._id].type;
  this.pos = createVector(randomInt(blockSize*2,width-blockSize*2), randomInt(blockSize*2,height-blockSize*2));
  this.r = blockSize/2;
  this.isMoving = false;
  this.d = null;
  this.vel = enemyTypes[this._id].speed;
  this.isMovable = this.health = enemyTypes[this._id].movable;
  this.isSolid = true;
  this.moveCount = 0;
  this.moveCountMax = 0;
  this.primeColor = enemyTypes[this._id].innerColor;
  this.secondaryColor = enemyTypes[this._id].secondaryColor;
  this.damage = enemyTypes[this._id].damage;
  this.health = enemyTypes[this._id].health;
  this.isInvincible = false;
  this.invincibleCount = 0;
  this.items = [];
  this.canDig = enemyTypes[this._id].digger;
  this.canPush = enemyTypes[this._id].pusher;

  this.look = function() {
    noStroke();
    // BLOOGS
    fill(this.primeColor);
    rect(
      this.pos.x,
      this.pos.y,
      this.r*2,
      this.r*2
    );
    if (this.d == 'DOWN' || this.d == 'STILL') {
      fill(this.secondaryColor);
      rect(
        this.pos.x+pixelSize,
        this.pos.y+pixelSize*2,
        pixelSize+pixelSize,
        pixelSize
      );
    } else if (this.d == 'RIGHT') {
      fill(this.secondaryColor);
      rect(
        this.pos.x+pixelSize*2,
        this.pos.y+pixelSize*2,
        pixelSize+pixelSize,
        pixelSize
      );
    } else if (this.d == 'LEFT') {
      fill(this.secondaryColor);
      rect(
        this.pos.x,
        this.pos.y+pixelSize*2,
        pixelSize+pixelSize,
        pixelSize
      );
    }
  }

  this.move = function() {
    if (this.d == 'RIGHT')  {
      this.pos.x+= this.vel;
    } else if (this.d == 'LEFT') {
      this.pos.x -= this.vel;
    } else if (this.d == 'UP') {
      this.pos.y -= this.vel;
    } else if (this.d == 'DOWN') {
      this.pos.y += this.vel;
    } else if (this.d == 'STILL') {
      this.pos = this.pos;
    }
  }

  this.moving = function(b) {
    this.isMoving = b;
  }

  this.update = function() {
    this.moveCount += 1;
    if (this.moveCount > this.moveCountMax) {
      this.moveCountMax = randomInt(0,100);
      this.d = ["LEFT","RIGHT","UP","DOWN","STILL"][randomInt(0,4)];
      this.moveCount = 0;
    }
    if (!this.isInvincible) {
      this.move();
    }

    if (this.hits(character)) {
      entityPush(this,character);
    }

    if (this.isInvincible) {
      this.primeColor = COLORS[randomInt(0,COLORS.length)];
      this.invincibleCount += 1;
      // this.vel = this.vel*2;
      if (this.invincibleCount >= 50) {
        this.isInvincible = false;
        this.invincibleCount = 0;
        this.primeColor = enemyTypes[this._id].innerColor;
      }
    }
  }

  this.explode = function(i) {
    this.drop();
    loadedZone.enemies.splice(i,1);
    createDebris(this.pos,randomInt(-25,25),6,this.primeColor);
  }

  this.drop = function() {
    for (var i=0;i<this.items.length;i++) {
      dropItem(this.items[i],this.pos);
    }
  }

  this.hits = function(entity) {
    var d = dist(this.pos.x, this.pos.y, entity.pos.x, entity.pos.y);
    if (d < (this.r + entity.r)) {
      return true;
    } else {
      return false;
    }
  }

  this.edges = function() {
    if (this.pos.x > appWidth-blockSize) { // RIGHT
      this.d = ['LEFT','STILL'][randomInt(0,2)];
    } else if (this.pos.x < blockSize) { // LEFT
      this.d = ['RIGHT','STILL'][randomInt(0,2)];
    }
    if (this.pos.y > appHeight-blockSize) { // BOTTOM
      this.d = ['UP','STILL'][randomInt(0,2)];
    } else if (this.pos.y < blockSize) { // TOP
      this.d = ['DOWN','STILL'][randomInt(0,2)];
    }
  }

  this.render = function() {
    push();
    this.look();
    pop();
  }
}


function createEnemies(numberOfEnemies) {
  var enemies = [];
  for (var i=0;i<numberOfEnemies;i++) {
    var enemy_id = randomInt(0,enemyTypes.length);
    var diceRoll = randomInt(-1,enemyTypes[enemy_id].rarity)+1;
    // console.log(diceRoll == enemyTypes[enemy_id].rarity,diceRoll,enemyTypes[enemy_id].rarity);
    // if (diceRoll == enemyTypes[enemy_id].rarity) {
      // console.log(enemyTypes[enemy_id].type)
      enemies.push(new Enemy(enemy_id,i));

      var randomItem = createRandomItem();
      if (randomItem != false && enemies[i].items) {
        enemies[i].items.push(randomItem);
        // console.log(itemTypes[randomItem].type)
      }

      // enemies[i].items.push(5); // HEARTS ONLY
      enemies[i].items.push(0); // 1 COIN ONLY
      // enemies[i].items.push(6); // 5 COIN ONLY

    // }
  }
  // console.log(enemies)
  return enemies;
}


function drawEnemies() {
  for (var i=0;i<loadedZone.enemies.length;i++) {
    loadedZone.enemies[i].render();
    loadedZone.enemies[i].update();
    loadedZone.enemies[i].edges();
  }
}
