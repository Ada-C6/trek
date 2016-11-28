$(document).ready(function(){
  var tripId=null;

  // url to show the trips
  var url =  'https://trektravel.herokuapp.com/trips';

  // callback after succesful response
  //for each trip, append this html
  var successCallback = function (response) {
    for (var i=0; i < response.length; i++ ){
      $('#trips').append("<h3><a href=" + url + "/" + response[i].id + ">" + response[i].name + "</a></h3>");
    }
  };

  //when trips button is pushed, do the successCallback method
  $('#load').on('click', function(){
    $.get(url, successCallback);
    $("#load").css("display", "none")
  })

//click on a trip to show more information about that trip
//click event, that will make an ajax get request for that specific pet, by ID
// If successful, then have a pop-up with pets info

  $('#trips').on('click', 'a', function(e){
    e.preventDefault(); //prevent automatic page refresh
    $("#profile").remove(); //remove whatever form was there before
    var tripUrl = $(this).attr('href');


    $.get(tripUrl, function(trip){
       tripId= trip.id.toString();
  
      
      
      //I'm setting largeBlock so I can make  expanding/contracting info thing when user clicks. So this html is dynamically appended 
      //after the link that the user clicks
      var largeBlock = '<div id="profile"><h3 id="name"></h3><p id="destination"></p><p id="continent"></p><p id="about"></p><p id="category"></p><p id="weeks"></p><p id="cost"></p><h3>Reserve your spot<h3><form id="reservation" action="" method="post"><section><label>Name</label><input type="text" name="name"></input><label>Email</label><input type="text" name="email"></input><input id="id" type="hidden" name="trip_id" value="placeholder"/></section><button id= "geez" type="submit">Reserve</button><p id="message"></p></form></div>';
      $("#trips h3 a[href$="+"\\/"+tripId+"]").after(largeBlock);
      $('#reservation').attr("action", url+"/"+tripId+"/reserve")
    


      //id, name, destination, continent, about, category, weeks and cost
      $('#destination').text(trip.destination);
      $('#continent').text(trip.continent);
      $('#about').text(trip.about);
      $('#category').text(trip.category)
      $('#weeks').text(trip.weeks)
      $('#cost').text(trip.cost)

      $('#profile').show();
    });

     
      
      
      
    })
    //when you click the submit button...
    //.submit didn't work so I used on click
    $(document).on("click","#geez",function(e){
      e.preventDefault();
    
      // Retrieve the action from the form
      var url = $("form").attr("action"); 
     
      //take the number portion from the action
      var tripId=url.split("/")[4] 

      //set id value to tripID (it was placehoder)
      $('#id').attr("value", tripId)

      //get the data from the form 
      var formData = $("form").serialize();
      
     
      //post to the api and get the response
      $.post(url, formData, function(response){
        $('#message').html('<p> Spot reserved! </p>');
      })
      .fail(function(){
        alert("Failed.");
      })   
    });
}); // ending $(document).ready