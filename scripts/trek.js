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

  // need to click the button to get treks
  $('button').click(function() {
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

    body.empty();
    body.append(travelName, continent, duration, cost, description);

    $('.single-location').show();
  };

  // clicking on a specific trek SHOWS the information about if
  $('body').on('click', 'a', function(event) {
    event.preventDefault();

    var id = $(this).attr('id');
    var showUrl = url + id;
    $.get(showUrl, showSuccessCallback)
      .fail(failCallback);
  });

});
