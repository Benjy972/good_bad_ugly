/**
 * Commande standard
 */
class Commande {

    /**
     * 
     * @param {Personnage} perso le personnage qui effectue l'action
     * @param {Case} case le type de case
     */
    constructor(perso, caseStandard) {
        this.perso = perso;
        this.caseCommande = caseStandard;
    }

    /**
     * Affichage de la case d'action associée à la commande
     * 
     * @param {PIXI.Application} app 
     */
    displayCase(app) {
        this.caseCommande.draw(app);
    }

    /**
     * Suppression de la case
     */
    destroyCase() {
        this.caseCommande.destroy();
    }

}