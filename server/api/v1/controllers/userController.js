const User = require('../models/user');

exports.index = function(req, res) {
  const user = new User({name: 'Philippe'});
  res.json(user);
}