console.log('This script populates some test posts to your database. Specified database as argument - e.g.: seeder mongodb://your_username:your_password@your_dabase_url');

/*
Libraries
*/
const async = require('async');
const mongoose = require('mongoose');

/*
Models
*/
const Blog = require('../models/blog');
const Category = require('../models/category');
const Post = require('../models/post');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
  console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
  return;
}

/*
Mongoose
*/
const mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

/*
Variables
*/
let blogs = [];
let categories = [];
let posts = [];

function blogCreate(title, synopsis, cb) {
  const blogDetail = { title: title, synopsis: synopsis };
  const blog = new Blog(blogDetail);

  blog.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Blog: ' + blog);
    blogs.push(blog);
    cb(null, blog);
  });
}

function categoryCreate(name, description, cb) {
  const categoryDetail = { name: name, description: description };
  const category = new Category(categoryDetail);

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New category: ' + category);
    categories.push(category);
    cb(null, category);
  });
}

function postCreate(title, synopsis, cb) {
  const postDetail = { title: title, synopsis: synopsis };
  const post = new Post(postDetail);

  post.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Post: ' + post);
    posts.push(post)
    cb(null, post)
  });
}

function createCategories(cb) {
  async.parallel([
    function(callback) {
      categoryCreate('Valve', 'Valve heeft Dota Plus aangekondigd.', callback);
    },
  ],
  cb);
}

function createPosts(cb) {
  async.parallel([
    function(callback) {
      postCreate('Valve geeft Dota 2-spelers maandelijks abonnement voor extra content als optie', 'Valve heeft Dota Plus aangekondigd, een maandelijkse abonnement voor Dota 2 waarmee spelers onder meer toegang krijgen tot cosmetische items, individuele herolevels en een tool die de spelerstatistieken bijhoudt.', callback);
    },
  ],
  cb);
}

/*
Asynchronous series
*/
async.series([
  createCategories,
  createPosts,
],
function(err, results) {
  if (err) {
  console.log(`FINAL ERR: ${err}`);
  }
  mongoose.connection.close();
});