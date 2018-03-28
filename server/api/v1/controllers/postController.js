const Post = require('../models/post');
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