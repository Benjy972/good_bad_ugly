/**
 * Coffre : ouvrable par le joueur
 */
class Coffre extends Objet {

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
        this.actif = false;
    }
}