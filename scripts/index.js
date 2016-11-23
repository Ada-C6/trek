$(document).ready(function() {
  $('#reserve-trip-form').hide();
  // 'get' URL
  var url = 'https://trektravel.herokuapp.com/trips';

  // Response
  var successCallback = function(response) {
    var body = $('.travel-body');
    body.empty();

    var headerName = $('<th>Trip Name</th>');
    var headerContinent = $('<th>Continent</th>');
    var headerWeeks = $('<th># Weeks</th>');

    body.append(headerName, headerContinent, headerWeeks);

    $.each(response, function(index, trip) {
      var row = $('<tr></tr>');
      var name = $('<td><a href="#" class="trip-link" id=' + trip.id + '>' + trip.name + '</a></td>');
      var continent = $('<td>' + trip.continent + '</td>');
      var weeks = $('<td>' + trip.weeks + '</td>');

      row.append(name, continent, weeks);
      body.append(row);
    });

    toggleTableView(true);
  };

  // Failure response
  var failCallback = function(xhr) {
    console.log('failed - sorry!');
  };

  // On button click send get request
  $('.trips-button').click(function() {
    $.get(url, successCallback)
      .fail(failCallback);
  });

  // Show response
  var showSuccess = function(trip) {

    var section = $('.trip-details');
    var id = $('<p><strong>ID: </strong>' + trip.id + '</p>');
    var name = $('<p><strong>Name: </strong>' + trip.name + '</p>');
    var continent = $('<p><strong>Continent: </strong>' + trip.continent + '</p>');
    var about = $('<p><strong>About: </strong>' + trip.about + '</p>');
    var category = $('<p><strong>Category: </strong>' + trip.category + '</p>');
    var weeks = $('<p><strong>Weeks: </strong>' + trip.weeks + '</p>');
    var cost = $('<p><strong>Cost: </strong>$' + trip.cost + '</p>');


    section.empty();
    section.append(id, name, continent, about, category, weeks, cost);

    toggleTableView(false);
    $('#reserve-trip-form').show();
    $('#continent-table').hide();

    $('#trip-id').val(trip.id);
  };

  // Show response failure
  var showFailure = function(xhr) {
    var section = $('.trip-details');
    section.html('Error has occurred. Please try another trip.');

    toggleTableView(false);
  };

  // On table body click send get request
  $('tbody').on('click', '[href]', function() {
    var id = $(this).attr('id');
    var showUrl = url + '/' + id;
    $.get(showUrl, showSuccess)
      .fail(showFailure);
  });

  // Show aspects at particular times
  var toggleTableView = function(onIndicator) {
    $('.trip-details').toggle(!onIndicator);
    $('.trips-button').toggle(!onIndicator);
    $('#travel-table').toggle(onIndicator);
    $('#continent-table').toggle(!onIndicator);
    $('#reserve-trip-form').hide();
  };

  var continentCallback = function(response) {
    var header = $('.continent-header');
    var body = $('.continent-body');
    header.empty();
    body.empty();

    var headerName = $('<th>' + response[0].continent +' Trips</th>');
    var headerWeeks = $('<th># Weeks</th>');

    header.append(headerName, headerWeeks);

    $.each(response, function(index, trip) {
      var row = $('<tr></tr>');
      var name = $('<td><a href="#" class="trip-link" id=' + trip.id + '>' + trip.name + '</a></td>');
      var weeks = $('<td>' + trip.weeks + '</td>');

      row.append(name, weeks);
      body.append(row);
    });

    toggleTableView(true);
    $('.trips-button').show();
    $('#travel-table').toggle(false);
    $('#continent-table').toggle(true);
  };

  $('.continent-button').click(function() {
    console.log('continent button clicked this: ' + $(this)[0]);
    var queryName = $(this)[0].name;
    $.get(url + '/continent?query=' + queryName, continentCallback)
      .fail(failCallback);
  });





  // **POST**
  var postCallback = function() {
    alert('Your reservation has been saved.');
  };

  $('#reserve-trip-form').submit(function(e) {
    e.preventDefault();

    console.log($(this).serialize());
    var reservationData = $(this).serialize();
    var reservationUrl = url + '/' + $('#trip-id').val() + '/reserve';

    $.post(reservationUrl, reservationData, postCallback)
      .fail(showFailure);
  });

});
