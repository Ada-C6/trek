$(document).ready(function() {
  var url = 'https://trektravel.herokuapp.com/trips';

  var failCallback = function(xhr) {
    var body = $('.trip-details');
    body.empty();
    body.append('Sorry can\'t load page!');
  };

  var successCallback = function (response) {
    var body = $('.trip-body');
    body.empty();
    var hrow = $('<tr></tr>');
    var name = $('<th>Destination</th>');
    // var weeks = $('<th>Weeks</th>');
    // var cost = $('<th>cost</th>');
    hrow.append(name);
    body.append(hrow);

    $.each(response, function(index, trip){

      if (trip.name != 'Person') {

        var row = $('<tr></tr>');
        var name = $('<td><a href="#" class="name-link" id=' + trip.id + '>' + trip.name + '</a></td>');
        // var weeks = $('<td>' + trip.weeks + '</td>');
        // var cost = $('<td>' + trip.cost + '</td>');
        row.append(name);
        body.append(row);
      }

    });
    toggleTableView(true);
  };

  $('#load-button').click(function() {
    $.get(url, successCallback)
    .fail(failCallback);
  });

  var toggleTableView = function(boolean) {
    $('.trip-details').toggle(!boolean);
    $('#load-button').toggle(!boolean);
    $('table').toggle(boolean);
  };

  var showSuccess = function(trip) {
    var section = $('.trip-details');
    var id = $('<strong>Id</strong><div>' + trip.id + '</div>');
    var name = $('<strong>Name</strong><div>' + trip.name + '</div>');
    var continent = $('<strong>Continent</strong><div>' + trip.continent + '</div>');
    var about = $('<strong>About</strong><div>' + trip.about + '</div>');
    var category = $('<strong>Category</strong><div>' + trip.category + '</div>');
    var weeks = $('<strong>Weeks</strong><div>' + trip.weeks + '</div>');
    var cost = $('<strong>Cost</strong><div>' +'$' + trip.cost + '</div>');

    section.empty();
    section.append(id, name, continent, about, category, weeks, cost);

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
