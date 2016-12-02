
$(document).ready(function() {

// Which URL do we want to 'get'?
var url = 'https://trektravel.herokuapp.com/trips';

// What do we want to happen when we get our response?
var successCallback = function (response) {
  for (var i = 0; i < response.length; i++ ) {
    $('#all_trips').append("<h3><a data-open='trip_info' href=" + url + "/" + response[i].id + ">" + response[i].name + "</a></h3>");
  }
};

// $.get(url, successCallback) - give you list w/o clicking
$('body').on('click', 'button', function() {
  console.log('clicked');
  $.get(url, successCallback);
});

$('#all_trips').on('click', 'a', function(event) {
  event.preventDefault();
  $('#trip_info').show();
  var tripUrl = $(this).attr('href');
  $.get(tripUrl, function(trip) {
    $('#name').text(trip.name);
    $('#id').text(trip.id);
    $('#continent').text(trip.continent);
    $('#about').text(trip.about);
    $('#category').text(trip.category);
    $('#weeks').text(trip.weeks);
    $('#cost').text('$' + trip.cost);
  });
});

}); //end
