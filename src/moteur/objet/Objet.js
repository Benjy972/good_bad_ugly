/**
 * Objets récupérables et utilisables par les joueurs
 */
class Objet {

    static COFFRE = "coffre";

    /**
     * 
     * @param {string} nom type d'objet (voir attributs statiques de la classe Objet)
     * @param {numbre} x position en x de l'objet
     * @param {numbre} y position en y de l'objet
     */
    constructor(nom, x, y) {
        this.nom = nom;
        this.coords = new Coordonnees(x,y);
        // Graphisme
        this.objetGraphique = new ObjetGraphique(this);
    }
}