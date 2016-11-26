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
  //------------------------------------------------//

  //click event, that will make an ajax get request for the specific trip, then show trip, by ID

  //if successful, then have a pop-up with trips info.
  $("#trips").on('click','a', function(event){
    event.preventDefault();

    $('#trip_profile').show(); // pop up window
    var tripUrl = $(this).attr('href');
    // console.log("I work I do!");

    $.get(url, successCallBack);
    // console.log("I work I do!");

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
      console.log('sent trip info over');
    }).fail(function(){
      alert("failed.");
    });

  });
  //------------------------------------------------//

  var callback = function() {
    console.log("You've been succesful friend, in callback");
  };

  //------------------------------------------------//
// this was what a succeful post to reservation looked like.
// https://trektravel.herokuapp.com/trips/1/reserve?name=Ginda DAVIS&age=3000&email=what@email.com

  $('form').submit('click', function(e){
    e.preventDefault();


    var theTripsId = $('#theTripsId').attr('value');
    var url = "https://trektravel.herokuapp.com/trips/" + theTripsId + "/" + "reserve" + "?" + "name=" + this.name + "&age="+ this.age + "&email=" + this.email;

    // var url = $(this).attr("action");
    // retrieve the action from the form.
    //set the theTripsId to be the value from attribute in the form.
    // var theTripsId = $('#theTripsId').attr('value');

    var formData = $(this).serialize();
    // console.log("theTripsId:" + theTripsId);

    $.post(url, formData, function(response){
      $('#message').html('<p>Your spot has been reserved! </p>');

      $('#message').show();
        console.log("response " + response);

    }).fail();{
      $('#message').html('<p>Reservation Failed</p>');
    }

  });

}); // end of document.ready()
