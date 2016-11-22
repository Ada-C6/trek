$(document).ready(function(){
// console.log("script works!");


var tripsurl = 'https://trektravel.herokuapp.com/trips';


var successTripDetails = function(trip) {
  console.log('success!');
  console.log(trip);
  var section = $('.trip-details');
  var name = $('<h1>Trip Name: ' + trip.name + '</h1>');
  var continent = $('<h3>Continent: ' + trip.continent + '</h3>');
  var about = $('<h3>About</h3><p>' + trip.about+ '</p>');
  var cost = $('<h3>Total Cost: $' + trip.cost+ '</h3>');
  var duration = $('<h3>Duration: ' + trip.weeks + '</h3>');


  section.empty();//clears older clicks
  section.append(name, continent, cost, duration, about);
};


$('tbody').on('click', 'a', function(e) {
    e.preventDefault();

    var id = $(this).attr('id');
    var showUrl = tripsurl + '/' + id;
    $.get(showUrl, successTripDetails)
      .fail(failCallback);
  });

var successCallback = function (response) {
    console.log('success!');

    var body = $('.trips-body');
    // body.empty();

    $.each(response, function(index, trip){
      console.log(trip);
      var row = $('<tr></tr>');
      var name = $('<td><h3><a href="#" class="name-link" id=' + trip.id + '>' + trip.name + '</h3></a></td>');

      row.append(name);
      body.append(row);
    });

    // toggleTableView(true);
  };

//if .get for receiving all trips fails
  var failCallback = function(xhr) {
    console.log('failure');
    console.log(xhr);
    var failmessage =  $('<h3> Sorry, something is wrong with our servers or this website in general.</h3>');
    var body = $('.trips-body');
    body.append(failmessage);
  };



// .get for loading all trips
  $('button').click(function() {
      $.get(tripsurl, successCallback)
        .fail(failCallback);
    });



}); //end of documentready
