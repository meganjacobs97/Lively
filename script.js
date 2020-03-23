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
    success: function(data) {
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
        success: function(data) {
          console.log(data); //what to do with response data on success
        }
      });
    }
    }
  );


