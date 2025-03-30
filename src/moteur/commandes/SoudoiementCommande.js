import { Commande } from './Commande.js';
import { CommanderAttaqueCommande } from './CommanderAttaqueCommande.js';
import { CommanderRecuperationCommande } from './CommanderRecuperationCommande.js';
import { Moteur } from '../Moteur.js';

/**
 * Commande de soudoiement
 */
export class SoudoiementCommande extends Commande {

    /**
     * 
     * @param {Personnage} perso le personnage qui soudoie
     * @param {Personnage} cible le personnage à soudoyer
     */
    constructor(perso, cible) {
        super(perso);
        this.cible = cible;
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
        // Obligatoire
        let persoTruand = this.perso;

        // On scanne les actions pour tous les personnages à cibler
        for (let persoCible of Moteur.listePerso) {
            if (persoCible != this.perso && persoCible != this.cible && persoCible.estVivant) {
                // Ajouter action commande d'attaque
                this.perso.listeCommands.push(new CommanderAttaqueCommande(this.cible, persoCible, this.perso));
            }
        }

        for (let objet of Moteur.listeObjets) {
            if (objet.actif) {
                // Ajouter action commande de récupération d'objet
                this.perso.listeCommands.push(new CommanderRecuperationCommande(this.cible, this.perso, objet));
            }
        }

        Moteur.initialiserAffichageCommandes(this.perso);
    }

}