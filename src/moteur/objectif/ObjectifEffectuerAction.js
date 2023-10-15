class ObjectifEffectuerAction extends ObjectifSuivreCible {

    /**
     * 
     * @param {Personnage} perso le personnage qui effectue l'action
     * @param {Objet} cible l'objet à utiliser
     */
    constructor(perso, cible) {
        super(perso, cible);
        this.objectifAtteint = false;
    }

    calculateAction() {
        // On vérifie si l'objectif est atteint
        if (!this.cible.actif) {
            this.objectifAtteint = true;
            return null;
        }

        // On vérifie si le personnage peut attaquer
        this.perso.evaluerAction();

        // On choisit l'attaque sur le personnage cible
        if (this.perso.listeActionCommande.length > 0) {
            let cible = this.cible;
            // Si la cible est à portée, on sélectionne l'action
            let action = this.perso.listeActionCommande.find((actionCommande) => actionCommande.cible.coords.equals(cible.coords));
            if (!!action) {
                return action;
            }
        }

        return super.calculateAction();
    }
}