let app = new PIXI.Application({ width: 640, height: 384 });
document.body.appendChild(app.view);

// On ajoute les personnages
Moteur.setListePerso(
    new Bon("Joueur 1", 176, 176, false),
    new Personnage("Joueur 2", 304, 304, true),
    new Personnage("Joueur 3", 304, 176, true)
)
// On ajoute les objets
Moteur.setListeObjets(new Coffre(240, 240));
// On initialise les graphismes
MoteurGraphique.initGraphics(app);

// Test : joueur 3 possède un objet
Moteur.listePerso[2].inventaire.push(new Item("Objet test"));

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

// Action spéciale
function evaluerActionSpeciale() {
    // Inhibe le bouton si une action est en cours
    if (actionEnCours()) {
        return;
    }
    // Si le personnage a déjà épuisé son action de déplacement
    if (Moteur.getPersoCourant().cooldownActionSpeciale > 0) {
        ServiceNotification.pushMessage("Vous ne pouvez plus utiliser votre action spéciale.");
        return;
    }

    let cibleDisponible = Moteur.evaluerActionSpeciale();
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

    // On initialise le service d'affichage de l'inventaire
    ServiceInventaire.initService();

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