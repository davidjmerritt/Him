var clusterTypes = {
  "SPECTACLE_ROCK": {
    "layout": [
      [0,0,3,3,2],
      [3,appBlockHeight/2.5,5,4,2], //2=BROWN
      [4.5,4,2,1,2],
      [4,4.5,3,1,2],
      [3.5,5,4,1,2],
      [11,appBlockHeight/2.5,5,4,2],
      [12.5,4,1,1,2],
      [12,4.5,3,1,2],
      [11.5,5,4,1,2],
      [0,appBlockHeight-3,3,3,2],
      [0,appBlockHeight-3,3,3,2],
    ]
  },
  "EMPTY": {
    "layout": []
  },
  "TREES": {
    "layout": [
      [2.5,3.5,1,1,7],
      [2.5,appBlockHeight-5.5,1,1,7],
      [2.5,appBlockHeight-3.2,1,1,7],
      [2.5,appBlockHeight/2.5,1,1,7],

      [appBlockWidth/4,3.5,1,1,7],
      [appBlockWidth/4,appBlockHeight-5.5,1,1,7],
      [appBlockWidth/4,appBlockHeight-3.2,1,1,7],
      [appBlockWidth/4,appBlockHeight/2.5,1,1,7],
      [appBlockWidth/2.5,appBlockHeight/2.5,1,1,7],//7=DARK_GREEN
      [appBlockWidth/2.5,appBlockHeight-5.5,1,1,7],


      [appBlockWidth-6,3.5,1,1,7],
      [appBlockWidth-6,appBlockHeight/2.5,1,1,7],//7=DARK_GREEN
      [appBlockWidth-6,appBlockHeight-5.5,1,1,7],
      [appBlockWidth-6,appBlockHeight-3.2,1,1,7],

      [appBlockWidth-8.5,appBlockHeight/2.5,1,1,7],
      [appBlockWidth-8.5,appBlockHeight-5.5,1,1,7],

      [appBlockWidth-3.5,3.5,1,1,7],
      [appBlockWidth-3.5,appBlockHeight/2.5,1,1,7],//7=DARK_GREEN
      [appBlockWidth-3.5,appBlockHeight-5.5,1,1,7],
      [appBlockWidth-3.5,appBlockHeight-3.2,1,1,7],



    ],
  },
  "GREEN_GRID": {
    "layout": [
      [appBlockWidth/4,appBlockHeight/4,1,1,3], //8=OFF_GREEN
      [appBlockWidth/4,(appBlockHeight/4)*3,1,1,3],
      [(appBlockWidth/4)*3,appBlockHeight/4,1,1,3],
      [(appBlockWidth/4)*3,(appBlockHeight/4)*3,1,1,3]
    ]
  },
  "RIVER_1": {
    "layout": [
      [0,0,3,5,1],
      [0,2,8,3,1],
      [5,3,3,8,1],
      [5,3,3,8,1],
      [5,11,3,4,14],
    ]
  },
  "RIVER_2": {
    "layout": [
      [0,0,3,5,1],
      [0,2,8,3,1],
      [5,3,3,5,1],
      [5,3,3,8,14],
      [5,11,3,4,1],
    ]
  },
  "TWO_POOLS": {
    "layout": [
      [4,appBlockHeight/3,5,6,1],
      [11,appBlockHeight/3,5,6,1],
    ]
  },
  "WARP_STONES": {
    "layout": [
      [appBlockWidth/2,(appBlockHeight/2)+1,1,1,2],
      [appBlockWidth/2,(appBlockHeight/2)-1,1,1,2],
      [(appBlockWidth/2)+1,(appBlockHeight/2),1,1,2],
      [(appBlockWidth/2)-1,(appBlockHeight/2),1,1,9],
    ]
  },
  "LONG_SHRUB": {
    "layout": [
      [0,0,4,5,3],
      [4,0,4,11,3],
      [8,9,7,2,3],
      [12,5,3,5,3],
    ]
  },
  "LONE_GRAY_STONE": {
    "layout": [
      [(appBlockWidth/4),(appBlockHeight/2),1,1,11], // 11=DARKER_GRAY
    ]
  },
  "LONE_BROWN_STONE": {
    "layout": [
      [(appBlockWidth/4),(appBlockHeight/2),1,1,9],
    ]
  },
  "TWO_GREEN": {
    "layout": [
      [(appBlockWidth/2)+2,(appBlockHeight/2),1,1,3],
      [(appBlockWidth/2)-2,(appBlockHeight/2),1,1,3],
    ]
  },
  "DIRT_TOP_MAGIC": {
    "layout": [
      [7.5,0,5,2,12],
    ]
  },
  "DIRT_TOP": {
    "layout": [
      [7.5,0,5,2,9],
    ]
  },
  "SNOW_TOP": {
    "layout": [
      [7.5,0,5,2,10],
      [appBlockWidth/2.5,appBlockHeight/2.5,4,4,10],
    ]
  },
  "TRI_ROOM": {
    "layout": [
      [3,3.5,13,1,11],
      [3,3.5,1,7,11],
      [15,3.5,1,7,11],
      [3,10,5,1,11],
      [11,10,5,1,11],
    ]
  },
  "GRAY_STRIPS": {
    "layout": [
      [3,4,13,1,11],
      [3,7,5,1,11],
      [11,7,5,1,11],
      [3,10,13,1,11],
    ]
  },
  "BROWN_FENCE": {
    "layout": [
      [(appBlockWidth/2)-2,(appBlockHeight/2)-2,5,1,2],
      [(appBlockWidth/2)-2,(appBlockHeight/2)+2,5,1,2],
      [(appBlockWidth/2)-2,(appBlockHeight/2)-2,1,5,2],
      [(appBlockWidth/2)+2,(appBlockHeight/2)-2,1,5,2],
    ]
  },
  "LARGE_WARP_STONES": {
    "layout": [

      [appBlockWidth/2,(appBlockHeight/2)-3,1,1,2], // TOP
      [appBlockWidth/2+1,(appBlockHeight/2)-2,1,1,2],
      [appBlockWidth/2-1,(appBlockHeight/2)-2,1,1,2],

      [appBlockWidth/2+2,(appBlockHeight/2)-1,1,1,2],
      [appBlockWidth/2-2,(appBlockHeight/2)-1,1,1,2],

      [appBlockWidth/2+3,(appBlockHeight/2),1,1,2], // RIGHT
      [appBlockWidth/2-3,(appBlockHeight/2),1,1,9], // LEFT

      [appBlockWidth/2+2,(appBlockHeight/2)+1,1,1,2],
      [appBlockWidth/2-2,(appBlockHeight/2)+1,1,1,2],

      [appBlockWidth/2+1,(appBlockHeight/2)+2,1,1,2],
      [appBlockWidth/2-1,(appBlockHeight/2)+2,1,1,2],
      [appBlockWidth/2,(appBlockHeight/2)+3,1,1,2], // BOTTOM
    ]
  }
};


function clusterLayout(_id) {
  var newLayout = [];
  for (var i=0;i<clusterTypes[_id].layout.length;i++) {
    var l = clusterTypes[_id].layout;
    var newCluster = createBlockCluster(
      l[i][0],
      l[i][1],
      l[i][2],
      l[i][3],
      l[i][4],
      true
    );
    newLayout.push(newCluster);
  }
  return newLayout;
}


// CREATE RANDOM CLUSTERS
// for (var i=0;i<randomInt(0,3);i++){ // NUMBER OF CLUSTERS
//   // RANDOM
//   blocks[guid()] = createBlockCluster(
//     randomInt(2,appBlockWidth-5), // X
//     randomInt(2,appBlockHeight-5), // Y
//     randomInt(2,5), // W
//     randomInt(2,5), // H
//     "random"
//   );
// }
