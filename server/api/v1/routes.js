const express = require('express');
const router = express.Router();
const authRouter = express.Router();
const auth = require('./providers/auth')();

/*
Controllers
*/
const authController = require('./controllers/authController');
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
//router.get('/posts', auth.authenticateJwt(), postController.get_posts);// Securing the end-point to-do
router.get('/posts', postController.get_posts);
router.get('/posts/:id', postController.get_post);
router.get('/post', postController.post_create_get);
router.post('/post', postController.post_create_post);
router.post('/signup', authController.user_create_post);
authRouter.post('/local', authController.user_auth_local_post);
authRouter.post('/facebook', authController.user_auth_facebook_post);
router.use('/auth', authRouter);

module.exports = router;