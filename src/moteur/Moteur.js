/**
 * Classe moteur : gère les actions des personnages
 */
class Moteur {

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
     * Définit la liste de déplacements possibles du personnage en train de jouer
     */
    static evaluerDeplacements() {
        // Obligé de passer par une variable à cause de la fonction anonyme
        let persoCourant = this.getPersoCourant();

        if (persoCourant.listeMarcheCommande.length == 0) {
            persoCourant.calculateSteps();
        }
        for (let marcheCommande of persoCourant.listeMarcheCommande) {
            marcheCommande.displayCase(app);
            marcheCommande.caseDeplacement.caseSol.on('mousedown', function () {
                ExecuteurCommande.addCommande(marcheCommande);
                persoCourant.removeMarcheCommands();
            });
        }
        // On efface la liste de cases de tir si on veut se déplacer
        persoCourant.removeTirCommands();
    }

    /**
     * Définit la liste de tirs possibles pour le joueur en train de jouer
     * 
     * @returns true si une cible est à portée du joueur, false sinon 
     */
    static evaluerTir() {
        // Obligé de passer par une variable à cause de la fonction anonyme
        let persoCourant = this.getPersoCourant();

        if (persoCourant.listeTirCommande.length == 0) {
            persoCourant.evaluerTir();
        }
        for (let tirCommande of persoCourant.listeTirCommande) {
            tirCommande.displayCase(app);
            tirCommande.caseTir.caseSol.on('mousedown', function () {
                ExecuteurCommande.addCommande(tirCommande);
                persoCourant.removeTirCommands();
            });
        }
        // On efface la liste de cases de tir si on veut marcher
        persoCourant.removeMarcheCommands();
        // On vérifie que le personnage a bien une cible à viser
        return persoCourant.listeTirCommande.length > 0;
    }

    /**
     * Passer au joueur suivant
     */
    static passerTour() {
        ExecuteurCommande.addCommande(new PasserTourCommande(this.getPersoCourant(), this));
    }

    /**
     * Méthode appelée pour passer au joueur suivant
     */
    static incrementerTour() {
        this.indexPerso = (this.indexPerso + 1) % this.listePerso.length;
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