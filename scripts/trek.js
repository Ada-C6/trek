$(document).ready(function() {
  var allTripsUrl = 'https://trektravel.herokuapp.com/trips';
  $('.trip-form').hide();

  var successCallback = function(response) {
    console.log('success!');
    var tripBody = $('.trips-body');

    $.each(response, function(index,trip) {
        console.log(trip);
        var row = $('<tr></tr>');
        var name = $('<td><a href="#" id=' + trip.id + '>' + trip.name + '</a></td>');

        row.append(name);
        tripBody.append(row);

      });
      $('button').hide();
  };

  var failCallback = function (xhr) {
    console.log("failure!");
    console.log(xhr);
  };

  var alwaysCallback = function() {
    console.log('This always happens!');
  };

  var showSuccessCallback = function(trip) {
    var tripDetails = $('.trip-details');
    var row = $('<tr></tr>');
    var id = $('<p class="trip_id" id=' + trip.id + '><strong>ID:</strong> '+ trip.id + '</p>');
    var name = $('<p><strong>Name:</strong> '+ trip.name + '</p>');
    // var destination = $('<td>'+ trip.destination + '<td>');
    var continent = $('<p><strong>Continent:</strong> '+ trip.continent + '</p>');
    var about = $('<p><strong>About:</strong> '+ trip.about + '</p>');
    var category = $('<p><strong>Category:</strong> '+ trip.category + '</p>');
    var weeks = $('<p><strong>Weeks:</strong> '+ trip.weeks + '</p>');
    var cost = $('<p><strong>Cost:</strong> '+ trip.cost + '</p>');

    tripDetails.empty();
    row.append(id, name, continent, about, category, weeks, cost);
    tripDetails.append(row);
    $('#message').empty();
    $('.trip-form').show();
  };

  var showFailCallback = function(xhr) {
    console.log("failure!");
    console.log(xhr);
  };

  var showAlwaysCallback = function() {
    console.log('This always happens!');
  };

  $('tbody').on('click', 'a', function(e) {
    e.preventDefault();

    var id = $(this).attr('id');
    var showUrl = allTripsUrl + '/' + id;
    $.get(showUrl, showSuccessCallback)
      .fail(showFailCallback)
      .always(showAlwaysCallback);
  });

  $('button').click(function() {
    $.get(allTripsUrl, successCallback)
      .fail(failCallback)
      .always(alwaysCallback);
  });

  $('form').submit(function(e) {
  // By default, the form will attempt to do it's own local POST so we want to prevent that default behavior
  e.preventDefault();
  var id = $('.trip_id').attr('id');

  var url = 'https://trektravel.herokuapp.com/trips/' + id + '/reserve/';
  var formData = $(this).serialize();

  var submittedForm = $(this);

  $.post(url, formData, function(response){
    $('#message').html('<p> Trip reserved! </p>');
    submittedForm.find("input[type=text]").val("");

    // What do we get in the response?
    console.log(response);
  });
});
});
