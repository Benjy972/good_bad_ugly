class MoteurGraphique {

    constructor(moteur) {
        this.moteur = moteur;
    }

    initGraphics(app) {
        // On commence par dessiner le terrain
        let terrainGraphique = this.moteur.terrain.terrainGraphique;
        terrainGraphique.draw(app);

        // On dessine les personnages
        for (let perso of this.moteur.listePerso) {
            let persoGraphique = perso.personnageGraphique;
            app.stage.addChild(persoGraphique.animatedSprite);
        }
    }
}