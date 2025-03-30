import { Case } from "./Case.js";

/**
 * Case d'action sur un objet présent sur la map.
 */
export class CaseAction extends Case {

    /**
     * 
     * @param {number} x axe x de la coordonnée de la case
     * @param {number} y axe y de la coordonnée de la case
     */
    constructor(x, y) {
        super(x, y, 'resources/interface/cible_action.png');
    }

}