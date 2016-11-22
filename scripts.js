// scripts.js

$(document).ready( function() {


// Trek API url to 'get'?
var url = 'https://trektravel.herokuapp.com/trips';

// Print out a list of response links
var successCallback = function (response) {
  for (var i = 0; i < response.length; i++ ) {
  $('#trips').append(" <h3> <a href=" + url + "/" + response[i].id + ">" + response[i].name + "</a></h3>");
  // console.log('success!');
  }
};

// OR: $("#load").on('click', function() {
$("#load").click(function() {
  // console.log('success!');
  $.get(url, successCallback); // THis passes us a response object
});


//
// // When I click on a pet, show more info on that trip in a popup...
// $('#pets').on('click', 'a', function(e) { // pass in e (shorthand for event)
//   e.preventDefault();
//   $("#profile").show(); //Switches display: none;  ** To go back:  $("#profile").hide();
//
//   var petUrl = $(this).attr('href');
//
//   // the second value in the get request is the response passed in if the request was successful **the function(pet) here** will run
//   // If there is an unsuccessful request, a 404 will be returned and the function won't run
//   var pet = $.get("petUrl", function(pet) { //changed to function(response) from successCallback, which had given us an object with a ton of data
//     // console.log(response);
//     $('#name').text(pet.name);
//     $('#age').text(pet.age);
//     $('#breed').text(pet.breed);
//   }).fail(function() {
//     console.log('Failure.');
//   }).always(function() {
//     $('#message').text('Something Happened!');
//   });
//
// });


// Display trip pop-up //
function deselect(e) {
  $('.pop').slideFadeToggle(function() {
    e.removeClass('selected');
  });
}

$(function() {
  $('#contact').on('click', function() {
    if($(this).hasClass('selected')) {
      deselect($(this));
    } else {
      $(this).addClass('selected');
      $('.pop').slideFadeToggle();
    }
    return false;
  });

  $('.close').on('click', function() {
    deselect($('#contact'));
    return false;
  });
});

$.fn.slideFadeToggle = function(easing, callback) {
  return this.animate({ opacity: 'toggle', height: 'toggle' }, 'fast', easing, callback);
};
















}); // ending $(document).ready
