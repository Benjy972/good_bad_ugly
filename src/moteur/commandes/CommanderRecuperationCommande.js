/**
 * Commande de commande d'attaque
 */
class CommanderRecuperationCommande extends Commande {

    /**
     * 
     * @param {Personnage} perso le personnage qui récupère l'objet
     * @param {Personnage} cible le personnage à qui le rapporter
     * @param {Objet} objet l'objet à récupérer
     */
    constructor(perso, cible, objet) {
        super(perso, new CaseAction(objet.coords.x, objet.coords.y));
        this.cible = cible;
        this.objet = objet;
    }

    /**
     * Exécution de la commande
     */
    execute() {
        this.perso.ia.objectif = new ObjectifRapporterObjet(this.perso, this.cible, this.objet);
    }

}