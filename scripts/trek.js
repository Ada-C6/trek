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
      var name = $('<td><a href="#" class="name-link" id=' + trip.id + '>' + trip.name + '</a></td>');
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

  var showSuccess = function(trip) {
    var section = $('.trip-info');
    var name = $('<strong>Name</strong><div>' + pet.name + '</div>');
    var continent = $('<strong>Continent</strong><div>' + pet.continent + '</div>');
    var length = $('<strong>Length</strong><div>' + pet.length + '</div>');
    var category = $('<strong>Owner</strong><div>' + pet.category + '</div>');
    var cost = $('<strong>Owner</strong><div>' + pet.cost + '</div>');

    section.empty(); // Reset the HTML in case there is data from before
    section.append(name, continent, length, category, cost);

    // toggleTableView(false);
  };

  $('tbody').on('click', 'a', function(e) {
    e.preventDefault();

    var id = $(this).attr('id');
    var showUrl = url + id;
    $.get(showUrl, showSuccess);
      // .fail(showFailure);
  });

});
