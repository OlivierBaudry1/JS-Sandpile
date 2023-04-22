var phi = (1+Math.sqrt(5))/2;

//[1]

Tile.prototype.tRec2Rec = function(){
  this.id[0]='rec';
  this.scale(this.bounds[0],this.bounds[1],Math.sqrt(phi));
}
Tile.prototype.rec2tRec = function(){
  this.id[0]='tRec';
  this.scale(this.bounds[0],this.bounds[1],1/Math.sqrt(phi));
}

Tile.prototype.rotateYlo = function(){
  const rmax = this.bounds[4]-this.bounds[2];
  const rmin = this.bounds[8]-this.bounds[6];
  this.bounds[0]=this.bounds[0]+rmax+rmin;
  this.bounds[2]=this.bounds[2]+rmax+rmin;
  this.bounds[4]=this.bounds[4]+rmin-rmax;
  this.bounds[6]=this.bounds[6]+rmin-rmax;
  this.bounds[8]=this.bounds[8]-rmax-rmin;
  this.bounds[10]=this.bounds[10]-rmax-rmin;
}

Tile.prototype.rotateYla = function(){
  const rmax = this.bounds[2]-this.bounds[0];
  const rmin = this.bounds[6]-this.bounds[4];
  this.bounds[0]=this.bounds[0]+rmax;
  this.bounds[2]=this.bounds[2]-rmax;
  this.bounds[4]=this.bounds[4]-rmax;
  this.bounds[6]=this.bounds[6]-rmax-2*rmin;
  this.bounds[8]=this.bounds[8]-rmax-2*rmin;
  this.bounds[10]=this.bounds[10]+rmax;
}

var bounds = [];
bounds.push(0,0);
bounds.push(0,Math.pow(phi,5/2));
bounds.push(phi,Math.pow(phi,5/2));
bounds.push(phi,Math.pow(phi,5/2)-Math.pow(phi,1/2));
bounds.push(phi+1,Math.pow(phi,5/2)-Math.pow(phi,1/2));
bounds.push(phi+1,0);
var tRec = new Tile(['tRec'],[],bounds,6);

var rec = tRec.myclone();
rec.tRec2Rec();

//[2]

function mysubstitution(tile){
    switch(tile.id[0]){
      case 'tRec':

        var newtiles = [];
        var newRec1 = tile.myclone();
        newRec1.tRec2Rec();
        newRec1.id.push("rec1");
        newtiles.push(newRec1);
        return newtiles;
  
      case 'rec':

        var newtiles = [];
        var newRec1 = tile.myclone();
        newRec1.id.push("newRec1");
        newRec1.rotate(tile.bounds[6]+1,tile.bounds[5]-1,Math.PI/2);
        newRec1.shift(0,0);
        newtiles.push(newRec1);

        var newtRec1 = tile.myclone();
        newtRec1.rec2tRec();
        newtRec1.id.push("tRec1");

        newtRec1.rotateYla();
        newtRec1.shift(0,0);
        newtiles.push(newtRec1);
        return newtiles;
  
      default:
        console.log("Error: undefined tile type for mysubstitution, id="+tile.id);
    }
}

//[3]

var mydupinfos = [];
var mydupinfosoriented = [];

//[4] [5]

var myneighbors = "I am lazy";

// [6] 

var myneighbors2bounds = new Map();
myneighbors2bounds.set('tRec',[[0,1,2,3],[2,3,4,5],[4,5,6,7],[6,7,8,9],[8,9,10,11],[10,11,0,1]]);
myneighbors2bounds.set('rec',[[0,1,2,3],[2,3,4,5],[4,5,6,7],[6,7,8,9],[8,9,10,11],[10,11,0,1]]);

// [7]

mydecorate = new Map();
mydecorate.set('tRec',0);
mydecorate.set('rec',1);

//[Tiling]

Tiling.SubTiling = function({iterations}={}){
    var tiles = [];

    var mytRec = tRec.myclone();
    mytRec.id.push(0);
    mytRec.neighbors.push(undefined);
    mytRec.neighbors.push(undefined);
    mytRec.neighbors.push(undefined);
    mytRec.neighbors.push(undefined);
    mytRec.neighbors.push(undefined);
    mytRec.neighbors.push(undefined);

    var myRec = rec.myclone();
    myRec.id.push(1);
    myRec.neighbors.push(undefined);
    myRec.neighbors.push(undefined);
    myRec.neighbors.push(undefined);
    myRec.neighbors.push(undefined);
    myRec.neighbors.push(undefined);
    myRec.neighbors.push(undefined);

    mytRec.rotateYlo();
    mytRec.rotate(mytRec.bounds[8],mytRec.bounds[9],Math.PI);
    mytRec.shift(myRec.bounds[7]-myRec.bounds[5],mytRec.bounds[7]-mytRec.bounds[5]);
    myRec.rotate(myRec.bounds[0],myRec.bounds[1],Math.PI/2);

    tiles.push(myRec);
    tiles.push(mytRec);

    tiles = substitute(
      iterations,
      tiles,
      phi,
      mysubstitution,
      mydupinfos,
      mydupinfosoriented,
      myneighbors,
      myneighbors2bounds,
      mydecorate
    );

    return new Tiling(tiles);
}