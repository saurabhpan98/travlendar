var name = document.getElementById("name").value;
var phone = document.getElementById("phone").value;
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
var submit =document.getElementById("submit");
var form = document.getElementById("signup-form");

function submitForm(){
  event.preventDefault();
  var user = {
    name: event.target.name.value,
    phone: event.target.phone.value,
    username: event.target.username.value,
    password: event.target.password.value
  };

  $('#submit').text("Signing up...");
  $('#submit').prop('disabled', true);

  $(function(){
    $.ajax({
      type: "POST",
      async: false,
      url: "/signup",
      contentType: "application/json",
      data: JSON.stringify(user),
      success: function(result){
        var alertBox = document.getElementById('alert-box');
        var alert; 
        if(result.success){
          form.name.value = null; 
          form.username.value = null; 
          form.phone.value = null;
          form.password.value = null; 
          alert = '<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Signup successful.</strong> You can <a href="/login.html" class="alert-link"> Login </a> now.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
        }
        else if(result.message == "user already present"){
          alert = '<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>User already present.</strong> <a href="/login.html" class="alert-link"> Login </a> instead.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
        }
        else{
          alert = '<div class="alert alert-danger alert-dismissible fade show" role="alert">Signup not successful. Try again. <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
        }

        alertBox.innerHTML += alert;
        $('#submit').text("Signup");
        $('#submit').prop('disabled', false); 
      }
    })
  })
}

/*
submit.addEventListener('click',()=>{
  event.preventDefault();
  var form = document.getElementById('signup-form');
  var user = {
    name: form.name.value,
    phone: form.phone.value,
    username: form.username.value,
    passowrd: form.password.value
  };
  if(user.name == "" || )
  $(function(){
    $.ajax({
      type: "POST",
      async: false,
      url: "/signup",
      contentType: "application/json",
      data: JSON.stringify(user),
      success: function(result){
        var alertBox = document.getElementById('alert-box');
        var alert; 
        if(result.success){
          alert = '<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Signup successful.</strong> You can <a href="/login.html" class="alert-link"> Login </a> now.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
        }
        else if(result.message == "user already present"){
          alert = '<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>User already present.</strong> <a href="/login.html" class="alert-link"> Login </a> instead.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
        }
        else{
          alert = '<div class="alert alert-danger alert-dismissible fade show" role="alert">Signup not successful. Try again. <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
        }

        alertBox.innerHTML += alert; 
      }
    })
  })      
})*/