var username=document.getElementById("user").value();
var password=document.getElementById("password").value();

$(function(){
  $.ajax({
    type:'POST',
    async:false,
    url:'/login',
    data:{username:username,password:password};
    success:function(data){
      alert("successfully logged in");
      var link=__dirname+'/event';
      window.location.href=link;
    }
    error:function(req,res){
      alert("login unsuccessful");
      var link=__dirname+'/routes/'+'/login';
      window.location.href=link;
    }
  });
});
