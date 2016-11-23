// // scripts.js
$(document).ready(function(){


  var url = 'https://trektravel.herokuapp.com/trips';


  var successCallback = function (response) {
    for (var i=0; i < response.length; i++ ){
      $('#trips').append("<h3><a href=" + url + "/" + response[i].id + ">" + response[i].name + "</a></h3>");
    }
  };

  $('#load').on('click', function(){
    $.get(url, successCallback);
  })




$('#trips').on('click', 'a', function(e){
  e.preventDefault();

  $('#profile').show();
  var tripUrl = $(this).attr('href');

  $.get(tripUrl, function(trip){
   $('#name').text(trip.name);
    $('#continent').text(trip.continent);
    $('#weeks').text(trip.weeks);
    $('#about').text(trip.about);
    $('#cost').text(trip.cost);
    $('#category').text(trip.category);
  }).always(function(){
    $("#message").text("Something happened");
  }).fail(function(){
    alert("Failed.");
  })
});





}); // ending $(document).ready
