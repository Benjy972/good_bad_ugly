import { Case } from "./Case.js";

/**
 * Case de déplacement sur la map.
 */
export class CaseDeplacement extends Case {

    /**
     * 
     * @param {number} x axe x de la coordonnée de la case
     * @param {number} y axe y de la coordonnée de la case
     */
    constructor(x, y) {
        super(x, y, 'resources/interface/sol_jouable.png');
    }

}