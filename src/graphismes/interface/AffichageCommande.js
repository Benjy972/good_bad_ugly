import { MarcheCommande } from "../../moteur/commandes/MarcheCommande.js";
import { CaseDeplacement } from "./CaseDeplacement.js";
import { TirCommande } from "../../moteur/commandes/TirCommande.js";
import { CommanderAttaqueCommande } from "../../moteur/commandes/CommanderAttaqueCommande.js";
import { CaseTir } from "./CaseTir.js";
import { ActionSpecialeCommande } from "../../moteur/commandes/ActionSpecialeCommande.js";
import { CaseActionSpeciale } from "./CaseActionSpeciale.js";
import { CaseAction } from "./CaseAction.js";

export class AffichageCommande {

    static listeCases = [];

    /**
     * Méthode renvoie une case pour une commande donnée
     * 
     * @param {Commande} commande 
     * @param {Function} _function l'action à effectuer lorsqu'on clique sur la case
     */
    static generateCase(commande, _function) {
        let typeCase = this.getTypeCase(commande);
        let coords = commande.getCoords();
        let _case = new typeCase(coords.x, coords.y);
        _case.caseSol.on('mousedown', _function);
        this.listeCases.push(_case);
    }

    /**
     * Méthode renvoie le type de case à afficher en fonction de la commande
     * 
     * @param {Commande} commande 
     * @returns le type de case
     */
    static getTypeCase(commande) {
        if (commande instanceof MarcheCommande) {
            return CaseDeplacement;
        }
        if (commande instanceof TirCommande || commande instanceof CommanderAttaqueCommande) {
            return CaseTir;
        }
        if (commande instanceof ActionSpecialeCommande) {
            return CaseActionSpeciale;
        }
        return CaseAction;
    }

    /**
     * Affichage de toutes les cases associées à la commande
     * 
     * @param {PIXI.Application} app 
     */
    static displayAllCommands(app) {
        for (let _case of this.listeCases) {
            _case.draw(app);
        }
    }

    static destroyAllCommands() {
        for (let _case of this.listeCases) {
            _case.destroy();
        }
        this.listeCases = [];

    }
}