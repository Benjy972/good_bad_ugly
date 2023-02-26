class Personnage {
    constructor(x, y) {
        this.coords = new Coordonnees(x, y);
        this.personnageGraphique = new PersonnageGraphique(this);
        this.nombrePas = 4;
        this.listeMarcheCommande = [];
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

    calculateSteps(terrain) {
        for (let i=-this.nombrePas; i<=this.nombrePas; i++) {
            for (let j=-this.nombrePas+Math.abs(i); j<=this.nombrePas-Math.abs(i); j++) {
                let new_x = this.coords.x + 32*j;
                let new_y = this.coords.y + 32*i;
                let newCoords = new Coordonnees(new_x, new_y);
                // TODO : créer une fonction qui détecte la présence d'un joueur sur la map
                if (terrain.canWalk(new_x, new_y) && !newCoords.equals(this.coords)) {
                    this.listeMarcheCommande.push(new MarcheCommande(this, newCoords));
                }
            }
        }
        console.log(`Done`);
    }

    removeMarcheCommands() {
        for(let commande of this.listeMarcheCommande) {
            commande.caseDeplacement.destroy();
        }
        this.listeMarcheCommande = [];

    }
}