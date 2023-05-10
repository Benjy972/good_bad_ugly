class Moteur {

    constructor() {
        this.terrain = new Terrain();
        // À définir
        this.listePerso = [];
        this.indexPerso = 0;
        this.executeurCommande = new ExecuteurCommande();
        this.commande = null;

        // Moteur graphique
        this.moteurGraphique = new MoteurGraphique(this);
    }

    setListePerso(...listePerso) {
        this.listePerso = listePerso;
    }

    getPersoCourant() {
        return this.listePerso[this.indexPerso];
    }

    evaluerDeplacements() {
        // Obligé de passer par une variable à cause de la fonction anonyme
        let persoCourant = this.getPersoCourant();
        let execCommande = this.executeurCommande;

        if (persoCourant.listeMarcheCommande.length == 0) {
            persoCourant.calculateSteps();
        }
        for (let marcheCommande of persoCourant.listeMarcheCommande) {
            marcheCommande.displayCase(app);
            marcheCommande.caseDeplacement.caseSol.on('mousedown', function() {
                execCommande.addCommande(marcheCommande);
                persoCourant.removeMarcheCommands();
            });
        }
        // On efface la liste de cases de tir si on veut se déplacer
        persoCourant.removeTirCommands();
    }

    evaluerTir() {
        // Obligé de passer par une variable à cause de la fonction anonyme
        let persoCourant = this.getPersoCourant();
        let execCommande = this.executeurCommande;

        if (persoCourant.listeTirCommande.length == 0) {
            persoCourant.evaluerTir();
        }
        for (let tirCommande of persoCourant.listeTirCommande) {
            tirCommande.displayCase(app);
            tirCommande.caseTir.caseSol.on('mousedown', function() {
                execCommande.addCommande(tirCommande);
                persoCourant.removeTirCommands();
            });
        }
        // On efface la liste de cases de tir si on veut marcher
        persoCourant.removeMarcheCommands();
        // On vérifie que le personnage a bien une cible à viser
        return persoCourant.listeTirCommande.length > 0;
    }

    passerTour() {
        this.executeurCommande.addCommande(new PasserTourCommande(this.getPersoCourant(), this));
    }

    executerCommande() {
        // On vérifie que l'exécuteur de commande et est bien initialisé, sinon on renvoie null
        if (this.commande == null) {
            if (this.executeurCommande.listeCommande.length > 0) {
                this.commande = this.executeurCommande.renvoiCommande();
            }
        } else {
            this.commande = this.commande.execute();
        }
    }
}