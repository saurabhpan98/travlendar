const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');

//require models 
const Event = require('../model/event.js');

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

router.post('/new-event', (req, res)=>{
    if(req.user){
        Event.find({userId: req.user._id, meetingStartDate: req.body.meetingStartDate})
            .then(events =>{
                var isConflict = false; 
                events.forEach(event =>{
                    //case 1
                    if(req.body.meetingStartTime <= event.meetingStartTime && req.body.meetingEndTime >= event.meetingStartTime && req.body.meetingEndTime <= event.meetingEndTime){
                        isConflict = true;
                    } 

                    //case 2
                    if(req.body.meetingStartTime >= event.meetingStartTime && req.body.meetingStartTime <= event.meetingEndTime && req.body.meetingEndTime >= event.meetingEndTime){
                        isConflict = true; 
                    }

                    //case 3
                    if(req.body.meetingStartTime >= event.meetingStartTime && req.body.meetingEndTime <= event.meetingEndTime){
                        isConflict = true;
                    }

                    //case 4
                    if(req.body.meetingStartTime <= event.meetingStartTime && req.body.meetingEndTime >= event.meetingEndTime){
                        isConflict = true; 
                    }
                })

                if(isConflict){
                    res.json({message: "Event conflict", success: false});
                }
                else{
                    new Event({
                        userId: req.user._id,
                        event: req.body.event,
                        meetingStartDate: req.body.meetingStartDate,
                        meetingStartTime: req.body.meetingStartTime,
                        meetingEndDate: req.body.meetingEndDate,
                        meetingEndTime: req.body.meetingEndTime,
                        location: req.body.location,
                        extraInfo: req.body.extraInfo 
                    }).save()
                        .then(result =>{
                            res.json({message: "Event formed", success: true});
                        })
                        .catch(err =>{
                            res.json({message: err, success: false});
                        })
                }
            })
            .catch(err =>{
                res.json({message: err, success: false});
            })
    }
    else{
        res.json({message: "Not authenticated. Login to continue..."});
    }
})

router.get('/myevents', (req, res) =>{
    if(req.user){
        Event.find({})
            .then(events =>{
                res.json({...events, len: events.length, success: true});
            })
            .catch(err =>{
                res.json({message: err, success: false});
            })
    }
    else{
        res.redirect('/login');
    }
})

module.exports = router;