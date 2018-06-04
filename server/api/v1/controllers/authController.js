const passport = require('passport');

const User = require('../models/user');
const errorHandler = require('../utilities/errorHandler');
const tokenUtils = require('../utilities/token');
const config = require('../../../config/config');


exports.user_create_post = function(req, res, next) {

  console.log('user_create_post')
  const user = new User(req.body);
  user.save((err, post) => {
    console.log(err)
    if (err) return next(err);
    res.status(201).json(user);
  });
  console.log(user)
  console.log(user.id);
  console.log(user.email);
  console.log(user.localProvider.password);
  
}

exports.user_auth_local_post = function(req, res, next) {
  passport.authenticate('local', config.jwtSession, function (err, user, info) {
    
    console.log("user", user);
    console.log("info", info);
    console.log("err", err);
    if (err) { return next(err); }
    if (!user) { 
      return res.status(401).json({
        'message': 'User Not Authenticated'
      });
    }
    req.auth = {
      id: user.id
    };
    
    const token = tokenUtils.createToken(req.auth);
    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        password: user.localProvider.password,
        isAdmin: user.isAdmin
      },
      token: `${token}`,
      strategy: 'local'
    });
  })(req, res, next);
}

exports.user_auth_facebook_post = function(req, res, next) {
  passport.authenticate('facebook-token', config.jwtSession, function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { 
      return res.status(401).json({
        'message': 'User Not Authenticated'
      });
    }
    req.auth = {
      id: user.id
    };
    const token = tokenUtils.createToken(req.auth);
    res.status(200).json({
      user: {
        id: user.id,
        email: user.email
      },
      token: `${token}`,
      strategy: 'facebook-token'
    });
  })(req, res, next);
}
