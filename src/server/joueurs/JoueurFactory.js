const Joueur = require('./Joueur').Joueur;

module.exports.JoueurFactory = class JoueurFactory {

    static listeJoueurs = [];
    static listeRoles = ["Bon", "Brute", "Truand"];
    static listePositionsInitiales = [
        {x:176, y:176},
        {x:304, y:304},
        {x:304, y:176}
    ]

    static creerJoueur(nom) {
        if (!this.listeJoueursComplete()) {
            let role = undefined;
            if (this.listeRoles.length > 0) {
                role = this.listeRoles[Math.round((this.listeRoles.length-1)*Math.random())];
            }
            this.listeJoueurs.push(new Joueur(nom, role, this.listePositionsInitiales[this.listeJoueurs.length]));
        }
    }

    static listeJoueursComplete() {
        return this.listeJoueurs.length == this.listePositionsInitiales.length;
    }
}