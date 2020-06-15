var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose =require('mongoose');
var passport =require('passport');
var bcrypt = require('bcryptjs');
var LocalStrategy = require("passport-local");
const path = require('path');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

var User = require('../model/user');

router.get('/signup', (req, res) =>{
  if(req.user)
    res.redirect('/profile');
  else
    res.sendFile('public/signup.html', {root: path.dirname(__dirname)});
})

router.post('/signup', function(req, res){
    var newUser = new User({
        name    :req.body.name,
        phone   :req.body.phone,
        username:req.body.username,
        password:req.body.password

    });

    /*User.findOne({username: newUser.username})
      .then(user => {
        if(!user){  //user not present
          newUser.save()
            .then(function(result){
            //res.redirect('/login');
              res.json({message: 'Signup successful. Go to login', success: true});
            }).catch(function(err){
              res.json({message: 'Signup not successful', success: false});
            })
        }
        else{  //user already present
           res.json({message: 'user already present', success: false});
        }
      })
      .catch(error => {
        res.json({message: error, success: false});
      })*/

    User.findOne({username: newUser.username})
      .then(user => {
        if(!user){  //user not present
          bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(newUser.password, salt, function(err, hash){
              if(err)
                //throw err;  s
                console.log(err)
              newUser.password = hash;
              newUser.save()
                .then(function(result){
                //res.redirect('/login');
                  res.json({message: 'Signup successful. Go to login', success: true});
                }).catch(function(err){
                  console.log(err)
                  res.json({message: 'Signup not successful', success: false});
                })
            })
          })

        }
        else{  //user already present
           res.json({message: 'user already present', success: false});
        }
      })
      .catch(error => {
        res.json({message: error, success: false});
      })
  })
module.exports = router;
