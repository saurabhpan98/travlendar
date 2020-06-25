const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
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

passport.use(new FacebookStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: "http://localhost:5000/facebook/redirect",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({facebookId: profile.id}).then((currentUser) =>{
        if(currentUser){
          // already have the username
          console.log('already exists');
          done(null,currentUser);
        }
        else{
          //create a new username
          new User({
            username: profile.displayName,
            name: profile.displayName,
            phone: "",
            password: "",
            googleId: "",
            githubId: "",
            facebookId: profile.id,
            thumbnail: profile.photos[0].value
          }).save().
            then((newUser)=> {
                console.log('new facebook user is created');
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