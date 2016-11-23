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

    $('#x-details').on('click', function(){
      $('#trip-details').toggle();
      $('#trips').toggle();
    })

//clicking on the reserve a spot link makes the form pop up
  $('#reserve').on('click', function(){
    $('#reservation-form').toggle();
  })

//when you click submit on the form, it makes a new reservation for that trip with the info the user inputs

  var callback = function(){
    console.log("Success!")
    alert("You've successfully reserved a spot!");
//and takes you back to the trips page
    $('#trip-details').toggle();
    $('#trips').toggle();
//and clears the data from the form and hides it again
    $('#reservation-form').trigger("reset");
    $('#reservation-form').toggle();
  };


  $('#reservation-form').submit(function(e){
    e.preventDefault();
    var reserveURL = url + "/" + $('#id').text() + "/reserve"
    var formData = $(this).serialize();
    $.post(reserveURL, formData, callback);

  })


//when you click on a trip, you can see details about the trip...
  $('#trips').on('click', "a", function(e){
    e.preventDefault();
    $('#trip-details').show(); //overrides the display:none in the css for profile
    var urlShow = $(this).attr('href');
    console.log(urlShow);
    console.log(this)
    $.get(urlShow, function(trip){
      $('#trips').toggle();

      $('#name').text(trip.name);
      $('#id').text(trip.id);
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
