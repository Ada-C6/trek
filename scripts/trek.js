$(document).ready(function() {
  // hide the reservation form until user clicks to show one trip
  $('#reservation').hide();
  $('#reservation-confirmation').hide();

  var url = "https://trektravel.herokuapp.com/trips/";

  // callback that shows details about one trip
  var showSuccess = function(trip) {
    $('.trip-details').empty();
    $('#reservation-confirmation').hide();
    var name = $('<h2>' + trip.name + '</h2>');
    var id = $('<span>' + "ID: " + trip.id + '</span>');
    var continent = $('<span class="tag">' + trip.continent + '</span>');
    var category = $('<span class="category">' + trip.category + '</span>');
    var weeksCost = $('<h3> Weeks: ' + trip.weeks + ', Cost: $' + trip.cost + '</h3>');
    var details = $('<p>' + trip.about + '</p>');

    $('#reservation').show();
    $('#reserve-form').attr('class', trip.id);
    $('.trip-details').append(name, weeksCost, id, continent, category,  details);
  };

  // event handler for when you click a specific trip link in the table of all trips
  $('.trips').on('click', 'a', function(e) {
    e.preventDefault();

    var id = $(this).attr('id');

    var showUrl = url + id;
    $.get(showUrl, showSuccess)
      .fail(allFailure);

    $('.show-trips').hide();
  });

  // success callback for when you sent your post/reservation request
  var reserveSuccess = function() {
    $('#reservation').hide();
    $('#reservation-confirmation').show();
  };

  var reserveSpot = function(event) {
    event.preventDefault();
    var reserveUrl = url + $(this)[0].className + '/reserve/';
    var reserveData = $(this).serialize();
    console.log(reserveUrl);
    $.post(reserveUrl, reserveData, reserveSuccess);
  };

  $('#reserve-form').submit(reserveSpot);

  // callback that shows table of all trips
  var allSuccess = function(response) {
    // $('.trip-details').empty();
    var table = $('.trips');
    $('table.trips tbody tr').remove();
    var header = $('thead');
    var trip = $("<td class='columns medium-6 large-6'>Trip</td>");
    var continent = $('<td class="columns medium-3 large-3">Continent</td>');
    var weeks = $('<td class="columns medium-3 large-3">Length</td>');
    header.empty();
    header.append(trip, continent, weeks);
    console.log(response);
    $.each(response, function(index, trip) {
      var row = $('<tr></tr>');
      var name = $("<td class='columns medium-6 large-6'><a href='#' class='trip-link' id='" + trip.id + "'>" + trip.name + "</a></td>");
      var continent = $('<td class="columns medium-3 large-3">' + trip.continent + '</td>');
      var weeks = $('<td class="columns medium-3 large-3">' + trip.weeks + '</td>');
      row.append(name, continent, weeks);
      table.append(row);
    });
  };

  var allFailure = function(xhr) {
    $('.failures').html('FAILED TO LOAD: ' + xhr.statusText);
  };

  $('button.show-trips').click(function() {
    $.get(url, allSuccess)
      .fail(allFailure);
  });

  $('#filterContinent').submit(function(e) {
    e.preventDefault();
    var cont = $(this).serializeArray();
    // console.log();
    var cUrl = url + "continent?query=" + cont[0].value;
    $.get(cUrl, allSuccess);
  });

  $('#filterBudget').submit(function(e) {
    e.preventDefault();
    var budget = $(this).serializeArray();
    // console.log();
    var bUrl = url + "budget?query=" + budget[0].value;
    $.get(bUrl, allSuccess);
  });
});
