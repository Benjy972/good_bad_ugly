/**
 * Commande de lancer de lasso (action spéciale du Bon)
 */
class LancerLassoCommande {

    /**
     * 
     * @param {Bon} perso le bon qui lance le lasso
     * @param {Personnage} cible le personnage visé
     */
    constructor(perso, cible) {
        this.perso = perso;
        this.cible = cible;
        this.caseActionSpeciale = new CaseActionSpeciale(cible.coords.x, cible.coords.y);
    }

    /**
     * Affichage de la case de tir associée à la commande
     * 
     * @param {PIXI.Application} app 
     */
    displayCase(app) {
        this.caseActionSpeciale.draw(app);
    }

    /**
     * Exécution de la commande
     */
    execute() {
        // Etape 0 : consomme l'action de déplacement du personnage

        // Etape 1 : le tireur se tourne ves sa victime
        this.perso.setDirection(this.perso.coords.getAngle(this.cible.coords));

        // Etape 1 : effectuer l'action de tir
        this.perso.actionSpeciale(this.cible);
        this.cible.encaisserLasso();
    }

}