import { Commande } from './Commande.js';
import { ObjectifRapporterObjet } from '../objectif/ObjectifRapporterObjet.js';

/**
 * Commande de commande d'attaque
 */
export class CommanderRecuperationCommande extends Commande {

    /**
     * 
     * @param {Personnage} perso le personnage qui récupère l'objet
     * @param {Personnage} cible le personnage à qui le rapporter
     * @param {Objet} objet l'objet à récupérer
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
        return this.objet.coords;
    }

    /**
     * Exécution de la commande
     */
    execute() {
        let objectif = new ObjectifRapporterObjet(this.perso, this.cible, this.objet);
        objectif.notifierCommanditaire(this.cible);
        this.perso.ia.objectif = objectif;
    }

}