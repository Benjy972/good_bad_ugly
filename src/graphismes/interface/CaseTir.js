/**
 * Case de tir sur un joueur présent sur la map.
 */
class CaseTir extends Case {

    /**
     * 
     * @param {number} x axe x de la coordonnée de la case
     * @param {number} y axe y de la coordonnée de la case
     */
    constructor(x, y) {
        super(x, y, 'resources/interface/cible_tir.png');
    }

}