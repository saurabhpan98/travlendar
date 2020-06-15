const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.sendFile('__dirname' + '/public/index.html');
})

router.get('/about.html', (req, res) =>{
    res.sendFile('__dirname' + '/public/about.html');
})

router.get('/team.html', (req, res) =>{
    res.sendFile('__dirname' + '/public/team.html');
})
router.get('/profile.html',(req,res) =>{
    if(req.user){
        res.sendFile('__dirname' + '/public/profile.html');
    }
    else res.redirect('/login.html');
});
module.exports = router;