const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');

//require models 
const Event = require('../model/event.js');
const { findOneAndDelete } = require('../model/event.js');

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
        res.render('new-event', {user: req.user});
        //res.sendFile('public/new-event.html', {root: path.dirname(__dirname)});
    else
        res.redirect('/login');
})

router.post('/new-event', (req, res)=>{
    if(req.user){
       
        Event.find({userId: req.user._id, meetingStartDate: req.body.meetingStartDate})
            .then(events =>{
                var conflictEvents=[];
                var isConflict = false; 
                events.forEach(event =>{
                    //case 1
                    if(req.body.meetingStartTime <= event.meetingStartTime && req.body.meetingEndTime >= event.meetingStartTime && req.body.meetingEndTime <= event.meetingEndTime){
                        conflictEvents.push(event);
                        isConflict = true;
                    } 

                    //case 2
                    else if(req.body.meetingStartTime >= event.meetingStartTime && req.body.meetingStartTime <= event.meetingEndTime && req.body.meetingEndTime >= event.meetingEndTime){
                        conflictEvents.push(event);
                        isConflict = true; 
                    }

                    //case 3
                    else if(req.body.meetingStartTime >= event.meetingStartTime && req.body.meetingEndTime <= event.meetingEndTime){
                        conflictEvents.push(event);
                        isConflict = true;
                    }

                    //case 4
                    else if(req.body.meetingStartTime <= event.meetingStartTime && req.body.meetingEndTime >= event.meetingEndTime){
                        conflictEvents.push(event);
                        isConflict = true; 
                    }
                })

                if(isConflict){
                    res.json({message: "Event conflict", success: false,conflictMeetings :conflictEvents});
                }
                else{
                    new Event({
                        userId: req.user._id,
                        event: req.body.event,
                        meetingStartDate: req.body.meetingStartDate,
                        meetingStartTime: req.body.meetingStartTime,
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
        Event.find({userId: req.user._id})
            .then(events =>{
                events.sort(function(a,b){return a.meetingStartTime.localeCompare(b.meetingStartTime);});
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

router.post('/deleteconflicts', (req, res)=>{
    //delete conflict events
    let conflicts=req.body.conflicts;
    
    conflicts.forEach(conflict =>{
        Event.findOneAndDelete({_id :conflict},(err)=>{
            if(err)res.send(err);
        })
    })
    res.json({message : "Events successfully Deleted"});


})

module.exports = router;