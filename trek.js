$(document).ready(function(){

  $( "#load" ).click(function() {
      var url = "https://trektravel.herokuapp.com/trips"
      $.get(url,
        function(response){
                for (var i = 0; i < response.length; i++){
                  console.log(response[i]);
                  $('#trips').append("<h3><a href=" + url + "/" + response[i].id + ">" + response[i].name + "</a></h3>");
                }
        });
    });

  $('#trips').on('click', 'a', function(e){
    e.preventDefault();

    $('#details').show();
    var tripUrl = $(this).attr('href');
    console.log(tripUrl);

    $.get(tripUrl, function(trip){
      $('#name').text(trip.name);
      $('#continent').text(trip.continent);
      $('#weeks').text(trip.weeks);
      $('#cost').text(trip.cost);
      $('#about').text(trip.about);
    }).always(function(){
      $("#message").text("Something happened");
    }).fail(function(){
      alert("Failed.");
    })
  });

}); // ending $(document).ready
