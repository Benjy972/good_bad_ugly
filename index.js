let app = new PIXI.Application({ width: 640, height: 384 });
document.body.appendChild(app.view);

// Terrain
let terrain = new Terrain();
let terrainGraphique = new TerrainGraphique(terrain);
terrainGraphique.draw(app);

// Perso
let perso = new Personnage(160, 160);
let persoGraphique = perso.personnageGraphique;
app.stage.addChild(persoGraphique.animatedSprite);

// Executeur commandes
let listeCommande = [
    new MarcheCommande(perso, new Coordonnees(160, 320)),
    new MarcheCommande(perso, new Coordonnees(320, 320)),
    new MarcheCommande(perso, new Coordonnees(320, 160)),
    new MarcheCommande(perso, new Coordonnees(160, 160))
];
let executeurCommande = new ExecuteurCommande();

let pos = 0;
persoGraphique.animatedSprite.on('mousedown', function() {
    executeurCommande.addCommande(listeCommande[pos%listeCommande.length]);
    pos++;
})

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