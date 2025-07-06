import { Commande } from './Commande.js';
import { MecaniqueTirUtils } from '../util/MecaniqueTirUtils.js';
import { Moteur } from '../Moteur.js';

/**
 * Commande de tir
 */
export class TirCommande extends Commande {

    /**
     * 
     * @param {Personnage} perso le personnage qui tire
     * @param {Personnage} cible le personnage visé
     * @param {number} degat le nombre de dégâts infligés
     */
    constructor(perso, cible, degat) {
        super(perso);
        this.cible = cible;
        this.degat = degat;
    }

    /**
     * Méthode utilisée pour l'affichage des cases
     * 
     * 
     * @returns les coordonnées de la cible
     */
    getCoords() {
        return this.cible.coords;
    }

    /**
     * Exécution de la commande
     */
    execute() {
        // On vérifier si le joueur n'est pas assis
        super.verifierEtatJoueur();

        // Etape 0 : consomme l'action de tir du personnage
        this.perso.peutTirer = false;

        // Etape 1 : le tireur se tourne ves sa victime
        this.perso.setDirection(this.perso.coords.getAngle(this.cible.coords));

        // Etape 2 : on verifie si la cible est à couvert
        if (MecaniqueTirUtils.cibleACouvert(Moteur.terrain, this.perso, this.cible)) {
            this.degat = this.degat/2;
        }

        // Etape 1 : effectuer l'action de tir
        this.perso.tirer();
        this.cible.encaisserTir(this.degat);

        // Si la cible n'a pas de prime, le tireur en aura une
        if (!this.cible.estRecherche) {
            Moteur.mettrePrime(this.perso);
        }
    }

}