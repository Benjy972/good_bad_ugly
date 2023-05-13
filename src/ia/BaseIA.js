class BaseIA {

    constructor(perso, execCommande) {
        this.perso = perso;
        this.execCommande = execCommande;
        this.actionEnCours = false;
    }

    action() {
        // Si on est déjà en cours d'action, on arrête
        if (this.actionEnCours) {
            return;
        }
        // On définit les variables pour les fonctions anonymes
        let perso = this.perso;
        let execCommande = this.execCommande;
        let ia = this;

        // On évalue si le personnage peut tirer
        if (this.perso.peutTirer && this.perso.listeTirCommande.length == 0) {
            this.perso.evaluerTir();
        }
        // On évalue ensuite si le personnage peut se déplacer
        if (this.perso.peutMarcher && this.perso.listeMarcheCommande.length == 0) {
            this.perso.calculateSteps();
        }

        // On définit un temps d'attente aléatoire entre les commandes
        let wait = 300 + Math.round(400*Math.random());

        // Après avoir calculé tous les actions, on en choisit une
        if (this.perso.listeTirCommande.length > 0) {
            // Pour l'instant, on reste sur de l'aléatoire
            this.actionEnCours = true;
            setTimeout(() => {
                execCommande.addCommande(perso.listeTirCommande[Math.round(Math.random() * (perso.listeTirCommande.length - 1))]);
                perso.removeTirCommands();
                ia.actionEnCours = false;
            }, wait);
        } else if (this.perso.listeMarcheCommande.length > 0) {
            // Pour l'instant, on reste sur de l'aléatoire
            this.actionEnCours = true;
            setTimeout(() => {
                execCommande.addCommande(perso.listeMarcheCommande[Math.round(Math.random() * (perso.listeMarcheCommande.length - 1))]);
                perso.removeMarcheCommands();
                ia.actionEnCours = false;
            }, wait);
        } else {
            // Si plus aucune action possible
            this.execCommande.addCommande(new PasserTourCommande(this.perso, this.perso.moteur));
        }
    }
}