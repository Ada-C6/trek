$(document).ready(function(){
// console.log("script works!");


var tripsurl = 'https://trektravel.herokuapp.com/trips';


var successCallback = function (response) {
    console.log('success!');

    var body = $('.trips-body');
    // body.empty();

    $.each(response, function(index, trip){
      console.log(trip);
      var row = $('<tr></tr>');
      var name = $('<td><h3><a href="#" class="name-link" id=' + trip.id + '>' + trip.name + '</h3></a></td>');

      row.append(name);
      body.append(row);
    });

    // toggleTableView(true);
  };

//if .get for receiving all trips fails
  var failCallback = function(xhr) {
    console.log('failure');
    console.log(xhr);
    var failmessage =  $('<h3> Sorry, something is wrong with our servers or this website in general.</h3>');
    var body = $('.trips-body');
    body.append(failmessage);
  };



// .get for loading all trips
  $('button').click(function() {
      $.get(tripsurl, successCallback)
        .fail(failCallback);
    });



}); //end of documentready
