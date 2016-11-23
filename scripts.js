// Wait until the document is ready
$(document).ready(function(){

  // URL of the API
  var url = 'https://trektravel.herokuapp.com/trips';

  // Show the list of vacations
  var successCallback = function (response) {
    for (var i=0; i < response.length; i++ ){
      $('#vacations').append("<ul><li><a href=" + url + "/" + response[i].id + ">" + response[i].name + "</a></li><li> Continent:" + response[i].continent + "</li><li> Weeks:" + response[i].weeks + "</li></ul>");
    }
  };

  // Click to show the list, then hide the button;
  $('#show_vac').on('click', function(e) {
    $.get(url, successCallback);
    $("#show_vac").hide();
  });


  $('#vacations').on('click', 'a', function(e) {
    e.preventDefault();

    $('#single_vac').show();

  });

//click on a pet, show more information on that pet
//click event, that will make an ajax get request for that specific pet, by ID
// If successful, then have a pop-up with pets info

// $('#pets').on('click', 'a', function(e){
//   e.preventDefault();
//
//   $('#profile').show();
//   var petUrl = $(this).attr('href');
//
//   $.get(petUrl, function(pet){
//     $('#name').text(pet.name);
//     $('#age').text(pet.age);
//     $('#breed').text(pet.breed);
//   }).always(function(){
//     $("#message").text("Something happened");
//   }).fail(function(){
//     alert("Failed.");
//   })
// });





}); // ending $(document).ready
