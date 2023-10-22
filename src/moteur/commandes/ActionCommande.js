/**
 * Commande de tir
 */
class ActionCommande extends Commande {

    /**
     * 
     * @param {Personnage} perso le personnage qui tire
     * @param {Objet} cible l'objet visé
     */
    constructor(perso, cible) {
        super(perso, new CaseAction(cible.coords.x, cible.coords.y));
        this.cible = cible;
    }

    /**
     * Exécution de la commande
     */
    execute() {
        this.cible.action(this.perso);
        this.perso.removeActionCommands();
    }

}