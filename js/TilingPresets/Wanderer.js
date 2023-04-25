//[1]

Tile.prototype.redToWhite = function(){
    this.id[0]='white';
}
Tile.prototype.whiteToRed = function(){
    this.id[0]='red';
}


// White Square
var bounds = [];
bounds.push(-0.5,-0.5);
bounds.push(0.5,-0.5);
bounds.push(0.5,0.5);
bounds.push(-0.5,0.5);
var white= new Tile(['white'],[],bounds,4);


//Red Square
var red = white.myclone();
red.whiteToRed();

//[2]

function wanderer_substitution(tile){
    switch(tile.id[0]){
        case 'white':
            // ---------------------------------------------
            // whithe square substitution -> 2 white, 2 red
            // ---------------------------------------------

            var newtiles = [];

            //new white square 1
            var newWhite1 = tile.myclone();
            newWhite1.id.push("newWhite1");
            newWhite1.rotate((tile.bounds[4]+tile.bounds[0])/2,(tile.bounds[5]+tile.bounds[1])/2,Math.PI/2);
            newWhite1.shift(tile.bounds[4],tile.bounds[5]);


            newtiles.push(newWhite1);


            //new white square 2
            var newWhite2 = tile.myclone();
            newWhite2.id.push("newWhite2");
            newWhite2.shift(tile.bounds[6],tile.bounds[7]);
            newtiles.push(newWhite2);

            //new red square 1
            var newRed1 = tile.myclone();
            newRed1.whiteToRed();
            newRed1.id.push("newRed1");
            newRed1.shift(tile.bounds[0],tile.bounds[1]);
            newtiles.push(newRed1);

            //new red square 2
            var newRed2 = tile.myclone();
            newRed2.whiteToRed();
            newRed2.id.push("newRed2");
            newRed2.rotate((tile.bounds[4]+tile.bounds[0])/2,(tile.bounds[5]+tile.bounds[1])/2,-Math.PI/2);
            newRed2.shift(tile.bounds[2],tile.bounds[3]);
            newtiles.push(newRed2);


            return newtiles;

        case 'red':
            // ---------------------------------------------
            // red square substitution -> 2 white, 2 red
            // ---------------------------------------------

            var newtiles = [];

            //new white square 1
            var newWhite1 = tile.myclone();
            newWhite1.redToWhite();
            newWhite1.id.push("newWhite1");
            newWhite1.rotate((tile.bounds[4]+tile.bounds[0])/2,(tile.bounds[5]+tile.bounds[1])/2,Math.PI/2);
            newWhite1.shift(tile.bounds[0],tile.bounds[1]);
            newtiles.push(newWhite1);
        


            //new white square 2
            var newWhite2 = tile.myclone();
            newWhite2.redToWhite();
            newWhite2.id.push("newWhite2");
            newWhite2.shift(tile.bounds[2],tile.bounds[3]);
            newtiles.push(newWhite2);

            //new red square 1
            var newRed1 = tile.myclone();
            newRed1.id.push("newRed1");
            newRed1.rotate((tile.bounds[4]+tile.bounds[0])/2,(tile.bounds[5]+tile.bounds[1])/2,-Math.PI/2);
            newRed1.shift(tile.bounds[6],tile.bounds[7]);
            newtiles.push(newRed1);


            //new red square 2
            var newRed2 = tile.myclone();
            newRed2.id.push("newRed2");
            newRed2.shift(tile.bounds[4],tile.bounds[5]);
            newtiles.push(newRed2);


            return newtiles;
    
        default:
            console.log("Error: undefined tile type for mysubstitution, id="+tile.id);
    }
}

//[3]

var myydupinfos = [];
var myydupinfosoriented = [];

//[4] [5]

var myyneighbors = "I am lazy";

// [6] 

var myyneighbors2bounds = new Map();
myyneighbors2bounds.set('red',[[0,1,2,3],[2,3,4,5],[4,5,6,7],[6,7,0,1]]);
myyneighbors2bounds.set('white',[[0,1,2,3],[2,3,4,5],[4,5,6,7],[6,7,0,1]]);

// [7]

var myydecorate = new Map();
myydecorate.set('red',4);
myydecorate.set('white',0);

//[Tiling]

Tiling.wanderer = function({iterations}={}){
    var tiles = [];
    var myred = red.myclone();
    
    tiles.push(myred);

    tiles = substitute(
        iterations,
        tiles,
        1,
        wanderer_substitution,
        myydupinfos,
        myydupinfosoriented,
        myyneighbors,
        myyneighbors2bounds,
        myydecorate
    );
    return new Tiling(tiles);
}
