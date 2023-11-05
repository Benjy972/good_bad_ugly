module.exports.Joueur = class Joueur {

    constructor(nom, role, position) {
        this.name = nom;
        this.role = role;
        this.position = position;
        this.bufferCommandes = [];
    }

}