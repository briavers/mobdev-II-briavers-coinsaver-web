const express = require('express');
const router = express.Router();

/*
Controllers
*/
const nmdController = require('./controllers/nmdController');
const userController = require('./controllers/userController');

/*
Routes
*/
router.get('/', nmdController.index);
router.get('/hack', nmdController.hackathon);
router.get('/users', userController.index);

module.exports = router;