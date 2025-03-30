import { Personnage } from './Personnage.js';
import { SnipeCommande } from '../commandes/SnipeCommande.js';
import { Moteur } from '../Moteur.js';

/**
 * Classe Brute
 */
export class Brute extends Personnage {

    /**
     * @inheritdoc
     */
    constructor(nom, x, y, estIA) {

        super(nom, x, y, estIA);

        // Statistiques
        this.puissanceFeu = 5;
        this.porteeTir = 3;
        this.puissanceSniper = 7;
    }

    /**
     * Vérifie si l'action spéciale est possible.
     */
     actionSpecialePossible() {
        return this.cooldownActionSpeciale == 0;
    }

    /**
     * Définit la liste des commandes d'action spéciale possibles
     */
     evaluerActionSpeciale() {
        for (let perso of Moteur.listePerso) {
            if (perso != this && perso.estVivant
                && (perso.coords.x == this.coords.x ||  perso.coords.y == this.coords.y)) {
                // Ajouter action tir
                this.listeCommands.push(new SnipeCommande(this, perso, this.puissanceSniper));
            }
        }
    }

}