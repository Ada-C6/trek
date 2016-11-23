var tripListRow = function(trip) {
  var row = $('<tr></tr>');
  var id = trip.id;
  var name = $('<td class="details"><a href="#" id=' + trip.id + '>' + trip.name + '</a></td>');
  var continent = $('<td>' + trip.continent + '</td>');
  var weeks = $('<td>' + trip.weeks + '</td>');

  row.append(name, continent, weeks);
  return row;
};

var buildShowSection = function(trip) {
  console.log("Ready to build a show section");
  console.log("Trip: " + trip);
  // var destination = trip.destination ;
  var name = trip.name;
  var id =  trip.id;
  var continent = trip.continent;
  var about = trip.about;
  var category = trip.category;
  var weeks = trip.week;
  var cost = trip.cost;

  $("#show-trip-section").append(/* @TODO - add elements here */);
};

$(document).ready(function() {
  var listUrl = "https://trektravel.herokuapp.com/trips";

  // List Callbacks
  var listSuccessCallback = function(response) {
    console.log("I'm the success callback");
    console.log("Response: " + response);

    $.each(response, function(index, trip) {
      console.log(trip);
      var addRow = tripListRow(trip);
      $('#trip-list-table > tbody').append(addRow);
    });
  };

  var listFailCallback = function(xhr) {
    console.log('failure');
    console.log(xhr);
  };

  // ID Callbacks
  var idSuccessCallback = function(response) {
    console.log("ID response: " + response);
    $('#show-trip-section').empty();
    $('#show-trip-section').append(buildShowSection(response));
  };


  // Events
  $("#show-list-button").on('click', function(event) {
    console.log("I will do the list thing!");
    $.get(listUrl, listSuccessCallback)
      .fail(listFailCallback);
  });

  $('#trip-list-table').on('click', 'a', function() {
    console.log(this);
    console.log('you clicked a trip');
    var idForUrl = $(this).attr('id');
    console.log("ID: " + idForUrl);

    var idUrl = listUrl + "/" + idForUrl;
    console.log(idUrl);
    $.get(idUrl, idSuccessCallback);
      // .fail(id_failCallback)
      // .always(id_alwaysCallback);
  });
});
