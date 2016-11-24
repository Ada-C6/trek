$(document).ready(function() {
  var url = 'https://trektravel.herokuapp.com/trips';
  $(".reservation-form").hide();
  var successCallback = function(response) {
    console.log('success!');

    var section = $('.all-trips');
    section.empty();

    $.each(response, function(index, trip) {
      // console.log(trip);
      var listItem = $("<li></li>");
      var name = $("<strong><a href='#' id=" + trip.id + ">" + trip.name + "</a></strong>");

      listItem.append(name);
      section.append(listItem);
    });

    $('#trips-button').hide();
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
    var cost = $("<p><strong>Price:</strong> $" + (trip.cost).toFixed(2) + "</p>");
    $(".trip-id").val(trip.id);

    title.append(name, continent);
    description.append(about, category, weeks, cost);

    section.prepend(title, description);
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
    $("#message").empty().removeClass();
    var id = $(this).attr("id");
    var showUrl = url + "/" + id;
    $(".reservation-form").show();
    $.get(showUrl, showSuccess)
      .fail(showFailure);
  });

  var reservationCallback = function(event) {
    event.preventDefault();
    var postID = $(".trip-id").val();
    var reservationUrl = url + "/" + postID + "/reserve";
    console.log('Sending data');
    var reservationData = $(this).serialize();
    console.log("Reservation data is " + reservationData);
    $.post(reservationUrl, reservationData, postCallback)
      .fail(postFailure);
  };

  var postCallback = function() {
    $("#message").addClass("callout");
    $("#message").addClass("success");
    $('#message').html('<p>Reservation successful.</p>');
    $('#add-reservation').each(function(){
      this.reset();
    });
    console.log("POST successful");
  };

  var postFailure = function(xhr) {
    console.log('failure');
    console.log(xhr);
    $('#message').addClass("callout");
    $('#message').addClass("alert");
    $('#message').html("<p>Reservation failed.</p>");
  };


  $('#add-reservation').submit(reservationCallback);

});
