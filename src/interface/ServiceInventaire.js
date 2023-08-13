/**
 * Service d'affichage de l'inventaire
 */
class ServiceInventaire {
    
    static inventaireList = undefined;

    /**
     * Initialisation du service de notification
     */
    static initService() {
        this.inventaireList = document.getElementById("inventaire");
    }

    /**
     * Affichage de l'inventaire d'un personnage
     * 
     * @param {Personnage} perso le personnage dont on affiche l'inventaire
     */
    static afficherInventaire(perso) {
        this.viderInventaire(perso);
        for (let item of perso.inventaire) {
            let opt = document.createElement("option");
            opt.text = item.nom;
            opt.value = item;
            this.inventaireList.appendChild(opt);
        }
    }

    /**
     * Réinitialisation de l'affichage de l'inventaire d'un personnage
     * 
     * @param {Personnage} perso le personnage dont on affiche l'inventaire
     */
    static viderInventaire(perso) {
        for (let i=this.inventaireList.options.length-1; i>=0; i--) {
            this.inventaireList.remove(i);
        }
    }
}