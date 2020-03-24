// zomato ajax

var cityName = "seattle";
var foodsKey = "e6b865792885e0c46ec11c9c6a86dd32";
var foodsURL1 = "https://developers.zomato.com/api/v2.1/locations?query=" + cityName;
var cityID;

$.ajax({
    type: "GET",
    headers: {
      'X-Zomato-API-Key': foodsKey 
    },
    url: foodsURL1,
    dataType: 'json',
    
    processData: true,
    success: function(data) {
      console.log(data);
      console.log(data.location_suggestions[0].title)
      cityID = data.location_suggestions[0].city_id // city id is used on next ajax call
      console.log(cityID)
      var collectionURL = "https://developers.zomato.com/api/v2.1/collections?city_id=" + cityID; // collection of restaurants
      var establishmentsURL = "https://developers.zomato.com/api/v2.1/establishments?city_id=" + cityID; // list of establishments

      // when layout gets done, we'll decide exactly which items to call from ajax

      $.ajax({
        type: "GET", 
        headers: {
          'X-Zomato-API-Key': foodsKey
        },
        url: collectionURL,
        dataType: 'json',
        
        processData: true, 
        success: function(data) {
          console.log(data);
        }
      });
      $.ajax({
        type: "GET", 
        headers: {
          'X-Zomato-API-Key': foodsKey
        },
        url: establishmentsURL,
        dataType: 'json',
        
        processData: true, 
        success: function(data) {
          console.log(data);
        }
      });
    }
    }
  );




// weather ajax

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

