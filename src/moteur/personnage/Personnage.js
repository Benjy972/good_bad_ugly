class Personnage {
    coords = undefined;

    constructor(x, y) {
        this.coords = new Coordonnees(x, y);
        this.personnageGraphique = new PersonnageGraphique(this);
    }

    move(dx, dy) {
        if (dx==0 && dy==0) {
            this.personnageGraphique.stop();
        } else if (dx>0) {
            this.personnageGraphique.animateDroite();
        } else if (dx<0) {
            this.personnageGraphique.animateGauche();
        } else if (dy>0) {
            this.personnageGraphique.animateBas();
        } else if (dy<0) {
            this.personnageGraphique.animateHaut();
        }
        this.coords.move(dx, dy);
        this.personnageGraphique.animatedSprite.x = this.coords.x;
        this.personnageGraphique.animatedSprite.y = this.coords.y;
    }

    /**rotate(dtheta) {
        this.angle += dtheta;
    }*/
}