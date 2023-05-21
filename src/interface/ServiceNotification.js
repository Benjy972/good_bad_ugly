class ServiceNotification {
    
    static texte = undefined;

    static initService() {
        this.texte = document.getElementById("infoTexte");
    }

    static pushMessage(message) {
        if (!!this.texte) {
            this.texte.value = message;
        }
    }
}