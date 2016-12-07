var map;
var pos;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 35.030246, lng: -90.02517},
    zoom: 12
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('You are here');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  var infoWindow = new google.maps.InfoWindow({map: map});

  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

function findGalleries() {
  $(".js-start").on("click", "button", function(event) {
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: pos,
      radius: 15000,
      type: ['art_gallery']
    }, callback);
  });
}
  

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
 $('#map').on('click', marker, function(event) {
  console.log('click')
    var infoWindow = new google.maps.InfoWindow();
    infoWindow.open(map, this);
    infoWindow.setContent(place.name);
  });
};

$(function() {
  initMap();
});

$(function(){
  findGalleries();
})
