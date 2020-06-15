const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');

router.get('/get-profile', (req, res) =>{
    if(req.user){
        res.json(req.user);
    }
    else{
        res.json({message: "Login to see deatils", success: false});
    }
})

router.get('/new-event', (req, res) =>{
    if(req.user)
        res.sendFile('public/new-event.html', {root: path.dirname(__dirname)});
    else
        res.redirect('/login');
})

module.exports = router;