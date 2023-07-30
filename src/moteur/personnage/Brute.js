/**
 * Classe Brute
 */
class Brute extends Personnage {

    /**
     * @inheritdoc
     */
    constructor(nom, x, y, estIA) {

        super(nom, x, y, estIA);

        // Statistiques
        this.puissanceFeu = 5;
        this.porteeTir = 3;
    }

}