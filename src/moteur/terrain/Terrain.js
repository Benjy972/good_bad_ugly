/**
 * Classe de la map
 */
export class Terrain {

    static TAILLE_CASE = 32;

    constructor() {
        this.map = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
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
    }

    /**
     * Définit si une case est praticable
     * 
     * @param {number} x l'axe x de la coordonnée de la case
     * @param {number} y l'axe y de la coordonnée de la case
     * @returns true si on peut se déplacer sur la case, false s'il s'agit d'un obstacle
     */
    canWalk(x, y) {
        let i = Math.trunc(y/Terrain.TAILLE_CASE);
        let j = Math.trunc(x/Terrain.TAILLE_CASE);
        if (i<0 || j<0 || i>=this.map.length || j>=this.map[i].length) {
            return false;
        }
        return this.map[i][j] != 1;
    }
}