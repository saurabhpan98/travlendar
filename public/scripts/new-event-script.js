//variable declarations 
var transportForm = document.getElementById('transportation_mode_form');
var eventForm = document.getElementById('event_form');
var eventSubmit = document.getElementById('event_submit');
var eventName = document.getElementById('event_name');
var extraNote = document.getElementById('extra_note');
var newEvent;

eventSubmit.addEventListener("click", function(){
    let form = eventForm;
    let transportMode = transportForm.mode.value;
    if(eventName.value == "" || form.from_date.value == "" || form.from_time.value == "" || form.until_date.value == "" || form.until_time.value == "" || form.event_location.value == "" || form.start_location.value == "" || form.departure_date.value == "" || form.departure_time.value == ""){
        //alert("Fill all details")
        document.getElementById('show_alert').innerHTML += '<div class="alert alert-warning alert-dismissible fade show text-center" role="alert">You should fill all details above.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
    }
    else{
        newEvent = {
            eventName: eventName.value,
            fromDate: form.from_date.value,
            fromTime: form.from_time.value,
            untilDate: form.until_date.value,
            untilTime: form.until_time.value,
            eventLocation: form.event_location.value,
            startLocation: form.start_location.value,
            departureDate: form.departure_date.value,
            departureTime: form.departure_time.value,
            extraNote: extraNote.value
        };

        console.log(newEvent)
    }
})



