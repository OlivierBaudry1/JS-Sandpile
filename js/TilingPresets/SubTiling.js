var rphi = Math.sqrt((1+Math.sqrt(5))/2);

//[1]

var bounds = [];
bounds.push(-0.75,-1);
bounds.push(-0.75,1);
bounds.push(0.25,1);
bounds.push(0.25,0.25);
bounds.push(0.75,0.25);
bounds.push(0.75,-1);
var tinyRec = new Tile(['tRec'],[],bounds,6);


var rec = tinyRec.myclone();
rec.id = ['rec'];
rec.scale(tinyRec.bounds[0],tinyRec.bounds[1],rphi);

//[2]

function substitutionP2(tile){
    switch(tile.id[0]){
      case 'tRec':

        var newtiles = [];
        var rec1 = tile.myclone();
        rec1.id.push("rec1");
        rec1.scale(tile.bounds[0],tile.bounds[1],rphi);
        newtiles.push(rec1);
        return newtiles;
  
      case 'rec':

        var newtiles = [];
        var newRec = tile.myclone();
        return newtiles;
  
      default:
        console.log("Error: undefined tile type for substitutionP2, id="+tile.id);
    }
}

//[3]

Tiling.SubTiling = function({iterations}={}){
    
    var tiles = [];
    tiles.push(tinyRec);
    tiles.push(rec);
    

    // tiles = substitute(
    //     iterations,
    //     tiles,
    //     phi,
    //     substitutionP2,
    //     duplicatedP2,
    //     duplicatedP2oriented,
    //     neighborsP2,
    //     neighbors2boundsP2,
    //     decorateP2
    //   );

    return new Tiling(tiles);
}
