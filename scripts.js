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



});
















}); // ending $(document).ready
