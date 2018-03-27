const Category = require('../models/category');

exports.get_categories = function(req, res) {
  const query = Category.find().populate('posts');
  query.sort( { created_at: -1 } );
  query.exec((err, categories) => {
    if (err) return handleError(err);
    return res.json(categories);
  });
}