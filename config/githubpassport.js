const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const keys = require('./keys');
const User = require('../model/user');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new GitHubStrategy({
    clientID: keys.github.clientID,
    clientSecret: keys.github.clientSecret,
    callbackURL: "http://localhost:5000/github/redirect"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({githubId: profile.id}).then((currentUser) =>{
        if(currentUser){
          // already have the username
          console.log('already exists');
          done(null,currentUser);
        }
        else{
          //create a new username
          new User({
            username: profile.username,
            name: profile.username,
            phone: "",
            password: "",
            googleId: "",
            githubId: profile.id,
            facebookId: "",
            thumbnail: profile.photos[0].value
          }).save().
            then((newUser)=> {
                console.log('new user is created');
                done(null,newUser);
            })
            .catch(err =>{
                console.log(err);
            })
          //console.log(profile)
        }
      })
  }
));