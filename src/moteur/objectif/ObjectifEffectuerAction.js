import { ObjectifSuivreCible } from "./ObjectifSuivreCible.js";

export class ObjectifEffectuerAction extends ObjectifSuivreCible {

    /**
     * 
     * @param {Personnage} perso le personnage qui effectue l'action
     * @param {Objet} cible l'objet à utiliser
     */
    constructor(perso, cible) {
        super(perso, cible);
    }

    calculateAction() {
        // On vérifie si l'objectif est atteint
        if (!this.cible.actif) {
            this.objectifAtteint = true;
            return null;
        }

        // On efface la liste de commandes
        this.perso.removeCommands();
        // On vérifie si le personnage peut attaquer
        this.perso.evaluerAction();

        // On choisit l'attaque sur le personnage cible
        if (this.perso.listeCommands.length > 0) {
            let cible = this.cible;
            // Si la cible est à portée, on sélectionne l'action
            let action = this.perso.listeCommands.find((actionCommande) => actionCommande.cible.coords.equals(cible.coords));
            if (!!action) {
                return action;
            }
        }

        return super.calculateAction();
    }
}