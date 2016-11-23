$(document).ready(function() {
  var baseUrl = "https://trektravel.herokuapp.com/trips";

  var getTrips = function (trips){
    for (var i = 0; i < trips.length; i++) {
      // "name":"Cairo to Zanzibar","continent":"Africa","weeks":5
      $(".all-trips").append("<div><button class='trip'>" + trips[i].id + ": "+ trips[i].name + "</button></div>");
    }
  };

  $(".show-trips").on('click', function() {
    $.get(baseUrl, getTrips);
    $(".show-trips").hide();
  });

  $(".all-trips").on("click", "button", function(trip) {
    var tripId = $(this).html();
    var tripUrl = baseUrl + "/" + tripId;

    var getOneTrip = function(trip) {
      console.log(trip);
      $("#number").text("# " + trip.id + " | " + trip.name.toUpperCase());
      // $("#name").text("NAME: " + trip.name);
      $("#cost").text("COST: $" + trip.cost);
      $("#continent").text("CONTINENT: " + trip.continent);
      $("#category").text("CATEGORY: " + trip.category);
      $("#weeks").text("WEEKS: " + trip.weeks);
      $("#about").text("ABOUT: " + trip.about);
      $(".standout-trip").show();
    };

    $.get(tripUrl, getOneTrip);
  });

});
