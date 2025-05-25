import { Coordonnees } from '../util/Coordonnees.js';
import { ObjetGraphique } from '../../graphismes/objet/ObjetGraphique.js';

/**
 * Objets récupérables et utilisables par les joueurs
 */
export class Objet {

    static COFFRE = "coffre";
    static WAGON = "wagon";

    /**
     * 
     * @param {string} nom type d'objet (voir attributs statiques de la classe Objet)
     * @param {number} x position en x de l'objet
     * @param {number} y position en y de l'objet
     */
    constructor(nom, x, y) {
        this.nom = nom;
        this.coords = new Coordonnees(x,y);
        // Graphisme
        this.objetGraphique = new ObjetGraphique(this);
        this.actif = true;
    }
}