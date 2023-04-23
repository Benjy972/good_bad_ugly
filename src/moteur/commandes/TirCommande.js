class TirCommande {

    constructor(perso, cible) {
        this.perso = perso;
        this.cible = cible;
        this.caseTir = new CaseTir(cible.coords.x, cible.coords.y);
    }

    displayCase(app) {
        this.caseTir.draw(app);
    }

    execute() {
        // Etape 0 : consomme l'action de déplacement du personnage
        this.perso.peutTirer = false;

        // Etape 1 : le tireur se tourne ves sa victime
        this.perso.setDirection(this.perso.coords.getAngle(this.cible.coords));

        // Etape 1 : effectuer l'action de tir
        this.perso.tirer();
        this.cible.encaisserTir();
        return null;
    }

}