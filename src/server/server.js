// Imports server
const JoueurFactory = require('./joueurs/JoueurFactory').JoueurFactory;

// Imports Express.js
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;


// Fonction de contrôle
function controlAvailableName(request) {
    for (let playerName of JoueurFactory.listeJoueurs) {
        if (playerName.name === request.name) {
            return false;
        }
    }
    return true;
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/../../login.html"));

});

app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, "/../../index.html"));
});

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

app.get('/start', (req, res) => {
    let peutDemarrer = {
        joueursComplet: JoueurFactory.listeJoueursComplete()
    };
    res.json(JSON.stringify(peutDemarrer));
});

app.get('/list', (req, res) => {
    console.log('list');
    res.json(JoueurFactory.listeJoueurs);
});

app.use(express.static(path.join(__dirname, "/../../")));
app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});