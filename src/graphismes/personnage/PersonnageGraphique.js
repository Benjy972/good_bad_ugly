/**
 * Élément graphique du personnage
 */
export class PersonnageGraphique {

    /**
     * 
     * @param {Personnage} personnage personnage à dessiner sur la map
     */
    constructor(personnage) {
        this.perso = personnage;
        personnage.personnageGraphique = this;
        
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
        // Sprites être enchainé
        this.spritesEnchaine_haut = [];
        this.spritesEnchaine_bas = [];
        this.spritesEnchaine_droite = [];
        this.spritesEnchaine_gauche = [];
        // Sprites encaisser tir enchaine
        this.spritesEncaisserTirEnchaine_haut = [];
        this.spritesEncaisserTirEnchaine_bas = [];
        this.spritesEncaisserTirEnchaine_droite = [];
        this.spritesEncaisserTirEnchaine_gauche = [];


        // Initialisation des graphismes
        let listeDirection = ['haut', 'bas', 'droite', 'gauche'];
        for (let direction of listeDirection) {
            // Marche
            this[`spritesMarche_${direction}`].push(PIXI.Texture.from(`resources/personnage/heros/marche/heros_${direction}.png`));
            this[`spritesMarche_${direction}`].push(PIXI.Texture.from(`resources/personnage/heros/marche/heros_${direction}_g.png`));
            this[`spritesMarche_${direction}`].push(PIXI.Texture.from(`resources/personnage/heros/marche/heros_${direction}.png`));
            this[`spritesMarche_${direction}`].push(PIXI.Texture.from(`resources/personnage/heros/marche/heros_${direction}_d.png`));

            // Tir
            this[`spritesTir_${direction}`].push(PIXI.Texture.from(`resources/personnage/heros/tire/heros_tire_${direction}.png`));
            this[`spritesTir_${direction}`].push(PIXI.Texture.from(`resources/personnage/heros/marche/heros_${direction}.png`));

            // Encaisser tir
            this[`spritesEncaisserTir_${direction}`].push(PIXI.Texture.from(`resources/personnage/heros/blesse/heros_blesse_${direction}.png`));
            this[`spritesEncaisserTir_${direction}`].push(PIXI.Texture.from(`resources/personnage/heros/marche/heros_${direction}.png`));

            // Enchainé
            this[`spritesEnchaine_${direction}`].push(PIXI.Texture.from(`resources/personnage/heros/enchaine/heros_enchaine_${direction}.png`));

            // Encaisser tir enchainé
            this[`spritesEncaisserTirEnchaine_${direction}`].push(PIXI.Texture.from(`resources/personnage/heros/enchaine/heros_blesse_enchaine_${direction}.png`));
            this[`spritesEncaisserTirEnchaine_${direction}`].push(PIXI.Texture.from(`resources/personnage/heros/enchaine/heros_enchaine_${direction}.png`));
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
        this.animatedSprite.gotoAndPlay(0);
    }

    /**
     * Méthode d'animation de personnage blessé
     */
    animerEncaisserTir() {
        if (this.animatedSprite.textures == this[`spritesEnchaine_${this.perso.direction}`]) {
            this.animatedSprite.textures = this[`spritesEncaisserTirEnchaine_${this.perso.direction}`];
        }
        if (this.animatedSprite.textures != this[`spritesEncaisserTir_${this.perso.direction}`]
            && this.animatedSprite.textures != this[`spritesEncaisserTirEnchaine_${this.perso.direction}`]) {
            this.animatedSprite.textures = this[`spritesEncaisserTir_${this.perso.direction}`];
        }
        this.animatedSprite.animationSpeed = 0.05;
        this.animatedSprite.loop = false;
        this.animatedSprite.gotoAndPlay(0);
    }

    /**
     * Affichage du personnage enchainé
     */
    etreEnchaine() {
        this.animatedSprite.textures = this[`spritesEnchaine_${this.perso.direction}`];
        this.animatedSprite.stop();
    }

    /**
     * Affichage du personnage mort
     */
    mourir() {
        this.animatedSprite.textures = [PIXI.Texture.from(`resources/personnage/heros/mort/heros_mort_${this.perso.direction}.png`)];
        this.animatedSprite.stop();
    }

    /**
     * Affichage du personnage montant dans le wagon
     */
    monterWagon() {
        this.animatedSprite.textures = [PIXI.Texture.from(`resources/personnage/heros/wagon/heros_wagon_${this.perso.direction}.png`)];
        this.animatedSprite.stop();
    }

    /**
     * Méthode arrête l'animation de marche
     */
    stop() {
        this.animatedSprite.gotoAndStop(0);
    }
}