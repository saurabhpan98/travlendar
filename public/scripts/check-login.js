$(function(){
    $.ajax({
        type: "GET",
        url: "/check-login",
        success: function(result){
            if(result.loggedIn){
                $('#login').remove();
                $('#signup').remove();
            }
            else{
                $('#profile').remove();
            }
        }
    })
})