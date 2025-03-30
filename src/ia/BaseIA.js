import { ObjectifSandbox } from '../moteur/objectif/ObjectifSandbox.js';
import { ExecuteurCommande } from '../moteur/commandes/ExecuteurCommande.js';
import { PasserTourCommande } from '../moteur/commandes/PasserTourCommande.js';

/**
 * IA de base (se déplacer et tirer à vue)
 */
export class BaseIA {

    /**
     * 
     * @param {Personnage} perso personnage auquel assigner l'IA
     */
    constructor(perso) {
        this.perso = perso;
        // Objectif par défaut
        this.objectif = new ObjectifSandbox(perso);
        this.actionEnCours = false;
    }

    /**
     * Méthode définit l'action à effectuer par l'IA
     */
    action() {
        // Si on est déjà en cours d'action, on arrête
        if (this.actionEnCours) {
            return;
        }
        // On définit les variables pour les fonctions anonymes
        let ia = this;

        // On évalue l'action du personnage
        let action = this.objectif.calculateAction();

        // On définit un temps d'attente aléatoire entre les commandes
        let wait = 300 + Math.round(400*Math.random());

        // Si une action est choisie on l'exécute
        if (action != null) {
            // Pour l'instant, on reste sur de l'aléatoire
            this.actionEnCours = true;
            setTimeout(() => {
                ExecuteurCommande.addCommande(action);
                ia.actionEnCours = false;
            }, wait);
        } else if (this.objectif.objectifAtteint) {
            // Si l'objectif est atteint, on passe en mode sandbox
            this.objectif = new ObjectifSandbox(this.perso);
        } else {
            // Si plus aucune action possible
            ExecuteurCommande.addCommande(new PasserTourCommande(this.perso));
        }
    }
}