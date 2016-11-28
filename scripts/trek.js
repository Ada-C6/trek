$(document).ready(function() {
  showLandingView();

////////// API URL
  var url = 'https://trektravel.herokuapp.com/trips';

////////// GET REQUEST
  $('.index-button').on('click', function() {
    showIndexView(successCallback, failCallback)
  })

////////// GET CALLBACKS
  var successCallback = function (response) {
    $.each(response, function(index, trip) {
      var row = $("<tr></tr>"),
          name = $('<td><a href="#" id=' + trip.id + ">" + trip.name + "</a></td>"),
          continent = $("<td>" + trip.continent + "</td>");

      row.append(name, continent);
      $(".trips-tbody").append(row);
    })
  };

  var failCallback = function(xhr) {
    alert("There has been a problem, please refresh.");
  };

///////// SHOW
  $(".trips-tbody").on("click", "a", function() {
    var tripId = $(this).attr('id'),
        showUrl = url + '/' + tripId;

    $.get(showUrl, showCallback);

    showTripView();
  });


  var showCallback = function(trip) {
    var tripId = $("<h6>Trip Id</h6><p>" + trip.id + "</p>"),
        name = $("<h4>Name</h4><p>" + trip.name + "</p>"),
        continent = $("<h4>Continent</h4><p>" + trip.continent + "</p>"),
        category = $("<h4>Category</h4><p>" + trip.category + "</p>"),
        weeks = $("<h4>Amount of Weeks</h4><p>" + trip.weeks + "</p>"),
        cost = $("<h4>Cost</h4><p>$" + trip.cost + "</p>"),
        about = $("<h4>About</h4><p>" + trip.about + "</p>");

    $("#show-trip").empty();
    $("#show-trip").append(tripId, name, continent, category, weeks, cost, about);
    $("#hidden-id-field").val(trip.id)

    showTripView();
  };

////////// VIEWS
  var speed = 1000; // thanks, kai

  function showLandingView() {
    $("#show").hide(speed);
    $("#index").hide(speed);
  }

  function showIndexView(successCallback, failCallback) {
    $("#show").hide(speed);
    $("#index").show(speed);

    $.get(url, successCallback)
      .fail(failCallback);
  }

  function showTripView() {
    $("#show").show(speed);
    $("#index").hide(speed);
  }

////////// POST
  var addTripCallback = function(event) {
    event.preventDefault();

    var tripData = $(this).serialize(),
        tripId = $("#hidden-id-field").val();

    var reservationUrl = url + "/" + tripId + "/reserve";
    $.post(reservationUrl, tripData, postCallback);

    showIndexView();
  };

  $("#add-reservation").submit(addTripCallback);

  var postCallback = function() {
    alert("Reservation made!");
  }
});
