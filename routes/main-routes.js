const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');

const { forwardAuthenticated } = require('../config/auth');

router.get('/', (req, res) =>{
    res.sendFile('public/index.html', {root: path.dirname(__dirname)});
})

router.get('/about', (req, res) =>{
    res.sendFile('public/about.html', {root: path.dirname(__dirname)});
})

router.get('/team', (req, res) =>{
    res.sendFile('public/team.html', {root: path.dirname(__dirname)});
})

router.get('/profile', (req,res) =>{
    if(req.user){
        res.sendFile('public/profile.html', {root: path.dirname(__dirname)});
    }
    else {
        res.redirect('/login');
    }
});

router.get('/check-login', (req, res) =>{
    if(req.user){
        res.json({loggedIn: true});
    }
    else{
        res.json({loggedIn: false});
    }
})

module.exports = router;