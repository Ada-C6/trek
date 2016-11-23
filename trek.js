// AJAX Notes:
// AJAX is a design pattern that you can implement in jQuery (but also plain JS)
// Requires server communication - async communication with server using JS.
// Entails composing request objects, sending to server and async waiting for the response.
// Previously, when you made a JS request to server it was a blocking request,
// nothing else could happen until that response came through.
// Nothing below is AJAX code per se, but rather how I'm using jQuery.

$(document).ready(function(){
  // Hide the reseveration form until a trip is selected
  $('#reserve-form').hide();

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

    // Resetting forms and fields
    $('#message').text("");
    $('form').trigger("reset");

    $('#details').show();

    // Hiding the load button, as hitting it again would just append the results back onto the list
    $('#load').hide();

    // Show the reservation form, in addition to the trip details
    $('#reserve-form').show();

    var tripUrl = $(this).attr('href');
    console.log(tripUrl);

    $.get(tripUrl, function(trip){
      var tripId = trip.id;
      $('#name').text("Trip Name: " + trip.name);
      $('#id').text("ID: " + trip.id);
      $('#continent').text("Continent: " + trip.continent);
      $('#weeks').text("Weeks: " + trip.weeks);
      $('#cost').text("Cost: $" + trip.cost.toFixed(2));
      $('#about').text("About: " + trip.about);
      $('#category').text("Category: " + trip.category);

      // Reservation Form:
      $('form').submit(function(e) {
          e.preventDefault();
          var addTripUrl = $(this).attr("action") + tripId + "/reserve"; // Retrieve the action from the form
          var formData = $(this).serialize();

          $.post(addTripUrl, formData, function(response){
            console.log(response);
          })
          $('#reserve-form').hide();
          $('#message').text("Your trip has been successfully booked.");
        });

    }).fail(function(){
      alert("Failed to find this trip's details. Please try again.");
    })
  });

}); // ending $(document).ready
