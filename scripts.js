//scripts.js

$(document).ready(function(){
  var url = "https://trektravel.herokuapp.com/trips";

  var successCallBack = function(response) {
    // console.log("response: ",response);
    // console.log("success!!");
    // challenge from kai: try and turn this

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

    //display all trips
    for(var i = 0; i < response.length; i++) {
      $('#trips').append("<h3><a href=" + url + "/" + response[i].id + ">" + response[i].name + "</a></h3>");
    }


  };
  $('#load').on('click',function(){
    $.get(url, successCallBack);
  });


  //click event, that will make an ajax get request for the specific trip, then show trip, by ID

  //if successful, then have a pop-up with trips info.
  $("#trips").on('click','a', function(event){
    event.preventDefault();

    $('#trip_profile').show(); // pop up window
    var tripUrl = $(this).attr('href');

    $.get(url, successCallBack);
    // console.log("I work I do!");

    // response could also be changed to be pets. all subsequent calls will be changed to pet as wwell.

    // you can also pass a url doesn't exist and see that it doesnt work
    $.get(tripUrl, function(trip){
      // console.log("this is-->",response.name);  // returns name each time clicked on by user.

      $('#name').text("Name: " + trip.name);

      $("#destination").text("Destination: " + trip.destination);

      $('#continent').text("Continent: " + trip.continent);

      $('#weeks').text("Weeks: " + trip.weeks);

      $("#cost").text("Trip Cost: $ " + trip.cost);

      $("#destination").text("Destination: " + trip.destination);

      $("#id").text("ID#: " + trip.id);

      $("#about").text("About: " + trip.about);

      $('#theTripsId').attr('value', trip.id);


    }).always(function(){
      // $("#message").text("something happened.");
      console.log('you are done');
    }).fail(function(){
      alert("failed.");
    });

  });

  var callback = function() {
    console.log("You've been succesful friend");
        console.log('trips id'+ theTripsId);
  };

  $('form').submit('click', function(e){
    e.preventDefault();

    //set the theTripsId to be the value from attribute in the form.
    var theTripsId = $('#theTripsId').attr('value');
    console.log('trips id'+ theTripsId);


    var url = "https://trektravel.herokuapp.com/trips/" + theTripsId + "/" +"reserve";
    var formData = $(this).serialize();

    $.post(url, function(response){
      $('#message').html('<p>Your spot has been reserved! </p>');
      $('#message').show();

    });

  });

}); // end of document.ready()
