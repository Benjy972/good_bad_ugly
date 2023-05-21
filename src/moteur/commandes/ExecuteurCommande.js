class ExecuteurCommande {

    static listeCommande = [];

    static addCommande(commande) {
        this.listeCommande.push(commande);
    }

    static renvoiCommande() {
        let commande = this.listeCommande.pop();
        return commande.execute();
    }
}