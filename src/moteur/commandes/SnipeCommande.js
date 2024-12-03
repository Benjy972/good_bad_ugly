/**
 * Commande de snipe
 */
class SnipeCommande extends ActionSpecialeCommande {

    /**
     * 
     * @param {Personnage} perso le personnage qui tire
     * @param {Personnage} cible le personnage visé
     * @param {number} degat le nombre de dégâts infligés
     */
    constructor(perso, cible, degat) {
        super(perso, cible);
        this.degat = degat;
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
        // Etape 1 : le tireur se tourne ves sa victime
        this.perso.setDirection(this.perso.coords.getAngle(this.cible.coords));

        // Etape 1 : effectuer l'action de tir
        this.perso.tirer();
        this.cible.encaisserTir(this.degat);

        // Etape 2 : cooldown
        this.perso.cooldownActionSpeciale += 3;
    }

}