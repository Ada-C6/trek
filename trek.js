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

  $(".show-trips").on('click', function() {
    $.get(baseUrl, getTrips);
    $(".show-trips, .welcome-image").hide();
  });

  $(".list-trips").on("click", ".trip", function(trip) {
    var tripId = $(this).html();
    var tripUrl = baseUrl + "/" + tripId;

    var getOneTrip = function(trip) {
      $("#number").text("# " + trip.id + " | " + trip.name.toUpperCase());
      $("#cost").text("COST: $" + trip.cost);
      $("#continent").text("CONTINENT: " + trip.continent);
      $("#category").text("CATEGORY: " + trip.category);
      $("#weeks").text("WEEKS: " + trip.weeks);
      $("#about").text("ABOUT: " + trip.about);
      $(".standout-trip").show();
    };

    $.get(tripUrl, getOneTrip);

    $("form").submit(function(e){
      e.preventDefault();

      var userDetails = $(this).serialize();
      var userUrl = baseUrl + "/" + tripId + "/reserve";

      $(".confirmation").text("You successfully reserved a spot on trip " + tripId + "!");

      $.post(userUrl, userDetails, confirmationAlert);
      $(".standout-trip").hide();
    });
  });


});
