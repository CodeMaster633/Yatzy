import express from 'express';
const app = express();
import sessions from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import { nuværendeSlag } from './Logic.js';

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

app.post('/tilfoej', (request, response) => {
    const { tekst } = request.body;
    let tekster = request.session.tekster
    if (tekster == undefined) {
        tekster=[]
    }
    tekster.push(tekst)
    request.session.tekster=tekster
    response.status(201).send(['added']);
});


app.get('/slag', (request, response) => {
    console.log("Test af slag")
    response.send(nuværendeSlag)
});

app.listen(8000);

console.log('Lytter på port 8000 ...');