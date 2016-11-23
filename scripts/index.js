$(document).ready(function() {
  var url = 'https://trektravel.herokuapp.com/trips';

  var successCallback = function(response) {
    console.log('success!');

    var section = $('.all-trips');
    section.empty();

    $.each(response, function(index, trip) {
      console.log(trip);
      var listItem = $("<li></li>");
      var innerList = $("<ul></ul>");
      var name = $("<strong><a href='#' id=" + trip.id + ">" + trip.name + "</a></strong>");

      var location = $("<li>Continent: " + trip.continent + "</li>");
      var weeks = $("<li>Number of Weeks: " + trip.weeks + "</li>");

      listItem.append(name, innerList);
      innerList.append(location, weeks);
      section.append(listItem);
    });
    $('button').hide();
  };

  var failCallback = function(xhr) {
    console.log('failure');
    console.log(xhr);
    $('.all-trips').append("<h2>No information available (status " + xhr.status + ")</h2>");
  };

  var showSuccess = function(trip) {
    var section = $(".show-trip");
    section.empty();
    var title = $("<h2></h2>");
    var description = $("<div></div>");

    var name = $("<span>" + trip.name + "</span>");
    var continent = $("<small>" + trip.continent + "</small>");

    var about = $("<p>" + trip.about + "</p>");
    var category = $("<p><strong>Category: </strong>"+ trip.category + "</p>");
    var weeks = $("<p><strong>Number of Weeks: </strong>" + trip.weeks + "</p>");
    var cost = $("<p><strong>Price:</strong> $" + trip.cost + "</p>");

    title.append(name, continent);
    description.append(about, category, weeks, cost);

    section.append(title, description);
  };

  var showFailure = function(xhr) {
    console.log('failure');
    console.log(xhr);
    $('.show-trip').append("<h2>No information available (status " + xhr.status + ")</h2>");
  };

  $('button').click(function() {
    $(".show-all").addClass("add-border");
    $.get(url, successCallback)
      .fail(failCallback);
  });

  $('.all-trips').on('click', 'a', function(event){
    event.preventDefault();
    var id = $(this).attr("id");
    var showUrl = url + "/" + id;
    $.get(showUrl, showSuccess)
      .fail(showFailure);
  });
});
