$(document).ready(function() {

  var baseUrl = 'https://trektravel.herokuapp.com/trips';

  var successCallback = function(response) {
    for (var i = 0; i < response.length; i++) {
      $("#trips-list").append("<h3><a href=" + baseUrl + "/" + response[i].id + ">" + response[i].name + "</a></h3>");
    }
  };

  $('#all-trips-button').click(function() {
    $.get(baseUrl, successCallback);
  });

  var randSpot = function() {
    var number = Math.floor(Math.random() * 30);
    return number;
  }

  var tripInfomation = function(trip) {
    var spotsLeft = randSpot()
    $('#trip-name').text(trip.name);
    $('#trip-continent').text("Continent: " + trip.continent);
    $('#trip-category').text("Category: " + trip.category);
    $('#trip-about').text(trip.about);
    $('#trip-weeks').text("Duration: " + trip.weeks);
    $('#trip-cost').text("Cost: $" + trip.cost);
    $('#trip-spots').text("Spots Left: " + spotsLeft);
    $('#trip-info').append(reserveTrip(trip.id));
  }

  $('#trips-list').on('click', 'a', function(e) { //e is short for 'event'
    e.preventDefault();
    $('#trip-info').show();
    var showTripUrl = $(this).attr('href');  // attr() = attributes
    var tripID = $.get(showTripUrl, tripInfomation).fail(function() {
      alert("Page Not Found");
    });
  });

  var reserveTrip = function(id) {
    $('form').on('submit', function(e) {
      e.preventDefault();
      var url = 'https://trektravel.herokuapp.com/trips/' + id + '/reserve';
      var formData = $(this).serialize();
      console.log(formData);
      var callback = function() {
        alert("Spot Reserved for " );
      }
      $('form').each(function(){
        this.reset();
      });
      $.post(url, formData, callback);
    });
  };













}); //ending $(document).ready
