$(document).ready(function() {
  // 'get' URL
  var url = 'https://trektravel.herokuapp.com/trips';

  // Response
  var successCallback = function(response) {
    console.log('sucess!');
    console.log(response);

    var body = $('.travel-body');
    body.empty();

    $.each(response, function(index, trip) {
      var row = $('<tr></tr>');
      var name = $('<td><a href="#" class="trip-link" id=' + trip.id + '>' + trip.name + '</a></td>');

      row.append(name);
      body.append(row);
    });
  };

  var failCallback = function(xhr) {
    console.log('failed - sorry!');
  };

  $('button').click(function() {
    $.get(url, successCallback)
      .fail(failCallback);
  });

});
