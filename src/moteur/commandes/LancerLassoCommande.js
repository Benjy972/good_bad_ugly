import { ActionSpecialeCommande } from "./ActionSpecialeCommande.js";
import { ServiceInventaire } from "../../interface/ServiceInventaire.js";

/**
 * Commande de lancer de lasso (action spéciale du Bon)
 */
export class LancerLassoCommande extends ActionSpecialeCommande {

    /**
     * 
     * @param {Bon} perso le bon qui lance le lasso
     * @param {Personnage} cible le personnage visé
     */
    constructor(perso, cible) {
        super(perso, cible);
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
        // Etape 1 : le tireur se tourne ves sa victime
        this.perso.setDirection(this.perso.coords.getAngle(this.cible.coords));

        // Etape 1 : effectuer l'action de lancer de lasso
        // Animation
        this.perso.personnageGraphique.animerTir();

        // Action spéciale
        this.perso.inventaire.push(...this.cible.inventaire);
        this.cible.inventaire = [];
        ServiceInventaire.afficherInventaire();
        this.perso.cooldownActionSpeciale += 2;

        this.cible.encaisserLasso();
    }

}