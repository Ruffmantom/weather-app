$(document).ready(function () {
    var key = "q=";
    var apiKey = "7061f9efd83e1dbb05cd692ec2f22061";
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?APPID=" + apiKey + '&';


    $('#search-btn').on("click", function () {
        console.log('worked')
        // need to prevent default for the form that im using
        event.preventDefault();
        // need to get the city information when clicked
        geCity();


    })


    function geCity() {
        var searchedCity = $("#city-search").val().trim();
        var addedCity = key + searchedCity;
        console.log(addedCity);
        // key is now concatinated with the searched city on click
        // need to attatch to the url now
        console.log(queryURL + addedCity)
        var newUrl = queryURL + addedCity;

        $.ajax({
            url: newUrl,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            // need to store the serched item down below
            var p = $("<p>");
            p.addClass("searched");
            p.text(response.city.name);
            // storing the searched city to a p tag below inside the search div
            $("#serched-cities").prepend(p);

        });
    }





























    // these ending braces are for the document.ready
})