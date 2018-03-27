const Post = require('../models/post');

exports.get_posts = function(req, res) {
  const query = Post.find().populate('_category').populate('blogs');
  query.sort( { created_at: -1 } );
  query.exec((err, posts) => {
    if (err) return handleError(err);
    console.log(posts);
    return res.json(posts);
  });
}