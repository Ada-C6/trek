$( "#load" ).click(function() {
    $.get('https://trektravel.herokuapp.com/trips',
      function(response){
              var tripsHTML = '';
              for (var i = 0; i < response.length; i++){
                tripsHTML += '<h3>' + response[i].name + '</h3>'
              }
              $('#trips').append(tripsHTML);
      });
  });
