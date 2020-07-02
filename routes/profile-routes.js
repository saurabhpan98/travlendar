const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');

//require models
const Event = require('../model/event.js');
const { findOneAndDelete } = require('../model/event.js');

router.get('/new-event', (req, res) =>{
    if(req.user)
        res.render('new-event', {user: req.user});
        //res.sendFile('public/new-event.html', {root: path.dirname(__dirname)});
    else
        res.redirect('/login');
})

router.post('/new-event', (req, res)=>{
    if(req.user){

        Event.find({userId: req.user._id, meetingDate: req.body.meetingDate})
            .then(events =>{
                var conflictEvents=[];
                var isConflict = false;
                console.log(events);
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
                console.log(conflictEvents);
                if(isConflict){
                    console.log('conflict events')
                    res.json({message: "Event conflict", success: false,conflictMeetings :conflictEvents});
                }
                else{
                    console.log(req.body.meetingStartDate);
                    console.log(new Date())
                    var d = new Date(req.body.meetingStartDate + " " + req.body.meetingStartTime);
                    //console.log(d)
                    //d.setHours(d.getHours() + 5);
                    //console.log(d)
                    //d.setMinutes(d.getMinutes() + 30);
                    //console.log(d)
                    var isodate = d.toISOString();
                    console.log(isodate)
                    new Event({
                        userId: req.user._id,
                        event: req.body.event,
                        meetingStartDate: isodate,
                        meetingDate: req.body.meetingStartDate,
                        meetingStartTime: req.body.meetingStartTime,
                        meetingEndTime: req.body.meetingEndTime,
                        location: req.body.location,
                        extraInfo: req.body.extraInfo
                    }).save()
                        .then(result =>{
                            console.log(result)
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
                events.sort(function(a,b){
                    return new Date(a.meetingStartDate) - new Date(b.meetingStartDate);
                  });
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

//delete event
router.post('/delete-event', (req, res) =>{
    Event.findOneAndDelete({_id: req.body.deleteId})
        .then(deletedEvent =>{
            console.log(`Event ${deletedEvent.event} deleted`);
            res.json({message: 'Event deleted', success: true});
        })
        .catch(err =>{
            console.log(err);
            res.json({message: err, success: false});
        })
})

router.get('/profile/:id', (req, res) =>{
    //console.log(req.params.id)
    if(req.user){
        res.render('current-event', {user: req.user});
    }
    else{
        res.redirect('/login');
    }
})

router.post('/profile/:id', (req, res) =>{
    if(req.user){
        Event.findOne({_id: req.params.id})
            .then(event =>{
                res.json({event, success: true});
            })
            .catch(err =>{
                res.json({message: err, success: false});
            })
    }
    else{
        res.redirect('/login');
    }
})
//edit events
router.get('/editEvent/:id',(req,res)=>{
  if(req.user){
    res.render('edit-event',{user:req.user});
  }
  else{
    res.redirect('/login');
  }
})
router.post('/editEvent/:id', (req, res) =>{
    if(req.user){
        Event.findOne({_id: req.params.id})
            .then(event =>{
                res.json({event, success: true});
            })
            .catch(err =>{
                res.json({message: err, success: false});
            })
    }
    else{
        res.redirect('/login');
    }
})

router.post('/update-event', (req, res) =>{
  if(req.user){
    Event.find({userId: req.user._id, meetingDate: req.body.newevent.meetingDate})
        .then(events =>{
            var conflictEvents=[];
            var isConflict = false;
            events.forEach(event =>{
                //case 1
                if(req.body.newevent.meetingStartTime <= event.meetingStartTime && req.body.newevent.meetingEndTime >= event.meetingStartTime && req.body.newevent.meetingEndTime <= event.meetingEndTime && req.body.updateId!=event._id){
                    conflictEvents.push(event);
                    isConflict = true;
                }

                //case 2
                else if(req.body.newevent.meetingStartTime >= event.meetingStartTime && req.body.newevent.meetingStartTime <= event.meetingEndTime && req.body.newevent.meetingEndTime >= event.meetingEndTime && req.body.updateId!=event._id){
                    conflictEvents.push(event);
                    isConflict = true;
                }

                //case 3
                else if(req.body.newevent.meetingStartTime >= event.meetingStartTime && req.body.newevent.meetingEndTime <= event.meetingEndTime && req.body.updateId!=event._id){
                    conflictEvents.push(event);
                    isConflict = true;
                }

                //case 4
                else if(req.body.newevent.meetingStartTime <= event.meetingStartTime && req.body.newevent.meetingEndTime >= event.meetingEndTime && req.body.updateId!=event._id){
                    conflictEvents.push(event);
                    isConflict = true;
                }
            })

            if(isConflict){
                res.json({message: "Event conflict", success: false,conflictMeetings :conflictEvents});
            }
            else{
                console.log(req.body.newevent.meetingStartDate);
                var d = new Date(req.body.newevent.meetingStartDate + " " + req.body.newevent.meetingStartTime);
                //d.setHours(d.getHours() + 5);
                //d.setMinutes(d.getMinutes() + 30);
                var isodate = d.toISOString();
                new Event({
                    userId: req.user._id,
                    event: req.body.newevent.event,
                    meetingStartDate: isodate,
                    meetingDate: req.body.newevent.meetingStartDate,
                    meetingStartTime: req.body.newevent.meetingStartTime,
                    meetingEndTime: req.body.newevent.meetingEndTime,
                    location: req.body.newevent.location,
                    extraInfo: req.body.newevent.extraInfo
                }).save()
                    .then(result =>{
                      Event.findOneAndDelete({_id: req.body.updateId})
                        .then(deleted =>{
                          res.json({message: "Event formed", success: true});
                        })
                        .catch(err =>{
                          res.json({message: err, success: false});
                        })
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
    res.redirect('/login');
  }
})



router.get('/timeline', (req, res) =>{
    if(req.user){
        res.render('timeline', {user: req.user});
    }
    else{
        res.redirect('/login');
    }
})

module.exports = router;
