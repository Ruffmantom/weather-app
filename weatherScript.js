$(document).ready(function () {
    var key = "q=";
    var apiKey = "7061f9efd83e1dbb05cd692ec2f22061";
    var queryURL = "http://api.openweathermap.org/data/2.5/forecastAPPID=" + apiKey;


    $('#search-btn').on("click", function () {
        console.log('worked')
        // need to prevent default for the form that im using
        event.preventDefault();
        var searchedCity = $("#city-search").val();
        var addedCity = key + searchedCity;
        console.log(addedCity);
        // key is now concatinated with the searched city on click
        // need to attatch to the url now
        console.log(queryURL + addedCity)
        // $.ajax({
        //     url: queryURL,
        //     method: "GET"
        // }).then(function (response) {

        // });

    })





























    // these ending braces are for the document.ready
})