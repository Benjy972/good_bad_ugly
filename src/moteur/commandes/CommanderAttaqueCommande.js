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
        super(perso);
        this.cible = cible;
        this.commanditaire = commanditaire;
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
        let objectif = new ObjectifAttaquerJoueur(this.perso, this.cible);
        objectif.notifierCommanditaire(this.commanditaire);
        this.perso.ia.objectif = objectif;
    }

}