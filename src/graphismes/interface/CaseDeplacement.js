class CaseDeplacement {

    constructor(x, y) {
        this.caseSol = PIXI.Sprite.from('resources/interface/sol_jouable.png');
        this.caseSol.x = x;
        this.caseSol.y = y;
        this.caseSol.anchor.set(0.5);
        this.caseSol.interactive = true;
    }

    draw(app) {
        console.log(`x: ${this.caseSol.x}, y: ${this.caseSol.y}`);
        app.stage.addChild(this.caseSol);
    }

    destroy() {
        this.caseSol.destroy(true);
    }
}