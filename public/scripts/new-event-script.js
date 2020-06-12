function getLocation(){
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