$(document).ready(function() {
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

  var failCallback = function(xhr) {
    console.log('failed - sorry!');
  };

  $('.button').click(function() {
    $.get(url, successCallback)
      .fail(failCallback);
  });

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
  };

  var showFailure = function(xhr) {
    var section = $('.trip-details');
    section.html('Error has occurred. Please try another trip.');

    toggleTableView(false);
  };

  $('tbody').on('click', '[href]', function() {
    var id = $(this).attr('id');
    var showUrl = url + '/' + id;
    $.get(showUrl, showSuccess)
      .fail(showFailure);
  });

  var toggleTableView = function(onIndicator) {
    $('.trip-details').toggle(!onIndicator);
    $('.trips-button').toggle(!onIndicator);
    $('#travel-table').toggle(onIndicator);
    $('#continent-table').toggle(!onIndicator);
  };

  var continentCallback = function(response) {
    console.log(response[0]);
    var body = $('.continent-body');
    body.empty();

    var headerName = $('<th>' + response[0].continent +' Trips</th>');
    var headerWeeks = $('<th># Weeks</th>');

    body.append(headerName, headerWeeks);

    $.each(response, function(index, trip) {
      // console.log(trip);
      var row = $('<tr></tr>');
      var name = $('<td><a href="#" class="trip-link" id=' + trip.id + '>' + trip.name + '</a></td>');
      var weeks = $('<td>' + trip.weeks + '</td>');

      row.append(name, weeks);
      body.append(row);
    });

    toggleTableView(false);
  };

  $('.continent-button').click(function() {
    var queryName = $(this)[0].name;
    $.get(url + '/continent?query=' + queryName, continentCallback)
      .fail(failCallback);
  });

});
