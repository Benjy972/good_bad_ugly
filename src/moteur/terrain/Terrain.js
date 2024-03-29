/**
 * Classe de la map
 */
class Terrain {
    constructor() {
        this.map = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];
        this.terrainGraphique = new TerrainGraphique(this);
    }

    /**
     * Définit si une case est praticable
     * 
     * @param {number} x l'axe x de la coordonnée de la case
     * @param {number} y l'axe y de la coordonnée de la case
     * @returns true si on peut se déplacer sur la case, false s'il s'agit d'un obstacle
     */
    canWalk(x, y) {
        let i = Math.trunc(y/32);
        let j = Math.trunc(x/32);
        if (i<0 || j<0 || i>=this.map.length || j>=this.map[i].length) {
            return false;
        }
        return this.map[i][j] == 0;
    }
}