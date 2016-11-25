$(document).ready(function(){
  var url = "https://trektravel.herokuapp.com/trips";
  var successCallBack = function(response) {
    console.log("response: ",response);
    console.log("success!!");
    // challenge from kai: try and turn this

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    for(var i = 0; i < response.length; i++) {
      $('#trips').append("<h3><a href=" + url + "/" + response[i].id + ">" + response[i].name + "</a></h3>");
    }


  };
  $('#load').on('click',function(){
    $.get(url, successCallBack);
  });


  //click event, that will make an ajax get request for the specific pet, then show pet, by ID

  //if successful, then have a pop-up with trips info.
  $("#trips").on('click','a', function(event){
    event.preventDefault();

    $('#trip_profile').show();
    var tripUrl = $(this).attr('href');

    console.log('trip url', tripUrl);

    $.get(url, successCallBack);
    console.log("I work I do!");

    // response could also be changed to be pets. all subsequent calls will be changed to pet as wwell.
    // you can also pass a url doesn't exist and see that it doesnt work

    $.get(tripUrl, function(response){
      // console.log("this is-->",response.name);  // returns name each time clicked on by user.

      $('#name').text(response.name);

      $('#continent').text(response.continent);

      $('#weeks').text(response.weeks);




    }).always(function(){
      $("#message").text("something happened.");
      console.log('you are done');
    }).fail(function(){
      alert("failed.");
    });

  });



}); // end of document.ready()
