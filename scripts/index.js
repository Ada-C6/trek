
$(document).ready(function() {
  var url = "https://trektravel.herokuapp.com/trips";
  $('#reservation-form').hide();

  var successCallback = function(response) {
    console.log("yay trips!");
    console.log(response);

    $.each(response, function(index, trip){
      console.log(trip);
      var row = $('<tr></tr>');
      var name = $('<td><a href="#" class="name-link" id=' + trip.id + ">" + trip.name + '</a></td>');
      var continent = $('<td>' + trip.continent + '</td>');
      var weeks = $('<td>' + trip.weeks + ' week(s)</td>');

      row.append(name, continent, weeks);
      $('.trips-body').append(row);

    });
    $('#trip-load-button').hide();
  };

  var tripCallback = function(trip) {
    console.log('this should be a single trip');
    console.log(trip);
    $('.trip-display').empty();
    $('#reservation-form').toggle();
    var name = $('<h2>' + trip.name + '</h2>');
    var duration = $('<div><span>Duration: </span>' + trip.weeks + ' week(s)</div>');
    var cost = $('<div><span>Cost: $</span>' + trip.cost + '</div>');
    var id = $('<div><span>ID: </span><span class="trip-id">' + trip.id + "</span></div>");
    var continent = $('<div><span>Continent: </span>' + trip.continent + '</div>');
    var category = $('<div><span>Category: </span>' + trip.category + '</div>');
    var description = $('<div><span>Description: </span><br>' + trip.about + '</div>');
    $('.trip-display').append(name, duration, cost, id, continent, category, description);
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
    $('body').append("Sorry invalid URL!<br>");

  };

  var alwaysCallback = function() {
    console.log("this always happens");
  };

  $('#trip-load-button').click(function() {
      $.get(url, successCallback)
        .fail(failCallback)
        .always(alwaysCallback);
  });


  //POST

  var postCallback = function(){
    alert("you did it right! yay!");
    console.log("did this work");
  };

  $('#reservation-form').submit(function(event){
    var tripId =$(".trip-id").html();
    var reservationUrl = url+ "/" + tripId + "/" + "reserve";
    event.preventDefault();
    var reservationData = $(this).serialize();
    $.post(reservationUrl, reservationData, postCallback);

  });

  // var displayForm = function(){
  //   var form = $('<form id="reservation-form" class="small-6 columns"><label for="name">Name</label><input type="text" name="name"></input><label for="email">Email</label><input type="text" name="email"></input><button type="submit" class="button">Reserve this trip!</button></form>');
  //
  // };




});
