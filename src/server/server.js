// Imports server
const JoueurFactory = require('./joueurs/JoueurFactory').JoueurFactory;

// Imports Express.js
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;


/**
 * Fonction contrpile si le nom n'est pas déjà utilisé
 */ 
function controlAvailableName(request) {
    for (let playerName of JoueurFactory.listeJoueurs) {
        if (playerName.name === request.name) {
            return false;
        }
    }
    return true;
}

/**
 * Page de connexion au jeu
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/../../login.html"));

});

/**
 * Page de redirection vers le jeu
 */
app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, "/../../index.html"));
});

/**
 * Méthode de connexion d'un joueur
 */
app.post('/login', (req, res) => {
    console.log(req.body);
    let request = req.body;
    let response = {};
    if (controlAvailableName(request)) {
        JoueurFactory.creerJoueur(request.name);
        response.status = "OK";
    } else {
        response.status = "KO";
        response.message = "Ce nom est déjà pris";
    }
    res.set('Content-Type', 'application/json');
    res.status(200).json(JSON.stringify(response));
});

/**
 * Méthode de redirection vers la page de jeu
 */
app.get('/start', (req, res) => {
    let peutDemarrer = {
        joueursComplet: JoueurFactory.listeJoueursComplete()
    };
    res.json(JSON.stringify(peutDemarrer));
});

/**
 * Méthode d'initialisation de la partie
 */
app.get('/init', (req, res) => {
    res.json(JSON.stringify(JoueurFactory.listeJoueurs));
});

app.use(express.static(path.join(__dirname, "/../../")));
app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});