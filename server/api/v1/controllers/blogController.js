const Blog = require('../models/blog');

exports.get_blogs = function(req, res) {
  const query = Blog.find();
  query.sort( { created_at: -1 } );
  query.exec((err, blogs) => {
    if (err) return handleError(err);
    return res.json(blogs);
  });
}