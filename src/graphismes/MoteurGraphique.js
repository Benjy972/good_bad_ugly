/**
 * Classe graphique du moteur
 */
class MoteurGraphique {

    static pixiApp = undefined;

    /**
     * Initialisation des éléments graphiques (terrain, personnages)
     * 
     * @param {PIXI.Animation} app 
     */
    static initGraphics(app) {
        // On commence par dessiner le terrain
        let terrainGraphique = new TerrainGraphique(Moteur.terrain);
        terrainGraphique.draw(app);

        // On dessine les personnages
        for (let perso of Moteur.listePerso) {
            let persoGraphique = new PersonnageGraphique(perso);
            app.stage.addChild(persoGraphique.animatedSprite);
        }

        // On dessine les objets
        for (let objet of Moteur.listeObjets) {
            let objetGraphique = objet.objetGraphique;
            objetGraphique.draw(app);
        }
    }

    static addObject(obj) {
        app.stage.addChild(obj);
    }
}