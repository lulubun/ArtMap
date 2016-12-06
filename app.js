function getLocation() {
  $(".js-start").on("click", "button", function(event) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(initMap, callback);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
      }  
  });
};

var map;
var service;
var infowindow;

function initMap(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: latitude,
        lng: longitude
      },
      zoom: 15
    });

  var request = {
    location: {
      lat:latitude,
      lng: longitude
    },
    radius: '16000',
    types: ['art_gallery']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

$(function() {
  getLocation();
});