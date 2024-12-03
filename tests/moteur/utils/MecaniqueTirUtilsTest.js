/**
 * Classe de test de MecaniqueTirUtils
 */
class MecaniqueTirUtilsTest {

    

    static testCible(terrain, x1, y1, x2, y2, devraitEtreACouvert) {
        let tireur = new Personnage("John", x1, y1, false);
        let cible = new Personnage("Mark", x2, y2, false);
        console.log("Tireur : " + tireur.coords.x + ", " + tireur.coords.y);
        console.log("Cible : " + cible.coords.x + ", " + cible.coords.y);
        console.log("Devrait etre a couvert : " + devraitEtreACouvert);
        console.log("Resultat : " + MecaniqueTirUtils.cibleACouvert(terrain, tireur, cible));
    }

}
let terrain = new Terrain();

console.log("Cas de test 1 :")
MecaniqueTirUtilsTest.testCible(terrain, 10.5*Terrain.TAILLE_CASE, 7.5*Terrain.TAILLE_CASE, 12.5*Terrain.TAILLE_CASE, 7.5*Terrain.TAILLE_CASE, true);

console.log("Cas de test 2 :")
MecaniqueTirUtilsTest.testCible(terrain, 10.5*Terrain.TAILLE_CASE, 7.5*Terrain.TAILLE_CASE, 5.5*Terrain.TAILLE_CASE, 7.5*Terrain.TAILLE_CASE, false);

console.log("Cas de test 3 :")
MecaniqueTirUtilsTest.testCible(terrain, 11.5*Terrain.TAILLE_CASE, 9.5*Terrain.TAILLE_CASE, 11.5*Terrain.TAILLE_CASE, 2.5*Terrain.TAILLE_CASE, true);

console.log("Cas de test 4 :")
MecaniqueTirUtilsTest.testCible(terrain, 9.5*Terrain.TAILLE_CASE, 9.5*Terrain.TAILLE_CASE, 8.5*Terrain.TAILLE_CASE, 5.5*Terrain.TAILLE_CASE, false);

console.log("Cas de test 5 :")
MecaniqueTirUtilsTest.testCible(terrain, 7.5*Terrain.TAILLE_CASE, 6.5*Terrain.TAILLE_CASE, 12.5*Terrain.TAILLE_CASE, 8.5*Terrain.TAILLE_CASE, true);

console.log("Cas de test 6 :")
MecaniqueTirUtilsTest.testCible(terrain, 4.5*Terrain.TAILLE_CASE, 6.5*Terrain.TAILLE_CASE, 12.5*Terrain.TAILLE_CASE, 8.5*Terrain.TAILLE_CASE, false);