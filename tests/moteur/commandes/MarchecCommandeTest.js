/**
 * Classe de test de MarcheCommande
 */
export class MarcheCommandeTest {

    static executerTest(marcheCommande) {
        let perso = marcheCommande.perso;
        console.log(`Nombre de pas disponibles avant : ${perso.nombrePas}`);
        while (!!marcheCommande.execute());
        console.log(`Nombre de pas effectues : ${marcheCommande.indexDeplacement}`);
        console.log(`Nombre de pas disponibles apres : ${perso.nombrePas}`);
        console.log(`Personnage peut marcher : ${perso.peutMarcher}`);
    }

}
// Initialisation du perso (on va mocker l'objet personnageGraphique)
let perso = new Personnage("John", Terrain.TAILLE_CASE, Terrain.TAILLE_CASE, false);
perso.personnageGraphique = {
    animerMarche: ()=>{},
    stop: ()=>{},
    animatedSprite: {x:0, y:0}
};


console.log("Premier cas de test : on avance de 2 pas");
let marcheCommande = new MarcheCommande(perso, new Coordonnees(2 * Terrain.TAILLE_CASE, 2 * Terrain.TAILLE_CASE));
MarcheCommandeTest.executerTest(marcheCommande);

console.log("Deuxieme cas de test : on avance encore 2 pas");
let marcheCommande2 = new MarcheCommande(perso, new Coordonnees(2 * Terrain.TAILLE_CASE, 4 * Terrain.TAILLE_CASE));
MarcheCommandeTest.executerTest(marcheCommande2);

console.log("Troisieme cas de test : on avance de 5 pas (superieur au max)");
// On réinitialise le nombre de pas
perso.nombrePas = 4;
perso.peutMarcher = true;
let marcheCommande3 = new MarcheCommande(perso, new Coordonnees(4 * Terrain.TAILLE_CASE, 7 * Terrain.TAILLE_CASE));
MarcheCommandeTest.executerTest(marcheCommande3);