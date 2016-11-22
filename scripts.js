// Wait until the document is ready
$(document).ready(function(){

  // URL of the API
  var url = 'https://trektravel.herokuapp.com/trips';

  // What do we want to happen when we get our response?
  var successCallback = function (response) {
    for (var i=0; i < response.length; i++ ){
      $('#vacations').append("<ul><li><a href=" + url + "/" + response[i].id + ">" + response[i].name + "</a></li><li> Continent:" + response[i].continent + "</li><li> Weeks:" + response[i].weeks + "</li></ul>");
    }
  };

  $.get(url, successCallback);


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
