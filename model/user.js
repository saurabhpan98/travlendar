var mongoose=require("mongoose");

var userSchema=new mongoose.Schema({
  username:{
    type:String,
    required:true;
  },
  name:{
    type:String,
    required:true
  },
  phone:{
    type:Number,
    required:true
  }
  password:{
    type:String,
    required:true
  }
});

var User=mongoose.model("User",userSchema);

module.exports=User;
