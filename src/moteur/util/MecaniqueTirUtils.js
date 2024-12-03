/**
 * Classe utilitaire de mécanique de tir
 */
class MecaniqueTirUtils {

    /**
     * Verifie si la cible d'un joueur est à couvert ou non
     * 
     * @param {Terrain} terrain 
     * @param {Personnage} tireur le joueur qui tire 
     * @param {Personnage} cible le joueur ciblé
     */
    static cibleACouvert(terrain, tireur, cible) {
        // le joueur n'est pas à couvert
        let angle = tireur.coords.getAngle(cible.coords);
        let dx = Math.sign(Math.cos(angle));
        let dy = Math.sign(Math.sin(angle));
        // On parcourt le terrain
        let coordsTest = tireur.coords.getCopy();
        while (!coordsTest.equals(cible.coords)) {
            coordsTest.move(dx*Terrain.TAILLE_CASE, 0);
            if (dx ==0 || !coordsTest.caseEstTraverseeParDroite(tireur.coords, cible.coords)) {
                coordsTest.move(-dx*Terrain.TAILLE_CASE, dy*Terrain.TAILLE_CASE);
            }
            if (!terrain.canWalk(coordsTest.x, coordsTest.y)) {
                return true;
            }
        }
        return false;
    }
}