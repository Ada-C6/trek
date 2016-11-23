$(document).ready(function() {
  ////////// API URL
    var url = 'https://trektravel.herokuapp.com/trips';

  ////////// GET REQUEST
    $('button').on('click', function(){
      $.get(url, successCallback)
        .fail(failCallback);
      toggleIndexView(true);
    })

  ////////// GET CALLBACKS
    var successCallback = function (response) {
      $.each(response, function(index, trip) {
        var row = $("<tr></tr>"),
            name = $('<td><a href="#" class="name-link" id=' + trip.id + ">" + trip.name + "</a></td>"),
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
      var tripId = $(this).attr('id');
      // console.log(pets);

      var showUrl = url + '/' + tripId;
      $.get(showUrl, showCallback);
    });


    var showCallback = function(trip) {
      var name = $("<h4>Name</h4><p>" + trip.name + "</p>"),
          continent = $("<h4>Continent</h4><p>" + trip.continent + "</p>"),
          category = $("<h4>Category</h4><p>" + trip.category + "</p>"),
          weeks = $("<h4>Amount of Weeks</h4><p>" + trip.weeks + "</p>"),
          cost = $("<h4>Cost</h4><p>$" + trip.cost + "</p>"),
          about = $("<h4>About</h4><p>" + trip.about + "</p>")

      $("#show-trip").empty();
      $("#show-trip").append(name, continent, category, weeks, cost, about);

      toggleIndexView(false);
      // toggleBookingView(false);
    };

  ////////// VIEW
    var toggleIndexView = function(isOn) {
      $("#show").toggle(!isOn);
      $("#booking-form").toggle(!isOn);
      $("#index").toggle(isOn);
    }

    // var toggleBookingView = function(isOn) {
    //   $("#show").toggle(!isOn);
    //   $("#index").toggle(!isOn);
    //   $("#book").toggle(isOn);
    // }

  ////////// POST
    var addTripCallback = function(event) {
      event.preventDefault();

      var tripData = $(this).serialize();
      console.log("trip data = " + tripData)
      $.post(url, tripData, postCallback);

      toggleIndexView(true);
    };

    $("#add-trip-form").submit(addTripCallback);

    var postCallback = function() {
      alert("Post success!");
    }
});
