$(document).ready(function () {
    var key = "q=";
    var farenheight = 'units=imperial'
    var apiKey = "7061f9efd83e1dbb05cd692ec2f22061";
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?APPID=" + apiKey + '&' + farenheight + '&';
    var currentDate = moment().format("MMM Do YY");
    // console.log(currentDate)

    $('#search-btn').on("click", function () {
        // console.log('worked')
        // need to prevent default for the form that im using
        event.preventDefault();
        // need to get the city information when clicked
        geCity();


    })


    function geCity() {
        var searchedCity = $("#city-search").val().trim();
        var addedCity = key + searchedCity;
        // console.log(addedCity);
        // key is now concatinated with the searched city on click
        // need to attatch to the url now
        // console.log(queryURL + addedCity)
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
            //store name of city in the searched-location h3
            var searchLocationID = $("#searched-location");
            searchLocationID.text(response.city.name + " (" + currentDate + ")");
            // testing to get temp
            // what I will need is a loop to go through each day of the week and grab the temp
            var currentTemp = response.list[0].main.temp;
            console.log(currentTemp);
            // loop through response.list[i].weather[0].main
            var typeOfDay = response.list;
            console.log(typeOfDay)
            // creating variables for each part of the card
            var cardOne = $("#card-1");
            var cardTwo = $("#card-2");
            var cardThree = $("#card-3");
            var cardFour = $("#card-4");
            var cardFive = $("#card-5");
            // empty divs every time the user clicks again
            cardOne.empty();
            cardTwo.empty();
            cardThree.empty();
            cardFour.empty();
            cardFive.empty();
            // need to append information to those divs
            // day data grab
            // var dayCurrent = response.list[0].dt_txt.split(" ")[0]; MIGHT NOT NEED THIS
            var dayOne = response.list[2].dt_txt.split(" ")[0].split("-").join("/");
            var dayTwo = response.list[10].dt_txt.split(" ")[0].split("-").join("/");
            var dayThree = response.list[18].dt_txt.split(" ")[0].split("-").join("/");
            var dayFour = response.list[26].dt_txt.split(" ")[0].split("-").join("/");
            var dayFive = response.list[34].dt_txt.split(" ")[0].split("-").join("/");
            // day appends
            cardOne.append(dayOne);
            cardTwo.append(dayTwo);
            cardThree.append(dayThree);
            cardFour.append(dayFour);
            cardFive.append(dayFive);
            // variables for icons
            var iconOne = response.list[2].weather[0].icon;
            var iconTwo = response.list[10].weather[0].icon;
            var iconThree = response.list[18].weather[0].icon;
            var iconFour = response.list[26].weather[0].icon;
            var iconFive = response.list[34].weather[0].icon;
            // concatinate to the url
            var iconURLOne = 'http://openweathermap.org/img/wn/' + iconOne + '@2x.png';
            var iconURLTwo = 'http://openweathermap.org/img/wn/' + iconTwo + '@2x.png';
            var iconURLThree = 'http://openweathermap.org/img/wn/' + iconThree + '@2x.png';
            var iconURLFour = 'http://openweathermap.org/img/wn/' + iconFour + '@2x.png';
            var iconURLFive = 'http://openweathermap.org/img/wn/' + iconFive + '@2x.png';
            console.log(iconURLOne);
            //need to append to cards
            cardOne.append('<img src="' + iconURLOne + '">');
            cardTwo.append('<img src="' + iconURLTwo + '">');
            cardThree.append('<img src="' + iconURLThree + '">');
            cardFour.append('<img src="' + iconURLFour + '">');
            cardFive.append('<img src="' + iconURLFive + '">');
            // grab the temp
            var tempOne = response.list[2].main.temp.toString().split('.')[0] + '°F';
            var tempTwo = response.list[10].main.temp.toString().split('.')[0] + '°F';
            var tempThree = response.list[18].main.temp.toString().split('.')[0] + '°F';
            var tempFour = response.list[26].main.temp.toString().split('.')[0] + '°F';
            var tempFive = response.list[34].main.temp.toString().split('.')[0] + '°F';
            // need to append the temps
            cardOne.append('<p>Temp: ' + tempOne + '</p>');
            cardTwo.append('<p>Temp: ' + tempTwo + '</p>');
            cardThree.append('<p>Temp: ' + tempThree + '</p>');
            cardFour.append('<p>Temp: ' + tempFour + '</p>');
            cardFive.append('<p>Temp: ' + tempFive + '</p>');
            // grab the humidity
            var humidOne = response.list[2].main.humidity + '%';
            var humidTwo = response.list[10].main.humidity + '%';
            var humidThree = response.list[18].main.humidity + '%';
            var humidFour = response.list[26].main.humidity + '%';
            var humidFive = response.list[34].main.humidity + '%';
            // append humidity
            cardOne.append('<p>Humidity: ' + humidOne + '</p>');
            cardTwo.append('<p>Humidity: ' + humidTwo + '</p>');
            cardThree.append('<p>Humidity: ' + humidThree + '</p>');
            cardFour.append('<p>Humidity: ' + humidFour + '</p>');
            cardFive.append('<p>Humidity: ' + humidFive + '</p>');
        });
    }































    // these ending braces are for the document.ready
})
// extra code

 // weather types - rain , clear , clouds, snow
    // if main === 'clouds' then $(<i class='fa fa-clouds'>) 
    // sunny icon <i class="far fa-sun"></i>
    // rainy icon <i class="fas fa-cloud-showers-heavy"></i>
    // cloudy <i class="fas fa-cloud-sun"></i>
    // console.log(typeOfDay);
    // for (var i = 0; i < (typeOfDay.length - 31); i++) {
    //     var types = typeOfDay[i].weather[0].main;
    //     console.log(types);
    //     if (types == 'rain') {
    //         var rain = $("<i class='fas fa-cloud-showers-heavy'></i>")
    //     } else if (types === 'clear') {
    //         var clear = $("<i class='far fa-sun'></i>")
    //     } else if (types === 'clouds') {
    //         var couds = $("<i class='fas fa-cloud-sun'></i>")
    //     } else if (types === 'snow') {
    //         var snow = $("<i class='far fa-snowflake'></i>")
    //     }
    // }





//             var currentDay = response.list[0].weather[0].main
//             var dayOne = response.list[2].weather[0].main
//             var dayTwo = response.list[10].weather[0].main
//             var dayThree = response.list[18].weather[0].main
//             var dayFour = response.list[26].weather[0].main
//             var dayFive = response.list[34].weather[0].main
//             console.log(currentDay);
//             console.log(dayOne);
//             console.log(dayTwo);
//             console.log(dayThree);
//             console.log(dayFour);
//             console.log(dayFive);
//             // list of different types of weather
//             var rain = $("<i class='fas fa-cloud-showers-heavy'></i>")
//             var clear = $("<i class='far fa-sun'></i>")
//             var clouds = $("<i class='fas fa-cloud-sun'></i>")
//             var snow = $("<i class='far fa-snowflake'></i>")

//             // appending with a really long if els

//             if (currentDay == 'Rain') {
//                 console.log('is rain');
//                 $(".location-section").prepend(rain);
//             } else if (currentDay == 'clear') {
//                 console.log('is Clear');
//                 $(".location-section").prepend(clear);
//             } else if (currentDay == 'Clouds') {
//                 console.log('is clouds');
//                 $(".location-section").prepend(clouds);
//             } else if (currentDay == 'Snow') {
//                 console.log('is snow');
//                 $(".location-section").prepend(snow);
//             }
//