var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Load User model
var User = require('../model/user');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, (username, password, done) => {
      // Match user
      User.findOne({username: username}).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, function(err, isMatch){
          if(err)
            throw err;
          if(isMatch){
            return done(null, user);
          }
          else{
            return done(null, false, {message: 'Password incorrect'});
          }
        })
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
