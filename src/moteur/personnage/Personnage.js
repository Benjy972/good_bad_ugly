/**
 * Classe Personnage
 */
class Personnage {

    /**
     * 
     * @param {string} nom nom du personnage
     * @param {number} x l'axe x de la coordonnée du personnage
     * @param {number} y l'axe y de la coordonnée du personnage
     * @param {boolean} estIA définit si le personnage est non joueur (true) ou joueur (false)
     */
    constructor(nom, x, y, estIA) {
        // Nom du personnage
        this.nom = nom;

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
        if (estIA) {
            this.ia = new BaseIA(this);
        } else {
            this.ia = null;
        }
    }

    /**
     * Définit la direction dans laquelle regarde le personnage (haut, bas, gauche ou droite)
     * 
     * @param {number} angle l'angle du personnage en radians
     */
    setDirection(angle) {
        if (Math.abs(angle) <= Math.PI/4) {
            this.direction = "droite"
        } else if (Math.abs(angle + Math.PI/2) <= Math.PI/4) {
            this.direction = "haut"
        }  else if (Math.abs(angle - Math.PI) <= Math.PI/4) {
            this.direction = "gauche"
        } else if (Math.abs(angle - Math.PI/2) <= Math.PI/4) {
            this.direction = "bas"
        }
    }

    /**
     * Déplace le personnage
     * 
     * @param {number} dx déplacement selon l'axe x
     * @param {number} dy déplacement selon l'axe y
     */
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

    /**
     * Définit la liste de déplacements possibles 
     */
    calculateSteps() {
        for (let i=-this.nombrePas; i<=this.nombrePas; i++) {
            for (let j=-this.nombrePas+Math.abs(i); j<=this.nombrePas-Math.abs(i); j++) {
                let new_x = this.coords.x + 32*j;
                let new_y = this.coords.y + 32*i;
                // On vérifie qu'il n'y a ni obstacle ni joueur sur la case
                if (Moteur.terrain.canWalk(new_x, new_y) && !Moteur.listePerso.some(perso => perso.coords.equalsCoords(new_x, new_y))) {
                    let newCoords = new Coordonnees(new_x, new_y);
                    this.listeMarcheCommande.push(new MarcheCommande(this, newCoords));
                }
            }
        }
    }

    /**
     * Vide la liste des commandes de déplacement
     */
    removeMarcheCommands() {
        for(let commande of this.listeMarcheCommande) {
            commande.caseDeplacement.destroy();
        }
        this.listeMarcheCommande = [];
    }

    /**
     * Définit la liste des commandes de tir possibles
     */
    evaluerTir() {
        for (let perso of Moteur.listePerso) {
            if (perso != this && perso.coords.getDistance(this.coords) <= this.porteeTir*32) {
                // Ajouter action tir
                this.listeTirCommande.push(new TirCommande(this, perso));
            }
        }
    }

    /**
     * Déclencher l'action de tir
     */
    tirer() {
        // Animation
        this.personnageGraphique.animerTir();
        // Action
    }

    /**
     * Déclencher l'action d'encaisser un tir
     */
    encaisserTir() {
        // Action
        // Animation
        this.personnageGraphique.animerEncaisserTir();
    }

    /**
     * Vider la liste des commandes de tir
     */
    removeTirCommands() {
        for(let commande of this.listeTirCommande) {
            commande.caseTir.destroy();
        }
        this.listeTirCommande = [];
    }

    /**
     * Si le personnage est non joueur, définit l'action à effectuer
     */
    jouer() {
        if (this.ia != null) {
            this.ia.action();
        }
    }

}