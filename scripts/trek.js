var tripListRow = function(trip) {
  var row = $('<tr></tr>');
  var id = trip.id;
  var name = $('<td class="details"><a href="#" id=' + trip.id + '>' + trip.name + '</a></td>');
  var continent = $('<td>' + trip.continent + '</td>');
  var weeks = $('<td>' + trip.weeks + '</td>');

  row.append(name, continent, weeks);
  return row;
};


$(document).ready(function() {
  var listUrl = "https://trektravel.herokuapp.com/trips";

  var listSuccess = function(response) {
    console.log("I'm the success callback");
    console.log("Response: " + response);

    $.each(response, function(index, trip) {
      console.log(trip);
      var addRow = tripListRow(trip);
      $('#trip-list-table > tbody').append(addRow);
    });
  };

  $("#show-button").on('click', function() {
    console.log("I will do the thing!");
    $.get(listUrl, listSuccess);
  });
});
