function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

var xhr = createCORSRequest('GET', url);
if (!xhr) {
  throw new Error('CORS not supported');
}

function getLocation() {
  $(".js-start").on("click", "button", function(event) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPlaces, getMap);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
      }  
  });
};

function getPlaces(position) {
  var long = position.coords.longitude;
  var latt = position.coords.latitude;
  var BASE_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
  var mapData = {
    key: 'AIzaSyDgk52fKecH4YpjA3U7y9YlMvI-QlOtEXg',
    location: latt + ',' + long,
    radius: 16000,
    type: 'art_gallery'
  };
  $.getJSON(BASE_URL, mapData, displayPins);
};

function getMap(position) {
  var long = position.coords.longitude;
  var latt = position.coords.latitude;
  var myLatLng = latt, long;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatLng
  });
};

function displayPins(data) {
  var marker = new google.maps.Marker({
    position: {lat: results.geometry.location.lat, lng: results.geometry.location.lng},
    map: map,
    title: results.name,
  });
};

$(function() {
  getLocation();
});