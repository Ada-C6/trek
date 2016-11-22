$(document).ready(function() {
  // Which URL do we want to 'get'?
  var url = 'https://trektravel.herokuapp.com/trips';

  var failCallback = function(xhr) {
    console.log('failure');
    console.log(xhr);
  };

  var alwaysCallback = function() {
    console.log('This always happens');
  };

  // What do we want to happen when we get our response?
  var successCallback = function (response) {
    console.log('success!');

    var body = $('.trips-body');
    body.empty(); // Clear this out to start with to ensure we are populating fresh

    $.each(response, function(index, trip){
      // console.log(trip);
      var row = $('<tr></tr>');
      var name = $('<td><a href="#" class="name-link" id=' + trip.id + '>' + trip.name + '</a></td>');
      var continent = $('<td>' + trip.continent + '</td>');
      var weeks = $('<td>' + trip.weeks + '</td>');

      row.append(name, continent, weeks);
      body.append(row);
    });

    toggleTableView(true);
  };

  $('button').click(function() {
    $.get(url, successCallback)
      .fail(failCallback)
      .always(alwaysCallback);
  });

  var toggleTableView = function(onIndicator) {
    $('.trip-details').toggle(!onIndicator);
    $('button').toggle(!onIndicator);
    $('table').toggle(onIndicator);
  };

  var showSuccess = function(trip) {
    var section = $('.trip-details');
    var name = $('<br><strong>Name</strong><div>' + trip.name + '</div><br>');
    var continent = $('<strong>Continent</strong><div>' + trip.continent + '</div><br>');
    var weeks = $('<strong>Weeks</strong><div>' + trip.weeks + '</div><br>');
    var cost = $('<strong>Cost</strong><div>' + trip.cost + '</div><br>');
    var about = $('<strong>About</strong><div>' + trip.about + '</div><br>');
    var category = $('<strong>Category</strong><div>' + trip.category + '</div>');

    section.empty(); // Reset the HTML in case there is data from before
    section.append(name, continent, weeks, cost, about, category);

    toggleTableView(false);
  };

  var showFailure = function(xhr) {
    var section = $('.trip-details');
    section.html('<strong>Error has occurred</strong>');

    toggleTableView(false);
  };

  $('tbody').on('click', 'a', function(e) {
    e.preventDefault();

    var id = $(this).attr('id');
    var showUrl = url + '/' + id;
    $.get(showUrl, showSuccess)
      .fail(showFailure);
  });
});
