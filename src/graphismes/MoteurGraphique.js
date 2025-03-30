import { TerrainGraphique } from './terrain/TerrainGraphique.js';
import { Moteur } from '../moteur/Moteur.js';
import { PersonnageGraphique } from './personnage/PersonnageGraphique.js';

/**
 * Classe graphique du moteur
 */
export class MoteurGraphique {

    static APP = new PIXI.Application({ width: 640, height: 384 });

    /**
     * Initialisation des éléments graphiques (terrain, personnages)
     * 
     */
    static initGraphics() {
        // initialisation de l'application PIXI

        document.body.appendChild(MoteurGraphique.APP.view);
        // On commence par dessiner le terrain
        let terrainGraphique = new TerrainGraphique(Moteur.terrain);
        terrainGraphique.draw(MoteurGraphique.APP);

        // On dessine les personnages
        for (let perso of Moteur.listePerso) {
            let persoGraphique = new PersonnageGraphique(perso);
            MoteurGraphique.APP.stage.addChild(persoGraphique.animatedSprite);
        }

        // On dessine les objets
        for (let objet of Moteur.listeObjets) {
            let objetGraphique = objet.objetGraphique;
            objetGraphique.draw(MoteurGraphique.APP);
        }
    }

    static addObject(obj) {
        MoteurGraphique.APP.stage.addChild(obj);
    }
}