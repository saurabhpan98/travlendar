const router = require('express').Router();
const passport=require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const github = require('../config/githubpassport.js');

router.get('/github', passport.authenticate('github'));

router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
  res.redirect('/profile');
});

module.exports = router;
