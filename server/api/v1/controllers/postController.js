const async = require('async');

const Post = require('../models/post');
const Category = require('../models/category');
const errorHandler = require('../utilities/errorHandler');

exports.get_posts = function(req, res, next) {
  const query = Post.find().populate('_category').populate('blogs');
  query.sort( { created_at: -1 } );
  query.exec((err, posts) => {
    if (err) return next(err);
    if (posts == null) {
      return errorHandler.handleAPIError(`Posts not found!`, next);
    }
    return res.json(posts);
  });
}

exports.get_post = function(req, res, next) {
  console.log(req.params);
  const id = req.params.id;
  const query = Post.findById(id).populate('_category').populate('blogs');
  query.exec((err, post) => {
    if (err) return next(err);
    if (post == null) {
      return errorHandler.handleAPIError(`Post not found with id: ${id}`, next);
    }
    return res.json(post);
  });
}

exports.post_create_get = function(req, res, next) {
  async.parallel({
      categories: function(callback) {
        Category.find(callback).sort( { created_at: -1} );
      },
  }, function(err, results) {
      if (err) { return next(err); }
      res.json( { title: 'Create Post', categories: results.categories });
  });
}

exports.post_create_post = function(req, res, next) {
  const post = new Post(req.body);
  post.save((err, post) => {
    if (err) return next(err);
    res.status(201).json(post);
  });
}