
function showFood() {
  // Zomato API

  var cityName = "seattle";
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
    }).then(function(data) {
        console.log(data); 


        console.log(data.location_suggestions[0].title)
        cityID = data.location_suggestions[0].city_id // cityID is used on next ajax call
        console.log(cityID)
        var collectionURL = "https://developers.zomato.com/api/v2.1/collections?city_id=" + cityID; // collection of restaurants
        var establishmentsURL = "https://developers.zomato.com/api/v2.1/establishments?city_id=" + cityID; // list of establishments

        // when layout gets done, we'll decide exactly which items to call from ajax

        $.ajax({
          type: "GET", 
          headers: {
            'X-Zomato-API-Key': foodKey
          },
          url: collectionURL, // list of zomato collections
          dataType: 'json',
          
          processData: true, 
          }).then(function(data) {
            console.log(data);
          
        });
        $.ajax({
          type: "GET", 
          headers: {
            'X-Zomato-API-Key': foodKey
          },
          url: establishmentsURL, // list of establishments
          dataType: 'json',
          
          processData: true, 
        }).then(function(data) {
            console.log(data);
          
        });
      });
    }



    

    


    
  





































    showHiking(); 
    showEvents(); 


  function showHiking() {
    //MAP call to get lon and lat for hiking 

    //if two word city, need to replace space with a plus sign 
    var cityName = "seattle";
    var cityNoSpaces = cityName.replace(" ","+")
    var mapsKey = "AIzaSyAsQJipmAbkxBxkMoKKTeQlXIYHKBAeiQA"; 
    var mapsURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + cityNoSpaces + "&key=" + mapsKey; 
    
    $.ajax ({
      url: mapsURL, 
      method: "GET"
    }).then(function(mapsResponse) {
      console.log(mapsResponse); 
      var lat = mapsResponse.results[0].geometry.location.lat; 
      var lon = mapsResponse.results[0].geometry.location.lng; 

      //hiking ajax call - will want to put this call inside weather call, which will provide lat and long 
      var hikingKey = "200711521-6e472fe6d7868e96f3ed6374e0204664"; 

      var hikingURL = "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&key=" + hikingKey; 
      $.ajax({
        url: hikingURL,
        method: "GET"
      }).then(function(hikingResponse) {
        console.log(hikingResponse); 
        var trail1Name = hikingResponse.trails[0].name; 
        var trail1Location = hikingResponse.trails[0].location; 
        var trail1Summary = hikingResponse.trails[0].summary; 
        var trail1ImageURL = hikingResponse.trails[0].imgSmall; 
        var trail1Length = hikingResponse.trails[0].length; 
        var trail1Link = hikingResponse.trails[0].url; 

        var newh5 = $("<h5>");
        newh5.text(trail1Name); 
        $("#hikingResult1").append(newh5); 

        var newp = $("<p>");
        newp.text(trail1Location + " • " + trail1Length + " miles");
        $("#hikingResult1").append(newp); 

        var newpSummary = $("<p>"); 
        newpSummary.text(trail1Summary); 
        $("#hikingResult1").append(newpSummary); 

        var newButton = $("<button>"); 
        newButton.text("Learn more"); 
        newButton.attr("class","waves-effect waves-light btn"); 
        newButton.click(function() {
          window.open(trail1Link);
        });
        $("#hikingResult1").append(newButton);

        var trail2Name = hikingResponse.trails[1].name; 
        var trail2Location = hikingResponse.trails[1].location; 
        var trail2Summary = hikingResponse.trails[1].summary; 
        var trail2ImageURL = hikingResponse.trails[1].imgSmall; 
        var trail2Length = hikingResponse.trails[1].length; 
        var trail2Link = hikingResponse.trails[1].url;

        var newh5 = $("<h5>");
        newh5.text(trail2Name); 
        $("#hikingResult2").append(newh5); 

        var newp = $("<p>");
        newp.text(trail2Location + " • " + trail2Length + " miles");
        $("#hikingResult2").append(newp); 

        var newpSummary = $("<p>"); 
        newpSummary.text(trail2Summary); 
        $("#hikingResult2").append(newpSummary); 

        var newButton = $("<button>"); 
        newButton.text("Learn more"); 
        newButton.attr("class","waves-effect waves-light btn"); 
        newButton.click(function() {
          window.open(trail2Link);
        });
        $("#hikingResult2").append(newButton);

        var trail3Name = hikingResponse.trails[2].name; 
        var trail3Location = hikingResponse.trails[2].location; 
        var trail3Summary = hikingResponse.trails[2].summary; 
        var trail3ImageURL = hikingResponse.trails[2].imgSmall; 
        var trail3Length = hikingResponse.trails[2].length; 
        var trail3Link = hikingResponse.trails[2].url;

        var newh5 = $("<h5>");
        newh5.text(trail3Name); 
        $("#hikingResult3").append(newh5); 

        var newp = $("<p>");
        newp.text(trail3Location + " • " + trail3Length + " miles");
        $("#hikingResult3").append(newp); 

        var newpSummary = $("<p>"); 
        newpSummary.text(trail3Summary); 
        $("#hikingResult3").append(newpSummary); 

        var newButton = $("<button>"); 
        newButton.text("Learn more"); 
        newButton.attr("class","waves-effect waves-light btn"); 
        newButton.click(function() {
          window.open(trail3Link);
        });
        $("#hikingResult3").append(newButton);

        var trail4Name = hikingResponse.trails[3].name; 
        var trail4Location = hikingResponse.trails[3].location; 
        var trail4Summary = hikingResponse.trails[3].summary; 
        var trail4ImageURL = hikingResponse.trails[3].imgSmall; 
        var trail4Length = hikingResponse.trails[3].length; 
        var trail4Link = hikingResponse.trails[3].url;

        var newh5 = $("<h5>");
        newh5.text(trail4Name); 
        $("#hikingResult4").append(newh5); 

        var newp = $("<p>");
        newp.text(trail4Location + " • " + trail4Length + " miles");
        $("#hikingResult4").append(newp); 

        var newpSummary = $("<p>"); 
        newpSummary.text(trail4Summary); 
        $("#hikingResult4").append(newpSummary); 

        var newButton = $("<button>"); 
        newButton.text("Learn more"); 
        newButton.attr("class","waves-effect waves-light btn"); 
        newButton.click(function() {
          window.open(trail4Link);
        });
        $("#hikingResult4").append(newButton);

        var trail5Name = hikingResponse.trails[4].name; 
        var trail5Location = hikingResponse.trails[4].location; 
        var trail5Summary = hikingResponse.trails[4].summary; 
        var trail5ImageURL = hikingResponse.trails[4].imgSmall; 
        var trail5Length = hikingResponse.trails[4].length; 
        var trail5Link = hikingResponse.trails[4].url;

        var newh5 = $("<h5>");
        newh5.text(trail5Name); 
        $("#hikingResult5").append(newh5); 

        var newp = $("<p>");
        newp.text(trail5Location + " • " + trail5Length + " miles");
        $("#hikingResult5").append(newp); 

        var newpSummary = $("<p>"); 
        newpSummary.text(trail5Summary); 
        $("#hikingResult5").append(newpSummary); 

        var newButton = $("<button>"); 
        newButton.text("Learn more"); 
        newButton.attr("class","waves-effect waves-light btn"); 
        newButton.click(function() {
          window.open(trail5Link);
        });
        $("#hikingResult5").append(newButton);

      }); 
  }); 
}

  



function showEvents() {
  //eventful ajax call
  var cityName = "seattle";
  var cityNoSpaces = cityName.replace(" ","+")
  var eventfulKey = "S2Nw4XHRLF4k2Hsz"; 
  // use herokuapp to fix CORS issue 
  var eventfulQueryURL = "https://cors-anywhere.herokuapp.com/http://api.eventful.com/rest/events/search?...&location=" + cityNoSpaces + "&date=Future" + "&app_key=" + eventfulKey; 
  $.ajax({
    url: eventfulQueryURL, 
    method: "GET"
  }).then(function(eventfulResponse) {
    console.log(eventfulResponse); 
    
    var event1 = eventfulResponse.firstChild.lastElementChild.firstElementChild; 
    
    var event1Title = $(event1).children("title").text();
    var event1URL = $(event1).children("url").text();
    var event1Venue = $(event1).children("venue_name").text();
    var event1VenueAddress = $(event1).children("venue_address").text();
    var event1VenueCity = $(event1).children("city_name").text();
    var event1Time = $(event1).children("start_time").text();

    var newh5 = $("<h5>");
    newh5.text(event1Title); 
    $("#eventResult1").append(newh5); 

    var newp = $("<p>");
    newp.text(event1Venue);
    $("#eventResult1").append(newp); 

    var newpAddress = $("<p>"); 
    newpAddress.text(event1VenueAddress + ", " + event1VenueCity); 
    $("#eventResult1").append(newpAddress); 

    var time = moment(event1Time, "YYYY-MM-DD HH:mm:ss");
    var timeFormatted = moment(time).format("M/D/YYYY h:mma")

    var newpTime = $("<p>"); 
    newpTime.text(timeFormatted);
    $("#eventResult1").append(newpTime); 


    var newButton = $("<button>"); 
    newButton.text("Learn more"); 
    newButton.attr("class","waves-effect waves-light btn"); 
    newButton.click(function() {
      window.open(event1URL);
    });
    $("#eventResult1").append(newButton);



    var event2 = event1.nextElementSibling; 

    var event2Title = $(event2).children("title").text();
    var event2URL = $(event2).children("url").text();
    var event2Venue = $(event2).children("venue_name").text();
    var event2VenueAddress = $(event2).children("venue_address").text();
    var event2VenueCity = $(event2).children("city_name").text();
    var event2Time = $(event2).children("start_time").text();

    var newh5 = $("<h5>");
    newh5.text(event2Title); 
    $("#eventResult2").append(newh5); 

    var newp = $("<p>");
    newp.text(event2Venue);
    $("#eventResult2").append(newp); 

    var newpAddress = $("<p>"); 
    newpAddress.text(event2VenueAddress + ", " + event2VenueCity); 
    $("#eventResult2").append(newpAddress); 

    var time = moment(event2Time, "YYYY-MM-DD HH:mm:ss");
    var timeFormatted = moment(time).format("M/D/YYYY h:mma")

    var newpTime = $("<p>"); 
    newpTime.text(timeFormatted);
    $("#eventResult2").append(newpTime); 


    var newButton = $("<button>"); 
    newButton.text("Learn more"); 
    newButton.attr("class","waves-effect waves-light btn"); 
    newButton.click(function() {
      window.open(event2URL);
    });
    $("#eventResult2").append(newButton);


    var event3 = event2.nextElementSibling; 

    var event3Title = $(event3).children("title").text();
    var event3URL = $(event3).children("url").text();
    var event3Venue = $(event3).children("venue_name").text();
    var event3VenueAddress = $(event3).children("venue_address").text();
    var event3VenueCity = $(event3).children("city_name").text();
    var event3Time = $(event3).children("start_time").text();

    var newh5 = $("<h5>");
    newh5.text(event3Title); 
    $("#eventResult3").append(newh5); 

    var newp = $("<p>");
    newp.text(event3Venue);
    $("#eventResult3").append(newp); 

    var newpAddress = $("<p>"); 
    newpAddress.text(event3VenueAddress + ", " + event3VenueCity); 
    $("#eventResult3").append(newpAddress); 

    var time = moment(event3Time, "YYYY-MM-DD HH:mm:ss");
    var timeFormatted = moment(time).format("M/D/YYYY h:mma")

    var newpTime = $("<p>"); 
    newpTime.text(timeFormatted);
    $("#eventResult3").append(newpTime); 


    var newButton = $("<button>"); 
    newButton.text("Learn more"); 
    newButton.attr("class","waves-effect waves-light btn"); 
    newButton.click(function() {
      window.open(event3URL);
    });
    $("#eventResult3").append(newButton);

    var event4 = event3.nextElementSibling; 

    var event4Title = $(event4).children("title").text();
    var event4URL = $(event4).children("url").text();
    var event4Venue = $(event4).children("venue_name").text();
    var event4VenueAddress = $(event4).children("venue_address").text();
    var event4VenueCity = $(event4).children("city_name").text();
    var event4Time = $(event4).children("start_time").text();

    var newh5 = $("<h5>");
    newh5.text(event4Title); 
    $("#eventResult4").append(newh5); 

    var newp = $("<p>");
    newp.text(event4Venue);
    $("#eventResult4").append(newp); 

    var newpAddress = $("<p>"); 
    newpAddress.text(event4VenueAddress + ", " + event4VenueCity); 
    $("#eventResult4").append(newpAddress); 

    var time = moment(event4Time, "YYYY-MM-DD HH:mm:ss");
    var timeFormatted = moment(time).format("M/D/YYYY h:mma")

    var newpTime = $("<p>"); 
    newpTime.text(timeFormatted);
    $("#eventResult4").append(newpTime); 


    var newButton = $("<button>"); 
    newButton.text("Learn more"); 
    newButton.attr("class","waves-effect waves-light btn"); 
    newButton.click(function() {
      window.open(event4URL);
    });
    $("#eventResult4").append(newButton);

    var event5 = event4.nextElementSibling; 

    var event5Title = $(event5).children("title").text();
    var event5URL = $(event5).children("url").text();
    var event5Venue = $(event5).children("venue_name").text();
    var event5VenueAddress = $(event5).children("venue_address").text();
    var event5VenueCity = $(event5).children("city_name").text();
    var event5Time = $(event5).children("start_time").text();

    var newh5 = $("<h5>");
    newh5.text(event5Title); 
    $("#eventResult5").append(newh5); 

    var newp = $("<p>");
    newp.text(event5Venue);
    $("#eventResult5").append(newp); 

    var newpAddress = $("<p>"); 
    newpAddress.text(event5VenueAddress + ", " + event5VenueCity); 
    $("#eventResult5").append(newpAddress); 

    var time = moment(event5Time, "YYYY-MM-DD HH:mm:ss");
    var timeFormatted = moment(time).format("M/D/YYYY h:mma")

    var newpTime = $("<p>"); 
    newpTime.text(timeFormatted);
    $("#eventResult5").append(newpTime); 


    var newButton = $("<button>"); 
    newButton.text("Learn more"); 
    newButton.attr("class","waves-effect waves-light btn"); 
    newButton.click(function() {
      window.open(event5URL);
    });
    $("#eventResult5").append(newButton);
  }); 
}



function showWeather() {
  // Weather API

  var weatherKey = "65a7ca57e07ca382d1467087756ebdfd";
  var weatherCity = "seattle"
  var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + weatherCity + "&units=imperial&APPID=" + weatherKey;


  $.ajax({
    url: weatherURL,
    type: "GET",
    dataType: "jsonp",
    success: function(data){
    console.log("city: " + data.name)
    console.log("current weather: " + data.weather[0].description)
    console.log("current temperature: " + data.main.temp + " °F")
    console.log("feels like: " + data.main.feels_like + " °F")
    console.log("wind speed: " + data.wind.speed + " mph")
          
    }
  });
}
