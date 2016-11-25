$(document).ready(function(){
  var url = "https://trektravel.herokuapp.com/trips";
  var successCallBack = function(response) {
    console.log("response: ",response);
    console.log("success!!");
// challenge from kai: try and turn this

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    for(var i = 0; i < response.length; i++) {
      $('#trips').append("<h3><a href=" + url + "/" + response[i].id + ">" + response[i].name + "</a></h3>");
    }


  };
  $('#load').on('click',function(){
    $.get(url, successCallBack);
  });

//if successful, then have a pop-up with trips info.







}); // end of document.ready()
