$(document).ready(function() {
  //Base url for get & post requests
  var baseUrl = "https://trektravel.herokuapp.com/trips";

  //Function to iterate through trips and create a button for each
  var getTrips = function (trips){
    for (var i = 0; i < trips.length; i++) {
      $(".list-trips").append("<div><button class='trip'>" + trips[i].id + "</button></div>");
    }
  };

  //Function to display the confirmation section
  var confirmationAlert = function(){
    $(".confirmation").show();
  };

  //Function to show the new trip form and hide the welcome image & confirmation section
  $(".add-trip").on('click', function(){
    $(".new-trip").show();
    $(".welcome-image, .confirmation").hide();
  });

  //Function to submit the form for a new trip as a post request.
  $("form[id=create-trip]").submit(function(e) {
    e.preventDefault();

    var tripDetails = $(this).serialize();
    var newTripUrl = baseUrl;
    $(".confirmation").text("You successfully created a new trip!");
    $.post(newTripUrl, tripDetails, confirmationAlert);

    $(".new-trip").hide();
    $(".welcome-image").show();
    $('input').val('');
  });

  //Function to show all of the trips through a get request and hide unnecessary elements
  $(".show-trips").on('click', function() {
    $.get(baseUrl, getTrips);
    $(".show-trips, .welcome-image, .new-trip, .add-trip, .confirmation").hide();
  });

  //Function to close the single trip card
  $("#close-trip").on('click', function() {
    $(".standout-trip").hide();
  });

  //Function to show a single trip through a get request. Function to handle reservations through a post request is also nested within.
  $(".list-trips").on("click", ".trip", function(trip) {
    $(".confirmation").hide();
    var tripId = $(this).html();
    var tripUrl = baseUrl + "/" + tripId;

    var getOneTrip = function(trip) {
      $("#number").text("# " + trip.id + " | " + trip.name.toUpperCase());
      $("#cost").text("COST: $" + Math.trunc(trip.cost) + " (+ fees)");
      $("#continent").text("CONTINENT: " + trip.continent);
      $("#category").text("CATEGORY: " + trip.category);
      $("#weeks").text("WEEKS: " + trip.weeks);
      $("#about").text("ABOUT: " + trip.about);
      $(".standout-trip").show();
    };

    $.get(tripUrl, getOneTrip);

    $("form[id=join-trip]").submit(function(e){
      e.preventDefault();

      var userDetails = $(this).serialize();
      var userUrl = baseUrl + "/" + tripId + "/reserve";

      $(".confirmation").text("You successfully reserved a spot on trip " + tripId + "!");

      $.post(userUrl, userDetails, confirmationAlert);
      $(".standout-trip").hide();
      $('input[type="text"]').val('');
    });
  });


});
