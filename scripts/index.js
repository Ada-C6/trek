$(document).ready(function() {

  console.log("this is a thing");
  var url = "https://trektravel.herokuapp.com/trips";

  var successCallback = function(response) {
    console.log("yay trips!");
    console.log(response);

    $.each(response, function(index, trip){
      console.log(trip);
      var row = $('<tr></tr>');
      var name = $('<td><a href="#" class="name-link" id=' + trip.id + ">" + trip.name + '</a></td>');
      var continent = $('<td>' + trip.continent + '</td>');
      var weeks = $('<td>' + trip.weeks + '</td>');

      row.append(name, continent, weeks);
      $('.trips-body').append(row);

    });
    $('button').hide();
  };

  var tripCallback = function(trip) {
    console.log('this should be a single trip');
    console.log(trip);
    $('body').empty();
    var name = $('<h2>' + trip.name + '</h2>');
    var duration = $('<div><span>Duration: </span>' + trip.weeks + ' week(s)</div>');
    var cost = $('<div><span>Cost: $</span>' + trip.cost + '</div>');
    var continent = $('<div><span>Continent: </span>' + trip.continent + '</div>');
    var category = $('<div><span>Category: </span>' + trip.category + '</div>');
    var description = $('<div><span>Description: </span><br>' + trip.about + '</div>');
    $('body').append(name, duration, cost, continent, category, description);
  };

  $('.trips-body').on('click', 'a', function(e){
    e.preventDefault();
    var id = $(this).attr('id');
    var tripUrl = url + "/" + id;

    $.get(tripUrl, tripCallback);
  });

  var failCallback = function(xhr) { //uses 'xhr' - 'XML header' - to denote all kinds of responses, including failures
    console.log("failure");
    console.log(xhr);
    $('body').append("Sorry invalid URL but Heather is awesome<br>");

  };

  var alwaysCallback = function() {
    console.log("this always happens");
    $('body').append("This always happens but Heather is still awesome");

  };

  $('button').click(function() {
      $.get(url, successCallback)
        .fail(failCallback)
        .always(alwaysCallback);
    });


});
