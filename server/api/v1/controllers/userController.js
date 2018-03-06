const User = require('../models/user');

exports.index = function(req, res) {
  const user = new User({name: 'Bol'});
  res.json(user);
}