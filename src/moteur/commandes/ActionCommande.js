import { Commande } from './Commande.js';

/**
 * Commande d'action
 */
export class ActionCommande extends Commande {

    /**
     * 
     * @param {Personnage} perso le personnage effectue l'action
     * @param {Objet} cible l'objet sur lequel l'action est effectuée
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

    /**
     * Exécution de la commande
     */
    execute() {
        this.cible.action(this.perso);
    }

}