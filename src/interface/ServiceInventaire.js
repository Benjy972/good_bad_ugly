/**
 * Service d'affichage de l'inventaire
 */
class ServiceInventaire {
    
    static inventaireList = undefined;
    static perso = undefined;


    /**
     * Initialisation du service d'affichage de l'inventaire
     * 
     * @param {Personnage} perso le personnage pour lequel on affiche l'inventaire
     */
    static initService(perso) {
        this.inventaireList = document.getElementById("inventaire");
        this.perso = perso;
    }

    /**
     * Affichage de l'inventaire d'un personnage
     * 
     * @param {Personnage} perso le personnage dont on affiche l'inventaire
     */
    static afficherInventaire() {
        this.viderInventaire();
        for (let item of this.perso.inventaire) {
            let opt = document.createElement("option");
            opt.text = item.nom;
            opt.value = item;
            this.inventaireList.appendChild(opt);
        }
    }

    /**
     * Réinitialisation de l'affichage de l'inventaire d'un personnage
     */
    static viderInventaire() {
        for (let i=this.inventaireList.options.length-1; i>=0; i--) {
            this.inventaireList.remove(i);
        }
    }
}