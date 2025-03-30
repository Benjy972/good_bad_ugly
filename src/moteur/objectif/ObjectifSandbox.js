export class ObjectifSandbox {

    constructor(perso) {
        this.perso = perso;
    }

    calculateAction() {
        let action = null;

        // Si le personnage ne peut pas marcher, on renvoie null
        if (!this.perso.peutMarcher) {
            return null;
        }

        // On recalcule la liste de pas possibles
        this.perso.removeCommands();
        this.perso.calculateSteps();
        if (this.perso.listeCommands.length > 0) {
            // On choisit une action au hasard
            action = this.perso.listeCommands[Math.round(Math.random() * (this.perso.listeCommands.length - 1))];
        }
        return action;
    }
}