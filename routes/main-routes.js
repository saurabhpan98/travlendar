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

module.exports = router;