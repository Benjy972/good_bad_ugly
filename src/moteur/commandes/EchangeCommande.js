/**
 * Commande d'echange
 */
class EchangeCommande extends Commande {

    /**
     * 
     * @param {Personnage} perso le personnage qui fait l'échange
     * @param {Personnage} cible le personnage avec lequel faire l'échange
     * @param {Item} objet l'objet à échanger
     */
    constructor(perso, cible, objet) {
        super(perso, new CaseAction(cible.coords.x, cible.coords.y));
        this.cible = cible;
        this.objet = objet;
    }

    /**
     * Exécution de la commande
     */
    execute() {
        // Action spéciale
        let indexItem = this.perso.inventaire.indexOf(this.objet);

        this.perso.inventaire.splice(indexItem, 1);
        this.cible.inventaire.push(this.objet);
        ServiceInventaire.afficherInventaire();
    }

}