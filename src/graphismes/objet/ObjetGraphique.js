/**
 * Elément graphique de l'objet
 */
class ObjetGraphique {

    /**
     * 
     * @param {Objet} objet objet à dessiner sur la map
     */
    constructor(objet) {
        this.objet = objet;
        this.sprite = PIXI.Sprite.from(`resources/objet/${objet.nom}.png`);
        this.sprite.x = this.objet.coords.x;
        this.sprite.y = this.objet.coords.y;
        this.sprite.anchor.set(0.5);
    }

    draw(app) {
        app.stage.addChild(this.sprite);
    }
}