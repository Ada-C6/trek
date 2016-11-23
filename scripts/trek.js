$(document).ready( function() {

  var url = 'https://trektravel.herokuapp.com/trips';

  var failCallback = function(xhr) {
    console.log('failure');
    console.log(xhr);
    $('.trek-headers').append("Your action failed. Maybe the API is down?");
  };

  var alwaysCallback = function() {
    console.log("This always happens, no matter what.");
  };

  var successCallback = function(response) {
    console.log('Success!');

    var body = $('.trek-body');
    body.empty();

    $.each(response, function(index, trip) {
      var row = $('<tr></tr>');
      var name = $('<td><a href="#" class="name-link" id=' + trip.id + '>' + trip.name + '</a></td>');
      var weeks = $('<td>' + (trip.weeks * 7) + ' days</td>');

      row.append(name, weeks);
      body.append(row);
    });

    $('#load-trips').hide();
  };

  $('#load-trips').click(function(){
    $.get(url, successCallback)
      .fail(failCallback)
      .always(alwaysCallback);
  });

  var showSuccess = function(trip) {
    var section = $('.trip-details');
    var id = $('<strong>Trip ID</strong><div>' + trip.id + '</div>');
    var name = $('<strong><div>' + trip.name + '</div></strong>').addClass('trip-name');
    var weeks = $('<strong><div>(' + (trip.weeks * 7) + '-day trip)</div></strong>');
    var continent = $('<strong>Continent</strong><div>' + trip.continent + '</div>');
    var about = $('<strong>Description</strong><div>' + trip.about + '</div>');
    var category = $('<strong>Category</strong><div>' + trip.category + '</div>');
    var cost = $('<strong>Cost</strong><div>$' + trip.cost + '</div>');

    section.empty();
    section.append(name, weeks, about, cost, continent, category, id);
  };

  var showFailure = function(xhr) {
    var section = $('.trip-details');
    section.html('<strong>Error has occurred</strong');
  };

  $('tbody').on('click', 'a', function(event) {
    event.preventDefault();

    var id = $(this).attr('id');
    var showURL = url + '/' + id;
    $.get(showURL, showSuccess)
      .fail(showFailure);
  });
});
