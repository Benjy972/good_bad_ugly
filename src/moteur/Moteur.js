class Moteur {

    static terrain = new Terrain();
    // À définir
    static listePerso = [];
    static indexPerso = 0;
    static commande = null;

    static setListePerso(...listePerso) {
        this.listePerso = listePerso;
    }

    static getPersoCourant() {
        return this.listePerso[this.indexPerso];
    }

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

    static passerTour() {
        ExecuteurCommande.addCommande(new PasserTourCommande(this.getPersoCourant(), this));
    }

    static incrementerTour() {
        this.indexPerso = (this.indexPerso + 1) % this.listePerso.length;
    }

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