/**
 * Commande de déplacement de personnage
 */
class MarcheCommande extends Commande {

    /**
     * 
     * @param {Personnage} perso le personnage à déplacer
     * @param {Coordonnees} coords les coordonnées cibles
     */
    constructor(perso, coords) {
        super(perso, new CaseDeplacement(coords.x, coords.y));
        this.coords = coords;

        // Calcul du chemin
        this.listeDeplacement = [];
        this.indexDeplacement = 0;
    }


    /**
     * Exécution de la commande
     * 
     * @returns le résultat de l'exécution de la commande (null si la commande est terminée)
     */
    execute() {
        // Etape 0 : consomme l'action de déplacement du personnage
        this.perso.peutMarcher = false;
        this.perso.removeMarcheCommands();

        // Etape 1 : on définit la route
        if (this.listeDeplacement.length == 0) {
            this.determinerChemin();
        }

        // Etape 2 : on suit une cas à la fois
        if (this.indexDeplacement == this.listeDeplacement.length) {
            this.perso.move(0, 0);
            return null;
        }
        let nextCoord = this.listeDeplacement[this.indexDeplacement];
        if (this.perso.coords.equals(nextCoord)) {
            this.indexDeplacement++;
        } else {
            let dx = 2 * Math.sign(nextCoord.x - this.perso.coords.x);
            let dy = 2 * Math.sign(nextCoord.y - this.perso.coords.y);
            this.perso.move(dx, dy);
        }
        return this;
    }

    /**
     * Méthode détermine le chemin à emprunter pour atteindre la cible
     */
    determinerChemin() {
        let positionPrecedente = null;
        let positionCourante = this.perso.coords;
        while (!positionCourante.equals(this.coords)) {
            let listePositions = [[positionCourante.x + 32, positionCourante.y],
            [positionCourante.x - 32, positionCourante.y],
            [positionCourante.x, positionCourante.y + 32],
            [positionCourante.x, positionCourante.y - 32]];
            // On recherche la position qui rapproche le plus de l'objectif
            let meilleurPosition = listePositions.filter(pos => Moteur.terrain.canWalk(pos[0], pos[1])
                && !Moteur.listePerso.some(perso => perso.coords.equalsCoords(pos[0], pos[1]))
                && !Moteur.listeObjets.some(objet => objet.coords.equalsCoords(pos[0], pos[1]))
                && (positionPrecedente == null || !positionPrecedente.equalsCoords(pos[0], pos[1]))
            ).sort((pos1, pos2) => this.coords.getDistanceCoords(pos1[0], pos1[1]) - this.coords.getDistanceCoords(pos2[0], pos2[1]))[0];
            // Une fois la position récupérée, on l'enregistre
            let newCoord = new Coordonnees(meilleurPosition[0], meilleurPosition[1]);
            this.listeDeplacement.push(newCoord);
            positionPrecedente = positionCourante.getCopy();
            positionCourante = newCoord;
        }
    }
}