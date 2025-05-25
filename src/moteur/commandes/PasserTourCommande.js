import { Moteur } from "../Moteur.js";
import { ServiceNotification } from "../../interface/ServiceNotification.js";
import { Objet } from "../objet/Objet.js";

/**
 * Commande pour passer son tour
 */
export class PasserTourCommande {

    /**
     * 
     * @param {Personnage} perso 
     */
    constructor(perso) {
        this.perso = perso;
    }

    /**
     * Exécution de la commande
     */
    execute() {
        // Si le personnage est dans le wagon, sort du wagon
        let wagon = Moteur.listeObjets.filter(objet => objet.nom == Objet.WAGON)[0];
        if (wagon.positionPerso != null) {
            wagon.action(this.perso);
        }
        
        this.perso.peutMarcher = true;
        this.perso.nombrePas = this.perso.nombrePasMax;
        this.perso.peutTirer = true;
        if (this.perso.cooldownActionSpeciale > 0) {
            this.perso.cooldownActionSpeciale--;
        }
        if (this.perso.cooldownTour > 0) {
            this.perso.cooldownTour--;
        }
        Moteur.incrementerTour();
        ServiceNotification.pushMessage(`${this.perso.nom} passe son tour. C'est au tour de ${Moteur.getPersoCourant().nom} de jouer.`);
    }
}