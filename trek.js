// AJAX Notes:
// AJAX is a design pattern that you can implement in jQuery (but also plain JS)
// Requires server communication - async communication with server using JS.
// Entails composing request objects, sending to server and async waiting for the response.
// Previously, when you made a JS request to server it was a blocking request,
// nothing else could happen until that response came through.
// Nothing below is AJAX code per se, but rather how I'm using jQuery.

$(document).ready(function(){

  $( "#load" ).click(function() {
      var url = "https://trektravel.herokuapp.com/trips"
      $.get(url,
        function(response){
          $('#trips').append("<h3> Select a trip for more information: </h3>")
          for (var i = 0; i < response.length; i++){
            console.log(response[i]);
            $('#trips').append("<div class='record'><a href=" + url + "/" + response[i].id + ">" + response[i].name + "</a></div>");
          }
        });
    });

  $('#trips').on('click', 'a', function(e){
    e.preventDefault();

    $('#details').show();
    var tripUrl = $(this).attr('href');
    console.log(tripUrl);

    $.get(tripUrl, function(trip){
      $('#name').text("Trip Name: " + trip.name);
      $('#id').text("ID: " + trip.id);
      $('#continent').text("Continent: " + trip.continent);
      $('#weeks').text("Weeks: " + trip.weeks);
      $('#cost').text("Cost: $" + trip.cost);
      $('#about').text("About: " + trip.about);
      $('#category').text("Category: " + trip.category);
    }).always(function(){
      $("#message").text("Something happened");
    }).fail(function(){
      alert("Failed.");
    })
  });

}); // ending $(document).ready
