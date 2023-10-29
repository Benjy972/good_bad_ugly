class ObjectifRapporterObjet extends ObjectifSuivreCible {

    /**
     * 
     * @param {Personnage} perso le personnage qui va chercher l'objet
     * @param {Personnage} cible le personnage à qui rapporter l'objet
     * @param {Objet} objet l'objet à rapporter
     */
    constructor(perso, cible, objet) {
        super(perso, cible);
        // Objectif de récupérer l'objet
        this.objectifObjet = new ObjectifEffectuerAction(perso, objet);
        this.objetRecupere = false;
    }

    calculateAction() {

        // Etape 1 : on verifie si l'objet a été récupéré
        if (!this.objetRecupere) {
            let recupererObjet = this.objectifObjet.calculateAction();
            if (!!recupererObjet) {
                // On doit récupérer l'objet
                return recupererObjet;
            } else if (this.objectifObjet.objectifAtteint) {
                // L'objet a été récupéré
                this.objetRecupere = true;
            } else {
                // On passe à autre chose
                return null;
            }
        }

        // On vérifie si l'objectif est atteint ou atteignable
        if (this.objectifAtteint || !this.cible.estVivant || this.perso.inventaire.length == 0) {
            this.objectifAtteint = true;
            // On notifie le commanditaire
            if (!!this.commanditaire) {
                this.commanditaire.peutCommander = true;
            }
            return null;
        }

        // On efface la liste de commandes
        this.perso.removeCommands();
        // On vérifie si le personnage peut rapporter 
        this.perso.evaluerEchange();

        // On choisit l'échange sur le personnage cible
        if (this.perso.listeCommands.length > 0) {
            let cible = this.cible;
            // Si la cible est à portée, on sélectionne l'action
            let action = this.perso.listeCommands.find((echangeCommande) => echangeCommande.cible.coords.equals(cible.coords));
            if (!!action) {
                this.objectifAtteint = true;
                return action;
            }
        }

        return super.calculateAction();
    }
}