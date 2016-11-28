$(document).ready(function() {

// Which URL do we want to 'get'?
var url = 'https://trektravel.herokuapp.com/trips';

// What do we want to happen when we get our response?
var successCallback = function (response) {
  for (var i = 0; i < response.length; i++ ) {
    $('#all_trips').append("<h3><a href=" + url + "/" + response[i].id + ">" + response[i].name + "</a></h3>");
  }
};

// $.get(url, successCallback) - give you list w/o clicking
$('body').on('click', 'button', function() {
  console.log('clicked');
  $.get(url, successCallback);
});

});
