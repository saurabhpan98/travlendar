var User=require('../model/event');
var Event=require('../model/event');
const express = require('express');
const router = express.Router();

router.get('/todays-event', (req, res) =>{
    if(req.user){
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        Event.find({userId: req.user._id, meetingDate: today})
            .then(events =>{
                events.sort(function(a,b){
                    return new Date(a.meetingStartDate) - new Date(b.meetingStartDate);
                });
                //console.log(events);

                res.json({events: events, success: true});
            })
            .catch(err =>{
                res.json({message: err, success: false});
            })
    }
    else{
        res.redirect('/login');
    }
})
//todays-event

module.exports = router;
