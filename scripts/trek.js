$(document).ready(function(){
  var url = 'https://trektravel.herokuapp.com/trips';
  $('#reservation-form').hide();
  $('#instruction').hide();

  var successCallback = function(response) {
    console.log('success!');

    var header = $('.trips-headers');
    header.empty();
    var headerName = $('<th>' + 'Trip Name' + '</th>');
    var headerContinent = $('<th>' + 'Continents' + '</th>');
    var headerWeeks = $('<th>' + 'Weeks' + '</th>');
    header.append(headerName, headerContinent, headerWeeks);

    var body = $('.trips-body');
    body.empty();

    $.each(response, function(index,trip){
      var row = $('<tr></tr>'); // create one row every time we iterate through the response object.
      var name = $('<td><a href="#" class="name-link" id=' + trip.id+ '>' + trip.name + '</a></td>');
      var continent = $('<td>' + trip.continent + '</td>');
      var weeks = $('<td>' + trip.weeks + '</td>');

      row.append(name, continent, weeks);
      body.append(row);
    });

    $('.blue-button').hide(); // might become an on-off switch

    toggleTableView(true);
  };

  var failCallback = function(xhr) {
    console.log('failure');
    console.log(xhr);
  };

  var alwaysCallback = function() {
    console.log('This always happens');
  };

  $('#load-trips-button').click(function () {
    $.get(url, successCallback)
      .fail(failCallback)
      .always(alwaysCallback);
  });

  var toggleTableView = function(onIndicator) {
    $('.trip-details').toggle(!onIndicator);
    $('.blue-button').toggle(!onIndicator);
    $('#reservation-form').toggle(!onIndicator); // the form
    $('#instruction').toggle(onIndicator);
    $('table').toggle(onIndicator);
  };
  //showSuccess
  var showSuccess = function(trip) {
    var section = $('.trip-details');

    var name = $('<h3>' + trip.name + '</h3>');
    var id = $('<p><strong>ID: </strong>' + trip.id + '</p>');

    var continent = $('<p><strong>Continent: </strong>' + trip.continent + '</p>');
    var category = $('<p><strong>Category: </strong>' + trip.category + '</p>');
    var weeks = $('<p><strong>Weeks: </strong>' + trip.weeks + '</p>');
    var cost = $('<p><strong>Cost: </strong>$' + trip.cost + '</p>');
    var description = $('<p><strong>Description: </strong>' + trip.about + '</p>');

    section.empty();
    section.append(name, id, continent, category, weeks, cost, description);

    $('.trip-id').val(trip.id);

    toggleTableView(false);
  };

  //showFailure
  var showFailure = function(xhr) {
    var section = $('.trip-details');
    section.html('Error has occurred!');
    toggleTableView(false);
  };

  $('tbody').on('click', 'a', function(e){
    e.preventDefault();
    var id = $(this).attr('id');
    var showUrl = url + '/' + id;
    $.get(showUrl, showSuccess)
      .fail(showFailure);
  });

  // adding Reservation
  var postCallback = function() {
    alert("POST worked!");
    toggleTableView(true);
  };

  var addReserveCallback = function(e) {
    e.preventDefault();
    var reserveData = $(this).serialize();
    var id = $('.trip-id').val();
    var urlRev = url + '/' + id + '/reserve';
    $.post(urlRev, reserveData, postCallback);
  };

  $('#reservation-form').submit(addReserveCallback);

}); // the end of document.ready
