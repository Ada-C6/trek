$(document).ready(function() {
  var treksUrl = 'https://trektravel.herokuapp.com/trips';

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
    console.log('This always happens every callback');
  };

  var successCallback = function (response) {
    // console.log(response);
    console.log('Success! Here are the available treks');

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

  $('#list-treks-button').click(function() {
    $.get(treksUrl, successCallback)
      .fail(failCallback)
      .always(alwaysCallback);
  });

// Will determine when which elements are shown in the browser
  var toggleTableView = function(onIndicator) {
    $('#list-treks-button').toggle(!onIndicator);
  }; //end toggleTableView

  var trekDescription = function(trek) {
    var section = $('.trek-info');
    var name = $('<h3>Destination: ' + trek.name + ' (' + trek.weeks + ' weeks)</h3>');
    var continent = $('<p><strong>Continent</strong>: ' + trek.continent + '</p>');
    var details = $('<p>Description: ' + trek.about + '</p>');
    var smallPrint = $('<p> Category //' + trek.category + '// </p>' + '<p>ID: ' + trek.id + ' Cost: $' + trek.cost + '</p>');

    section.empty(); // Reset the HTML in case there is data from before
    section.append(name, continent, details, smallPrint);

  };

  var registerTrekkerForm = function(trek) {
    var form = $('#register-trekker-form');
    var registrationFormHeader = "<h3>Register to go on this trip!</h3>";
    var registeredName = '<label for="name">Name:</label><input type="text" name="name">';
    var trekID = '<input type="hidden" name="trip_id" value="' + trek.id + '">';
    var submitButton = '<button type="submit" class="solid button">Register</button>';
    form.empty();
    form.append(registrationFormHeader, registeredName, trekID, submitButton);
    // console.log(form);
  };

  var showSuccess = function(trek) {
    console.log('is there an ID?' + trek.id);
    trekDescription(trek);
    registerTrekkerForm(trek);
  }; //end showSuccess



  var showFailure = function(xhr) {
    var section = $('.trek-info');
    section.html('<strong>Error has occurred</strong>');

    toggleTrekInfoView(false);
    toggleTableView(false);
  };

// Makes the name a clickable link to the info for specific trek
// pay attention, this looks really useful and we skimmed over it
  $('tbody').on('click', 'a', function(e) {
    e.preventDefault();

    var id = $(this).attr('id');
    var showUrl = treksUrl + '/' + id;
    $.get(showUrl, showSuccess)
      .fail(showFailure);
  });

var reserveTripUrl = 'https://trektravel.herokuapp.com/trips/';

var failPostCallback = function(xhr) {
  console.log(xhr);
  console.log('Call status: ' + xhr.status + ' ' + xhr.statusText);
};

var alwaysPostCallback = function() {
  console.log('This always happens every post attempt');
};

var postCallback = function(){
  // console.log('POST success!');
  alert("You're going on this trip!");
};

var registerTrekkerCallback = function(event) {
  event.preventDefault();
  var trekID = $(this).serializeArray()[1].value; // index [0] is the name
  var trekkerData = $(this).serialize();
  console.log('Sending Trekker Data:' + trekkerData);
  var registerUrl = reserveTripUrl + trekID + '/reserve';
  $.post(registerUrl, trekkerData, postCallback)
    .fail(failPostCallback)
    .always(alwaysPostCallback);
};

$('#register-trekker-form').submit(registerTrekkerCallback);


}); // end document ready
