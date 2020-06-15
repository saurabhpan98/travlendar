var express = require('express');
var router = express.Router();
var passport = require('passport');
const path = require('path');

//models
var User = require('../model/user');

var { forwardAuthenticated } = require('../config/auth');

router.get('/login', forwardAuthenticated , function(req, res){
  //login
  res.sendFile('public/login.html', {root: path.dirname(__dirname)})
})

router.post('/login', function(req, res, next) {

  // generate the authenticate method and pass the req/res
  passport.authenticate('local', function(err, user, info) {
    //console.log('why');
    if (err) { return next(err); }
    if (!user)return  res.send({success:false,message:'Authentication failed'});

    // req / res held in closure
    
    req.login(user, function(err) {
      if (err) {return next(err); }
      
       return res.send({success:true,message:'Authentication successful'});
    });

  })(req, res, next);

});


// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


module.exports = router;
