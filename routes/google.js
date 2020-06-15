const router = require('express').Router();
const passport=require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const google = require('../config/googlepassport.js');


router.get('/google', passport.authenticate('google', {
  scope: ['email', 'profile']
}));

/*--- gooogle callback function----*/

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/profile');
});


module.exports = router;
