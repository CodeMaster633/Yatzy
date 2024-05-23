import express from 'express';
const app = express();
import sessions from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import { nuværendeSlag, myHoldArray, kastTerning, points, putPoints,putHoldArray } from './Logic.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
app.set('view engine', 'pug');
app.set("views", __dirname + "/views");

app.use(sessions({ secret: 'hemmelig', saveUninitialized: true, cookie: { maxAge: 1000 * 60 * 20 }, resave: false }));
app.use(express.static(__dirname + '/../Klient'));
app.use(express.json());
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });


//første bud, uden session
//let tekster = [];

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

app.put('/putHoldArray', (request, response) => {
    const { terningNr } = request.body;
    putHoldArray(terningNr)
    response.status(201).send(['putHoldArray']);
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

app.listen(8000);

console.log('Lytter på port 8000 ...');