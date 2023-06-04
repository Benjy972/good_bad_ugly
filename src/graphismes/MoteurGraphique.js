/**
 * Classe graphique du moteur
 */
class MoteurGraphique {

    /**
     * Initialisation des éléments graphiques (terrain, personnages)
     * 
     * @param {PIXI.Animation} app 
     */
    static initGraphics(app) {
        // On commence par dessiner le terrain
        let terrainGraphique = Moteur.terrain.terrainGraphique;
        terrainGraphique.draw(app);

        // On dessine les personnages
        for (let perso of Moteur.listePerso) {
            let persoGraphique = perso.personnageGraphique;
            app.stage.addChild(persoGraphique.animatedSprite);
        }

        // On dessine les objets
        for (let objet of Moteur.listeObjets) {
            let objetGraphique = objet.objetGraphique;
            objetGraphique.draw(app);
        }
    }
}