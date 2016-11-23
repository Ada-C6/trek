//load page
$(document).ready(function() {
  var url = 'https://trektravel.herokuapp.com/trips';

  var tripFailCallback = function(fail) {
    console.log('failure');
    console.log(fail);
  };

  var tripSuccessCallback = function(response) {
    console.log("Success!");

    var body = $('.trips-body');
    body.empty();

    $.each(response, function(index, trip) {
      var row = $('<tr></tr>');
      var name = $('<td><a href="#" class="name-link" id=' + trip.id + '>' + trip.name + '</a></td>');

      row.append(name);
      body.append(row);
    });
  
  };

  $('#load-trip-button').click(function() {
    $.get(url, tripSuccessCallback)
      .fail(tripFailCallback);
  });



});
