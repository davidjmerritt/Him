function Controller() {




}

function Button(){
  this.r = blockSize/2;
  this.pos = createVector(width/2,height/2);

  this.update = function() {

  }

  this.look = function() {
    noFill();
    rect(
      this.pos.x,
      this.pos.y,
      blockSize,
      blockSize
    );
  }

  this.render() { push(); this.look(); pop(); }
}
