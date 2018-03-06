const express = require('express');
const router = express.Router();

/*
Controllers
*/
const nmdController = require('./controllers/nmdController');

/*
Routes
*/
router.get('/', nmdController.index);
router.get('/hack', nmdController.hackathon);

module.exports = router;