var allUsers = [];

$(function(){
  $.ajax({
    type: "GET",
    async: false,
    url: "/getAllUsers",
    success: function(result){
      allUsers = result;
    }
  })
})

var name = document.getElementById("name").value;
var phone = document.getElementById("phone").value;
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
var submit =document.getElementById("submit");

//checking if user already exist-------------------------
username.onfocusout = function(){
  for(var i = 0; i<allUsers.length; i++){
    if(allUsers[i].username == username.value){
      event.preventDefault();
      username.style.border = "solid 1.6px red";
    }
  }
}

username.onfocus = function(){
  var color = username.style.borderColor; //current border color of Username input
  if(color == "red"){
    username.style.border = "solid 1px lightgrey";
  }
}
submit.addEventListener('click',()=>{
     
       if(username.style.borderColor == "red"){
           event.preventDefault();
        }
       
       $.ajax({
        type: "POST",
        async: false,
        url: "/signup",
        data: {
          name     :name,
          phone    :phone,
          username :username,
          passowrd :password
        },
        success: function(result){
        /* this needs to be done by saurabh*/
        }


      })
})

