module.exports.Joueur = class Joueur {

    constructor(nom, role, position) {
        this.name = nom;
        this.role = role;
        this.positionInitiale = position;
        this.bufferCommandes = [];
    }

}