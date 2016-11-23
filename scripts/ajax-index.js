var createHeaders = function(responseKeys) {
  var headers = $('.trips-header');
  headers.empty();

  var headerName = $('<th>' + responseKeys[1] + '</th>');
  var headerContinent = $('<th>' + responseKeys[2] + '</th>');
  var headerWeeks = $('<th>' + responseKeys[3] + '</th>');

  headers.append(headerName, headerContinent, headerWeeks);
};

var toggleTableView = function(onIndicator) {
  $('.trip-details').toggle(!onIndicator);
  $('button').toggle(!onIndicator);
  $('.continent-trips').toggle(!onIndicator);
  $('table.all-trips').toggle(onIndicator);
};


//FOR .BUTTON ON INITIAL VIEW OF INDEX PAGE
var failCallback = function(xhr) {
  console.log('failure');
  console.log(xhr);
};

// What do we want to happen when we get our response?
var successCallback = function (response) {
  console.log('success!');

  var body = $('.trips-body');

  body.empty(); // Clear this out to start with to ensure we are populating fresh

  createHeaders(Object.keys(response[0]));

  $.each(response, function(index, trip){
    var row = $('<tr></tr>');
    var name = $('<td><a href="#" class="name-link" id=' + trip.id + '>' + trip.name + '</a></td>'); //data attribute
    // var name = $('<td>' + trip.name + '</td>');
    var continent = $('<td>' + trip.continent + '</td>');
    var weeks = $('<td>' + trip.weeks + '</td>');

    row.append(name, continent, weeks);
    body.append(row);
  });

  toggleTableView(true);
};

//FOR TBODY ON INITIAL VIEW OF INDEX PAGE TO CREATE SHOW VIEW
var showSuccess = function(trip) {
  var section = $('.trip-details');
  var name = $('<strong>Name</strong><div>' + trip.name + '</div>');
  var continent = $('<strong>Location</strong><div id="continent">' + trip.continent + '</div>');
  var about = $('<strong>Trip Description</strong><div>' + trip.about + '</div>');
  var category = $('<strong>Trip Category</strong><div>' + trip.category + '</div>');
  var weeks = $('<strong>Weeks Long</strong><div>' + trip.weeks + '</div>');
  var cost = $('<strong>Cost</strong><div>' + '$ ' + trip.cost + '</div>');

  section.empty(); // Reset the HTML in case there is data from before
  section.append(name, continent, about, category, weeks, cost);

  toggleTableView(false);
};

var showFailure = function(xhr) {
  var section = $('.trip-details');
  section.html('<strong>Error has occurred</strong>');

  toggleTableView(false);
};

var showContinent = function(body) {
  console.log("in showContinent");
  // var body = $('.continent-trips');
  //
  // body.empty(); // Clear this out to start with to ensure we are populating fresh
  //
  // createHeaders(Object.keys(response[0]));
  //
  // $.each(response, function(index, trip){
  //   var row = $('<tr></tr>');
  //   var name = $('<td><a href="#" class="name-link" id=' + trip.id + ' continent=' + trip.continent + '>' + trip.name + '</a></td>');
  //    // var name = $('<td>' + trip.name + '</td>');
  //   var continent = $('<td>' + trip.continent + '</td>');
  //   var weeks = $('<td>' + trip.weeks + '</td>');
  //
  //   console.log(name);
  //
  //   row.append(name, continent, weeks);
  //   body.append(row);
  // });
  //
  //
  // section.empty(); // Reset the HTML in case there is data from before
  // section.append(name, continent, about, category, weeks, cost);
};


//DOCUMENT LOAD
$(document).ready(function() {
  // Which URL do we want to 'get'?
  var url = 'https://trektravel.herokuapp.com/trips';

  $('.button').click(function() {
    $.get(url, successCallback)
      .fail(failCallback);
  });

//>>>>>>>>>>>>>>>>>>>>>>>
  $('tbody').on('click', 'a', function(event) {
    event.preventDefault();

    var id = $(this).attr('id');
    var showUrl = url + '/' + id;
    $.get(showUrl, showSuccess)
      .fail(showFailure)
      .done(function(){
        console.log($('#continent').text());
        var continentName = $('#continent').text();
        var continentUrl = 'https://trektravel.herokuapp.com/trips/' + 'continent?query=' + continentName ;
        $.get(continentUrl, showContinent);
      });
  });
});
