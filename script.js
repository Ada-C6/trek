$(document).ready(function(){
  var url = 'https://trektravel.herokuapp.com/trips';

  var successCallback = function(response) {
    for (var i=0; i < response.length; i++) {
      $('#trips').append("<h3><a href=" + url + "/" + response[i].id + ">" + response[i].name + "</a></h3>");
    }
  };

  $('#load').click( function() {
    $('#trips').empty();
    $.get(url, successCallback);
  });

  $('#trips').on('click', 'a', function(e) {
    e.preventDefault();
    $('#tripdesc').show();
    var tripUrl = $(this).attr('href');

    $.get(tripUrl, function(trip){
      $('#name').text(trip.name);
      $('#continent').text(trip.continent);
      $('#about').text(trip.about);
      $('#category').text(trip.category);
      $('#weeks').text(trip.weeks);
      $('#cost').text(trip.cost);
    }).fail(function(){
      alert("failed");
    });

  });

});
