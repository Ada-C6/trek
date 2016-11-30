$(document).ready(function() {

  var url = 'https://trektravel.herokuapp.com/trips';

  var failCallback = function(xhr) {
    console.log('failure');
    console.log(xhr);
  };

  var alwaysCallback = function() {
    console.log('This always happens');
  };

  var successCallback = function (response) {
    console.log('success!');

    var body = $('.trips-body');
    body.empty();
    var thead = $('thead');
    thead.empty();
    var header = "<th>" + Object.keys(response[0])[1] + "</th><th>" + Object.keys(response[0])[2] + "</th><th>" + Object.keys(response[0])[3] + "</th>";
    $("thead").append(header);

    $.each(response, function(index, trip){
      // console.log(trip);
      var row = $('<tr></tr>');
      var name = $('<td><a href="#" class="name-link" id=' + trip.id + '>' + trip.name + '</a></td>');
      var continent = $('<td>' + trip.continent + '</td>');
      var weeks = $('<td>' + trip.weeks + '</td>');

      row.append(name, continent, weeks);
      body.append(row);
    });
    toggleTableView(true);
  };

  $('button').click(function() {
    $.get(url, successCallback)
      .fail(failCallback)
      .always(alwaysCallback);
  });

  var toggleTableView = function(onIndicator) {
    $('.trip-details').toggle(!onIndicator);
    $('button').toggle(!onIndicator);
    $('table').toggle(onIndicator);
  };

  var showSuccess = function(trip) {
    var section = $('.trip-details');
    var name = $('<br><br><br><strong>Name</strong><div>' + trip.name + '</div><br>');
    var continent = $('<strong>Continent</strong><div>' + trip.continent + '</div><br>');
    var weeks = $('<strong>Weeks</strong><div>' + trip.weeks + '</div><br>');
    var cost = $('<strong>Cost</strong><div>' + trip.cost + '</div><br>');
    var about = $('<strong>About</strong><div>' + trip.about + '</div><br>');
    var category = $('<strong>Category</strong><div>' + trip.category + '</div>');
    var id = $('<br><br><br><strong>Id</strong><div>' + trip.id + '</div><br>');
    section.empty(); // Reset the HTML in case there is data from before
    section.append(name, continent, weeks, cost, about, category, id);
    toggleTableView(false);

    $('.trip-id').val(trip.id);
  };

  var showFailure = function(xhr) {
    var section = $('.trip-details');
    section.html('<strong>Error has occurred</strong>');
    toggleTableView(false);
  };

  $('tbody').on('click', 'a', function(e) {
    e.preventDefault();
    var id = $(this).attr('id');
    var showUrl = url + '/' + id;
    $.get(showUrl, showSuccess)
      .fail(showFailure);
  });
  // POST RESERVATION
  var postReservationCallback = function(){
    alert("Success!");

  };
  var addReservationCallback = function(event) {
    event.preventDefault();
    var tripId = $('.trip-id').val();
    console.log("Booking it yo");
    var rezzieUrl =  ('https://trektravel.herokuapp.com/trips/' + tripId + '/reserve');
    var reservationData = $(this).serialize();
    console.log("Reservation data is: " + reservationData);
    $.post(rezzieUrl, reservationData, postReservationCallback);
    toggleTableView(false);
  };



  $('#add-reservation-form').submit(addReservationCallback);

  // POST NEW TRIP
  //
  // var postCallback = function(){
  //   alert("POST succeeded!");
  // };
  //
  // var addTripCallback = function(event) {
  // event.preventDefault();
  // console.log("Sending trip data!");
  // var tripData = $(this).serialize();
  // console.log("Trip data is: " + tripData);
  // $.post(url, tripData, postCallback);
  // };
  //
  // $('#add-trip-form').submit(addTripCallback);
  //

});
