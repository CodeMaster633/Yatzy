import express from 'express';
const app = express();
import sessions from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import { createNewGame, getGame, kastTerning, putPoints, putHoldArray, lockPoints, calculateTotal, resetSlag, resetHoldArray, resetSpil, addToSum, vælgInputFelt, getTotal, getSum, getBonus } from './Logic.js';

let players = [];
let gameStarted = false;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'pug');
app.set("views", __dirname + "/../Klient/views");

app.use(sessions({ secret: 'hemmelig', saveUninitialized: true, cookie: { maxAge: 1000 * 60 * 20 }, resave: false }));
app.use(express.static(__dirname + '/../Klient'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { gameStarted, players });
});

app.post('/register', (req, res) => {
    const { name } = req.body;
    if (gameStarted) {
        return res.redirect('/');
    }
    if (name && !players.includes(name)) {
        players.push(name);
        req.session.playerName = name;
    }
    res.redirect('/');
});

app.post('/start', (req, res) => {
    if (!gameStarted && players.length > 0) {
        gameStarted = true;
    }
    res.sendStatus(200);
});

app.post('/newGame', (req, res) => {
    const gameId = createNewGame();
    console.log(`Created new game with ID: ${gameId}`);
    res.json({ gameId: gameId });
});

app.put('/kastTerninger/:gameId', (request, response) => {
    const { gameId } = request.params;
    console.log(`kastTerninger called with gameId: ${gameId}`);
    if (gameId == null || !getGame(gameId)) {
        console.log('Invalid game ID');
        return response.status(400).send('Invalid game ID');
    }
    kastTerning(gameId);
    response.status(201).send(['terningekast']);
});

app.get('/slag/:gameId', (request, response) => {
    const { gameId } = request.params;
    const game = getGame(gameId);
    console.log(`Request for slag with gameId: ${gameId}`);
    if (game == null) {
        console.log('Invalid game ID');
        return response.status(400).send('Invalid game ID');
    }
    response.send(game.nuværendeSlag);
});

app.get('/holdArray/:gameId', (request, response) => {
    const { gameId } = request.params;
    const game = getGame(gameId);
    if (game == null) {
        console.log('Invalid game ID');
        return response.status(400).send('Invalid game ID');
    }
    response.send(game.myHoldArray);
});

app.put('/putHoldArray/:gameId', (request, response) => {
    const { gameId } = request.params;
    const { terningNr } = request.body;
    console.log(`putHoldArray called with gameId: ${gameId} and terningNr: ${terningNr}`);
    if (gameId == null || !getGame(gameId)) {
        console.log('Invalid game ID');
        return response.status(400).send('Invalid game ID');
    }
    putHoldArray(gameId, terningNr);
    response.status(201).send(['putHoldArray']);
});

app.put('/resetHoldArray/:gameId', (request, response) => {
    const { gameId } = request.params;
    if (gameId == null || !getGame(gameId)) {
        console.log('Invalid game ID');
        return response.status(400).send('Invalid game ID');
    }
    resetHoldArray(gameId);
    response.status(201).send(['resetHoldArray']);
});

app.get('/points/:gameId', (request, response) => {
    const { gameId } = request.params;
    const game = getGame(gameId);
    console.log(`Request for points with gameId: ${gameId}`);
    if (game == null) {
        console.log('Invalid game ID');
        return response.status(400).send('Invalid game ID');
    }
    try {
        if (!game.points && game.points != 0) {
            throw new Error('Data ikke fundet');
        }
        response.json(game.points);
    } catch (error) {
        console.error('Fejl på serveren:', error);
        response.status(500).send('Fejl på serveren');
    }
});

app.put('/putPoints/:gameId', (request, response) => {
    const { gameId } = request.params;
    if (gameId == null || !getGame(gameId)) {
        console.log('Invalid game ID');
        return response.status(400).send('Invalid game ID');
    }
    putPoints(gameId);
    response.status(201).send(['putPoints']);
});

app.put('/lockPoint/:gameId', (req, res) => {
    const { gameId } = req.params;
    const { navn } = req.body;
    if (gameId == null || !getGame(gameId)) {
        return res.status(400).send('Invalid game ID');
    }
    lockPoints(navn, gameId);
    calculateTotal(gameId);
    resetSlag(gameId);
    res.status(200).send(getGame(gameId).points);
});

app.get('/getSlagNr/:gameId', (req, res) => {
    const { gameId } = req.params;
    const game = getGame(gameId);
    if (game == null) {
        return res.status(400).send('Invalid game ID');
    }
    res.json({ slagNr: game.slagNr });
});

app.put('/putSlagNr/:gameId', (req, res) => {
    const { gameId } = req.params;
    const { slagNr: newSlagNr } = req.body;
    console.log(`Received newSlagNr: ${newSlagNr} for gameId: ${gameId}`);
    if (gameId == null || !getGame(gameId) || typeof newSlagNr !== 'number') {
        return res.status(400).send('Invalid game ID or slagNr');
    }
    getGame(gameId).slagNr = newSlagNr;
    res.status(201).send({ slagNr: newSlagNr });
});

app.get('/indexGame', (req, res) => {
    res.sendFile(path.join(__dirname, '/../Klient/indexGame.html'));
});

app.listen(8000, 'localhost', () => {
    console.log('Lytter på port 8000 ...');
});
