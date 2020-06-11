var express = require('express');
var router = express.Router();
var passport = require('passport');

//models
var User = require(/*Model Path*/);

var { forwardAuthenticated } = require('../config/auth');

router.get('/login', forwardAuthenticated , function(req, res){
  if(req.user){
    res.redirect('/profile');
  }
  else{
    res.sendFile(__dirname+'/login');
  }
})

router.post('/login', function(req, res, next){
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
})

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});


module.exports = router;
