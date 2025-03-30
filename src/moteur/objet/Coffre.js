import { Objet } from './Objet.js';
import { Moteur } from '../Moteur.js';
import { ServiceNotification } from '../../interface/ServiceNotification.js';
import { ServiceInventaire } from '../../interface/ServiceInventaire.js';
import { Item } from "./Item.js";

/**
 * Coffre : ouvrable par le joueur
 */
export class Coffre extends Objet {

    static OUVERT = "_ouvert";

    /**
     * 
     * @param {number} x position en x de l'objet
     * @param {number} y position en y de l'objet
     */
    constructor(x, y) {
        super(Objet.COFFRE, x, y);
    }

    /**
     * Ouvre le coffre
     * 
     * @param {Personnage} perso le personnage qui ouvre le coffre
     */
     action(perso) {
        ServiceNotification.pushMessage(`${perso.nom} ouvre le coffre.`);
        this.objetGraphique.changeState(Coffre.OUVERT);
        perso.inventaire.push(new Item(Item.ARGENT));
        this.actif = false;

        // On met à jour l'affichage de l'inventaire
        ServiceInventaire.afficherInventaire();

        // Action spéciale : le personnage a une prime sur sa tête
        Moteur.mettrePrime(perso);
    }
}