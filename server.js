/*
Libraries
*/
const http = require('http');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const server = http.Server(app);
const mongoose = require('mongoose');

/*
Custom Routes
*/
const routes = require('./server/config/routes');

/*
Settings
*/
const hostName = '10.5.128.19';
const port = '8080';
const nodeEnv = (process.env.NODE_ENV)?process.env.NODE_ENV:'development';
if(nodeEnv !== 'production') {
    console.log('Do some development stuff!');
}

/*
Mongoose (MongoDb-port)
*/
const mongoDbConnectionString = 'mongodb://mobdev2:wickedman@ds211289.mlab.com:11289/mobdev2';
mongoose.connect(mongoDbConnectionString);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDb Cconnection error!'));

/*
Express.js settings
*/
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use('', routes);
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

/*
Launch server
*/
server.listen(port, hostName, () => {
    console.log(`Node server running at http://${hostName}:${port}/!`)
});