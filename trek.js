$(document).ready(function(){

  $( "#load" ).click(function() {
      var url = "https://trektravel.herokuapp.com/trips"
      $.get(url,
        function(response){
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
