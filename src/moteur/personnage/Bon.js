/**
 * Classe Bon
 */
class Bon extends Personnage {

    /**
     * @param {string} nom nom du personnage
     * @param {number} x l'axe x de la coordonnée du personnage
     * @param {number} y l'axe y de la coordonnée du personnage
     * @param {boolean} estIA définit si le personnage est non joueur (true) ou joueur (false)
     */
    constructor(nom, x, y, estIA) {

        super(nom, x, y, estIA);

        // Statistiques
        this.porteeTir = 5;
        this.puissanceFeu = 3;
        this.porteeActionSpeciale = 2;
    }

    /**
     * Vérifie si l'action spéciale est possible.
     */
    actionSpecialePossible() {
        return cooldownActionSpeciale == 0;
    }

    /**
     * Définit la liste des commandes d'action spéciale possibles
     */
     evaluerActionSpeciale() {
        for (let perso of Moteur.listePerso) {
            if (perso != this && perso.estVivant
                && perso.coords.getDistance(this.coords) <= this.porteeActionSpeciale*Terrain.TAILLE_CASE) {
                // Ajouter action tir
                this.listeCommands.push(new LancerLassoCommande(this, perso));
            }
        }
    }

}