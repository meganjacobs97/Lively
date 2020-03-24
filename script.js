// script

var cityName = "seattle";
var cityID;



$.ajax({
    type: "GET", //it's a GET request API
    headers: {
      'X-Zomato-API-Key': 'e6b865792885e0c46ec11c9c6a86dd32' //only allowed non-standard header
    },
    url: 'https://developers.zomato.com/api/v2.1/locations?query=' + cityName, //what do you want
    dataType: 'json', //wanted response data type - let jQuery handle the rest...
    
    processData: true, //data is an object => tells jQuery to construct URL params from it
  }).then(function(data) {
      console.log(data); //what to do with response data on success
      console.log(data.location_suggestions[0].title)
      cityID = data.location_suggestions[0].city_id
      console.log(cityID)

      $.ajax({
        type: "GET", //it's a GET request API
        headers: {
          'X-Zomato-API-Key': 'e6b865792885e0c46ec11c9c6a86dd32' //only allowed non-standard header
        },
        url: 'https://developers.zomato.com/api/v2.1/cuisines?city_id=' + cityID, //what do you want
        dataType: 'json', //wanted response data type - let jQuery handle the rest...
        
        processData: true, //data is an object => tells jQuery to construct URL params from it
      }).then(function(data) {
          console.log(data); //what to do with response data on success
      });
  });
    


    
  



















































//eventful ajax call
//if two word city, need to replace space with a plus sign 
var cityNoSpaces = cityName.replace(" ","+")
var eventfulKey = "S2Nw4XHRLF4k2Hsz"; 
// use herokuapp to fix CORS issue 
var eventfulQueryURL = "https://cors-anywhere.herokuapp.com/http://api.eventful.com/rest/events/search?...&location=" + cityNoSpaces + "&date=Future" + "&app_key=" + eventfulKey; 
$.ajax({
  url: eventfulQueryURL, 
  method: "GET"
}).then(function(eventfulResponse) {
  console.log(eventfulResponse); 
}); 


//hiking ajax call - will want to put this call inside weather call, which will provide lat and long 
var lat = "47";
var lon = "-122";
var hikingKey = "200711521-6e472fe6d7868e96f3ed6374e0204664"; 

var hikingURL = "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&key=" + hikingKey; 
$.ajax({
  url: hikingURL,
  method: "GET"
}).then(function(hikingResponse) {
  console.log(hikingResponse); 
});


