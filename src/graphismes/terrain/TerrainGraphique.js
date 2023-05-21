/**
 * Élément graphique de la map
 */
class TerrainGraphique {

    /**
     * 
     * @param {Terrain} terrain le terrain à dessiner
     */
    constructor(terrain) {
        this.terrain = terrain;
        this.sprites = [];

        // Initialisation des graphismes
        this.sprites.push(PIXI.Texture.from('resources/map/sol.png'));
        this.sprites.push(PIXI.Texture.from('resources/map/mur.png'));
    }

    /**
     * Méthode de dessin de la map
     * 
     * @param {PIXI.Application} app L'objet dans lequel ajouter l'élément graphique
     */
    draw(app) {
        for (let i=0; i<this.terrain.map.length; i++) {
            for (let j=0; j<this.terrain.map[i].length; j++) {
                let tuile = new PIXI.Sprite(this.sprites[this.terrain.map[i][j]]);
                tuile.x = 32*j;
                tuile.y = 32*i;
                app.stage.addChild(tuile);
            }
        }
    }
}