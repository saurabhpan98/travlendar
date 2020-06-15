var LocalStrategy=require('passport-local').Strategy;
var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');
const passport=require('passport');
const keys=require('./keys');

/* ----loading user model----*/
var user=require('../model/user');

passport.serializeUser(function(user,done){
  done(null,user.id);
});

passport.deserializeUser(function(id,done){
  User.findById(id,function(err,user){
    done(err,user);
  })
});

module.exports=function(passport){
  passport.use(
    new LocalStrategy({usernameField:'username',passwordField:'password'}(username,password,done)=>{
      /*--- match username ---*/
      User.findOne({username:username}.then(user=>{
        if(!user){
          return done(null,false);
        }
        /*---match password---*/
        bcrypt.compare(password,user.password,(err,isMatch)=>{
          if(err)throw err;

          if(isMatch){
            return done(null,user);
          }
          else{
            return done(null,false);
          }
        });


      })
      .catch(err =>console.log(err));
    })
  );
}
