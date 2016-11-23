//load page
$(document).ready(function() {
  var url = 'https://trektravel.herokuapp.com/trips';

  var tripFailCallback = function(fail) {
    console.log('failure');
    console.log(fail);
  };

  var tripSuccessCallback = function(response) {
    console.log("Success!");

    var body = $('.trips-body');
    body.empty();

    $.each(response, function(index, trip) {
      var row = $('<tr></tr>');
      var name = $('<td><a href="#" class="name-link" id=' + trip.id + '>' + trip.name + '</a></td>');

      row.append(name);
      body.append(row);
    });
    toggleTableView(true);
  };

  $('#load-trip-button').click(function() {
    $.get(url, tripSuccessCallback)
      .fail(tripFailCallback);
  });

  var toggleTableView = function(onIndicator) {
    $('.trip-details').toggle(!onIndicator);
    $('button').toggle(!onIndicator);
    $('table').toggle(onIndicator);
  };

  var tripDetailSuccess = function(trip) {
    var section = $('.trip-details');
    var id = $('<strong>Id</strong><div>' + trip.id + '</div>')
    var name = $('<strong>Name</strong><div>' + trip.name + '</div>');
    var continent = $('<strong>Continent</strong><div>' + trip.continent + '</div>');
    var about = $('<strong>About</strong><div>' + trip.about + '</div>');
    var category = $('<strong>Category</strong><div>' + trip.category + '</div>');
    var weeks = $('<strong>Weeks</strong><div>' + trip.weeks + '</div>');
    var cost = $('<strong>Cost</strong><div>' + trip.cost + '</div>');

    section.empty();
    section.append(id, name, continent, about, category, weeks, cost);

    toggleTableView(false);
  };

  var tripDetailFailure = function(fail) {
    var section = $('.trip-details');
    section.html('Error has occurred! Dun dun dun....');
    toggleTableView(false);
  }

  $('tbody').on('click', 'a', function(event) {
    event.preventDefault();

    var id = $(this).attr('id');
    var tripDetailUrl = url + '/' + id;
    $.get(tripDetailUrl, tripDetailSuccess)
      .fail(tripDetailFailure);
  });
});
