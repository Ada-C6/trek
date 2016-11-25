$(document).ready(function() {
  var url = 'https://trektravel.herokuapp.com/trips';

  var createHeaders = function(keys) {
    var row = $('.trek-headers');

    var name = $('<th>Name</th>');
    var duration = $('<th>Duration</th>');
    row.append(name, duration);
  };

  var failCallback = function(xhr) {
    console.log(xhr);
    console.log('Call status: ' + xhr.status + ' ' + xhr.statusText);
  };

  var alwaysCallback = function() {
    console.log('This always happens');
  };

  var successCallback = function (response) {
    console.log(response);
    console.log('Success!');

    createHeaders(Object.keys(response[0]));

    var body = $('.treks-body');
    body.empty();

    $.each(response, function(index, trek){
      var row = $('<tr></tr>');
      var name = $('<td><a href="#" class="name-link" id=' + trek.id + '>' + trek.name + '</a></td>');
      var weeks = $('<td>' + trek.weeks + ' weeks</td>');

      row.append(name, weeks);
      body.append(row);
    }); // end each

    toggleTableView(true);
  };

  $('button').click(function() {
    $.get(url, successCallback)
      .fail(failCallback)
      .always(alwaysCallback);
  });

// Will determine when which elements are shown in the browser
  var toggleTableView = function(onIndicator) {
    $('.trek-info').toggle(!onIndicator);
    $('button').toggle(!onIndicator);
    // $('table').toggle(onIndicator);
  }; //end toggleTableView

  var showSuccess = function(trek) {
    console.log(trek);
    var section = $('.trek-info');
    var name = $('<h3>Destination: ' + trek.name + ' (' + trek.weeks + ' weeks)</h3>');
    var continent = $('<p><strong>Continent</strong>: ' + trek.continent + '</p>');
    var details = $('<p>Description: ' + trek.about + '</p>');
    var smallPrint = $('<p> Category //' + trek.category + '// </p>' + '<p>ID: ' + trek.id + ' Cost: $' + trek.cost + '</p>');

    section.empty(); // Reset the HTML in case there is data from before
    section.append(name, continent, details, smallPrint);

    toggleTableView(false);
  }; //end showSuccess

  var showFailure = function(xhr) {
    var section = $('.trek-info');
    section.html('<strong>Error has occurred</strong>');

    toggleTableView(false);
  };

// Makes the name a clickable link to the info for specific trek
// pay attention, this looks really useful and we skimmed over it
  $('tbody').on('click', 'a', function(e) {
    e.preventDefault();

    var id = $(this).attr('id');
    var showUrl = url + '/' + id;
    $.get(showUrl, showSuccess)
      .fail(showFailure);
  });


}); // end document ready
