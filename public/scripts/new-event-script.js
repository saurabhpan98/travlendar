/*function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
    else{
        alert("Geolocation is not supported here")
    }
}

function showPosition(position){
    document.getElementById('start_location').value = "Your location";
    console.log("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude)
}

function showError(error){
    switch(error.code){
        case error.PERMISSION_DENIED: 
            console.log("User denied request for location")
            break; 
        case error.POSITION_UNAVAILABLE: 
            console.log("Location information is unavailable")
            break; 
        case error.TIMEOUT: 
            console.log("Request to get location timed out")
            break; 
        case error.UNKNOWN_ERROR: 
            console.log("Unknown error occurred")
            break; 
    }
}

getLocation();
*/

$(function(){
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
})