$(document).ready(function(){
// console.log("script works!");


var tripsurl = 'https://trektravel.herokuapp.com/trips';
// var reservationurl = 'https://trektravel.herokuapp.com/trips/1/reserve';


var successTripDetails = function(trip) {
  // console.log('success!');
  // console.log(trip);
  var section = $('.trip-details');
  var name = $('<h1>Trip Name: ' + trip.name + '</h1>');
  var continent = $('<h3>Continent: ' + trip.continent + '</h3>');
  var category = $('<h3>Category: ' + trip.category + '</h3>');
  var about = $('<h3>About</h3><p>' + trip.about+ '</p>');
  var cost = $('<h3>Total Cost: $' + trip.cost+ '</h3>');
  var duration = $('<h3>Duration: ' + trip.weeks + ' weeks</h3>');

//adding reservation form dynamically to every trip--note: is there any advantage to this?
  var form = $("<form></form>");
  var nameLabel = $('<label for="name">Your Name</label>');
  var resName = $('<input type="text", name="name"></input>');
  var emailLabel = $('<label for="age">Email Address</label>');
  var resEmail = $('<input type="text" name="email"></input>');
  var button = $('<button type="submit" class="button"> Make My Reservation for ' + trip.name +'!</button>');

  form.append(nameLabel, resName, emailLabel, resEmail, button);

  section.empty();//clears older clicks
  section.append(name, continent, category, cost, duration, about, form);


  //Adding Post Functionality
  var postCallback = function(){
    alert("You've make a reservation!");
  };


  var addReservation = function(event) {
    event.preventDefault();
    console.log("sending reservation");
    var reservation = $(this).serialize();
    // console.log(this);
    var reservationurl = 'https://trektravel.herokuapp.com/trips/' + trip.id + '/reserve';
     //takes form data and transforms it into  query args. this refers to the form
    $.post(reservationurl, reservation, postCallback());
  };

    $('form').submit(addReservation);
};


$('tbody').on('click', 'a', function(e) {
    e.preventDefault();

    var id = $(this).attr('id');
    var showUrl = tripsurl + '/' + id;
    $.get(showUrl, successTripDetails)
      .fail(failCallback);
  });

var successCallback = function(response) {
    console.log('success!');

    var body = $('.trips-body');
    // body.empty();
    // var HTML = '<form attributes><input><input>...</form>';
    // $("#container").html(HTML);
    $.each(response, function(index, trip){
      console.log(trip);

      var row = $('<tr></tr>');
      var name = $('<td><h5><a href="#" class="name-link" id=' + trip.id + '>' + trip.name + '</h5></a></td>');

      row.append(name);
      body.append(row);


      // body.append(form);
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
