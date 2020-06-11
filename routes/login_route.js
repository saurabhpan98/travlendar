var express = require('express');
var router = express.Router();
var passport = require('passport');

//models
var User = require('../dbModels/userModel');

var { forwardAuthenticated } = require('../config/auth');

router.get('/login', forwardAuthenticated , function(req, res){
    ////console.log(req.user);
  if(req.user){
    res.redirect('/');
  }
  else{
    res.render('login');
  }
})

router.post('/login', function(req, res, next){
  passport.authenticate('local', {
    successRedirect: '/personalBlog',
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
