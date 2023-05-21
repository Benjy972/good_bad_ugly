/**
 * Case de déplacement sur la map.
 */
class CaseDeplacement {

    /**
     * 
     * @param {number} x axe x de la coordonnée de la case
     * @param {number} y axe y de la coordonnée de la case
     */
    constructor(x, y) {
        this.caseSol = PIXI.Sprite.from('resources/interface/sol_jouable.png');
        this.caseSol.x = x;
        this.caseSol.y = y;
        this.caseSol.anchor.set(0.5);
        this.caseSol.interactive = true;
    }

    /**
     * Méthode de dessin de la case sur la map
     * 
     * @param {PIXI.Application} app L'objet dans lequel ajouter l'élément graphique
     */
    draw(app) {
        app.stage.addChild(this.caseSol);
    }

    /**
     * Méthode efface la case de la map
     */
    destroy() {
        this.caseSol.destroy(true);
    }
}