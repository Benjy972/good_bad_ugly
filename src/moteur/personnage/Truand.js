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

    /**
     * Définit la liste des commandes d'action spéciale possibles
     */
    evaluerActionSpeciale() {
        for (let perso of Moteur.listePerso) {
            if (perso != this && perso.estVivant
                && perso.coords.getDistance(this.coords) <= 32) {
                // Ajouter action soudoiement
                this.listeCommands.push(new SoudoiementCommande(this, perso));
            }
        }
    }

}