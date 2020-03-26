//default value
var cityName = "Seattle";

function searchCity() {
  event.preventDefault();
  cityName = $("#your-city").val().trim()
  cityName = cityName.replace(" ", "+")
  cityName = cityName.toLowerCase()
  //if no search, give a default 
  debugger;
  if(!cityName) {
    cityName = "Seattle"; 
  }
  // showHiking();
  // showEvents();
  // showFood();
  showWeather();
}


function showHiking() {
  //if they clicked the button to hide the results 
  if($("#hikingbutton").text() === "Hide") {
    //empty out divs 
    for(var i = 1; i < 6; i++) {
      //grab element to hide 
      var elID = "#hikingResult" + i; 

      //hide
      $(elID).addClass("hidden"); 
    }
    //set text to show 
    $("#hikingbutton").text("Show");
  } 
  else {
    //check to see if we already did the search
    //if we havent 
    if(!$("#hikingResult1").is(':empty')) {
      //do the search
      //MAP call to get lon and lat for hiking 

      //if two word city, need to replace space with a plus sign 
      var mapsKey = "AIzaSyAsQJipmAbkxBxkMoKKTeQlXIYHKBAeiQA";
      var mapsURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + cityName + "&key=" + mapsKey;

      $.ajax({
        url: mapsURL,
        method: "GET"
      }).then(function (mapsResponse) {
        console.log(mapsResponse);
        var lat = mapsResponse.results[0].geometry.location.lat;
        var lon = mapsResponse.results[0].geometry.location.lng;

        //hiking ajax call - will want to put this call inside weather call, which will provide lat and long 
        var hikingKey = "200711521-6e472fe6d7868e96f3ed6374e0204664";

        var hikingURL = "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&key=" + hikingKey;
        $.ajax({
          url: hikingURL,
          method: "GET"
        }).then(function (hikingResponse) {
          console.log(hikingResponse);

          for(var i = 1; i < 6; i++) {
            //for index of hikingResponse array
            var j = i - 1; 
            
            //grab element to append info to 
            var elID = "#hikingResult" + i; 

            //grab information response 
            var name = hikingResponse.trails[j].name;
            var location = hikingResponse.trails[j].location;
            var summary = hikingResponse.trails[j].summary;
            var imageURL = hikingResponse.trails[j].imgSmall;
            var length = hikingResponse.trails[j].length;
            var link = hikingResponse.trails[j].url;

            //empty div in case show button was already clicked
            $(elID).empty(); 

            //show div
            $(elID).removeClass("hidden"); 

            //create element, add text, then append 
            var newh5 = $("<h5>");
            newh5.text(name);
            $(elID).append(newh5);

            var newp = $("<p>");
            newp.text(location + " • " + length + " miles");
            $(elID).append(newp);

            var newpSummary = $("<p>");
            newpSummary.text(summary);
            $(elID).append(newpSummary);

            var newButton = $("<button>");
            newButton.text("Learn more");
            newButton.attr("class", "waves-effect waves-light btn");
            //add event listener to button 
            newButton.click(function () {
              window.open(link);
            });
            $(elID).append(newButton);

          }
        });
      });
    }
    //if we have done the search, just show previous results 
    else {
      //just show 
      for(var i = 1; i < 6; i++) {
        //grab element to hide 
        var elID = "#hikingResult" + i; 
  
        //show
        $(elID).removeClass("hidden"); 
      }
    }
    //set text to hide 
    $("#hikingbutton").text("Hide");
  }
}

//eventful ajax call
function showEvents() {
  //if they clicked the button to hide the results 
  if($("#eventsbutton").text() === "Hide") {
    //empty out divs 
    for(var i = 1; i < 6; i++) {
      //grab element to hide 
      var elID = "#eventResult" + i; 

      //hide
      $(elID).addClass("hidden"); 
    }
    //set text to show 
    $("#eventsbutton").text("Show");
  } 
  else {
    //check to see if we already did the search
    //if we havent 
    if(!$("#eventResult1").is(':empty')) {
      //do the search
  
      var eventfulKey = "S2Nw4XHRLF4k2Hsz";
      // use herokuapp to fix CORS issue 
      var eventfulQueryURL = "https://cors-anywhere.herokuapp.com/http://api.eventful.com/rest/events/search?...&location=" + cityName + "&date=Future" + "&app_key=" + eventfulKey;
      $.ajax({
        url: eventfulQueryURL,
        method: "GET"
      }).then(function (eventfulResponse) {
        //first event 
        var event = eventfulResponse.firstChild.lastElementChild.firstElementChild;
        for(var i = 1; i < 6; i++) { 
          //grab element to append info to 
          var elID = "#eventResult" + i; 

          //empty div
          $(elID).empty(); 
          //show div
          $(elID).removeClass("hidden"); 

          //grab information response 
          var title = $(event).children("title").text();
          var link = $(event).children("url").text();
          var venue = $(event).children("venue_name").text();
          var venueAddress = $(event).children("venue_address").text();
          var venueCity = $(event).children("city_name").text();
          var eventTime = $(event).children("start_time").text();

          //create element, add text, then append
          var newh5 = $("<h5>");
          newh5.text(title);
          $(elID).append(newh5);

          var newp = $("<p>");
          newp.text(venue);
          $(elID).append(newp);

          var newpAddress = $("<p>");
          newpAddress.text(venueAddress + ", " + venueCity);
          $(elID).append(newpAddress);

          //format time using moment
          var time = moment(eventTime, "YYYY-MM-DD HH:mm:ss");
          var timeFormatted = moment(time).format("M/D/YYYY h:mma")

          var newpTime = $("<p>");
          newpTime.text(timeFormatted);
          $(elID).append(newpTime);

          var newButton = $("<button>");
          newButton.text("Learn more");
          newButton.attr("class", "waves-effect waves-light btn");
          //add button event listener
          newButton.click(function () {
            window.open(link);
          });
          $(elID).append(newButton);

          //go to next event 
          event = event.nextElementSibling; 
        }
      });
    }
    //if we have done the search, just show previous results 
    else {
      //just show 
      for(var i = 1; i < 6; i++) {
        //grab element 
        var elID = "#eventResult" + i; 

        //show
        $(elID).removeClass("hidden"); 
      }
    }
    //set text to hide 
    $("#eventsbutton").text("Hide");
  }
}


function showWeather() {
  // Weather API

  var weatherKey = "65a7ca57e07ca382d1467087756ebdfd";
  var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&APPID=" + weatherKey;
  var metric = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&APPID=" + weatherKey;

  console.log(cityName)

  $.ajax({
    url: weatherURL,
    type: "GET",
    dataType: "jsonp",
    success: function (data) {
      var tempF = data.main.temp;
      var feelsLikeF = data.main.feels_like;
      var windMph = data.wind.speed;

      $.ajax({
        url: metric,
        type: "GET",
        dataType: "jsonp",
        success: function (data) {
          // console.log("city:                  " + data.name)
          // console.log("current weather:       " + data.weather[0].description)
          // console.log("current temperature:   " + data.main.temp + " °C ------- " + tempF + " °F")
          // console.log("feels like:            " + data.main.feels_like + " °C ------- " + feelsLikeF + " °F")
          // console.log("wind speed:            " + data.wind.speed + " kt  ------- " + windMph + " mph")

          // empty div
          $("#weather").empty(); 
          
          var newp = $("<p>");
          newp.text("current weather: ------------ " + data.weather[0].description);
          $("#weather").append(newp);

          var newp2 = $("<p>");
          newp2.text("current temperature: ------- " + data.main.temp + " °C --- " + tempF + " °F");
          $("#weather").append(newp2);

          var newp3 = $("<p>");
          newp3.text("feels like: -------------------- " + data.main.feels_like + " °C --- " + feelsLikeF + " °F");
          $("#weather").append(newp3);

        }
      });
    }});
}


function showFood() {

  //if they clicked the button to hide the results 
  if($("#foodbutton").text() === "Hide") {
    //empty out divs 
    for(var i = 1; i < 6; i++) {
      //grab element to hide 
      var elID = "#foodResult" + i; 

      //hide
      $(elID).addClass("hidden"); 
    }
    //set text to show 
    $("#foodbutton").text("Show");
  } 
  else {
    //check to see if we already did the search
    //if we havent 
    if(!$("#foodResult1").is(':empty')) {
      //do the search
        var foodKey = "e6b865792885e0c46ec11c9c6a86dd32";
        var foodURL = "https://developers.zomato.com/api/v2.1/locations?query=" + cityName;
        var cityID;

        $.ajax({
          type: "GET",
          headers: {
            'X-Zomato-API-Key': foodKey
          },
          url: foodURL,
          dataType: 'json',
          processData: true,
        }).then(function (data) {
          
          // console.log(data);


          console.log(data.location_suggestions[0].title + " (id = " + data.location_suggestions[0].city_id + ")")
          console.log("")
          cityID = data.location_suggestions[0].city_id // cityID is used on next ajax call
          var searchURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + cityID + "&entity_type=city&sort=rating" // maybe only search

          $.ajax({
            type: "GET",
            headers: {
              'X-Zomato-API-Key': foodKey
            },
            url: searchURL, // search
            dataType: 'json',

            processData: true,
          }).then(function (data) {

            for (let i = 0; i < 5; i++) {

              // console.log(data.restaurants[i])
              // console.log(data.restaurants[i].restaurant.name)
              // console.log(data.restaurants[i].restaurant.establishment[0])
              // console.log(data.restaurants[i].restaurant.cuisines)
              // console.log("img: " + data.restaurants[i].restaurant.featured_image)
              // console.log("url: " + data.restaurants[i].restaurant.url)
              // console.log(data.restaurants[i].restaurant.location.address + ", " + data.restaurants[i].restaurant.location.locality)
              // console.log("")

            
              // empty divs in case there is content in them and then show 
              
              
              j = i+1;

              //empty div
              $("#foodResult" + j).empty(); 
              //show div
              $("#foodResult" + j).removeClass("hidden"); 

              var newh5 = $("<h5>");
              newh5.text(data.restaurants[i].restaurant.name);
              $("#foodResult" + j).append(newh5);

              var newp = $("<p>");
              newp.text(data.restaurants[i].restaurant.establishment[0]);
              $("#foodResult" + j).append(newp);

              var newp2 = $("<p>");
              newp2.text(data.restaurants[i].restaurant.cuisines);
              $("#foodResult" + j).append(newp2);

              var newp3 = $("<p>");
              newp3.text(data.restaurants[i].restaurant.location.address + ", " + data.restaurants[i].restaurant.location.locality);
              $("#foodResult" + j).append(newp3);

              var newButton = $("<button>");
              newButton.text("Learn more");
              newButton.attr("class", "waves-effect waves-light btn");
              newButton.click(function () {
              window.open(data.restaurants[i].restaurant.url);
              });
              $("#foodResult" + j).append(newButton);

              }
          });
        });
      }
      //if we have done the search, just show previous results 
      else {
        //just show 
        for(var i = 1; i < 6; i++) {
          //grab element 
          var elID = "#foodResult" + i; 

          //show
          $(elID).removeClass("hidden"); 
        }
      }
      //set text to hide 
      $("#foodbutton").text("Hide");
  }
}