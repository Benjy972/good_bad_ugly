/**
 * Service de notification
 */
export class ServiceNotification {
    
    static texte = undefined;

    /**
     * Initialisation du service de notification
     */
    static initService() {
        this.texte = document.getElementById("infoTexte");
    }

    /**
     * Affichage d'un message dans la zone de texte
     * 
     * @param {*} message le message à afficher
     */
    static pushMessage(message) {
        if (!!this.texte) {
            this.texte.value = message;
        }
    }
}