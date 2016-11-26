$(document).ready(function() {
  // Which URL do we want to 'get'?
  var url = 'https://trektravel.herokuapp.com/trips/';


  // What do we want to happen when we get our response?

  // SHOW ALL THE TREKS!
  // SUCCESS
  var successCallback = function (response) {

    var body = $('.travel-locations');
    body.empty();

    $.each(response, function(index, travel){
      var row = $('<tr></tr>');
      var travelName = $("<td><a href=# id=" + travel.id + ">" + travel.name + '</td>');
      var continent = $('<td>' + travel.continent + '</td>');
      var duration = $('<td>' + travel.weeks + ' weeks</td>');

      row.append(travelName, continent, duration);
      body.append(row);
    });

    $('button').hide();
  };

  // FAILURE
  var failCallback = function(xhr) {
    console.log('failure');
    console.log(xhr);
  };

  // need to click the show all button to get treks
  $('.show-all-button').click(function() {
    $.get(url, successCallback)
      .fail(failCallback);

    $('html > body').wrap('<div class="fade-all">');
  });


  // SUCCESS SHOW
  var showSuccessCallback = function (response) {

    var body = $('.single-location');

    var travelName = $('<li>' + response.name + '</li>');
    var continent = $('<li>' + response.continent + '</li>');
    var duration = $('<li>' + response.weeks + ' weeks</li>');
    var cost = $('<li>' + response.cost + '</li>');
    var description = $('<li>' + response.about + '</li>');

    var reservationForm = $("<li><section><form id=" + response.id + " class='booking-form'><label for='name'>Name</label><input type='text' name='name'></input><button type='submit' class='button'>Reserve</button></form></section></li>");

    body.empty();
    $('#message').empty();
    body.append(travelName, continent, duration, cost, description, reservationForm);

    $('.single-location').show();
  };

  // clicking on a specific trek SHOWS the information about it
  $('body').on('click', 'a', function(event) {
    event.preventDefault();

    var id = $(this).attr('id');
    var showUrl = url + id;
    $.get(showUrl, showSuccessCallback)
      .fail(failCallback);
  });

  $(document).submit(function(e) {
  // By default, the form will attempt to do it's own local POST so we want to prevent that default behavior
  e.preventDefault();

  // POST URL: trektravel.herokuapp.com/trips/TRIP_ID/reserve
  var postUrl = url + $('.booking-form').attr('id') + '/reserve';
  var formData = $(this).serialize();

  $.post(postUrl, formData, function(response){
    $('.single-location').empty();
    $('#message').html('<p>Reserved - enjoy your trek!</p>');

    // What do we get in the response?
    console.log(response);
  })
    .fail(function(){ $('#message').html('<p>Reserving the trip failed</p>');
    });

  });


});
