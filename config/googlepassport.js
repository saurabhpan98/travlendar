const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');
const keys=require('./keys');
const User=require('../model/user');

paaport.serializeUser((user,done)=>{
  done(null,user.id);
});
passport.deserializeUser((id,done){
  User.findById(id).then((user)=>{
    done(null,user);
  });
});

passport.use(
  new GoogleStrategy({
    callbackURL:'/google/callback',
    clientID:keys.google.clientID,
    clientSecret:keys.google.clientSecret
  },(accessToken,refreshToken,profile,done)=> {
    User.findOne({googleId:profile.id}).then((currentUser)=> {
      if(currentUser){
        // already have the username
        console.log('already exists');
        done(null,currentUser);
      }
      else{
        //create a new username
        new User({
          username:profile.type,
          googleId:profile.id,
          name:profile.displayName+' ' +profile.middleName+profile.familyName,
          thumbnail:profile._json.image.url
        }).save().then((newUser)=> {
          console.log('new user is created');
          done(null,newUser);
        });
      }
    })
  }
);
)
