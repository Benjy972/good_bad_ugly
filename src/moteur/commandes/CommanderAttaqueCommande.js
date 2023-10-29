/**
 * Commande de commande d'attaque
 */
class CommanderAttaqueCommande extends Commande {

    /**
     * 
     * @param {Personnage} perso le personnage qui attaque
     * @param {Personnage} cible le personnage visé
     * @param {Personnage} commanditaire le personnage qui ordonne l'attaque
     */
    constructor(perso, cible, commanditaire) {
        super(perso, new CaseTir(cible.coords.x, cible.coords.y));
        this.cible = cible;
        this.commanditaire = commanditaire;
    }

    /**
     * Exécution de la commande
     */
    execute() {
        let objectif = new ObjectifAttaquerJoueur(this.perso, this.cible);
        objectif.notifierCommanditaire(this.commanditaire);
        this.perso.ia.objectif = objectif;
    }

}