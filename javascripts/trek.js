$(document).ready(function() {

  var baseUrl = 'https://trektravel.herokuapp.com/trips';

  var successCallback = function(response) {
    for (var i = 0; i < response.length; i++) {
      $("#trips-list").append("<h3><a href=" + baseUrl + "/" + response[i].id + ">" + response[i].name + "</a></h3>");
    }
  };

  $('#all-trips-button').click(function() {
    $.get(baseUrl, successCallback);
  });

  var tripInfomation = function(trip) {
    $('#trip-name').text(trip.name);
    $('#trip-continent').text(trip.continent);
    $('#trip-category').text(trip.category);
    $('#trip-about').text(trip.about);
    $('#trip-weeks').append("Duration: " + trip.weeks);
    $('#trip-cost').append("Cost: $" + trip.cost);
  }

  $('#trips-list').on('click', 'a', function(e) { //e is short for 'event'
    e.preventDefault();
    $('#trip-info').show();
    var showTripUrl = $(this).attr('href');  // attr() = attributes
    $.get(showTripUrl, tripInfomation).fail(function() {
      alert("Page Not Found");
    });
  });





}); //ending $(document).ready
