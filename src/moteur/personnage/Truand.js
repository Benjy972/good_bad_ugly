/**
 * Classe Truand
 */
class Truand extends Personnage {

    /**
     * @inheritdoc
     */
    constructor(nom, x, y, estIA) {

        super(nom, x, y, estIA);

        // Statistiques
        this.vie = 7;
        this.nombrePas = 5;
    }

}