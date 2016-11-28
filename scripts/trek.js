// Why isn't the button to reserve the spot displaying?

$(document).ready(function() {

  var url = 'https://trektravel.herokuapp.com/trips';

  var successCallback = function (response) {
    console.log('success!');
    console.log(response);
    var heading = $('.trip-headers');
    var body = $('.trip-body');

    var headings = $('<tr><td><strong><div>' + 'Trip Name' + '</div></strong></td><td><strong><div>' + 'Continent' + '</div></strong></td><td><strong><div>' + 'Trip Length' + '</div></strong></td></tr>');
    heading.append(headings);

    $.each(response, function(index, trip){
      console.log(trip);
      var row = $('<tr></tr>');
      var name = $('<td><a href="#" class="name-link" id=' + trip.id + '>' + trip.name + '</a></td>');
      var continent = $('<td>' + trip.continent + '</td>');
      var weeks = $('<td>' + trip.weeks + '</td>');

      row.append(name);
      row.append(continent);
      row.append(weeks);

      body.append(row);
    });
    // Button to load the trips disapears when the trips successfully load.
    $('.load-trips').hide();
  };

  var failCallback = function(xkr){
    console.log("failure");
    console.log(xhr);
  };

  var alwaysCallBack = function () {
    console.log('This always happens');
  };

  $('.load-trips').click(function(){
    $.get(url, successCallback)
      .fail(failCallback)
      .always(alwaysCallBack);
  });

  var showSuccess = function(trip) {
    var section = $('.trip-info');
    var id = $('<div><strong>Id: </strong>' + trip.id + '</div>');
    var name = $('<div><strong>Name: </strong>' + trip.name + '</div>');
    var continent = $('<div><strong>Continent: </strong>' + trip.continent + '</div>');
    var description = $('<div><strong>Description: </strong>' + trip.about + '</div>');
    var length = $('<div><strong>Length (in weeks): </strong>' + trip.weeks + '</div>');
    var category = $('<div><strong>Category: </strong>' + trip.category + '</div>');
    var cost = $('<div><strong>Cost: </strong>' + "$" + trip.cost + '</div>');


    section.empty(); // Reset the HTML in case there is data from before
    section.append(id, name, continent, description, length, category, cost);
  };

  $('tbody').on('click', 'a', function(e) {
    e.preventDefault();

    var id = $(this).attr('id');
    console.log(id);
    var showUrl = url + "/" + id;
    console.log(showUrl);

    // To ensure that the form dispears in case they open it and then click to open another trip
    $('#add-registration').hide();
    // To show the registration button to reserve a spot which displays the form to reserve the spot
    $('.reserve-spot').show();
    $.get(showUrl, showSuccess);
  });

  // POST SET UP!

  // Does the section below need to be in its own function name?
  // To display the reserve a spot button for a given trip
  $('.reserve-spot').hide();

  // To hide the form to reserve a spot
  $('#add-registration').hide(); //Initially form wil be hidden.

  // Unveils the form when the button is clicked.
  $('.reserve-spot').click(function() {
    $('#add-registration').show();//Form shows on button click
    $('.reserve-spot').hide();
  });

  // Actually dealing with posting/reservation

  var postCallBack = function(){
    alert("POST succeeded!");
  };

  var addReservationCallBack = function(event){
    event.preventDefault();
    console.log("Sending Pet Data!");
    var id = this.id.value;
    var postUrl = url + "/" + id + "/reserve";
    var reservationDetails = $(this).serialize();
    console.log("Reservation Details: " + reservationDetails);
    $.post(postUrl, reservationDetails, postCallBack);
  };

  $('#add-registration').click(addReservationCallBack);

});
