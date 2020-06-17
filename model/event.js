var mongoose=require('mongoose');

var eventSchema=new mongoose.Schema({
  userId: {
    type: String,
  },
  event:{
    type:String
  },
  meetingStartDate:{
    type:Date
  },
  meetingStartTime:{
    type:String
  },
  meetingEndTime:{
    type:String
  },
  location:{
    type: String
  },
  extraInfo:{
    type:String
  }
});

var Event=mongoose.model('Event',eventSchema);

module.exports=Event;
