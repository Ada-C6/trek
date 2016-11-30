$(document).ready(function() {


//////////////////
//* SHOW ALL   *//
/////////////////

var url = 'https://trektravel.herokuapp.com/trips';

var successCallback = function(allTrips) {
  for (var i=0; i < allTrips.length; i++) {
    $('#trips').append('<li><a href=' + url + "/" + allTrips[i].id + ">" + allTrips[i].name + '<p>' + "Continent: " + allTrips[i].continent + '</p>' + '</a></li>');
  }
};

$( '#load' ).click(function(event) {
    $.get(url, successCallback);
});



//////////////////
//* TRIP INFO  *//
/////////////////

$('#trips').on('click', 'a', function(e) {
  e.preventDefault();

  $('#summary').show();

  var tripUrl = $(this).attr('href');

  $.get(tripUrl, function(trip){
    // go back and wrap some of this in another function and just call it here.
    $('#name').text(trip.name);
    $('#continent').text('Continent: ' + trip.continent);
    $('#about').text(trip.about);
    $('#weeks').text('Weeks: ' + trip.weeks);
    $('#cost').text('Total Cost: ' + '$' + trip.cost);
    $('#id').text('ID: ' + trip.id);
    $('#category').text('Category: ' + trip.category);
    $('#hiddeninputid').val(trip.id);
  })
  .fail(function(trip){
     $('#message').text('This trip does not exist.');
   });

});

//////////////////
//* REGISTER  *//
/////////////////


$('form').submit(function(e) {
  e.preventDefault();
  url = 'https://trektravel.herokuapp.com/trips/' + $('input[id=hiddeninputid]').val() + '/reserve';


  var callback = function() {
    alert('You have been registered for this trip!');
  };

  var formData = $(this).serialize();
  $.post(url, formData, callback);
});




}); //ending document
