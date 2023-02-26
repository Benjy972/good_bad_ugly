let app = new PIXI.Application({ width: 640, height: 384 });
document.body.appendChild(app.view);

// Terrain
let terrain = new Terrain();
let terrainGraphique = new TerrainGraphique(terrain);
terrainGraphique.draw(app);

// Perso
let perso = new Personnage(176, 176);
let persoGraphique = perso.personnageGraphique;
app.stage.addChild(persoGraphique.animatedSprite);

// Boutons
function evaluerDeplacements() {
    if (perso.listeMarcheCommande.length == 0) {
        perso.calculateSteps(terrain);
    }
    for (let marcheCommande of perso.listeMarcheCommande) {
        marcheCommande.displayCase(app);
        marcheCommande.caseDeplacement.caseSol.on('mousedown', function() {
            executeurCommande.addCommande(marcheCommande);
            perso.removeMarcheCommands();
        });
    }
    console.log("Hello !");
}

// Executeur commandes
let listeCommande = [
    new MarcheCommande(perso, new Coordonnees(176, 336)),
    new MarcheCommande(perso, new Coordonnees(336, 336)),
    new MarcheCommande(perso, new Coordonnees(336, 176)),
    new MarcheCommande(perso, new Coordonnees(176, 176))
];
let executeurCommande = new ExecuteurCommande();

/**let pos = 0;
persoGraphique.animatedSprite.on('mousedown', function() {
    executeurCommande.addCommande(listeCommande[pos%listeCommande.length]);
    pos++;
})*/

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