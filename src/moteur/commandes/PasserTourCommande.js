class PasserTourCommande {

    constructor(perso) {
        this.perso = perso;
    }

    execute() {
        this.perso.removeMarcheCommands();
        this.perso.removeTirCommands();
        this.perso.peutMarcher = true;
        this.perso.peutTirer = true;
        Moteur.incrementerTour();
        ServiceNotification.pushMessage(`${this.perso.nom} passe son tour. C'est au tour de ${Moteur.getPersoCourant().nom} de jouer.`);
    }
}