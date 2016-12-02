$(document).ready(function(){

////---------transitioning background javascript
  var backgrounds = new Array(
    'url("http://ngm.nationalgeographic.com/wallpaper/img/2011/11/25-birchbark-canoe-allagash-river-maine_1600.jpg")',
    'url("http://cdn.wallpapersafari.com/45/42/TlG3au.jpg")',
    'url("http://images.nationalgeographic.com/wpf/media-live/photos/000/037/custom/3731_1600x1200-wallpaper-cb1317995374.jpg")',
    'url("http://images.nationalgeographic.com/wpf/media-live/photos/000/210/custom/21080_1600x1200-wallpaper-cb1318527290.jpg")',
    'url("http://www.thedesignwork.com/wp-content/uploads/2011/03/rock-fort-india-national-geographic-wallpaper.jpg")'
  );

  var current = 0;

  function nextBackground() {
      current++;
      current = current % backgrounds.length;
      $('body').css('background-image', backgrounds[current]);
  }
  var refresh = setInterval(nextBackground, 3000);

  $('body').css('background-image', 'url("http://travel.nationalgeographic.com/u/TvyamNb-BivtNwcoxtkc5xGBuGkIMh_nj4UJHQKuoXB25eFqvC5sMPA8Smg-kciXS6bf2CttAwnmjFAJIDTiGP6jLFqn-w/")');

  var url = 'https://trektravel.herokuapp.com/trips';

  var successCallback = function(response) {
    for (var i=0; i < response.length; i++) {
      $('#trips').append("<a href=" + url + "/" + response[i].id + "><div class='trip'>" + response[i].name + "</div></a>");
    }
  };

  $('header').hide();

////----------button function
  $('#load').click( function() {
    $('#trips').empty();
    $('#load').hide();
    $('header').show();
    $.get(url, successCallback);
    clearInterval(refresh);
  });

  $('#trips').on('click', 'a', function(e) {
    e.preventDefault();
    $('#modal').show();
    $('body').css('background-image', 'url("http://travel.nationalgeographic.com/u/TvyamNb-BivtNwcoxtkc5xGBuGkIMh_nj4UJHQKuoXB25eFqvC5sMPA8Smg-kciXS6bf2CttAwnmjFAJIDTiGP6jLFqn-w/")');
    var tripUrl = $(this).attr('href');

    $.get(tripUrl, function(trip){
      $('#name').text(trip.name);
      $('#continent').text('Continent: ' + trip.continent);
      $('#about').text(trip.about);
      $('#category').text('Category: ' + trip.category);
      $('#weeks').text('Weeks: ' + trip.weeks);
      $('#cost').text('Cost: $' + trip.cost);
    }).fail(function(){
      alert("failed");
    });

  });

  var modal = document.getElementById('modal');
  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  };

});
