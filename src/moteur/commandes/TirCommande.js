/**
 * Commande de tir
 */
class TirCommande extends Commande {

    /**
     * 
     * @param {Personnage} perso le personnage qui tire
     * @param {Personnage} cible le personnage visé
     * @param {number} degat le nombre de dégâts infligés
     */
    constructor(perso, cible, degat) {
        super(perso, new CaseTir(cible.coords.x, cible.coords.y));
        this.cible = cible;
        this.degat = degat;
    }

    /**
     * Exécution de la commande
     */
    execute() {
        // Etape 0 : consomme l'action de tir du personnage
        this.perso.peutTirer = false;
        this.perso.removeTirCommands();

        // Etape 1 : le tireur se tourne ves sa victime
        this.perso.setDirection(this.perso.coords.getAngle(this.cible.coords));

        // Etape 1 : effectuer l'action de tir
        this.perso.tirer();
        this.cible.encaisserTir(this.degat);
    }

}