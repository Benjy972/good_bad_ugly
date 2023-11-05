class PersonnageMapper {
    
    static BON = "Bon";
    static BRUTE = "Brute";
    static TRUAND = "Truand";

    static mapPersonnages(listeJoueurs) {
        let listePersonnages = [];
        for (let joueur of listeJoueurs) {
            listePersonnages.push(this.createPersonnage(joueur));
        }
        return listePersonnages;
    }

    static createPersonnage(joueur) {
        if (joueur.role === this.BON) {
            return new Bon(joueur.name, joueur.position.x, joueur.position.y, false);
        } else if (joueur.role === this.BRUTE) {
            return new Brute(joueur.name, joueur.position.x, joueur.position.y, false);
        } else if (joueur.role === this.TRUAND) {
            return new Truand(joueur.name, joueur.position.x, joueur.position.y, false);
        } else {
            return new Personnage(joueur.name, joueur.position.x, joueur.position.y, true);
        }
    }
}