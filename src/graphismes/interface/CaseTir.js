class CaseTir {

    constructor(x, y) {
        this.caseSol = PIXI.Sprite.from('resources/interface/cible_tir.png');
        this.caseSol.x = x;
        this.caseSol.y = y;
        this.caseSol.anchor.set(0.5);
        this.caseSol.interactive = true;
    }

    draw(app) {
        app.stage.addChild(this.caseSol);
    }

    destroy() {
        this.caseSol.destroy(true);
    }
}