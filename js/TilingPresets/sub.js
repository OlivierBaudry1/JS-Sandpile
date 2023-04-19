// Tiling.mytiling = function({iterations}={}) {
//     var tiles = [];

    

//     return new Tiling(tiles);
// }

// Définir les règles de la substitution
let rules = {
    'A': 'AB',
    'B': 'ABA'
  };
  
  // Initialiser la grille avec une tuile A
  let grid = [['A']];
  
  // Appliquer les règles de substitution un grand nombre de fois
  for (let i = 0; i < 7; i++) {
    grid = SubstitutionAPI.substitute(grid, rules);
  }
  
  // Afficher la grille générée
  console.log(grid);
  