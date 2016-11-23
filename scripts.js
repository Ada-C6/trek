//scripts.js
$(document).ready(function(){

  var url = 'https://trektravel.herokuapp.com/trips'

  var successCallback = function(response) {

      for (var i = 0; i < response.length; i++ ){
        $('#trips').append("<h3><a href=" + url + "/" + response[i].id + ">" + response[i].name + "</a></h3>")
      }
    };

    $("#load").on('click',  function(){
      $.get(url, successCallback);
      $('#load').toggle();
    })

    $('#x').on('click', function(){
      $('#trip-details').toggle();
      $('#trips').toggle();      
    })

    $('#trips').on('click', "a", function(e){
    e.preventDefault();
    $('#trip-details').show(); //overrides the display:none in the css for profile
    var urlShow = $(this).attr('href');

    $.get(urlShow, function(trip){
      $('#trips').toggle();

      $('#name').text(trip.name);
      $('#continent').text("Continent: " + trip.continent);
      $('#category').text("Category: " + trip.category);
      $('#weeks').text(trip.weeks + " week(s)");
      $('#cost').text("$" + trip.cost);
      $('#about').text(trip.about);
    })
    .always(function(){
      $('#message').text("Something happened!")
    }).fail(function(){
      alert("Failed.");
    })
  })
});
