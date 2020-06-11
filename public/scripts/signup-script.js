

var name = document.getElementById("name").value;
var phone = document.getElementById("phone").value;
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
var submit =document.getElementById("submit");


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

