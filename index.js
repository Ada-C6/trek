$(document).ready(function(){
  // which URL do we want to 'get'
  var url = 'https://trektravel.herokuapp.com/trips';

  // what do we want to happen when we get a response?
  var successCallback = function(response) {
    console.log('success!');
    // console.log(response);
    var body = $('.trips-body');
    body.empty(); // clearing the body out to ensure populating fresh.

    $.each(response, function(index, trip){
      // console.log(pet);
      var row = $('<tr></tr>');
      var name = $('<td>' + trip.name + '</td>');
      var continent = $('<td>' + trip.continent + '</td>');
      var duration = $('<td>' + trip.weeks + '</td>');

      row.append(name, continent, duration);
      body.append(row);
    });

    $('button').hide();
  };

  // what do we want to happen when it fails?
  var failCallback = function(xhr) {
    console.log('failure');
    console.log(xhr);
  };

  // this always happens. good for cleaning things up afterward.
  var alwaysCallback = function(){
    console.log("this always happens");
  };

  $('button').click(function(){
    $.get(url, successCallback)
      .fail(failCallback)
      .always(alwaysCallback);
  });

});
