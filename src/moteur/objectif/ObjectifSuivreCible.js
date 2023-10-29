class ObjectifSuivreCible {

    constructor(perso, cible) {
        this.perso = perso;
        this.cible = cible;
        this.objectifAtteint = false;
        this.commanditaire = undefined;
    }

    calculateAction() {
        let action = null;

        // Si le personnage ne peut pas marcher, on renvoie null
        if (!this.perso.peutMarcher) {
            return null;
        }

        // On efface la liste de commandes
        this.perso.removeCommands();
        this.perso.calculateSteps();
        if (this.perso.listeCommands.length > 0) {
            // On choisit l'action qui rapproche le plus de la cible
            let cible = this.cible;
            action = this.perso.listeCommands.reduce((prev, curr) => 
                prev.coords.getDistance(cible.coords) < curr.coords.getDistance(cible.coords) ? prev : curr);
        }
        return action;
    }

    /**
     * Définit le joueur auquel notifier lorsque l'objectif est atteint
     * 
     * @param {Personnage} commanditaire le joueur à notifier
     */
    notifierCommanditaire(commanditaire) {
        this.commanditaire = commanditaire;
    }
}