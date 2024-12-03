/**
 * Classe de coordonnées
 */
class Coordonnees {

    /**
     * 
     * @param {number} x axe x de la coordonnée
     * @param {number} y axe y de la coordonnée
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * 
     * @returns une copie des coordonnées
     */
    getCopy() {
        return new Coordonnees(this.x, this.y);
    }

    /**
     * Déplace les coordonnées
     * 
     * @param {number} dx déplacement selon l'axe x
     * @param {number} dy déplacement selon l'axe y
     */
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    /**
     * Définit la distance par rapport à une coordonnée cible
     * 
     * @param {Coordonnees} coords la coordonnée cible
     * @returns la distance entre les deux coordonnées
     */
    getDistance(coords) {
        return Math.sqrt(Math.pow(coords.x - this.x, 2) + Math.pow(coords.y - this.y, 2));
    }

    /**
     * Définit la distance par rapport à une coordonnée cible
     * 
     * @param {number} px l'axe x de la coordonnée cible
     * @param {number} py l'axe y de la coordonnée cible
     * @returns la distance entre les deux coordonnées
     */
    getDistanceCoords(px, py) {
        return Math.sqrt(Math.pow(px - this.x, 2) + Math.pow(py - this.y, 2));
    }

    /**
     * Définit si deux coordonnées sont égales
     * 
     * @param {Coordonnees} coords 
     * @returns true si les coordonnées sont égales, false sinon
     */
    equals(coords) {
        return this.getDistance(coords) == 0;
    }

    /**
     * Définit si deux coordonnées sont égales
     * 
     * @param {number} px l'axe x de la coordonnée cible
     * @param {number} py l'axe y de la coordonnée cible
     * @returns true si les coordonnées sont égales, false sinon
     */
    equalsCoords(px, py) {
        return this.x == px && this.y == py;
    }

    /**
     * Définit l'angle par rapport à une coordonnée cible
     * 
     * @param {Coordonnees} coords la coordonnée cible
     * @returns l'angle entre les deux coordonnées en radians
     */
    getAngle(coords) {
        let angle = Math.atan2(coords.y-this.y, coords.x-this.x);
        if (angle < 0) {
            return 2*Math.PI + angle;
        }
        return Math.atan2(coords.y-this.y, coords.x-this.x);
    }

    /**
     * Définit si la case sur laquelle se situe la coordonnee est
     * traversee par une droite dont les deux points sont definis
     * 
     * @param {Coordonnees} coordDepart premier point de traversee de la droite
     * @param {Coordonnees} coordArrivee second point de traversee de la droite
     */
    caseEstTraverseeParDroite(coordDepart, coordArrivee) {
        let angleSommet1 = coordDepart.getAngle(new Coordonnees(Terrain.TAILLE_CASE*Math.floor(this.x/Terrain.TAILLE_CASE), Terrain.TAILLE_CASE*Math.floor(this.y/Terrain.TAILLE_CASE)));
        let angleSommet2 = coordDepart.getAngle(new Coordonnees(Terrain.TAILLE_CASE*(Math.floor(this.x/Terrain.TAILLE_CASE)+1), Terrain.TAILLE_CASE*Math.floor(this.y/Terrain.TAILLE_CASE)));
        let angleSommet3 = coordDepart.getAngle(new Coordonnees(Terrain.TAILLE_CASE*(Math.floor(this.x/Terrain.TAILLE_CASE)+1), Terrain.TAILLE_CASE*(Math.floor(this.y/Terrain.TAILLE_CASE)+1)));
        let angleSommet4 = coordDepart.getAngle(new Coordonnees(Terrain.TAILLE_CASE*Math.floor(this.x/Terrain.TAILLE_CASE), Terrain.TAILLE_CASE*(Math.floor(this.y/Terrain.TAILLE_CASE)+1)));

        return coordDepart.angleComprisEntreDeuxAngles(coordArrivee, angleSommet1, angleSommet3)
            || coordDepart.angleComprisEntreDeuxAngles(coordArrivee, angleSommet2, angleSommet4);
    }

    /**
     * Méthode définit si l'angle formé par la droite passant par la coordonnée cible et cette coordonnée (this)
     * est comprise entre deux angles défini
     * 
     * @param {Coordonnees} coordonneesCible 
     * @param {number} angle1 
     * @param {number} angle2 
     * @returns 
     */
    angleComprisEntreDeuxAngles(coordonneesCible, angle1, angle2) {
        let angle = this.getAngle(coordonneesCible);
        // Hypothèse de départ : la différence entre les angles ne doit pas être trop importante
        if (Math.abs(angle - angle1) > 0.25*Math.PI && Math.abs(angle - angle2) > 0.25*Math.PI) {
            return false;
        }
        return Math.cos(angle) >= Math.min(Math.cos(angle1), Math.cos(angle2)) && Math.cos(angle) <= Math.max(Math.cos(angle1), Math.cos(angle2))
            || Math.sin(angle) >= Math.min(Math.sin(angle1), Math.sin(angle2)) && Math.sin(angle) <= Math.max(Math.sin(angle1), Math.sin(angle2));
    }
}