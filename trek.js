$(document).ready(function() {
  var baseUrl = "https://trektravel.herokuapp.com/trips";

  var getTrips = function (trips){
    for (var i = 0; i < trips.length; i++) {
      $(".list-trips").append("<div><button class='trip'>" + trips[i].id + "</button></div>");
    }
  };

  var confirmationAlert = function(){
    $(".confirmation").show();
  };

  $(".add-trip").on('click', function(){
    $(".new-trip").show();
    $(".welcome-image, .confirmation").hide();
  });

  $("form[id=create-trip]").submit(function(e) {
    e.preventDefault();

    var tripDetails = $(this).serialize();
    var newTripUrl = baseUrl;
    $(".confirmation").text("You successfully created a new trip!");
    console.log("created trip");
    $.post(newTripUrl, tripDetails, confirmationAlert);

    $(".new-trip").hide();
    $(".welcome-image").show();
    $('input').val('');
  });

  $(".show-trips").on('click', function() {
    $.get(baseUrl, getTrips);
    $(".show-trips, .welcome-image, .new-trip, .add-trip, .confirmation").hide();
  });

  $("#close-trip").on('click', function() {
    $(".standout-trip").hide();
  });

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
      console.log(trip);
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
