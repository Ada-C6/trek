$(document).ready(function() {
  var url = 'https://trektravel.herokuapp.com/trips';
  $('#add-trip-form').toggle(false);
  $('#single-trip').toggle(false);
  var failCallback = function(xhr) {
    var body = $('.trip-details');
    body.empty();
    body.append('Sorry can\'t load page!');
    $('#add-trip-form').toggle(false);
  };

  var successCallback = function (response) {
    var body = $('.trip-body');
    body.empty();
    var hrow = $('<tr></tr>');
    var name = $('<th>Destination</th>');
    hrow.append(name);
    body.append(hrow);

    $.each(response, function(index, trip){
      if (trip.name != 'Person') {
        var row = $('<tr></tr>');
        var name = $('<td><a href="#" class="name-link" id=' + trip.id + '>' + trip.name + '</a></td>');
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
    $('#add-trip-form').toggle(!boolean);
    $('#single-trip').toggle(!boolean);
  };

  var showSuccess = function(trip) {
    var section = $('.trip-details');
    var id = $('<b>Id:</b><span> ' + trip.id + '</span><br>');
    var name = $('<b>Name:</b><span> ' + trip.name + '</span><br>');
    var continent = $('<b>Continent:</b><span> ' + trip.continent + '</span><br><br>');
    var about = $('<b>About:</b><br><pclass="large-text-justify"> ' + trip.about + '</p>');
    var category = $('<b>Category:</b><span> ' + trip.category + '</span><br>');
    var weeks = $('<b>Weeks:</b><span> ' + trip.weeks + '</span><br>');
    var cost = $('<b>Cost:</b><span> ' +'$' + trip.cost + '</span><br>');

    section.empty();
    section.append(id, name, continent, about, category, weeks, cost);

    toggleTableView(false);
    $('#single-trip').toggle(true);

    var postCallback = function() {
      alert("The reservation was made!");
      $('#add-trip-form').toggle(false);
    };

    var addtripcallback =  function(e) {
      e.preventDefault();
      var reservationData = $(this).serialize();
      var reservationUrl = url + '/' + trip.id + '/reserve';
      $.post(reservationUrl, reservationData, postCallback)
      .fail(showFailure);
    };
    $('#add-trip-form').submit(addtripcallback);
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
