import { Commande } from './Commande.js';
import { ServiceInventaire } from '../../interface/ServiceInventaire.js';

/**
 * Commande d'echange
 */
export class EchangeCommande extends Commande {

    /**
     * 
     * @param {Personnage} perso le personnage qui fait l'échange
     * @param {Personnage} cible le personnage avec lequel faire l'échange
     * @param {Item} objet l'objet à échanger
     */
    constructor(perso, cible, objet) {
        super(perso);
        this.cible = cible;
        this.objet = objet;
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
        
        // Action spéciale
        let indexItem = this.perso.inventaire.indexOf(this.objet);

        this.perso.inventaire.splice(indexItem, 1);
        this.cible.inventaire.push(this.objet);
        ServiceInventaire.afficherInventaire();
    }

}