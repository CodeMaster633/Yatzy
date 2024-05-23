import express, {response} from 'express';
const app = express();
import sessions from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import { nuværendeSlag, myHoldArray, kastTerning, points, putPoints, lockPoints, calculateTotal, resetSlag} from './Logic.js';

let players = []
let gameStarted = false;
let slagNr = 0;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../Klient/views'));

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

app.put('/kastTerninger', (request, response) => {
    console.log("server kast virker")
    kastTerning()
    response.status(201).send(['terningekast']);
});


app.get('/slag', (request, response) => {
    response.send(nuværendeSlag)
});

app.get('/holdArray', (request, response) => {
    response.send(myHoldArray)
});

app.get('/points', (request, response) => {
    try {
        if (!points && points != 0) {
            throw new Error('Data ikke fundet');
        }
        response.json(points); 
    } catch (error) {
        console.error('Fejl på serveren:', error);
        response.status(500).send('Fejl på serveren');
    }
});

app.put('/putPoints', (request, response) => {
    putPoints()
    response.status(201).send(['putPoints']);
});

app.put('/lockPoint', (req, res) => {
    const { navn } = req.body;
    lockPoints(navn);
    calculateTotal();
    resetSlag();
    slagNr = 0;
    res.status(200).send(points);
})

app.get('/getSlagNr', (req, res) => {
    res.json({ slagNr });
});

app.put('/putSlagNr', (req, res) => {
    const { slagNr: newSlagNr } = req.body;
    console.log(`Received newSlagNr: ${newSlagNr}`);
    if (typeof newSlagNr !== 'number') {
        return res.status(400).send('Invalid slagNr');
    }
    slagNr = newSlagNr;
    console.log(`Updated slagNr to: ${slagNr}`);
    res.status(201).send({ slagNr });
});

app.listen(8000);

console.log('Lytter på port 8000 ...');