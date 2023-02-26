class TerrainGraphique {

    constructor(terrain) {
        this.terrain = terrain;
        this.sprites = [];

        // Initialisation des graphismes
        this.sprites.push(PIXI.Texture.from('resources/map/sol.png'));
        this.sprites.push(PIXI.Texture.from('resources/map/mur.png'));
    }

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