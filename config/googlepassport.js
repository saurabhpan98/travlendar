const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');
const keys=require('./keys');
const User=require('../model/user');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy({
    callbackURL: 'https://travlendarsks.herokuapp.com/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  },(accessToken, refreshToken, profile, done)=> {
    User.findOne({googleId: profile.id}).then((currentUser) =>{
      if(currentUser){
        // already have the username
        console.log('already exists');
        done(null,currentUser);
      }
      else{
        //create a new username
        new User({
          username: profile.emails[0].value,
          name: profile.displayName,
          phone: "",
          password: "",
          googleId: profile.id,
          githubId: "",
          facebookId: "",
          thumbnail: profile.photos[0].value
        }).save().then((newUser)=> {
          console.log('new user is created');
          done(null,newUser);
        });
        //console.log(profile)
      }
    })
  }
))
