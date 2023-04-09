class Personnage {
    constructor(x, y) {
        // Position
        this.coords = new Coordonnees(x, y);
        this.direction = "bas";

        this.personnageGraphique = new PersonnageGraphique(this);
        this.nombrePas = 4;
        this.peutMarcher = true;
        this.listeMarcheCommande = [];
        this.porteeTir = 4;
        this.peutTirer = true;
        this.listeTirCommande = [];
    }

    move(dx, dy) {
        if (dx==0 && dy==0) {
            this.personnageGraphique.stop();
        } else {
            if (dx>0) {
                this.direction = "droite";
            } else if (dx<0) {
                this.direction = "gauche";
            } else if (dy>0) {
                this.direction = "bas";
            } else if (dy<0) {
                this.direction = "haut";
            }
            this.personnageGraphique.animerMarche();
        }
        this.coords.move(dx, dy);
        this.personnageGraphique.animatedSprite.x = this.coords.x;
        this.personnageGraphique.animatedSprite.y = this.coords.y;
    }

    calculateSteps(terrain, listePerso) {
        for (let i=-this.nombrePas; i<=this.nombrePas; i++) {
            for (let j=-this.nombrePas+Math.abs(i); j<=this.nombrePas-Math.abs(i); j++) {
                let new_x = this.coords.x + 32*j;
                let new_y = this.coords.y + 32*i;
                // On vérifie qu'il n'y a ni obstacle ni joueur sur la case
                if (terrain.canWalk(new_x, new_y) && !listePerso.some(perso => perso.coords.equalsCoords(new_x, new_y))) {
                    let newCoords = new Coordonnees(new_x, new_y);
                    this.listeMarcheCommande.push(new MarcheCommande(this, terrain, listePerso, newCoords));
                }
            }
        }
    }

    removeMarcheCommands() {
        for(let commande of this.listeMarcheCommande) {
            commande.caseDeplacement.destroy();
        }
        this.listeMarcheCommande = [];
    }

    evaluerTir(listePerso) {
        for (let perso of listePerso) {
            if (perso != this && perso.coords.getDistance(this.coords) <= this.porteeTir*32) {
                // Ajouter action tir
                this.listeTirCommande.push(new TirCommande(this, perso));
            }
        }
        return this.listeTirCommande.length > 0;
    }

    tirer() {
        // Animation
        this.personnageGraphique.animerTir();
        // Action
    }

    encaisserTir() {
        // Action
        // Animation
        this.personnageGraphique.animerEncaisserTir();
    }

    removeTirCommands() {
        for(let commande of this.listeTirCommande) {
            commande.caseTir.destroy();
        }
        this.listeTirCommande = [];
    }

}