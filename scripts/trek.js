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
      var listItem = $('<li></li>');
      var trekList = $('<ul></ul>');
      var travelName = $("<li><a href=# id=" + travel.id + ">" + travel.name + '</li>');
      var continent = $('<li>' + travel.continent + '</li>');
      var duration = $('<li>' + travel.weeks + ' weeks</li>');

      trekList.append(travelName, continent, duration);
      listItem.append(trekList);
      body.append(listItem);
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
  });

});
