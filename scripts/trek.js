// @TODO: post!
// @TODO: styling
// @TODO: properly handle failures?
// @TODO: remove console.logs!

// Build HTML section functions
var tripListRow = function(trip) {
  $('#show-trip-section').empty();
  $('#reserve-trip-section').hide();

  var row = $('<tr></tr>');
  var id = trip.id;
  var name = $('<td class="details"><a href="#" id=' + trip.id + '>' + trip.name + '</a></td>');
  var continent = $('<td>' + trip.continent + '</td>');
  var weeks = $('<td>' + trip.weeks + '</td>');

  row.append(name, continent, weeks);
  return row;
};

var buildShowSection = function(trip) {
  console.log('Ready to build a show section');
  console.log('Trip: ' + trip);
  // var destination = trip.destination ;
  var name = $('<h2>' + trip.name+ '</h2>');
  var continent = $('<h5> Continent: ' + trip.continent + '</h5>');
  var category = $('<h5> Category: ' + trip.category + '</h5>'); //@TODO: capitalize? (http://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript)
  var weeks = $('<h5> Weeks: ' + trip.weeks + '</h5>');
  var about = $('<p> About: ' + trip.about + '</p>');
  var id = $('<h5> Trip Number: ' + trip.id + '</h5>');
  var cost = $('<h5> Cost: $' + trip.cost + '</h5>');

  // var formIdField = $('<input type="hidden" name="id" value="' + trip.id + '"/>');

  $('#trip-list-section').hide();
  $('#show-trip-section').prepend(name, continent, weeks, category, about, cost, id);
  $('#reserve-trip-section').show();
  $('#reserve-trip-form').trigger("reset");
  $('#trip-id-field').attr("value", trip.id);
};

// @TODO - remove if unused
// var buildReservationForm = function(trip) {
// };



$(document).ready(function() {
  var listUrl = "https://trektravel.herokuapp.com/trips";

  // List Callback function
  var listSuccessCallback = function(response) {
    console.log("I'm the success callback");
    console.log("Response: " + response);

    $('#show-list-button').hide();
    $('#trip-list-section').show();

    // Build Table Headers
    var headerRow = $('<tr><th>Trip</th><th>Continent</th><th>Weeks</th></tr>');
    $('#trip-list-table > thead').html(headerRow);

    // Build Table Rows
    $.each(response, function(index, trip) {
      console.log(trip);
      var addRow = tripListRow(trip);
      $('#trip-list-table > tbody').append(addRow);
    });
  };

  // ID Callback function
  var idSuccessCallback = function(response) {
    console.log("ID response: " + response);
    $('#show-list-button').show();
    $('#show-trip-section').empty();
    $('#show-trip-section').append(buildShowSection(response));
  };

  // Post Callback function (Reservation)
  var postSuccessCallback = function(response) {
    console.log("post response: " + response);
    // $('#show-list-button').show();
    $('#show-trip-section').prepend('<p>Reservation added! </p>');
  };

  // FailCallback (used for all failures)
  var FailCallback = function(xhr) {
    console.log('failure');
    console.log(xhr);
  };


  // Initial page load should have #reserve-trip-section hidden
  $('#reserve-trip-section').hide();

  // Events
  $("#show-list-button").on('click', function(event) {
    console.log("I will do the list thing!");
    $.get(listUrl, listSuccessCallback)
      .fail(FailCallback);
  });

  $('#trip-list-table').on('click', 'a', function(event) {
    console.log(this);
    console.log('you clicked a trip');
    var idForUrl = $(this).attr('id');
    console.log("ID: " + idForUrl);

    var idUrl = listUrl + "/" + idForUrl;
    console.log(idUrl);
    $.get(idUrl, idSuccessCallback)
      .fail(FailCallback);
  });

  $('#reserve-trip-form').submit(function(event) {
    console.log("in Trip Reservation event");
    event.preventDefault();
    console.log("this: " + $(this));
    var reservationData = $(this).serialize();
    var tripId = this.id.value;
    console.log("tripId: " + tripId);
    var reserveUrl = listUrl + "/" + tripId + "/reserve";
    console.log("reservationData is: " + reservationData);
    $.post(reserveUrl, reservationData, postSuccessCallback);
  });
});
