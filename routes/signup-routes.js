var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose =require('mongoose');
var passport =require('passport');
var bcrypt = require('bcryptjs');
var LocalStrategy = require("passport-local");


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

var User = require('../Models/userModel');

router.post('/signup', function(req, res){
    var newUser = new User({
        name    :req.body.name,
        phone   :req.body.phone,
        username:req.body.username,
        password:req.body.password,
      
    });
  
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err)
          throw err;
        newUser.password = hash;
        newUser.save().then(function(result){
        res.redirect('/login');
        }).catch(function(err){
          console.log(err)
        })
      })
    })
  })
module.exports = router;