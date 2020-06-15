
var form = document.getElementById("login-form");
function submitForm(){
  event.preventDefault();
var username=event.target.username.value;
var password=event.target.password.value;
$(function(){
  $.ajax({
    type:'POST',
    async:false,
    url:'/login',
    data:{username:username,password:password} ,
    success :function(res){
      if(res.success===false)
      alert(res.message);
      else {
        window.location.href='/profile.html';

      }
    },
    error :function(req,res){
       alert(res);
       window.location.href='/login.html';
    }
  });
});
}
