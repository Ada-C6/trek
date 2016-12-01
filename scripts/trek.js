$(document).ready(function() {
  var url =  "https://trektravel.herokuapp.com/trips";

  var successCallback = function (response) {
    console.log('success!');

    var body = $('.trips-body');
    body.empty(); // Clear this out to start with to ensure we are populating fresh

    $.each(response, function(index, trip){
      // console.log(pet);
      var row = $('<tr></tr>');
      var name = $('<td><a href="#" class="name-link" id=' + trip.id + '>' + trip.name + '</a></td>');
      var continent = $('<td>' + trip.continent + '</td>');
      var weeks = $('<td>' + trip.weeks + '</td>');

      row.append(name, continent, weeks);
      body.append(row);
    });

    toggleTableView(true);
  };

  var failCallback = function(xhr) {
    console.log('failure :(');
    console.log(xhr);
  };

  var showSuccess = function(trip) {
    var section = $('.trip-details');
    var id = $('<strong>ID</strong><div>' + trip.id + '<div>');
    var name = $('<strong>Name</strong><div>' + trip.name + '</div>');
    var destination = $('<strong>Destination</strong><div>' + trip.destination + '<div>');
    var continent = $('<strong>Continent</strong><div>' + trip.continent + '</div>');
    var about = $('<strong>About</strong><div>' + trip.about + '</div>');
    var category = $('<strong>Category</strong><div>' + trip.category + '<div>');
    var weeks = $('<strong>Number of Weeks</strong><div>' + trip.weeks  + '<div>');
    var cost = $('<strong>cost</strong><div>' + trip.cost + '<div>');

    section.empty(); // Reset the HTML in case there is data from before
    section.append(id, name, destination, continent, about, category, weeks, cost);

    var form = $('#reservation-form');
    var id = $('<input type="hidden", name="trip-id", class="trip-id", value=' + trip.id + '>');
    form.append(id);


    toggleTableView(false);
  };

  var showFailure = function(xhr) {
    console.log('failure :(');
    console.log(xhr);
  };

  // TOGGLE the trips table with the trip "show"
  var toggleTableView = function(onIndicator) {
    $('.trip-details').toggle(!onIndicator);
    $('button').toggle(!onIndicator);
    $('table').toggle(onIndicator);
    $('#reservation-form').toggle(!onIndicator);
  };

  // click handler for Load Trips
  $('.button').on('click', function() {
    $.get(url, successCallback)
      .fail(failCallback)
  });

  // click handler for trip link
  $('tbody').on('click', 'a', function(event) {
    var showURL = url + '/' + $(this).attr('id');
    $.get(showURL, showSuccess)
      .fail(showFailure)
  });

  // POST
  var postCallback = function(){
    alert("POST worked just fine!");

    toggleTableView(false);
  };

  var reserveSeat = function(event) {
    event.preventDefault();

    var reservationID = $("input[type=hidden]").val(); //$('.trip-id').val();
    var postURL = "https://trektravel.herokuapp.com/trips/" + reservationID + "/reserve";

    console.log("Sending reservation data");
    var reservationData = $(this).serialize();
    console.log("Reservation data is " + reservationData);
    $.post(postURL, reservationData, postCallback);
  };

  $('#reservation-form').submit(reserveSeat); // on submitting the form, we want the reserveSeat function to happen (AFTER submitting the form which is why there are no parentheses)

});
