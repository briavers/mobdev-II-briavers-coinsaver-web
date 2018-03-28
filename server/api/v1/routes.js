const express = require('express');
const router = express.Router();

/*
Controllers
*/
const blogController = require('./controllers/blogController');
const categoryController = require('./controllers/categoryController');
const postController = require('./controllers/postController');

/*
Routes
*/
router.get('/blogs', blogController.get_blogs);
router.get('/blogs/:id', blogController.get_blog);
router.get('/categories', categoryController.get_categories);
router.get('/categories/:id', categoryController.get_category);
router.get('/posts', postController.get_posts);
router.get('/posts/:id', postController.get_post);

module.exports = router;