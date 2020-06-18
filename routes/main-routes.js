const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');

const { forwardAuthenticated } = require('../config/auth');

router.get('/', (req, res) =>{
    //res.sendFile('public/index.html', {root: path.dirname(__dirname)});
    res.render('index', {user: req.user});
})

router.get('/about', (req, res) =>{
    //res.sendFile('public/about.html', {root: path.dirname(__dirname)});
    res.render('about', {user: req.user});
})

router.get('/team', (req, res) =>{
    //res.sendFile('public/team.html', {root: path.dirname(__dirname)});
    res.render('team', {user: req.user});
})

router.get('/profile', (req,res) =>{
    if(req.user){
        //res.sendFile('public/profile.html', {root: path.dirname(__dirname)});
        res.render('profile', {user: req.user});
    }
    else {
        res.redirect('/login');
    }
});

module.exports = router;