/**
 * Commande de tir
 */
class TirCommande {

    /**
     * 
     * @param {Personnage} perso le personnage qui tire
     * @param {Personnage} cible le personnage visé
     */
    constructor(perso, cible) {
        this.perso = perso;
        this.cible = cible;
        this.caseTir = new CaseTir(cible.coords.x, cible.coords.y);
    }

    /**
     * Affichage de la case de tir associée à la commande
     * 
     * @param {PIXI.Application} app 
     */
    displayCase(app) {
        this.caseTir.draw(app);
    }

    /**
     * Exécution de la commande
     */
    execute() {
        // Etape 0 : consomme l'action de déplacement du personnage
        this.perso.peutTirer = false;

        // Etape 1 : le tireur se tourne ves sa victime
        this.perso.setDirection(this.perso.coords.getAngle(this.cible.coords));

        // Etape 1 : effectuer l'action de tir
        this.perso.tirer();
        this.cible.encaisserTir(this.perso.puissanceFeu);
    }

}