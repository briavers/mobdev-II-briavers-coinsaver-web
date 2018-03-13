const express = require('express');
const router = express.Router();

/*
Controllers
*/
const postController = require('./controllers/postController');

/*
Routes
*/
router.get('/posts', postController.get_posts);

module.exports = router;