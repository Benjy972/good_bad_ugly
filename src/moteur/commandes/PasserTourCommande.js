class PasserTourCommande {

    constructor(perso, moteur) {
        this.perso = perso;
        this.moteur = moteur;
    }

    execute() {
        this.perso.removeMarcheCommands();
        this.perso.removeTirCommands();
        this.perso.peutMarcher = true;
        this.perso.peutTirer = true;
        this.moteur.indexPerso = (this.moteur.indexPerso + 1) % this.moteur.listePerso.length;
        ServiceNotification.pushMessage(`${this.perso.nom} passe son tour. C'est au tour de ${this.moteur.getPersoCourant().nom} de jouer.`)
    }
}