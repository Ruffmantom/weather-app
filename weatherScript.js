var key = "q=";
var farenheight = 'units=imperial'
var apiKey = "7061f9efd83e1dbb05cd692ec2f22061";
var queryURL = "http://api.openweathermap.org/data/2.5/forecast?APPID=" + apiKey + '&' + farenheight + '&';
var currentDate = moment().format("YYYY/MMM/Do");
localStorage.clear();
var buttonCount = 0;
var currentData = $(".current-data");
// creating variables for each part of the card
var cardOne = $("#card-1");
var cardTwo = $("#card-2");
var cardThree = $("#card-3");
var cardFour = $("#card-4");
var cardFive = $("#card-5");
var searchLocationID = $("#searched-location");
var btnRes;
var searchedCity;

const addedCities = {}



function addRecSeBtn(cityName) {
    if (addedCities[cityName]) { return }
    addedCities[cityName] = true;
    var b = $("<button type='submit' data-value='" + buttonCount + "'>");
    b.addClass("searched");
    b.text(cityName)
    // storing the searched city to a p tag below inside the search div
    $("#serched-cities").prepend(b);
}



function buildHTML(response) {
    // need to clear the current weather div
    currentData.empty();
    // empty divs every time the user clicks again
    cardOne.empty();
    cardTwo.empty();
    cardThree.empty();
    cardFour.empty();
    cardFive.empty();
    //store name of city in the searched-location h3
    searchLocationID.text(response.city.name + " (" + currentDate + ")");
    // what I will need is a loop to go through each day of the week and grab the temp
    var currentTemp = response.list[0].main.temp.toString().split('.')[0] + '°F';
    var currHumid = response.list[0].main.humidity;
    var windSpeed = response.list[0].wind.speed.toString().split('.')[0];
    //need to call another Ajax for the UV index

    // just getting list so I can see what to target
    var list = response.list;
    // console.log(list)
    // var dayCurrent = response.list[0].dt_txt.split(" ")[0]; MIGHT NOT NEED THIS
    var dayOne = response.list[2].dt_txt.split(" ")[0].split("-").join("/");
    var dayTwo = response.list[10].dt_txt.split(" ")[0].split("-").join("/");
    var dayThree = response.list[18].dt_txt.split(" ")[0].split("-").join("/");
    var dayFour = response.list[26].dt_txt.split(" ")[0].split("-").join("/");
    var dayFive = response.list[34].dt_txt.split(" ")[0].split("-").join("/");
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
    // console.log(iconURLOne);
    // grab the temp
    var tempOne = response.list[2].main.temp.toString().split('.')[0] + '°F';
    var tempTwo = response.list[10].main.temp.toString().split('.')[0] + '°F';
    var tempThree = response.list[18].main.temp.toString().split('.')[0] + '°F';
    var tempFour = response.list[26].main.temp.toString().split('.')[0] + '°F';
    var tempFive = response.list[34].main.temp.toString().split('.')[0] + '°F';
    // grab the humidity
    var humidOne = response.list[2].main.humidity + '%';
    var humidTwo = response.list[10].main.humidity + '%';
    var humidThree = response.list[18].main.humidity + '%';
    var humidFour = response.list[26].main.humidity + '%';
    var humidFive = response.list[34].main.humidity + '%';
    //APENDING ------------------------------------------------------------------------------
    //Current Day appends
    currentData.append("<p>Temperature: " + currentTemp + "</p>")
    currentData.append("<p>Humidity: " + currHumid + "%</p>")
    currentData.append("<p>Wind Speed: " + windSpeed + " MPH</p>")

    console.log('---- current day')
    // day appends
    cardOne.append(dayOne);
    cardTwo.append(dayTwo);
    cardThree.append(dayThree);
    cardFour.append(dayFour);
    cardFive.append(dayFive);
    //need to append to cards
    cardOne.append('<img src="' + iconURLOne + '">');
    cardTwo.append('<img src="' + iconURLTwo + '">');
    cardThree.append('<img src="' + iconURLThree + '">');
    cardFour.append('<img src="' + iconURLFour + '">');
    cardFive.append('<img src="' + iconURLFive + '">');
    // need to append the temps
    cardOne.append('<p>Temp: ' + tempOne + '</p>');
    cardTwo.append('<p>Temp: ' + tempTwo + '</p>');
    cardThree.append('<p>Temp: ' + tempThree + '</p>');
    cardFour.append('<p>Temp: ' + tempFour + '</p>');
    cardFive.append('<p>Temp: ' + tempFive + '</p>');
    // append humidity
    cardOne.append('<p>Humidity: ' + humidOne + '</p>');
    cardTwo.append('<p>Humidity: ' + humidTwo + '</p>');
    cardThree.append('<p>Humidity: ' + humidThree + '</p>');
    cardFour.append('<p>Humidity: ' + humidFour + '</p>');
    cardFive.append('<p>Humidity: ' + humidFive + '</p>');
    // ******** searched btn click function---------------------------
    addRecSeBtn(response.city.name)

    buttonCount++
    //----------------------------------------------------------------
    $(".searched")
        .unbind('click')
        .on("click", function (event) {
            event.preventDefault()
            var btnValue = $(this).data('value');
            console.log(btnValue);
            //grab local storage url
            var dataAttr = 'cityName-' + btnValue;
            // var dataAttr = cityName- + btnValue
            var recSearchedURL = localStorage.getItem(dataAttr)
            // var recSearchedURL = getItem(dataAttr)
            ajaxCall(recSearchedURL)
            //run ajax function passing that url into it. 
            console.log('*******')
            // console.log(gotKey)
        })
}


function ajaxCall(dataUrl) {
    //put ajax here
    $.ajax({
        url: dataUrl,
        method: "GET"
    }).then(function (res) {
        console.log(res)
        console.log('***** ajax call function ********')
        buildHTML(res)
        btnRes = res;
        var lon = res.city.coord.lon;
        var lat = res.city.coord.lat;
        var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?APPID="
        var secondURL = uvIndexURL + apiKey + '&lon=' + lon + '&lat=' + lat;
        var currIndex;
        return $.ajax({
            url: secondURL,
            method: "GET"
        })
    }).then(function (resTwo) {
        console.log('------ second Ajax call-----------')
        console.log(resTwo)
        currIndex = resTwo.value;
        currentData.append("<p> UV Index: " + "<span class='uv-index'>" + currIndex + "</span>" + "</p>")
        console.log(currIndex)
        return $.ajax({
            url: secondURL,
            method: "GET"
        })
    }).then(function (resTwo) {
        console.log('------ second Ajax call-----------')
        console.log(resTwo)
        currIndex = resTwo.value;
        currentData.append("<p> UV Index: " + "<span class='uv-index'>" + currIndex + "</span>" + "</p>")
        console.log(currIndex)
    })
}

function geCity(e) {
    //Local storage setting ************************************
    localStorage.setItem("cityName-" + buttonCount, e)
    //want to get the URL from the local storage and when the recetly
    //searched is cliked, pump that url into this ajax call
    ajaxCall(e)
}

$(document).ready(function () {
    // console.log(currentDate)
    $('#search-btn').on("click", function (event) {
        searchedCity = $("#city-search").val().trim();
        var addedCity = key + searchedCity;
        var newUrl = queryURL + addedCity;
        // need to prevent default for the form that im using
        event.preventDefault();

        // need to get the city information when clicked by calling my function
        geCity(newUrl);
    })

})