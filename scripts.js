$(document).ready(function() {

var url = 'https://trektravel.herokuapp.com/trips';

var successCallback = function (allTrips) {
  for (var i=0; i < allTrips.length; i++) {
    $('#trips').append('<h4><a href=' + url + "/" + allTrips[i].id + ">" + allTrips[i].name + '</a></h4>');
  }
};

$( '#load' ).click(function(event) {
    $.get(url, successCallback);
});


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
  })
  .fail(function(trip){
     $('#message').text('This trip does not exist.');
   });

});

$( '#submit-name' ).click(function(event) {
    $.get(url, successCallback);
});


}); //ending document
