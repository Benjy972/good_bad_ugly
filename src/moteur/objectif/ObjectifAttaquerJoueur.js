class ObjectifAttaquerJoueur extends ObjectifSuivreCible {

    /**
     * 
     * @param {Personnage} perso le personnage qui effectue l'action
     * @param {Personnage} cible le personnage cible
     */
    constructor(perso, cible) {
        super(perso, cible);
        this.objectifAtteint = false;
    }

    calculateAction() {        
        // On vérifie si l'objectif est atteint
        if (!this.cible.estVivant) {
            this.objectifAtteint = true;
            return null;
        }

        // On efface la liste de commandes
        this.perso.removeCommands();
        // On vérifie si le personnage peut attaquer
        if (this.perso.peutTirer) {
            this.perso.evaluerTir();

            // On choisit l'attaque sur le personnage cible
            if (this.perso.listeCommands.length > 0) {
                let cible = this.cible;
                // Si la cible est à portée, on sélectionne l'action
                let action = this.perso.listeCommands.find((tirCommande) => tirCommande.cible.nom == cible.nom);
                if (!!action) {
                    return action;
                }
            }
        }

        return super.calculateAction();
    }
}