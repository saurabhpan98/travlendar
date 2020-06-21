var User=require('../model/event');
var Event=require('../model/event');
const express = require('express');
const router = express.Router();

router.get('/todays-event', (req, res) =>{
    if(req.user){
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      today = yyyy + '-' + mm + '-' + dd;
      //console.log(today)
        Event.find({userId: req.user._id, meetingStartDate: today})
            .then(events =>{
                events.sort(function(a,b){
                    return a.meetingStartTime.localeCompare(b.meetingStartTime);

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
