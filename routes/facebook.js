const router = require('express').Router();
const passport=require('passport');
const FacebookStrategy = require('passport-facebook');
const facebook = require('../config/facebookpassport.js');

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
  res.redirect('/profile');
});

module.exports = router;
