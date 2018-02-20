const http = require('http');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const server = http.Server(app);

const nodeEnv = (process.env.NODE_ENV)?process.env.NODE_ENV:'development';
if(nodeEnv !== 'production') {
    console.log('Do some development stuff!');
}
const hostName = '10.5.140.13';
const port = '8080';

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.get('/', (req, res) => {
    res.send('Hello Express Mohyes :)');
});
app.get('/hello', (req, res) => {
    res.json({
        "message": "Greetings Earthlings :)"
    });
});
app.get('/students', (req, res) => {
    res.json([
        {
            "name": "Olivier",
            "lastname": "De Pauw",
            "eq": 140,
            "iq": 118    
        },
        {
            "name": "Philippe",
            "lastname": "Parent",
            "eq": 66,
            "iq": 168    
        }
    ]);
});
app.get('/students/:studentId', (req, res) => {
    res.json(
        {
            "name": "Olivier",
            "lastname": "De Pauw",
            "eq": 140,
            "iq": 118    
        }
    );
});

app.use((req, res, next) => {
    const err = new Error('Not Found!');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

server.listen(port, hostName, () => {
    console.log(`Node server running at http://${hostName}:${port}/!`)
});