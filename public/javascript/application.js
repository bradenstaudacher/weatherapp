// This function grabs our observation data
$(document).ready(function() {
  $('#search-one').on('click', function(e){
    e.preventDefault();
    searchterm = $('#search-input').val();
    console.log("SEARCH", searchterm);
    var responseCallback = function(result) {
    var zmw = result['RESULTS'][0].zmw + '.json'
    console.log("THIS BE ZMW", zmw)
    $.ajax({
      method: 'GET',
      url: 'http://api.wunderground.com/api/44f0caac7402487f/conditions/q/zmw:' + zmw,
      dataType: 'jsonp',
      success: function (data) {
        console.log("WEATHERDATA", data);
        $('#cities-info > h3').empty();
        value = data['current_observation'];
        displayValue = value['display_location']
        displayElevation = value['observation_location']
        $('#cities-info').append( '<h3>' + 'Location: ' + displayValue.full + '<br>' + 'current temperature: ' + value.temp_c + '<br>' + 'weather: ' + value.weather + '<br>' + 'elevation: ' + displayElevation.elevation + '<br>' + 'wind speed(kmh): ' + value.wind_kph + '</h3>'); 
      },
      error: function () {
          console.log(error);
      }
    });
    }
    getlatlong(searchterm, responseCallback);
  });
});
// This function callbacks the above by supplying the json for latlong coords to pass to the weather lookup
function getlatlong(searchterm, done) {
  $.ajax({
    method: 'GET',
    url: 'http://autocomplete.wunderground.com/aq',
    data: {
        query: searchterm
    },
    dataType: 'jsonp',
    jsonp: 'cb',
    success: done,
    error: function () {
        console.log('error');
    }
  });
};
// This function renders our Autocomplete
$(function () {
  var acXHR;
  $('#search-input').autocomplete({
    delay: 300,
    source: function (req, resCB) {
      acXHR = $.ajax({
        method: 'GET',
        url: 'http://autocomplete.wunderground.com/aq',
        data: {
          query: req.term
        },
        dataType: 'jsonp',
        jsonp: 'cb',
        success: function (data) {
          resCB(data['RESULTS'].map(function (city) {
              return city.name;
          }));
        },
        error: function () {
            resCB();
        }
      });
    }
  });
});

$(document).ready(function() {
  var arr = ["Vancouver","Mumbai","Jakarta","Krakow","Paris"]
  var counter = 0;
  setInterval(function(){
  $('#search-input').attr('placeholder', arr[counter % arr.length]);
  counter++;
  },2000);
  
});





