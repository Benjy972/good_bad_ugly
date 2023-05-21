/**
 * Élément graphique du personnage
 */
class PersonnageGraphique {

    /**
     * 
     * @param {Personnage} personnage personnage à dessiner sur la map
     */
    constructor(personnage) {
        this.perso = personnage;
        // Sprites marche
        this.spritesMarche_haut = [];
        this.spritesMarche_bas = [];
        this.spritesMarche_droite = [];
        this.spritesMarche_gauche = [];
        // Sprites tir
        this.spritesTir_haut = [];
        this.spritesTir_bas = [];
        this.spritesTir_droite = [];
        this.spritesTir_gauche = [];
        // Sprites encaisser tir
        this.spritesEncaisserTir_haut = [];
        this.spritesEncaisserTir_bas = [];
        this.spritesEncaisserTir_droite = [];
        this.spritesEncaisserTir_gauche = [];

        // Initialisation des graphismes
        let listeDirection = ['haut', 'bas', 'droite', 'gauche'];
        for (let direction of listeDirection) {
            // Marche
            this[`spritesMarche_${direction}`].push(PIXI.Texture.from(`resources/personnage/heros/heros_${direction}.png`));
            this[`spritesMarche_${direction}`].push(PIXI.Texture.from(`resources/personnage/heros/heros_${direction}_g.png`));
            this[`spritesMarche_${direction}`].push(PIXI.Texture.from(`resources/personnage/heros/heros_${direction}.png`));
            this[`spritesMarche_${direction}`].push(PIXI.Texture.from(`resources/personnage/heros/heros_${direction}_d.png`));

            // Tir
            this[`spritesTir_${direction}`].push(PIXI.Texture.from(`resources/personnage/heros/heros_tire_${direction}.png`));
            this[`spritesTir_${direction}`].push(PIXI.Texture.from(`resources/personnage/heros/heros_${direction}.png`));

            // Encaisser ir
            this[`spritesEncaisserTir_${direction}`].push(PIXI.Texture.from(`resources/personnage/heros/heros_blesse_${direction}.png`));
            this[`spritesEncaisserTir_${direction}`].push(PIXI.Texture.from(`resources/personnage/heros/heros_${direction}.png`));
        }

        this.animatedSprite = new PIXI.AnimatedSprite(this.spritesMarche_bas);
        this.animatedSprite.x = this.perso.coords.x;
        this.animatedSprite.y = this.perso.coords.y
        this.animatedSprite.anchor.set(0.5);
        this.animatedSprite.animationSpeed = 0.15;

        this.animatedSprite.interactive = true;
    }

    /**
     * Méthode d'animation de marche
     */
    animerMarche() {
        if (this.animatedSprite.textures != this[`spritesMarche_${this.perso.direction}`]) {
            this.animatedSprite.textures = this[`spritesMarche_${this.perso.direction}`];
        }
        this.animatedSprite.animationSpeed = 0.15;
        this.animatedSprite.loop = true;
        this.animatedSprite.play();
    }

    /**
     * Méthode d'animation de tir
     */
    animerTir() {
        if (this.animatedSprite.textures != this[`spritesTir_${this.perso.direction}`]) {
            this.animatedSprite.textures = this[`spritesTir_${this.perso.direction}`];
        }
        this.animatedSprite.animationSpeed = 0.1;
        this.animatedSprite.loop = false;
        this.animatedSprite.play();
    }

    /**
     * Méthode d'animation de personnage blessé
     */
    animerEncaisserTir() {
        if (this.animatedSprite.textures != this[`spritesEncaisserTir_${this.perso.direction}`]) {
            this.animatedSprite.textures = this[`spritesEncaisserTir_${this.perso.direction}`];
        }
        this.animatedSprite.animationSpeed = 0.05;
        this.animatedSprite.loop = false;
        this.animatedSprite.play();
    }

    /**
     * Méthode arrête l'animation de marche
     */
    stop() {
        this.animatedSprite.gotoAndStop(0);
    }
}