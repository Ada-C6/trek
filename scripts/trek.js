$(document).ready(function(){
  var url = 'https://trektravel.herokuapp.com/trips';
  var successCall = function(response) {

    var body = $('.places');
    $.each(response, function(index, trip ){
      var row = $('<tr> </tr>');
      var name = $('<td><a href="#" class="da" id=' + trip.id + '>' + trip.name + '</td>');
      var continent = $('<td>' + trip.continent + '</td>');
      var weeks = $('<td>' + trip.weeks + '</td>');
      row.append(name, continent, weeks);
      body.append(row);
    });
    var singleTrip = function(trips){
      var section = $('.here');

      var name = $('<strong>Trip: </strong><div>' + trips.name + '</div>');
      var continent = $('<strong>Destination: </strong><div>' + trips.continent + '</div>');
      var about = $('<strong>Description: </strong><div>' + trips.about + '</div>');
      var category = $('<strong>Categotry: </strong><div>' + trips.category + '</div>');
      var weeks = $('<strong>Weeks: </strong><div>' + trips.weeks + '</div>');
      var cost = $('<strong>Cost: </strong><div>' + trips.cost + '</div>');
      section.empty();
      section.append( name,  about, continent, category, weeks, cost);

      var form = $('.new-res');
      var id = $('<input type="hidden" value='+ trips.id + ' </input>');
      form.append(id);



    };

    $('tbody').on('click', 'a', function(e){
      var id = $(this).attr('id');
      var second = url + '/' + id;
      $.get(second, singleTrip);
    });

    $('#see-trip').hide();
  };
  $('button').on('click', function(){
    $.get(url, successCall);
  });

  var postCallback = function(){
    alert("Reservation Locked");
  };
  var addReservationCallback = function(event){
    event.preventDefault(); //Stops it in it's tracks mwhaha
    var new_url = url + '/' + $('input[type=hidden]').val() + '/reserve';
    console.log("reservation confirmed!");

    var  reservationInfo = $(this).serialize();
    $.post(new_url, reservationInfo, postCallback);
  };

  $('#add-res').submit(addReservationCallback);
});
