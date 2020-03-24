

// jQuery for the main carousel
$(document).ready(function(){
  $('.carousel').carousel();
  fullWidth: true

});


// to give carousel a time interval but unfortunately it also gave time to the other pictures! :/
// setInterval(function(){
//   $('.carousel').carousel('next');
// }, 3000);


    

// start carrousel
$('.carousel.carousel-slider').carousel({
  fullWidth: true,
  indicators: false
});


// move next carousel
$('.moveNextCarousel').click(function(e){
  e.preventDefault();
  e.stopPropagation();
  $('.carousel').carousel('next');
});

// move prev carousel
$('.movePrevCarousel').click(function(e){
  e.preventDefault();
  e.stopPropagation();
  $('.carousel').carousel('prev');
}); 

// script


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
    processData: true, //data is an object => tells jQuery to construct URL params from it
  }).then(function(data) {
      console.log(data); //what to do with response data on success
});

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
        }).then(function(data) {
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
  });
    


    
  









































  //MAP call to get lon and lat for hiking 

  //if two word city, need to replace space with a plus sign 
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

    }); 
}); 


  




//eventful ajax call

var eventfulKey = "S2Nw4XHRLF4k2Hsz"; 
// use herokuapp to fix CORS issue 
var eventfulQueryURL = "https://cors-anywhere.herokuapp.com/http://api.eventful.com/rest/events/search?...&location=" + cityNoSpaces + "&date=Future" + "&app_key=" + eventfulKey; 
$.ajax({
  url: eventfulQueryURL, 
  method: "GET"
}).then(function(eventfulResponse) {
  console.log(eventfulResponse); 
}); 




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

