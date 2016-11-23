$(document).ready(function(){
  // which URL do we want to 'get'
  var url = 'https://trektravel.herokuapp.com/trips';

  // what do we want to happen when we get a response?
  var successCallback = function(response) {
    console.log('success!');

    var tableHeaders = Object.keys(response[0]);
    // start at 1, because the first key is the 'id', which I don't want to display.
    for (var j = 1; j<tableHeaders.length; j++){
      var headings = $('<th>'+ tableHeaders[j] +'</th>');
      $('.trips-header').append(headings);
    }

    var body = $('.trips-body');
    body.empty(); // clearing the body out to ensure populating fresh.

    $.each(response, function(index, trip){
      // console.log(pet);
      var row = $('<tr id='+ trip.id + '></tr>');
      var name = $('<td>'+ trip.name + '</td>');
      var continent = $('<td>' + trip.continent + '</td>');
      var duration = $('<td>' + trip.weeks + '</td>');

      row.append(name, continent, duration);
      body.append(row);
    });

    $('#get-trips-button').hide();
  };

  // what do we want to happen when it fails?
  var failCallback = function(xhr) {
    console.log(xhr);
    body = $('.trips-body');
    body.html('<strong>Error has occurred</strong>');
  };

  // this always happens. good for cleaning things up afterward.
  // var alwaysCallback = function(){
  //   console.log("this always happens");
  // };

  $('#get-trips-button').click(function(){
    $.get(url, successCallback)
      .fail(failCallback);
      // .always(alwaysCallback);
  });

  var showSuccess = function(trip) {
    var section = $('.trip-details');
    var id = $('<strong>ID</strong><div>' + trip.id + '</div>');
    var name = $('<strong>Name</strong><div>' + trip.name + '</div>');
    var continent = $('<strong>Continent</strong><div>' + trip.continent + '<div>');
    var description = $('<strong>Description</strong><div>' + trip.about + '</div>');
    var category = $('<strong>Category</strong><div>' + trip.category + '</div>');
    var cost = $('<strong>Cost</strong><div>' + trip.cost.toLocaleString('us-US', { style: 'currency', currency: 'USD' }) + '</div>');
    var duration = $('<strong>Duration</strong><div>' + trip.weeks + ' week(s)</div>');

    section.empty(); //similar to the body, want to make sure we don't have any data from before
    section.append(id, name, continent, description, category, cost, duration);

    var registration = $('.register');
    var header = $('<h3>Register For This Trip</h3>');
    var form = $('<form id="register-form"></form>');
    var nameField = $('<label for="name">Name</label><input type="text" name="name"></input>');
    var emailField = $('<label for="email">Email</label><input type="text" name="email"></input>');
    var tripID = $('<input type="hidden" name="tripID" value="'+ trip.id + '">');
    var registerButton = $('<button type="submit" class="button">Register for this trip!</button>');

    form.empty();
    registration.empty();
    form.append(header, nameField, emailField, tripID, registerButton);
    registration.append(form);
  };


  var showFailure = function(xhr) {
    var section = $('.trip-details');
    section.html('<strong>Error has occurred</strong>');
  };

  $('tbody').on('click','tr', function(e){
    e.preventDefault(); // this captures the event of a click on a link and prevents the default action from happening so that we can use ajax instead of an href?
    console.log($(this).html());

    var id = $(this).attr('id');
    var showUrl = url + '/' + id;
    $.get(showUrl, showSuccess)
      .fail(showFailure);
    });

  var postCallback = function(){
    console.log('post success!');
    var form = $('form');
    form.replaceWith('<strong>Registration Successful!</strong>');

    // var confirm = $('.register-confirm');
    // confirm.html('<strong>Registration Successful!</strong>');

  };

  // here's the callback for registering.
  var registerCallback = function(event) {
    event.preventDefault(); //we're never getting here. why not?

    console.log('sending registration data');
    var reservationData = $(this).serialize();

    // this is a really dumb way to get out the trip id; there's gotta be a better way.
    var tripID = reservationData.split('&')[2].split('=')[1];

    console.log("registration data is " + reservationData);
    var reservationURL = url + "/" + tripID + '/reserve';
    console.log("url is " + reservationURL);

    $.post(reservationURL, reservationData, postCallback);
  };

  // click handler for submitting the registration form
  $(document).on('submit', '#register-form', registerCallback);
});
