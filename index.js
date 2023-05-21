let app = new PIXI.Application({ width: 640, height: 384 });
document.body.appendChild(app.view);

// Moteur
let moteur = new Moteur();
moteur.setListePerso(
    new Personnage("Joueur 1", 176, 176, moteur, false),
    new Personnage("Joueur 2", 304, 304, moteur, true)
)
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
        ServiceNotification.pushMessage("Vous ne pouvez plus vous déplacer");
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
        ServiceNotification.pushMessage("Vous ne pouvez plus tirer");
        return;
    }

    let cibleDisponible = moteur.evaluerTir();
    // Si après avoir évalué un tir, le personnage n'a pas de cible en vue
    if (!cibleDisponible) {
        ServiceNotification.pushMessage("Aucune cible à proximité");
    }

}

// Passer son tour
function passerTour() {
    // Inhibe le bouton si une action est en cours
    if (actionEnCours()) {
        return;
    }
    moteur.passerTour();
}

window.onload = function() {
    // On initialise le service de notification
    ServiceNotification.initService();

    // Execution de commandes
    app.ticker.add((delta) => moteur.executerCommande());
};

// Fonction utilitaire

function actionEnCours() {
    if (moteur.commande != null) {
        ServiceNotification.pushMessage("Une action est déjà en cours");
        return true;
    }
    return false;
}