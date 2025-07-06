import { Moteur } from "../Moteur.js";
import { Objet } from "../objet/Objet.js";
import { Personnage } from "../personnage/Personnage.js";

/**
 * Commande standard
 */
export class Commande {

    /**
     * 
     * @param {Personnage} perso le personnage à l'origine de l'action
     */
    constructor(perso) {
        this.perso = perso;
    }

    verifierEtatJoueur() {
        if (this.perso.etat == Personnage.ASSIS) {
            const wagon = Moteur.listeObjets.filter(objet => objet.nom == Objet.WAGON)[0];
            wagon.action(this.perso);
        }
    }

}