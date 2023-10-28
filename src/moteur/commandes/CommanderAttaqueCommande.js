/**
 * Commande de commande d'attaque
 */
class CommanderAttaqueCommande extends Commande {

    /**
     * 
     * @param {Personnage} perso le personnage qui attaque
     * @param {Personnage} cible le personnage visé
     */
    constructor(perso, cible) {
        super(perso, new CaseTir(cible.coords.x, cible.coords.y));
        this.cible = cible;
    }

    /**
     * Exécution de la commande
     */
    execute() {
        this.perso.ia.objectif = new ObjectifAttaquerJoueur(this.perso, this.cible);
    }

}