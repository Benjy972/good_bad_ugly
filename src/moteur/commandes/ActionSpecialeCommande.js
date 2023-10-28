/**
 * Commande d'action spéciale
 */
class ActionSpecialeCommande extends Commande {

    /**
     * 
     * @param {Personnage} perso le personnage qui effectue l'action
     * @param {any} cible la cible de l'action
     */
    constructor(perso, cible) {
        super(perso, new CaseActionSpeciale(cible.coords.x, cible.coords.y));
        this.cible = cible;
    }

}