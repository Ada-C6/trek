$(document).ready(function() {
  //Base url for get & post requests
  var baseUrl = "https://trektravel.herokuapp.com/trips";
  var targetDate = new Date(2016, 11, 1);

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

  //Function to clear single trip/warning section
  var clearTrip = function(){
    $("#warning").text("");
    $("#number").text("");
    $("#cost").text("");
    $("#continent").text("");
    $("#category").text("");
    $("#weeks").text("");
    $("#about").text("");
  };

  //Function to show a single trip through a get request. Function to handle reservations through a post request is also nested within.
  $(".list-trips").on("click", ".trip", function(trip) {
    $(".confirmation").hide();
    clearTrip();

    var currentDate = Date.now();
    var daysDiff = (currentDate - targetDate)/(1000*60*60*24);
    var tripId = $(this).html();

    if (Math.ceil(daysDiff) >= tripId) {
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

        var response = $.post(userUrl, userDetails, confirmationAlert);
        console.log(response);
        $(".standout-trip").hide();
        $('input[type="text"]').val('');
      });
    }
    else {
      $("#join-trip").hide();
      $("#warning").text("Ho ho ho, you can't see this yet!");
      $(".standout-trip").show();
    }
  });


});
