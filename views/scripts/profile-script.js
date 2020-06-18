/*$(function(){
    $.ajax({
        type: "GET",
        url: "/get-profile",
        success: function(user){
            if(user.username){
                if(user.thumbnail == ""){
                    //just print name
                    $('.navbar-brand').html(user.name);
                }
                else{
                    //print image with name 
                    var img = `<img src=${user.thumbnail} width="30" height="30" class="d-inline-block align-top" alt="Profile pic"></img>`;
                    $('.navbar-brand').html(img + user.name);
                }
            }
        },
        error: function(err){
            console.log(err)
        }
    })
})*/