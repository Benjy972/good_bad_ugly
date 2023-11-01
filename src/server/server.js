const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

let players = [];

// Fonction de contrôle
function controlAvailableName(request) {
    for (let playerName of players) {
        if (playerName.name === request.name) {
            return false;
        }
    }
    return true;
}

app.get('/', (req, res) => {
    console.log('page d\'accueil');
    res.sendFile(path.join(__dirname, "/../../login.html"));

});

app.get('/game', (req, res) => {
    console.log('jeu');
    res.sendFile(path.join(__dirname, "/../../index.html"));

});

app.post('/login', (req, res) => {
    console.log(req.body);
    let request = req.body;
    let response = {};
    if (controlAvailableName(request)) {
        players.push(request);
        response.status = "OK";
        response.order = players.length;
    } else {
        response.status = "KO";
        response.message = "Ce nom est déjà pris";
    }
    res.set('Content-Type', 'application/json');
    res.status(200).json(JSON.stringify(response));
});

app.get('/list', (req, res) => {
    console.log('list');
    res.json(players);
});

app.use(express.static(path.join(__dirname, "/../../")));
app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});