/**
 * Commande d'echange
 */
class EchangeCommande {

    /**
     * 
     * @param {Personnage} perso le personnage qui fait l'échange
     * @param {Personnage} cible le personnage avec lequel faire l'échange
     * @param {Item} objet l'objet à échanger
     */
    constructor(perso, cible, objet) {
        this.perso = perso;
        this.cible = cible;
        this.objet = objet;
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
        // Action spéciale
        let indexItem = this.perso.inventaire.indexOf(this.objet);

        this.perso.inventaire.splice(indexItem, 1);
        this.cible.inventaire.push(this.objet);
        ServiceInventaire.afficherInventaire();
        this.perso.removeEchangeCommands();
    }

}