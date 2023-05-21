class MoteurGraphique {

    static initGraphics(app) {
        // On commence par dessiner le terrain
        let terrainGraphique = Moteur.terrain.terrainGraphique;
        terrainGraphique.draw(app);

        // On dessine les personnages
        for (let perso of Moteur.listePerso) {
            let persoGraphique = perso.personnageGraphique;
            app.stage.addChild(persoGraphique.animatedSprite);
        }
    }
}