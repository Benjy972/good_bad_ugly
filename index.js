let app = new PIXI.Application({ width: 640, height: 384 });
document.body.appendChild(app.view);

// Moteur
let moteur = new Moteur(new Personnage(176, 176), new Personnage(304, 304));
// On initialise les graphismes
let moteurGraphique = moteur.moteurGraphique;
moteurGraphique.initGraphics(app);


// Boutons
// Marcher
function evaluerDeplacements() {
    // Inhibe le bouton si une action est en cours
    if (actionEnCours()) {
        return;
    }
    // Si le personnage a déjà épuisé son action de déplacement
    if (!moteur.getPersoCourant().peutMarcher) {
        infoTexte.value = "Vous ne pouvez plus vous déplacer";
        return;
    }

    moteur.evaluerDeplacements();
}

// Tirer
function evaluerTir() {
    // Inhibe le bouton si une action est en cours
    if (actionEnCours()) {
        return;
    }
    // Si le personnage a déjà épuisé son action de déplacement
    if (!moteur.getPersoCourant().peutTirer) {
        infoTexte.value = "Vous ne pouvez plus tirer";
        return;
    }

    if (moteur.getPersoCourant().listeTirCommande.length == 0 && !moteur.getPersoCourant().evaluerTir(moteur.listePerso)) {
        infoTexte.value = "Aucune cible à proximité";
    }

    moteur.evaluerTir();
}

// Passer son tour
function passerTour() {
    // Inhibe le bouton si une action est en cours
    if (actionEnCours()) {
        return;
    }
    moteur.passerTour();
    infoTexte.value = "Au tour du joueur " + Number(moteur.indexPerso+1) ;
}

// Zone de texte
let infoTexte;
window.onload = function() {
    infoTexte = document.getElementById("infoTexte");
    infoTexte.value = "";

    // Execution de commandes
    app.ticker.add((delta) => moteur.executerCommande());
};

// Fonction utilitaire

function actionEnCours() {
    if (moteur.commande != null) {
        infoTexte.value = "Une action est déjà en cours";
        return true;
    }
    return false;
}