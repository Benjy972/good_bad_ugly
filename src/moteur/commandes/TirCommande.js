class TirCommande {

    constructor(perso, cible) {
        this.perso = perso;
        this.cible = cible;
        this.terrain = terrain;
        this.caseTir = new CaseTir(cible.coords.x, cible.coords.y);
    }

    displayCase(app) {
        this.caseTir.draw(app);
    }

    execute() {
        // Etape 0 : consomme l'action de déplacement du personnage
        this.perso.peutTirer = false;

        // Etape 1 : effectuer l'action de tir
        this.perso.tirer();
        this.cible.encaisserTir();
        return null;
    }

}