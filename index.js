let app = new PIXI.Application({ width: 640, height: 384 });
document.body.appendChild(app.view);

// Terrain
let terrain = new Terrain();
let terrainGraphique = new TerrainGraphique(terrain);
terrainGraphique.draw(app);

// Perso
let indexPerso = 0;
let listePerso = [];
listePerso.push(initialiserPerso(176, 176));
listePerso.push(initialiserPerso(304, 304));

// Boutons
// Marcher
function evaluerDeplacements() {
    // Inhibe le bouton si une action est en cours
    if (actionEnCours()) {
        return;
    }
    // Si le personnage a déjà épuisé son action de déplacement
    if (!getPersoCourant().peutMarcher) {
        infoTexte.value = "Vous ne pouvez plus vous déplacer";
        return;
    }

    if (getPersoCourant().listeMarcheCommande.length == 0) {
        getPersoCourant().calculateSteps(terrain, listePerso);
    }
    for (let marcheCommande of getPersoCourant().listeMarcheCommande) {
        marcheCommande.displayCase(app);
        marcheCommande.caseDeplacement.caseSol.on('mousedown', function() {
            executeurCommande.addCommande(marcheCommande);
            getPersoCourant().removeMarcheCommands();
        });
    }
}

// Zone de texte
let infoTexte;
window.onload = function() {
    infoTexte = document.getElementById("infoTexte");
    infoTexte.value = "";
};

// Passer son tour
function passerTour() {
    // Inhibe le bouton si une action est en cours
    if (actionEnCours()) {
        return;
    }
    getPersoCourant().removeMarcheCommands();
    getPersoCourant().peutMarcher = true;
    indexPerso = (indexPerso + 1) % listePerso.length;
    infoTexte.value = "Au tour du joueur " + Number(indexPerso+1) ;
}

// Executeur commandes
let executeurCommande = new ExecuteurCommande();

let commande = null;
app.ticker.add((delta) => {
    if (commande == null) {
        if (executeurCommande.listeCommande.length > 0) {
            commande = executeurCommande.renvoiCommande();
        }
    } else {
        commande = commande.execute();
    }
});

// Fonction utilitaire
function getPersoCourant() {
    return listePerso[indexPerso];
}

function actionEnCours() {
    if (commande != null) {
        infoTexte.value = "Une action est déjà en cours";
        return true;
    }
    return false;
}

function initialiserPerso(posx, posy) {
    let perso = new Personnage(posx, posy);
    let persoGraphique = perso.personnageGraphique;
    app.stage.addChild(persoGraphique.animatedSprite);
    return perso;
}