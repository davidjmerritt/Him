Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};


Array.prototype.has = function(i) {
  if (this.indexOf(i) === -1) {
    return false;
  } else {
    return true;
  }
};


function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}


function numberToAlpha(n) {
  return ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','AA','BB','CC','DD','EE','FF','GG','HH','II','JJ','KK','LL'][n];
}


function findInArray(arr,item) {
  for (var i=0;i<arr.length;i++) {
    if (arr[i] === item) {
      return true;
      break;
    }
  }
  return false;
}


function createMatrix(w,h) {
  var matrix = [];
  for (r=0;r<w;r++) {
    for (c=0;c<h;c++) {
      matrix.push([r, c]);
    }
  }
  return matrix;
}


function createMatrixString(w,h) {
  var matrix = [];
  for (r=0;r<w;r++) {
    for (c=0;c<h;c++) {
      matrix.push(r+"-"+c);
    }
  }
  return matrix;
}


function epoch() {
  var d = new Date();
  var n = d.getTime();
  return n/1000;
}
