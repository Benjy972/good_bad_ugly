/**
 * Commande de soudoiement
 */
class SoudoiementCommande extends Commande {

    /**
     * 
     * @param {Personnage} perso le personnage qui soudoie
     * @param {Personnage} cible le personnage à soudoyer
     */
    constructor(perso, cible) {
        super(perso, new CaseActionSpeciale(cible.coords.x, cible.coords.y));
        this.cible = cible;
    }

    /**
     * Exécution de la commande
     */
    execute() {
        // Obligatoire
        let persoTruand = this.perso;

        // On scanne les actions pour tous les personnages à cibler
        for (let persoCible of Moteur.listePerso) {
            if (persoCible != this.perso && persoCible != this.cible && persoCible.estVivant) {
                // Ajouter action commande d'attaque
                let commanderAttaqueCommande = new CommanderAttaqueCommande(this.cible, persoCible, this.perso);
                commanderAttaqueCommande.displayCase(app);
                commanderAttaqueCommande.caseCommande.caseSol.on('mousedown', function () {
                    ExecuteurCommande.addCommande(commanderAttaqueCommande);
                    persoTruand.removeCommands();
                    persoTruand.peutCommander = false;
                });
                this.perso.listeCommands.push(commanderAttaqueCommande);
            }
        }

        for (let objet of Moteur.listeObjets) {
            if (objet.actif) {
                // Ajouter action commande de récupération d'objet
                let commanderRecuperationCommande = new CommanderRecuperationCommande(this.cible, this.perso, objet);
                commanderRecuperationCommande.displayCase(app);
                commanderRecuperationCommande.caseCommande.caseSol.on('mousedown', function () {
                    ExecuteurCommande.addCommande(commanderRecuperationCommande);
                    persoTruand.removeCommands();
                    persoTruand.peutCommander = false;
                });
                this.perso.listeCommands.push(commanderRecuperationCommande);
            }
        }
    }

}