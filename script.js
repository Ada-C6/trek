$(document).ready(function(){
  var url = 'https://trektravel.herokuapp.com/trips';

  var successCallback = function(response) {
    for (var i=0; i < response.length; i++) {
      $('#trips').append("<h3><a href=" + url + "/" + response[i].id + ">" + response[i].name + "</a></h3>");
    }
  };

  $('#load').click( function() {
    $('#trips').empty();
    $.get(url, successCallback);
  });

  

});

//name, continent, about, category, weeks, cost
