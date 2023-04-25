var phi = (1+Math.sqrt(5))/2;

//[1]

Tile.prototype.red2whitee = function(){
  this.id[0]='whitee';
  this.scale(this.bounds[6],this.bounds[7],Math.sqrt(phi));
}
Tile.prototype.white2redd = function(){
  this.id[0]='redd';
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

Tile.prototype.rotateX = function(){
  const rmax = this.bounds[3]-this.bounds[1];
  const rmin = this.bounds[9]-this.bounds[11];
  this.bounds[1]+=rmax;
  this.bounds[3]-=rmax;
  this.bounds[5]-=rmax;
  this.bounds[7]+=rmax-2*rmin;
  this.bounds[9]+=rmax-2*rmin;
  this.bounds[11]+=rmax;

}

var boundss = [];
boundss.push(0,0);
boundss.push(0,Math.pow(phi,5/2));
boundss.push(phi,Math.pow(phi,5/2));
boundss.push(phi,Math.pow(phi,5/2)-Math.pow(phi,1/2));
boundss.push(phi+1,Math.pow(phi,5/2)-Math.pow(phi,1/2));
boundss.push(phi+1,0);

var redd = new Tile(['redd'],[],boundss,6);
var whitee = redd.myclone();
whitee.red2whitee();

//[2]

function AmmannChairSub(tile){
  switch(tile.id[0]){
    case 'redd':

      var newtiles = [];
      var newhite1 = tile.myclone();
      newhite1.id.push("newhite1");
      newhite1.red2whitee();
      newtiles.push(newhite1);

      return newtiles;

    case 'whitee':

      var newtiles = [];
      var newhite1 = tile.myclone();
      newhite1.id.push("newhite1");
      newhite1.rotate(tile.bounds[10],tile.bounds[11],Math.PI/2);
      newtiles.push(newhite1);

      var nered1 = tile.myclone();
      nered1.id.push("nered1");
      nered1.white2redd();
      if(nered1.bounds[2]-nered1.bounds[0]==0) {
        nered1.rotateX();
      } else {
        nered1.rotateYla();
      }
      
      //nered1.shift(newhite1.bounds[2]-newhite1.bounds[0],newhite1.bounds[5]-newhite1.bounds[3]);
      newtiles.push(nered1);

      return newtiles;

    default:
      console.log("Error: undefined tile type for mysubstitution, id="+tile.id);
  }
}

//[3]

var AmmannChairdupinfos = [];
var AmmannChairdupinfosoriented = [];

//[4] [5]

var AmmannChairneighbors = "I am lazy";

// [6] 

var AmmannChairneighbors2bounds = new Map();
AmmannChairneighbors2bounds.set('redd',[[0,1,2,3],[2,3,4,5],[4,5,6,7],[6,7,8,9],[8,9,10,11],[10,11,0,1]]);
AmmannChairneighbors2bounds.set('whitee',[[0,1,2,3],[2,3,4,5],[4,5,6,7],[6,7,8,9],[8,9,10,11],[10,11,0,1]]);

// [7]

AmmannChairdecorate = new Map();
AmmannChairdecorate.set('redd',0);
AmmannChairdecorate.set('whitee',1);

//[Tiling]

Tiling.AmmannChair = function({iterations}={}){
    var tiles = [];
    var rred = redd.myclone();

    tiles.push(rred);

    tiles = substitute(
      iterations,
      tiles,
      1,
      AmmannChairSub,
      AmmannChairdupinfos,
      AmmannChairdupinfosoriented,
      AmmannChairneighbors,
      AmmannChairneighbors2bounds,
      AmmannChairdecorate
    );

    return new Tiling(tiles);
}