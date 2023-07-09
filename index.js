let app = new PIXI.Application({ width: 640, height: 384 });
document.body.appendChild(app.view);

// On ajoute les personnages
Moteur.setListePerso(
    new Personnage("Joueur 1", 176, 176, false),
    new Personnage("Joueur 2", 304, 304, true)
)
// On ajoute les objets
Moteur.setListeObjets(new Coffre(240, 240));
// On initialise les graphismes
MoteurGraphique.initGraphics(app);

// Boutons
// Marcher
function evaluerDeplacements() {
    // Inhibe le bouton si une action est en cours
    if (actionEnCours()) {
        return;
    }
    // Si le personnage a déjà épuisé son action de déplacement
    if (!Moteur.getPersoCourant().peutMarcher) {
        ServiceNotification.pushMessage("Vous ne pouvez plus vous déplacer");
        return;
    }

    Moteur.evaluerDeplacements();
}

// Tirer
function evaluerTir() {
    // Inhibe le bouton si une action est en cours
    if (actionEnCours()) {
        return;
    }
    // Si le personnage a déjà épuisé son action de déplacement
    if (!Moteur.getPersoCourant().peutTirer) {
        ServiceNotification.pushMessage("Vous ne pouvez plus tirer");
        return;
    }

    let cibleDisponible = Moteur.evaluerTir();
    // Si après avoir évalué un tir, le personnage n'a pas de cible en vue
    if (!cibleDisponible) {
        ServiceNotification.pushMessage("Aucune cible à proximité");
    }

}

// Action sur un objet
function evaluerAction() {
    // Inhibe le bouton si une action est en cours
    if (actionEnCours()) {
        return;
    }

    let objetDisponible = Moteur.evaluerAction();
    // Si après avoir évalué un tir, le personnage n'a pas de cible en vue
    if (!objetDisponible) {
        ServiceNotification.pushMessage("Aucun objet à proximité");
    }

}

// Passer son tour
function passerTour() {
    // Inhibe le bouton si une action est en cours
    if (actionEnCours()) {
        return;
    }
    Moteur.passerTour();
}

window.onload = function() {
    // On initialise le service de notification
    ServiceNotification.initService();

    // Execution de commandes
    app.ticker.add((delta) => Moteur.executerCommande());
};

// Fonction utilitaire

function actionEnCours() {
    if (Moteur.commande != null) {
        ServiceNotification.pushMessage("Une action est déjà en cours");
        return true;
    }
    return false;
}