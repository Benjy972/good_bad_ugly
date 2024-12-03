/**
 * Classe de test de Coordonnees
 */
class CoordonneesTest {

    static angleComprisEntreDeuxAnglesTest(coordonneesSource, coordonneesCible, angle1, angle2, attendu) {
        console.log(`Point de depart : ${coordonneesSource.x}, ${coordonneesSource.y}`);
        console.log(`Point d'arrivee : ${coordonneesCible.x}, ${coordonneesCible.y}`);
        console.log(`Angle 1 : ${angle1}`);
        console.log(`Angle 2 : ${angle2}`);
        console.log(`Attendu : ${attendu}`);
        console.log(`Resultat : ${coordonneesSource.angleComprisEntreDeuxAngles(coordonneesCible, angle1, angle2)}`);


    }

    static droiteTraverseCaseTest(coordDepart, coordArrivee, coordCase, attendu) {
        console.log(`Point de depart : ${coordDepart.x}, ${coordDepart.y}`);
        console.log(`Point d'arrivee : ${coordArrivee.x}, ${coordArrivee.y}`);
        console.log(`Coordonnee de la case : ${coordCase.x}, ${coordCase.y}`);
        console.log(`Attendu : ${attendu}`);
        console.log(`Resultat : ${coordCase.caseEstTraverseeParDroite(coordDepart, coordArrivee)}`);
    }
}

/// Tests angleComprisEntreDeuxAnglesTest
console.log("[angleComprisEntreDeuxAnglesTest] Test 1 :")
CoordonneesTest.angleComprisEntreDeuxAnglesTest(new Coordonnees(0.5*Terrain.TAILLE_CASE, 0.5*Terrain.TAILLE_CASE), 
    new Coordonnees(5.5*Terrain.TAILLE_CASE, 0.5*Terrain.TAILLE_CASE),
    0.1*Math.PI,
    1.9*Math.PI,
    true
)

console.log("[angleComprisEntreDeuxAnglesTest] Test 2 :")
CoordonneesTest.angleComprisEntreDeuxAnglesTest(new Coordonnees(0.5*Terrain.TAILLE_CASE, 0.5*Terrain.TAILLE_CASE), 
    new Coordonnees(5.5*Terrain.TAILLE_CASE, 0.5*Terrain.TAILLE_CASE),
    1.9*Math.PI,
    0.1*Math.PI,
    true
)

console.log("[angleComprisEntreDeuxAnglesTest] Test 3 :")
CoordonneesTest.angleComprisEntreDeuxAnglesTest(new Coordonnees(0.5*Terrain.TAILLE_CASE, 0.5*Terrain.TAILLE_CASE), 
    new Coordonnees(5.5*Terrain.TAILLE_CASE, 0.5*Terrain.TAILLE_CASE),
    0.1*Math.PI,
    0.2*Math.PI,
    false
)

console.log("[angleComprisEntreDeuxAnglesTest] Test 4 :")
CoordonneesTest.angleComprisEntreDeuxAnglesTest(new Coordonnees(0.5*Terrain.TAILLE_CASE, 0.5*Terrain.TAILLE_CASE), 
    new Coordonnees(5.5*Terrain.TAILLE_CASE, 0.5*Terrain.TAILLE_CASE),
    0.9*Math.PI,
    1.1*Math.PI,
    false
)

console.log("[angleComprisEntreDeuxAnglesTest] Test 5 :")
CoordonneesTest.angleComprisEntreDeuxAnglesTest(new Coordonnees(5.5*Terrain.TAILLE_CASE, 0.5*Terrain.TAILLE_CASE), 
    new Coordonnees(0.5*Terrain.TAILLE_CASE, 0.5*Terrain.TAILLE_CASE),
    0.9*Math.PI,
    1.1*Math.PI,
    true
)

console.log("[angleComprisEntreDeuxAnglesTest] Test 6 :")
CoordonneesTest.angleComprisEntreDeuxAnglesTest(new Coordonnees(0.5*Terrain.TAILLE_CASE, 0.5*Terrain.TAILLE_CASE), 
    new Coordonnees(0.5*Terrain.TAILLE_CASE, 5.5*Terrain.TAILLE_CASE),
    0.45*Math.PI,
    0.55*Math.PI,
    true
)

console.log("[angleComprisEntreDeuxAnglesTest] Test 7 :")
CoordonneesTest.angleComprisEntreDeuxAnglesTest(new Coordonnees(0.5*Terrain.TAILLE_CASE, 0.5*Terrain.TAILLE_CASE), 
    new Coordonnees(0.5*Terrain.TAILLE_CASE, 5.5*Terrain.TAILLE_CASE),
    0.65*Math.PI,
    0.55*Math.PI,
    false
)

console.log("[angleComprisEntreDeuxAnglesTest] Test 8 :")
CoordonneesTest.angleComprisEntreDeuxAnglesTest(new Coordonnees(0.5*Terrain.TAILLE_CASE, 0.5*Terrain.TAILLE_CASE), 
    new Coordonnees(0.5*Terrain.TAILLE_CASE, 5.5*Terrain.TAILLE_CASE),
    1.45*Math.PI,
    1.55*Math.PI,
    false
)

console.log("[angleComprisEntreDeuxAnglesTest] Test 9 :")
CoordonneesTest.angleComprisEntreDeuxAnglesTest(new Coordonnees(0.5*Terrain.TAILLE_CASE, 5.5*Terrain.TAILLE_CASE), 
    new Coordonnees(0.5*Terrain.TAILLE_CASE, 0.5*Terrain.TAILLE_CASE),
    1.45*Math.PI,
    1.55*Math.PI,
    true
)

/// Tests droiteTraverseCaseTest
console.log("[droiteTraverseCaseTest] Test 1 :")
CoordonneesTest.droiteTraverseCaseTest(new Coordonnees(0.5*Terrain.TAILLE_CASE, 0.5*Terrain.TAILLE_CASE), 
    new Coordonnees(5.5*Terrain.TAILLE_CASE, 0.5*Terrain.TAILLE_CASE),
    new Coordonnees(2.5*Terrain.TAILLE_CASE, 0.5*Terrain.TAILLE_CASE),
    true);

// Test 2
console.log("[droiteTraverseCaseTest] Test 2 :")
CoordonneesTest.droiteTraverseCaseTest(new Coordonnees(0.5*Terrain.TAILLE_CASE, 0.5*Terrain.TAILLE_CASE), 
    new Coordonnees(5.5*Terrain.TAILLE_CASE, 0.5*Terrain.TAILLE_CASE),
    new Coordonnees(2.5*Terrain.TAILLE_CASE, 2.5*Terrain.TAILLE_CASE),
    false);

// Test 3
console.log("[droiteTraverseCaseTest] Test 3 :")
CoordonneesTest.droiteTraverseCaseTest(new Coordonnees(2.5*Terrain.TAILLE_CASE, 0.5*Terrain.TAILLE_CASE), 
    new Coordonnees(5.5*Terrain.TAILLE_CASE, 2.5*Terrain.TAILLE_CASE),
    new Coordonnees(5.5*Terrain.TAILLE_CASE, 0.5*Terrain.TAILLE_CASE),
    false);

// Test 4
console.log("Test 4 :")
CoordonneesTest.droiteTraverseCaseTest(new Coordonnees(0.5*Terrain.TAILLE_CASE, 0.5*Terrain.TAILLE_CASE), 
    new Coordonnees(5.5*Terrain.TAILLE_CASE, 5.5*Terrain.TAILLE_CASE),
    new Coordonnees(2.5*Terrain.TAILLE_CASE, 2.5*Terrain.TAILLE_CASE),
    true);

// Test 5
console.log("[droiteTraverseCaseTest] Test 5 :")
CoordonneesTest.droiteTraverseCaseTest(new Coordonnees(0.5*Terrain.TAILLE_CASE, 0.5*Terrain.TAILLE_CASE), 
    new Coordonnees(0.5*Terrain.TAILLE_CASE, 5.5*Terrain.TAILLE_CASE),
    new Coordonnees(0.5*Terrain.TAILLE_CASE, 2.5*Terrain.TAILLE_CASE),
    true);

// Test 5
console.log("[droiteTraverseCaseTest] Test 6 :")
CoordonneesTest.droiteTraverseCaseTest(new Coordonnees(12.5*Terrain.TAILLE_CASE, 7.5*Terrain.TAILLE_CASE), 
    new Coordonnees(5.5*Terrain.TAILLE_CASE, 7.5*Terrain.TAILLE_CASE),
    new Coordonnees(4.5*Terrain.TAILLE_CASE, 7.5*Terrain.TAILLE_CASE),
    true);