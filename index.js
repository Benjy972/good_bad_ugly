import { Bon } from "./src/moteur/personnage/Bon.js";
import { Brute } from "./src/moteur/personnage/Brute.js";
import { Truand } from "./src/moteur/personnage/Truand.js";
import { Moteur } from "./src/moteur/Moteur.js";
import { Personnage } from "./src/moteur/personnage/Personnage.js";
import { MoteurGraphique } from './src/graphismes/MoteurGraphique.js';
import { Coffre } from "./src/moteur/objet/Coffre.js";
import { ServiceNotification } from './src/interface/ServiceNotification.js';
import { ServiceInventaire } from './src/interface/ServiceInventaire.js';

// On définit le personnage principal
//let monPerso = new Bon("Joueur 1", 176, 176, false);
//let monPerso = new Brute("Joueur 1", 176, 176, false);
let monPerso = new Truand("Joueur 1", 176, 176, false);

// On ajoute les personnages
Moteur.setListePerso(
    monPerso,
    new Personnage("Joueur 2", 304, 304, true),
    new Personnage("Joueur 3", 304, 176, true)
)
// On ajoute les objets
Moteur.setListeObjets(new Coffre(240, 240));
// On initialise les graphismes
MoteurGraphique.initGraphics();

// Boutons
// Marcher
document.getElementById("mouvement").addEventListener('click', () => {
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
});

// Tirer
document.getElementById("tir").addEventListener('click', () => {
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
});

// Action spéciale
document.getElementById("actionSpeciale").addEventListener('click', () => {
    // Inhibe le bouton si une action est en cours
    if (actionEnCours()) {
        return;
    }
    // Si le personnage a déjà épuisé son action de déplacement
    if (!Moteur.getPersoCourant().actionSpecialePossible()) {
        ServiceNotification.pushMessage("Vous ne pouvez pas utiliser votre action spéciale pour l'instant.");
        return;
    }

    let cibleDisponible = Moteur.evaluerActionSpeciale();
    // Si après avoir évalué un tir, le personnage n'a pas de cible en vue
    if (!cibleDisponible) {
        ServiceNotification.pushMessage("Aucune cible à proximité");
    }
});

// Action sur un objet
document.getElementById("action").addEventListener('click', () => {
    // Inhibe le bouton si une action est en cours
    if (actionEnCours()) {
        return;
    }

    let objetDisponible = Moteur.evaluerAction();
    // Si après avoir évalué un tir, le personnage n'a pas de cible en vue
    if (!objetDisponible) {
        ServiceNotification.pushMessage("Aucun objet à proximité");
    }
});

// Echange avec un autre joueur
document.getElementById("echange").addEventListener('click', () => {
    // Inhibe le bouton si une action est en cours
    if (actionEnCours()) {
        return;
    }

    // Si le personnage n'a pas d'objet à échanger
    if (Moteur.getPersoCourant().inventaire.length == 0) {
        ServiceNotification.pushMessage("Vous n'avez pas d'objet à échanger");
        return;
    }

    let personnageDisponible = Moteur.evaluerEchange();
    // Si après avoir évalué un tir, le personnage n'a pas de cible en vue
    if (!personnageDisponible) {
        ServiceNotification.pushMessage("Aucun personnage à proximité");
    }
});

// Passer son tour
document.getElementById("passerTour").addEventListener('click', () => {
    // Inhibe le bouton si une action est en cours
    if (actionEnCours()) {
        return;
    }
    Moteur.passerTour();
});

window.onload = function() {
    // On initialise le service de notification
    ServiceNotification.initService();

    // On initialise le service d'affichage de l'inventaire
    ServiceInventaire.initService(monPerso);

    // Execution de commandes
    MoteurGraphique.APP.ticker.add((delta) => Moteur.executerCommande());
};

// Fonction utilitaire

function actionEnCours() {
    if (Moteur.commande != null) {
        ServiceNotification.pushMessage("Une action est déjà en cours");
        return true;
    }
    return false;
}