$(document).ready(function(){
  var url = 'https://trektravel.herokuapp.com/trips';

  var successCall = function (response) {
    var body = $('.places');
    $.each(response, function(index, trip ){
      var row = $('<tr> </tr>');
      var name = $('<td>' + trip.name + '</td>');
      var continent = $('<td>' + trip.continent + '</td>');
      var weeks = $('<td>' + trip.weeks + '</td>');
      row.append(name, continent, weeks);
      body.append(row);
    });
    var singleTrip = function(trips){

    };
    $('button').hide();
  };
  $('button').on('click', function(){
    $.get(url, successCall);
  });
});
