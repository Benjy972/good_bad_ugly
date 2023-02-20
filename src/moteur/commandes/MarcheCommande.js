class MarcheCommande {

    constructor(perso, coords) {
        this.perso = perso;
        this.coords = coords;
    }

    execute() {
        if (this.perso.coords.equals(this.coords)) {
            this.perso.move(0, 0);
            return null;
        } else if (this.perso.coords.y == this.coords.y) {
            this.perso.move(2*Math.sign(this.coords.x - this.perso.coords.x), 0);
        } else {
            this.perso.move(0, 2*Math.sign(this.coords.y - this.perso.coords.y));
        }
        return this;
    }
}