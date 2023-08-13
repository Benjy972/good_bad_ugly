/**
 * Items uniquement présents dans l'inventaire
 */
class Item {

    static ARGENT = "argent";

    /**
     * 
     * @param {string} nom type d'item (voir attributs statiques de la classe Item)
     */
    constructor(nom) {
        this.nom = nom;
    }
}