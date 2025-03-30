/**
 * Elément graphique de l'objet
 */
export class ObjetGraphique {

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

    /**
     * Change l'état (apparence) de l'objet
     * 
     * @param {string} state état de l'objet 
     */
    changeState(state) {
        this.sprite.texture = PIXI.Texture.from(`resources/objet/${this.objet.nom}${state}.png`); 
    }
}