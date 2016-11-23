$(document).ready(function() {
  var url = 'https://trektravel.herokuapp.com/trips';
  $('#add-reservation-form').hide();


  var failCallback = function(xhr) {
      console.log('failure');
      console.log(xhr);
    };


  var successCallback = function(response) {
    console.log('success!');
    var body = $('.trips-body');
    body.empty();

    $.each(response, function(index, trip) {
      console.log(trip);
      var row = $('<tr class="row"></tr>');
      var name = $('<td class="small-12 columns medium-6 columns">' + trip.name + '</td>');
      var link = $('<td class="small-12 columns medium-3 columns"><a href="#" class="name-link" id=' + trip.id + '>' + 'See Details' + '</a></td>');

      row.append(name, link);
      body.append(row);
    });
    toggleTableView(true);
  };

  $('button').click(function() {
    $.get(url, successCallback);
  });

  var toggleTableView = function(onIndicator) {
    $('.trip-details').toggle(!onIndicator);
    $('button').toggle(!onIndicator);
    $('table').toggle(onIndicator);
    $('#add-reservation-form').toggle(!onIndicator);
};


  var showSuccess = function(trip) {
    var section = $('.trip-details');
    console.log(trip);
    var id = $('<div class="small-12 columns"><strong>ID</strong><div>' + trip.id + '</div></div>');
    var name = $('<div class="trip-name small-12 columns">' + trip.name + '</div></div>');
    var destination = $('<div class="small-12 columns medium-3 columns"><strong>Destination</strong><div>' + trip.destination + '</div></div>');
    var continent = $('<div class="small-12 columns medium-3 columns"><strong>Continent</strong><div>' + trip.continent + '</div></div>');
    var about = $('<article>' + '<strong>About</strong><div>' + trip.about + '</div>' + '</article>');
    var category = $('<div class="small-12 columns medium-3 columns"><strong>Category</strong><div>' + trip.category + '</div></div>');
    var weeks = $('<div class="small-12 columns medium-3 columns"><strong>Weeks</strong><div>' + trip.weeks + '</div></div>');
    var cost = $('<div class="small-12 columns"><strong>Cost</strong><div>' + "$" + trip.cost + '</div></div>');

    section.empty(); // Reset the HTML in case there is data from before
    section.append(name, destination, continent, category, weeks, about, cost, id);

    $('.trip-id').val(trip.id);

    toggleTableView(false);
  };

  $('tbody').on('click', 'a', function(e) {
  e.preventDefault();

  var id = $(this).attr('id');
  var showUrl = url + '/' + id;
  $.get(showUrl, showSuccess);
  });

  var postCallback = function() {
    alert('post success!');
  };

  var addReserveCallback = function(event) {
    event.preventDefault();
    var reserveData = $(this).serialize();
    var id = $('.trip-id').val();
    var reserveUrl = url + '/' + id + '/reserve';
    $.post(reserveUrl, reserveData, postCallback)
      .fail(failCallback);
  };

  $('#add-reservation-form').submit(addReserveCallback);
});
