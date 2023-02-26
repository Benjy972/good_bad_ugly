class PersonnageGraphique {

    constructor(personnage) {
        this.perso = personnage;
        this.spritesHaut = [];
        this.spritesBas = [];
        this.spritesDroite = [];
        this.spritesGauche = [];

        // Initialisation des graphismes
        let listePas = ['', '_g', '', '_d'];
        for (let pas of listePas) {
            this.spritesHaut.push(PIXI.Texture.from(`resources/personnage/heros/heros_haut${pas}.png`));
            this.spritesBas.push(PIXI.Texture.from(`resources/personnage/heros/heros_bas${pas}.png`));
            this.spritesDroite.push(PIXI.Texture.from(`resources/personnage/heros/heros_droite${pas}.png`));
            this.spritesGauche.push(PIXI.Texture.from(`resources/personnage/heros/heros_gauche${pas}.png`));
        }

        this.animatedSprite = new PIXI.AnimatedSprite(this.spritesBas);
        this.animatedSprite.x = this.perso.coords.x;
        this.animatedSprite.y = this.perso.coords.y
        this.animatedSprite.anchor.set(0.5);
        this.animatedSprite.animationSpeed = 0.15;

        this.animatedSprite.interactive = true;
    }

    animateHaut() {
        if (this.animatedSprite.textures != this.spritesHaut) {
            this.animatedSprite.textures = this.spritesHaut;
        }
        this.animatedSprite.play();
    }

    animateBas() {
        if (this.animatedSprite.textures != this.spritesBas) {
            this.animatedSprite.textures = this.spritesBas;
        }
        this.animatedSprite.play();
    }

    animateDroite() {
        if (this.animatedSprite.textures != this.spritesDroite) {
            this.animatedSprite.textures = this.spritesDroite;
        }
        this.animatedSprite.play();
    }

    animateGauche() {
        if (this.animatedSprite.textures != this.spritesGauche) {
            this.animatedSprite.textures = this.spritesGauche;
        }
        this.animatedSprite.play();
    }

    stop() {
        this.animatedSprite.gotoAndStop(0);
    }
}