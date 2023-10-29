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

        // Inventaire
        this.inventaire = [];

        // Compteurs
        this.cooldownTour = 0;
        this.cooldownActionSpeciale = 0;

        // Statistiques
        this.vie = 10;
        this.nombrePas = 4;
        this.porteeTir = 4;
        this.puissanceFeu = 4;

        // Commandes
        this.estVivant = true;
        this.peutMarcher = true;
        this.peutTirer = true;
        this.listeCommands = [];

        // IA
        if (estIA) {
            this.ia = new BaseIA(this);
        } else {
            this.ia = null;
        }

        // Graphique
        this.personnageGraphique = new PersonnageGraphique(this);
    }

    /**
     * Définit la direction dans laquelle regarde le personnage (haut, bas, gauche ou droite)
     * 
     * @param {number} angle l'angle du personnage en radians
     */
    setDirection(angle) {
        if (Math.abs(angle) <= Math.PI / 4) {
            this.direction = "droite"
        } else if (Math.abs(angle + Math.PI / 2) <= Math.PI / 4) {
            this.direction = "haut"
        } else if (Math.abs(angle - Math.PI) <= Math.PI / 4) {
            this.direction = "gauche"
        } else if (Math.abs(angle - Math.PI / 2) <= Math.PI / 4) {
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
        if (dx == 0 && dy == 0) {
            this.personnageGraphique.stop();
        } else {
            if (dx > 0) {
                this.direction = "droite";
            } else if (dx < 0) {
                this.direction = "gauche";
            } else if (dy > 0) {
                this.direction = "bas";
            } else if (dy < 0) {
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
        for (let i = -this.nombrePas; i <= this.nombrePas; i++) {
            for (let j = -this.nombrePas + Math.abs(i); j <= this.nombrePas - Math.abs(i); j++) {
                let new_x = this.coords.x + 32 * j;
                let new_y = this.coords.y + 32 * i;
                // On vérifie qu'il n'y a ni obstacle, ni joueur, ni objet sur la case
                if (Moteur.terrain.canWalk(new_x, new_y)
                    && !Moteur.listePerso.some(perso => perso.coords.equalsCoords(new_x, new_y))
                    && !Moteur.listeObjets.some(objet => objet.coords.equalsCoords(new_x, new_y))) {

                    let newCoords = new Coordonnees(new_x, new_y);
                    //this.listeMarcheCommande.push(new MarcheCommande(this, newCoords));
                    this.listeCommands.push(new MarcheCommande(this, newCoords));
                }
            }
        }
    }

    /**
     * Vide la liste de toutes les commandes
     */
    removeCommands() {
        for (let commande of this.listeCommands) {
            commande.destroyCase();
        }
        this.listeCommands = [];
    }

    /**
     * Définit la liste des commandes de tir possibles
     */
    evaluerTir() {
        for (let perso of Moteur.listePerso) {
            if (perso != this && perso.estVivant
                && perso.coords.getDistance(this.coords) <= this.porteeTir * 32) {
                // Ajouter action tir
                //this.listeTirCommande.push(new TirCommande(this, perso, this.puissanceFeu));
                this.listeCommands.push(new TirCommande(this, perso, this.puissanceFeu));
            }
        }
    }

    /**
     * Déclencher l'action de tir
     */
    tirer() {
        // Animation
        this.personnageGraphique.animerTir();
    }

    /**
     * Déclencher l'action d'encaisser un tir
     * 
     * @param nombreDegats {number} nombre de points de vie perdus
     */
    encaisserTir(nombreDegats) {
        // Action
        if (this.vie < nombreDegats) {
            this.vie = 0;
        } else {
            this.vie -= nombreDegats;
        }
        // Animation
        this.personnageGraphique.animerEncaisserTir();

        // Mort
        if (this.vie == 0) {
            this.mourir();
        }
    }

    /**
     * Déclencher l'action de se faire attraper par un lasso
     * 
     */
    encaisserLasso() {
        // Action
        this.cooldownTour = 1;

        // Animation
        this.personnageGraphique.etreEnchaine();
    }

    /**
     * Déclencher l'action de mourir
     */
    mourir() {
        // Action
        this.estVivant = false;

        // Animation
        this.personnageGraphique.mourir();

        // Si le personnage avait reçu un ordre, on libère l'ordre
        if (!!this.ia && !!this.ia.objectif.commanditaire) {
            this.ia.objectif.commanditaire.peutCommander = true;
        }
    }

    /**
     * Définit la liste des commandes dion'act possibles
     */
    evaluerAction() {
        for (let objet of Moteur.listeObjets) {
            if (objet.actif && objet.coords.getDistance(this.coords) <= 32) {
                // Ajouter action tir
                //this.listeActionCommande.push(new ActionCommande(this, objet));
                this.listeCommands.push(new ActionCommande(this, objet));
            }
        }
    }

    /**
     * Définit la liste des commandes d'echange possibles
     */
    evaluerEchange() {
        for (let perso of Moteur.listePerso) {
            if (perso != this && perso.estVivant
                && perso.coords.getDistance(this.coords) <= 32) {
                // Ajouter action tir
                //this.listeEchangeCommande.push(new EchangeCommande(this, perso, this.inventaire[0]));
                this.listeCommands.push(new EchangeCommande(this, perso, this.inventaire[0]));
            }
        }
    }

    /**
     * Si le personnage est non joueur, définit l'action à effectuer
     */
    jouer() {
        // Si un personnage ne peut temporairement pas jouer
        if (this.cooldownTour > 0) {
            ExecuteurCommande.addCommande(new PasserTourCommande(this));
            return;
        }
        if (!!this.ia) {
            this.ia.action();
        }
    }

}