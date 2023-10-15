class ObjectifSuivreCible {

    constructor(perso, cible) {
        this.perso = perso;
        this.cible = cible;
    }

    calculateAction() {
        let action = null;

        // Si le personnage ne peut pas marcher, on renvoie null
        if (!this.perso.peutMarcher) {
            return null;
        }

        this.perso.calculateSteps();
        if (this.perso.listeMarcheCommande.length > 0) {
            // On choisit l'action qui rapproche le plus de la cible
            let cible = this.cible;
            action = this.perso.listeMarcheCommande.reduce((prev, curr) => 
                prev.coords.getDistance(cible.coords) < curr.coords.getDistance(cible.coords) ? prev : curr);
        }
        return action;
    }
}