// scripts.js

$(document).ready( function() {


// Trek API url to 'get'?
var url = 'https://trektravel.herokuapp.com/trips';
$('#trips').hide();

// Print out a list of response links
var successCallback = function (response) {
  $('#trips').show();

  for (var i = 0; i < response.length; i++ ) {
  $('#trips').append("<h3 class='trip-list'> <a href=" + url + "/" + response[i].id + ">" + response[i].name + "</a></h3>");

  // console.log('success!');
  $('#load').hide(); // So you can't keep apending.
  }
};

// OR: $("#load").on('click', function() {
$("#load").click(function() {
  // console.log('success!');
  $.get(url, successCallback); // THis passes us a response object
});



// ------------- Display trip pop-up -------------- // Parts adapted from from: http://stackoverflow.com/questions/1328723/how-to-generate-a-simple-popup-using-jquery   &   http://stackoverflow.com/questions/28558865/popup-window-close-on-click-outside-not-inside-jquery
$('#trips').on('click', 'a', function(event) {
  // // Get the position of the clicked element
  // var posX = $(this).offset().left;
  // var posY = $(this).offset().top;
  // // make sure the fiew goes where the popup is
  // // window.scrollTo(posX, posY);
  // // Make the pop up happen at the location of the click
  // $(".trippop").css({top: posY,});

  if($(this).hasClass('selected')) {
    deselect($(this));
  } else {
    $(this).addClass('selected');
    $('.pop').fadeToggle("fast");
  }

  event.preventDefault();
  var tripUrl = $(this).attr('href');

  // Should be able to see id, name, destination, continent, about, category, weeks and cost
  var tripResponse = $.get(tripUrl, function(trip) {
    $('#trip-id').text("Trip ID: " + trip.id);
    $('#trip-name').text(trip.name);
    $('#trip-continent').text(trip.continent);
    $('#trip-category').text(trip.category);
    $('#trip-weeks').text(trip.weeks);
    $('#trip-cost').text(trip.cost);
    $('#trip-description').text(trip.about);
    // Set form submission url
    $('#new_trip').attr('action', tripUrl + '/reserve');
  }).fail(function() {
    console.log('Failure.');
  }).always(function() {
    $('#test-message').text('Something Happened!');
  });
  // return false;
});

// Deselect a pop-up
var deselect = function(e) {
  $('.pop').fadeToggle("fast", function() {
    e.removeClass('selected');
  });
};

// Deselect a pop-up if you hit close
$('.close').on('click', function() {
  deselect($('#trips'));
  return false;
});

// Close pop-up if you click anywhere besides the pop-up
$(document).mouseup(function (e) {
     var popup = $(".pop");
     if (!$('#trips').is(e.target) && !popup.is(e.target) && popup.has(e.target).length === 0) {
         popup.hide(200);
     }
 });

// ------------- Display trip pop-up -------------- //


var callback = function() {
  console.log("success!");
};

$('form').submit(function(e){ // THe $(this) referred to the button above - now it refers to the submitted data
  e.preventDefault(); // You have to prevent the default, because it's trying to make a new pet with no data automatically, but we want to control it with jQuery
  var formData = $(this).serialize();
  var postUrl = $(this).attr('action');
  console.log(postUrl);

  alert('Thank you! Your reservation has been submitted!');
  $.post(postUrl, formData, callback);  //With this version you can get rid of the ids on the form
  $( ".close" ).trigger("click");
});


}); // ending $(document).ready
