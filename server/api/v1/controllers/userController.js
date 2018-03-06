const User = require('../models/user');
const Medium = require('../models/medium');

exports.index = function(req, res) {
  const user = new User({firstName: 'Philippe'});
  user.thumbnail = new Medium({reference:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/153290/profile/profile-512.jpg?1', type:'image_abs'})
  res.json(user);
}