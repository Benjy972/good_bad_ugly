import { Commande } from './Commande.js';

/**
 * Commande d'action spéciale
 */
export class ActionSpecialeCommande extends Commande {

    /**
     * 
     * @param {Personnage} perso le personnage qui effectue l'action
     * @param {any} cible la cible de l'action
     */
    constructor(perso, cible) {
        super(perso);
        this.cible = cible;
    }

    /**
     * Méthode utilisée pour l'affichage des cases
     * 
     * 
     * @returns les coordonnées de la cible
     */
    getCoords() {
        return this.cible.coords;
    }

}