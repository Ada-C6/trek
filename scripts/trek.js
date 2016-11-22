$(document).ready(function() {

  var url = 'https://trektravel.herokuapp.com/trips/';

  var successCallback = function (response) {
    console.log('success!');
    console.log(response);
    var body = $('.trips');

    var headings = $('<tr><td><strong><div>' + 'Trip Name' + '</div></strong></td><td><strong><div>' + 'Continent' + '</div></strong></td><td><strong><div>' + 'Trip Length' + '</div></strong></td></tr>');
    body.append(headings);


    $.each(response, function(index, trip){
      console.log(trip);
      var row = $('<tr></tr>');
      var name = $('<td>' + trip.name + '</td>');
      var continent = $('<td>' + trip.continent + '</td>');
      var weeks = $('<td>' + trip.weeks + '</td>');

      row.append(name);
      row.append(continent);
      row.append(weeks);

      body.append(row);
    });
    // Button to load the pets disapears when the pets successfully load.
    $('button').hide();
  };

  var failCallback = function(xkr){
    console.log("failure");
    console.log(xhr);
  };

  var alwaysCallBack = function () {
    console.log('This always happens');
  };

  $('button').click(function(){
    $.get(url, successCallback)
      .fail(failCallback)
      .always(alwaysCallBack);
  });

});
