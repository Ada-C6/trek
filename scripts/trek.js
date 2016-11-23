$(document).ready(function(){
  var url_all = 'https://trektravel.herokuapp.com/trips';

  var failCallback = function(xhr) {
    console.log('failure');
    console.log(xhr);
  };

  var alwaysCallback = function() {
    console.log('This always happens');
  };

  var successCallback = function(response) {
    console.log('success!');

    var body = $('.trip-body');
    body.empty();

    $.each(response, function(index, trip) {
      console.log(trip);

      var row = $('<tr></tr>');
      var name = $('<td> + <a href="#" class="name-link" id=' + trip.id + '>' + trip.name + '</a></td>');
      var continent = $('<td>' + trip.continent + '</td>');
      var weeks = $('<td>' + trip.weeks + '</td>');

      row.append(name, continent, weeks);
      body.append(row);
    });
    toggleTableview(true);
  };

  $('#all-trips-button').click(function() {
    $.get(url_all, successCallback)
      .fail(failCallback)
      .always(alwaysCallback);
  });

  var toggleTableview = function() {
    $('.trip-details').toggle(!onIndicator);
    $('button').toggle(!onIndicator);
    $('table').toggle(onIndicator);
  };

  var showSuccess = function(trip) {
    var section = $('.trip-details');
    var name = $('<strong>Name:</strong><div>' + trip.name + '</div>');
    var continent = $('<strong>Continent:</strong><div>' + trip.continent + '</div>');
    var weeks = $('<strong>Trip Length:</strong><div>' + trip.weeks + ' weeks</div>');
    var cost = $('<strong>Cost:</strong><div>' + trip.cost + '</div>');
    var about = $('<strong>About:</strong><div>' + trip.about + '<div>');

    section.empty();
    section.append(name, continent, weeks, cost, about);

    toggleTableview(false);
  };

  var showFailure = function() {
    var section = $('.trip-details');
    section.html('An error has occured');

    toggleTableview(false);
  };

  $('tbody').on('click', 'a', function(e){
    e.preventDefault();

    var id = $(this).attr('id');
    var showUrl = url_all + '/' + id;

    $.get(showUrl, showSuccess)
        .fail(showFailure);
  });
});
