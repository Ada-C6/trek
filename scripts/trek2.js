$(document).ready(function() {

  var url = "https://trektravel.herokuapp.com/trips/";

  var showSuccess = function(trip) {
    $('.trip-details').empty();
    var name = $('<h2>' + trip.name + '</h2>');
    var id = $('<span>' + "ID: " + trip.id + '</span>');
    var continent = $('<span class="continent">' + trip.continent + '</span>');
    var category = $('<span class="category">' + trip.category + '</span>');
    var weeksCost = $('<h3> Weeks: ' + trip.weeks + ', Cost: $' + trip.cost + '</h3>');
    var details = $('<p>' + trip.about + '</p>');

    var reserve = $('<h3>Reserve Your Spot</h3>');

    var form = $("<form id='reserve-spot'><label for='name'>Name: </label><input type='text' name='name'><label for='age'>Age: </label><input type='text' name='age'><label for='email'>Email: </label><input type='text' name='email'><button type='submit' class='reserve button success'>Submit</button></form>");

    $('.trip-details').append(name, weeksCost, id, continent, category,  details, reserve, form);

    console.log($('#reserve-spot'));
  };

  $('.trips').on('click', 'a', function(e) {
    e.preventDefault();

    var id = $(this).attr('id');

    var showUrl = url + id;
    $.get(showUrl, showSuccess)
      .fail(allFailure);

    $('.show-trips').hide();
  });

  var reserveSuccess = function() {
    $('.trip-details').append('Your reservation is confirmed!');
    console.log('confirmed');
  };

  var reserveSpotCallback = function(event) {
    event.preventDefault();
    var reserveUrl = 'https://trektravel.herokuapp.com/trips/1/reserve/';
    var reserveData = $(this).serialize();
    console.log('sent data = ' + reserveData);
    $.post(reserveUrl, reserveData, reserveSuccess);
  };

  $('#reserve.spot').submit(function(e) {
    e.preventDefault();
    console.log('wha');
  });

  var allSuccess = function(response) {
    $('.trip-details').empty();
    var table = $('.trips');
    var header = $('th');
    var trip = $("<td class='columns medium-6 large-6'>Trip</td>");
    var continent = $('<td class="columns medium-3 large-3">Continent</td>');
    var weeks = $('<td class="columns medium-3 large-3">Length</td>');
    header.empty();
    header.append(trip, continent, weeks);

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

  $('.show-trips').click(function() {
    $.get(url, allSuccess)
      .fail(allFailure);
  });




});
