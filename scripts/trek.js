$(document).ready(function() {
    // Which URL do we want to 'get'?
    var url = 'https://trektravel.herokuapp.com/trips';

    $('.reservation-details').hide();

    var createHeaders = function(keys) {
        var row = $('.treks-headers');

        for(var i = 0; i < keys.length; i++) {
            var head = $('<th>' + keys[i] + '</th>');
            row.append(head);
        }
    };

    createHeaders(['name:', '# of weeks:', 'continent:']);

    // What do we want to happen when we get our response?
    var successCallback = function (response) {
        console.log('success!');

        var body = $('.treks-body');
        body.empty(); // Clear this out to start with to ensure we are populating fresh

        $.each(response, function(index, trek){
            console.log(trek);
            var row = $('<tr></tr>');
            var name = $('<td><a href="#" class="name-link" id=' + trek.id + '>' + trek.name + '</a></td>');
            var weeks = $('<td>' + trek.weeks + '</td>');
            var continent = $('<td>' + trek.continent + '</td>');

            row.append(name, weeks, continent);
            body.append(row);
        });

        toggleTableView(true);
    };

    var failCallback = function(xhr) {
        console.log('failure');
        console.log(xhr);
    };

    var alwaysCallback = function() {
        console.log('This always happens');
    };

    $('#load-trips-button').click(function() {
        $.get(url, successCallback)
        .fail(failCallback)
        .always(alwaysCallback);
    });

    var toggleTableView = function(onIndicator) {
        $('.trek-details').toggle(!onIndicator);
        $('.reservation-details').toggle(!onIndicator);
        $('#load-trips-button').toggle(!onIndicator);
        $('table').toggle(onIndicator);
    };

    var showSuccess = function(trek) {
        var section = $('.trek-details');
        console.log(trek);
        var name = $('<strong>Name:</strong><div>' + trek.name + '</div>');
        var category = $('<strong>Category:</strong><div>' + trek.category + '</div>');
        var weeks = $('<strong># of Weeks:</strong><div>' + trek.weeks + '</div>');
        var continent = $('<strong>Continent:</strong><div>' + trek.continent + '</div>');
        var cost = $('<strong>Cost:</strong><div>' + '$' +  trek.cost + '</div>');
        var about = $('<strong>About:</strong><div>' + trek.about + '</div>');

        section.empty(); // Reset the HTML in case there is data from before
        section.prepend(name, category, weeks, continent, cost, about);

        toggleTableView(false);
    };


    var showFailure = function(xhr) {
        var section = $('.trek-details');
        section.html('<strong>Error has occurred</strong>');

        toggleTableView(false);
    };

    $('tbody').on('click', 'a', function(e) {
        e.preventDefault();

        var id = $(this).attr('id');
        // stores this trip's id as the trip ID hidden value in our reservation form
        $('#tripID').val(id);
        var showUrl = url + '/' + id;
        $.get(showUrl, showSuccess)
        .fail(showFailure);
    });


    // POST !!!!
    var postCallback = function() {
        alert("POST succeeded!");
    };

    var reserveSpotCallback = function(event) {
        // this keeps the form submit button from automatically refreshing the page:
        event.preventDefault();

        console.log("Sending reservation data!");
        var reservationData = $(this).serialize();
        console.log("reservation data is " + reservationData);

        console.log($('#tripID').val());

        var urlReserve = url + '/' + $('#tripID').val() + '/reserve';

        $.post(urlReserve, reservationData, postCallback);
    };

    $('#reserve-trek-spot-form').submit(reserveSpotCallback);

});
