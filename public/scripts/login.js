var email=document.getElementById("email").value();
var password=document.getElementById("password").value();

$(function(){
  $.ajax({
    type:'POST',
    async:false,
    url:'/login',
    data:{email:email,password:password};
    success:function(data){
      console.log("login completed");
    }
    error:function(req,res){
      res.sendFile(__dirname+'/login');
    }
  });
});
