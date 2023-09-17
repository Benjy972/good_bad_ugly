/**
 * Commande de tir
 */
class ActionSpecialeCommande {

    /**
     * 
     * @param {Personnage} perso le personnage qui effectue l'action
     * @param {any} cible la cible de l'action
     */
    constructor(perso, cible) {
        this.perso = perso;
        this.cible = cible;
        this.caseActionSpeciale = new CaseActionSpeciale(cible.coords.x, cible.coords.y);
    }

    /**
     * Affichage de la case d'action spéciale associée à la commande
     * 
     * @param {PIXI.Application} app 
     */
    displayCase(app) {
        this.caseActionSpeciale.draw(app);
    }

}