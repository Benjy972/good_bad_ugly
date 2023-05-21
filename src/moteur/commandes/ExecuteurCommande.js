/**
 * Service d'exécution de commande
 */
class ExecuteurCommande {

    static listeCommande = [];

    /**
     * Ajout de commande dans la liste de commande
     * 
     * @param {*} commande 
     */
    static addCommande(commande) {
        this.listeCommande.push(commande);
    }

    /**
     * Exécute la dernière commande ajoutée à la liste de commandes
     * 
     * @returns le résultat de la commande exécutée
     */
    static renvoiCommande() {
        let commande = this.listeCommande.pop();
        return commande.execute();
    }
}