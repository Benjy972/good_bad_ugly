class ExecuteurCommande {

    constructor() {
        this.listeCommande = [];
    }

    addCommande(commande) {
        this.listeCommande.push(commande);
    }

    renvoiCommande() {
        let commande = this.listeCommande.pop();
        return commande.execute();
    }
}