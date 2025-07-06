import { Personnage } from '../personnage/Personnage.js';
import { Objet } from './Objet.js';

/**
 * Coffre : ouvrable par le joueur
 */
export class Wagon extends Objet {

    static OUVERT = "_ouvert";

    positionPerso = null;

    /**
     * 
     * @param {number} x position en x de l'objet
     * @param {number} y position en y de l'objet
     */
    constructor(x, y) {
        super(Objet.WAGON, x, y);
    }

    /**
     * Entre dans le wagon
     * 
     * @param {Personnage} perso le personnage qui entre dans le wagon
     */
    action(perso) {
        // TODO
        if (this.positionPerso == null) {
            this.positionPerso = perso.coords.getCopy();
            perso.move(this.coords.x - perso.coords.x, this.coords.y - perso.coords.y);
            perso.move(0, 0);
            perso.personnageGraphique.monterWagon();
            perso.canMove = false;
            // Etat assis
            perso.etat = Personnage.ASSIS;
        } else {
            perso.move(this.positionPerso.x - perso.coords.x, this.positionPerso.y - perso.coords.y);
            perso.move(0, 0);
            perso.canMove = true;
            this.positionPerso = null;
            // Etat assis
            perso.etat = Personnage.ATTENTE;
        }
    }
}