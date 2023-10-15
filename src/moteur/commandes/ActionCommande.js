/**
 * Commande de tir
 */
class ActionCommande {

    /**
     * 
     * @param {Personnage} perso le personnage qui tire
     * @param {Objet} cible l'objet visé
     */
    constructor(perso, cible) {
        this.perso = perso;
        this.cible = cible;
        this.caseAction = new CaseAction(cible.coords.x, cible.coords.y);
    }

    /**
     * Affichage de la case d'action associée à la commande
     * 
     * @param {PIXI.Application} app 
     */
    displayCase(app) {
        this.caseAction.draw(app);
    }

    /**
     * Exécution de la commande
     */
    execute() {
        this.cible.action(this.perso);
        this.perso.removeActionCommands();
    }

}