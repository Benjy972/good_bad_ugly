import { Case } from "./Case.js";

/**
 * Case d'action spéciale sur un personnage présent sur la map.
 */
export class CaseActionSpeciale extends Case {

    /**
     * 
     * @param {number} x axe x de la coordonnée de la case
     * @param {number} y axe y de la coordonnée de la case
     */
    constructor(x, y) {
        super(x, y, 'resources/interface/cible_action_speciale.png');
    }

}