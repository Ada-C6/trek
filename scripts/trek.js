$(document).ready(function(){
  var url = 'https://trektravel.herokuapp.com/trips';
  $('#reservation-form').hide();


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

    $('button').hide(); // might become an on-off switch

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
    $('button').toggle(!onIndicator);
    $('#reservation-form').toggle(!onIndicator); // the form
    $('table').toggle(onIndicator);
  };
  //showSuccess
  var showSuccess = function(trip) {
    var section = $('.trip-details');

    var id = $('<strong>ID:</strong><div>' + trip.id + '</div>');
    var name = $('<strong>Name:</strong><div>' + trip.name + '</div>');
    var continent = $('<strong>Continent:</strong><div>' + trip.continent + '</div>');
    var category = $('<strong>Category:</strong><div>' + trip.category + '</div>');
    var weeks = $('<strong>Weeks:</strong><div>' + trip.weeks + '</div>');
    var cost = $('<strong>Cost:</strong><div>$' + trip.cost + '</div>');
    var description = $('<strong>Description:</strong><div>' + trip.about + '</div>');

    section.empty();
    section.append(id, name, continent, category, weeks, cost, description);

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
