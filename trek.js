$( "#load" ).click(function() {
    var url = "https://trektravel.herokuapp.com/trips"
    $.get(url,
      function(response){
              // var tripsHTML = '';
              for (var i = 0; i < response.length; i++){
                console.log(response[i]);
                $('#trips').append("<h3><a href=" + url + "/" + response[i].id + ">" + response[i].name + "</a></h3>");
              }
              // $('#trips').append(tripsHTML);
      });
  });
