var url = 'https://trektravel.herokuapp.com/trips';

var successCallback = function (response) {
  for (var i=0; i<response.length; i++){
    $('#trips').append('<li class="column"><a href='+ url + "/" + response[i].id + ">" + response[i].name +
    '<br>'+ "Continent: " +response[i].continent + '<br>' +  "Number of weeks: " + response[i].weeks + '</li></a>');
  }
};

$("#load").on('click', function(){
  $.get(url, successCallback);
});


// show details of the trip when the trip name is clicked

$('#trips').on('click', "a", function(e){
  e.preventDefault();

  $("#show-details").show();
  var petUrl = $(this).attr('href');

  $.get(petUrl, function(dest){
    $('#id').text(dest.id);
    $('#name').text("Name: " + dest.name);
    $('#continent').text("Continent: " + dest.continent);
    $('#about').text("About: " + dest.about);
    $('#category').text("Category: " + dest.category);
    $('#weeks').text("Weeks: " + dest.weeks);
    $('#cost').text("$"+ dest.cost);


  }).always(function(){
    $('#message').text("You did something");// this message will always display no matter what the condition callback is
  }).fail(function(){
    alert("Failed"); //alert failed message when the url doesn't exist.
  });
});


//hide details when click on anyplace in the document except for the trip name

// $('html').click(function() {
// //Hide the menus if visible
// $("#show-details").hide();
//
//
// });
//
// $('#show-details').click(function(event){
//     event.stopPropagation();
// });


$("#reserve").click(function(){

  $("#reserve-form").show();
});


 $('form').submit(function(e) {
  // By default, the form will attempt to do it's own local POST so we want to prevent that default behavior
  e.preventDefault();

  var url = $(this).attr("action"); // Retrieve the action from the form
  var formData = $(this).serialize();

  $.post(url, formData, function(response){
  $('#message').html('<p> Trip added! </p>');

  // What do we get in the response?
  console.log(response);
})
  .fail(function(){
    $('#message').html('<p>Adding Trip Failed</p>');
  });
});


// ########## script for "back to top" button ###############

$("#back-top").hide();

// fade in #back-top
$(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('#back-top').fadeIn();
    } else {
      $('#back-top').fadeOut();
    }
  });

  $("#back-top").click(function (){
      $('html, body').animate({
          scrollTop: $("body").offset().top
      }, 500);
  });

  // scroll body to 0px on click
  $('#back-top .fi-arrow-up').click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 800);
    return false;
  });
});
