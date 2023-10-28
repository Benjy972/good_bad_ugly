/**
 * Commande d'action
 */
class ActionCommande extends Commande {

    /**
     * 
     * @param {Personnage} perso le personnage effectue l'action
     * @param {Objet} cible l'objet sur lequel l'action est effectuée
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
    }

}