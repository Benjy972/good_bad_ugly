import {Terrain} from './terrain/Terrain.js';
import { ObjectifSandbox } from './objectif/ObjectifSandbox.js';
import { ObjectifAttaquerJoueur } from './objectif/ObjectifAttaquerJoueur.js';
import { PasserTourCommande } from './commandes/PasserTourCommande.js';
import { AffichageCommande } from '../graphismes/interface/AffichageCommande.js';
import { MoteurGraphique } from '../graphismes/MoteurGraphique.js';
import { ExecuteurCommande } from './commandes/ExecuteurCommande.js';
import { Personnage } from './personnage/Personnage.js';

/**
 * Classe moteur : gère les actions des personnages
 */
export class Moteur {

    static terrain = new Terrain();
    // À définir
    static listePerso = [];
    static listeObjets = [];
    static indexPerso = 0;
    static commande = null;

    /**
     * Ajoute les personnages participant au jeu
     * 
     * @param  {...Personnage} listePerso la liste de personnage
     */
    static setListePerso(...listePerso) {
        this.listePerso = listePerso;
    }

    /**
     * Ajoute les objets dans le jeu
     * 
     * @param  {...Objet} listeObjets la liste d'objets
     */
    static setListeObjets(...listeObjets) {
        this.listeObjets = listeObjets;
    }

    /**
     * 
     * @returns le personnage en train de jouer
     */
    static getPersoCourant() {
        return this.listePerso[this.indexPerso];
    }

    /**
     * Méthode d'affichage de la liste des commandes à afficher
     * 
     * @param {Personnage} persoCourant 
     */
    static initialiserAffichageCommandes(persoCourant) {
        for (let commande of persoCourant.listeCommands) {
            AffichageCommande.generateCase(commande, function () {
                ExecuteurCommande.addCommande(commande);
                persoCourant.removeCommands();
                AffichageCommande.destroyAllCommands();
            });
        }
        AffichageCommande.displayAllCommands(MoteurGraphique.APP);
    }

    /**
     * Définit la liste de déplacements possibles du personnage en train de jouer
     */
    static evaluerDeplacements() {
        // Obligé de passer par une variable à cause de la fonction anonyme
        let persoCourant = this.getPersoCourant();

        // On efface la liste de cases de toutes les actions
        persoCourant.removeCommands();
        AffichageCommande.destroyAllCommands();
        // On recalcule les déplacements
        persoCourant.calculateSteps();

        this.initialiserAffichageCommandes(persoCourant, MoteurGraphique.APP);
    }

    /**
     * Définit la liste de tirs possibles pour le joueur en train de jouer
     * @returns true si une cible est à portée du joueur, false sinon 
     */
    static evaluerTir() {
        // Obligé de passer par une variable à cause de la fonction anonyme
        let persoCourant = this.getPersoCourant();

        // On efface la liste de cases de toutes les actions
        persoCourant.removeCommands();
        AffichageCommande.destroyAllCommands();
        // On recalcule les tirs
        persoCourant.evaluerTir();

        this.initialiserAffichageCommandes(persoCourant);

        // On vérifie que le personnage a bien une cible à viser
        return persoCourant.listeCommands.length > 0;
    }

    /**
     * Définit la liste de actions sur des objets possibles pour le joueur en train de jouer
     * @returns true si un objet est à portée du joueur, false sinon 
     */
     static evaluerAction() {
        // Obligé de passer par une variable à cause de la fonction anonyme
        let persoCourant = this.getPersoCourant();

        // On efface la liste de cases de toutes les actions
        persoCourant.removeCommands();
        AffichageCommande.destroyAllCommands();
        // On recalcule les actions
        persoCourant.evaluerAction();

        this.initialiserAffichageCommandes(persoCourant);

        // On vérifie que le personnage a bien une cible à viser
        return persoCourant.listeCommands.length > 0;
    }

    /**
     * Définit la liste de échanges possibles pour le joueur en train de jouer
     * @returns true si un personnage est à portée du joueur, false sinon 
     */
    static evaluerEchange() {
        // Obligé de passer par une variable à cause de la fonction anonyme
        let persoCourant = this.getPersoCourant();
        // On efface la liste de cases de toutes les actions
        persoCourant.removeCommands();
        AffichageCommande.destroyAllCommands();

        // On recalcule les échanges
        persoCourant.evaluerEchange();

        this.initialiserAffichageCommandes(persoCourant);

        // On vérifie que le personnage a bien une cible à viser
        return persoCourant.listeCommands.length > 0;
    }

    /**
     * Définit la liste d'action spéciale pour le joueur en train de jouer
     * @returns true si une cible est à portée du joueur, false sinon 
     */
     static evaluerActionSpeciale() {
        // Obligé de passer par une variable à cause de la fonction anonyme
        let persoCourant = this.getPersoCourant();

        // On efface la liste de cases de toutes les actions
        persoCourant.removeCommands();
        AffichageCommande.destroyAllCommands();

        // On recalcule les actions spéciales
        persoCourant.evaluerActionSpeciale();

        this.initialiserAffichageCommandes(persoCourant);

        // On vérifie que le personnage a bien une cible à viser
        return persoCourant.listeCommands.length > 0;
    }

    /**
     * Mettre une prime sur la tête d'un personnage
     * 
     * @param {Personnage} perso le personnage recherché
     */
    static mettrePrime(perso) {
        // Le perosnnage est recherché
        perso.estRecherche = true;

        // Les autres personnages le recherchent
        for (let autrePerso of this.listePerso) {
            if (autrePerso.nom !== perso.nom && !!autrePerso.ia
                && autrePerso.ia.objectif instanceof ObjectifSandbox) {
                    autrePerso.ia.objectif = new ObjectifAttaquerJoueur(autrePerso, perso);
            }
        }

    }

    /**
     * Passer au joueur suivant
     */
    static passerTour() {
        // On efface la liste de cases de toutes les actions
        this.getPersoCourant().removeCommands();
        // On passe le tour
        ExecuteurCommande.addCommande(new PasserTourCommande(this.getPersoCourant(), this));
    }

    /**
     * Méthode appelée pour passer au joueur suivant
     */
    static incrementerTour() {
        this.indexPerso = (this.indexPerso + 1) % this.listePerso.length;
        if (Moteur.getPersoCourant().etat == Personnage.MORT) {
            Moteur.incrementerTour();
        }
    }

    /**
     * Exécuter la commande en cours. Si aucune commande n'est en cours, demande au personnage en train de jouer d'effectuer une action.
     */
    static executerCommande() {
        // On vérifie que l'exécuteur de commande et est bien initialisé, sinon on renvoie null
        if (this.commande == null) {
            if (ExecuteurCommande.listeCommande.length > 0) {
                this.commande = ExecuteurCommande.renvoiCommande();
            } else {
                // On va demander au joueur en cours de jouer
                this.getPersoCourant().jouer();
            }
        } else {
            this.commande = this.commande.execute();
        }
    }
}