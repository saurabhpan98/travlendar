var mongoose=require('mongoose');

var eventSchema=new mongoose.Schema({
  event:{
    type:String
  },
  meetingDate:{
    type:Date
  },
  meetingTime:{
    type:String
  },
  meetingEndDate:{
    type:Date
  },
  meetingEndTime:{
    type:String
  },
  location:{
    type: [Number], index: { type: '2dsphere', sparse: true}
  },
  extraInfo:{
    type:String
  }
});

var Event=mongoose.model('Event',eventSchema);

module.exports=Event;
