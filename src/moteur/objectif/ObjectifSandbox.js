class ObjectifSandbox {

    constructor(perso) {
        this.perso = perso;
    }

    calculateAction() {
        let action = null;

        // Si le personnage ne peut pas marcher, on renvoie null
        if (!this.perso.peutMarcher) {
            return null;
        }

        this.perso.calculateSteps();
        if (this.perso.listeMarcheCommande.length > 0) {
            // On choisit une action au hasard
            action = this.perso.listeMarcheCommande[Math.round(Math.random() * (this.perso.listeMarcheCommande.length - 1))]
        }
        return action;
    }
}