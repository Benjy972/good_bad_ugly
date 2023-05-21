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
        return Math.atan2(coords.y-this.y, coords.x-this.x);
    }
}