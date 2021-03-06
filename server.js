/*
Libraries
*/
const http = require('http');
const https = require('https');
const express = require('express');
const fs = require('fs');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const auth = require('./server/api/v1/providers/auth')();


/*
Custom Routes
*/
const routes = require('./server/config/routes');

/*
Settings
*/
const key = fs.readFileSync('encryption/private.key');
const cert = fs.readFileSync('encryption/mydomain.crt');
const ca = fs.readFileSync('encryption/mydomain.crt');
var httpsOptions = {
    key: key,
    cert: cert,
    ca: ca
};
const server = https.Server(httpsOptions, app);
const hostName = 'localhost';
const port = '8080';
const nodeEnv = (process.env.NODE_ENV)?process.env.NODE_ENV:'development';
if(nodeEnv !== 'production') {
    //console.log('Do some development stuff!');
}

/*
Mongoose (MongoDb-port)
*/
const mongoDbConnectionString = 'mongodb://rootcoinsaver:secret@ds219130.mlab.com:19130/coinsaver';
mongoose.connect(mongoDbConnectionString);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDb Cconnection error!'));

/*
Cors
*/
var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

/*
Passport via passport.js provider
*/
app.use(auth.initialize());

/*
Express.js settings
*/
app.use(express.static(path.join(__dirname, 'client/build')));

//https://localhost:8080/uploads/y2018m5d1h17m54s41smallPhotoGoogle.jpg

app.use('/uploads', express.static(path.join(__dirname, './uploads')))

app.use(logger('dev'));
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
    //console.log(`Node server running at https://${hostName}:${port}/!`)
});


