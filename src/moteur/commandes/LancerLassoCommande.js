/**
 * Commande de lancer de lasso (action spéciale du Bon)
 */
class LancerLassoCommande extends ActionSpecialeCommande {

    /**
     * 
     * @param {Bon} perso le bon qui lance le lasso
     * @param {Personnage} cible le personnage visé
     */
    constructor(perso, cible) {
        super(perso, cible);
    }

    /**
     * Exécution de la commande
     */
    execute() {
        // Etape 0 : consomme l'action de déplacement du personnage

        // Etape 1 : le tireur se tourne ves sa victime
        this.perso.setDirection(this.perso.coords.getAngle(this.cible.coords));

        // Etape 1 : effectuer l'action de lancer de lasso
        // Animation
        this.perso.personnageGraphique.animerTir();

        // Action spéciale
        this.perso.inventaire.push(...this.cible.inventaire);
        this.cible.inventaire = [];
        ServiceInventaire.afficherInventaire(this.perso);
        this.perso.cooldownActionSpeciale += 2;

        this.cible.encaisserLasso();
    }

}