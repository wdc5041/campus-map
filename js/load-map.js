// This access token allows us to use Mapbox's API
L.mapbox.accessToken = 'pk.eyJ1IjoiYWFyb25kZW5uaXMiLCJhIjoiem5LLURoYyJ9.T3tswGTI5ve8_wE-a02cMw';

// Set the maximum bounds so the map user doesn't pan too far from campus
var southWest = L.latLng(40.7643, -77.9043), // south-west corner of maximum view
    northEast = L.latLng(40.8844, -77.8064), // north-east corner of maximum view
    bounds = L.latLngBounds(southWest, northEast); // combine the two corners to set the bounds

// Add a basic slippy map to the webpage using Leaflet.js and save it as the variable map
var map = L.mapbox.map('map', 'aarondennis.f6516522', { // Create a new map using the map tiles 'aarondennis.f6516522' in the map div
    maxBounds: bounds, // set the maximum pan boundaries to bounds
    maxZoom: 19, // set how far into the map you can zoom to level 19
    minZoom: 15  // set how far out from the map you can zoom to level 15
  }).setView([40.7967, -77.8619], 18); // set the map view to those coordinates and zoom level 18 (Old Main)

L.control.locate().addTo(map); // Adds the geolocate button to the map

var hash = L.hash(map); // Makes the webpage URL change so that the coordinates are included

$.getJSON("./data/centroids.json", function(centroids) {
  
  // add points layer to map
  var markers = L.mapbox.featureLayer(centroids)
    .setFilter(function() { return false; })
    .bindPopup(
      '<h1>Penn State Building</h1>' +
      '<ul>' +
      '<li>Department of This</li>' +
      '<li>Department of That</li>' +
      '</ul>' +
      '<div><img style="margin:2px;width:100%;" src="images/old_main.jpg" /></div>' +
      '<button class="btn btn-info trigger">Directions to here</button>'
    )
    .addTo(map);
  
  // get titles of points and add to autocomplete tags
  function getTags(data) {
    var tagNames = [];
    for (var i = 0; i < data.features.length; i++) {
      if (data.features[i].properties.title !== null && centroids.features[i].properties.title !== undefined) {
        tagNames.push(data.features[i].properties.title);
      }
    }
    return tagNames;
  }
  
  // set search bar behavior
  $(function() {
    var availableTags = getTags(centroids);
    
    $( "#search" ).autocomplete({
      source: availableTags,
      minLength: 2,
      autoFocus: true,
      select: function( event, ui ) { 
        console.log('selected!');
        setTimeout( zoomToSearchPoint, 50 );
      }
    });
  });
  
  // zoom to search point
  function zoomToSearchPoint() {
    var targetName = document.getElementById('search').value;
    console.log(targetName);
    for (var i = 0; i < centroids.features.length; i++) {
      if (centroids.features[i].properties.title === targetName) {
        var targetPointIndex = i;
        break;
      } else {
        console.log('not found');
      }
    }
    map.setView(
      [centroids.features[targetPointIndex].geometry.coordinates[1],
       centroids.features[targetPointIndex].geometry.coordinates[0]],
       18);
    markers.setFilter(function(feature) { 
      return feature.properties.title === targetName;
    });
  }
});
  
  $('#map').on('click', '.trigger', function() {
    console.log('give directions');
  });
  
  
  //http://realtime.catabus.com/InfoPoint/rest/vehicles/getallvehiclesforroute?routeID="19"
  $('#transit').on('click', function() {
    console.log('clicked');
    $.ajax({
      url: 'http://realtime.catabus.com/InfoPoint/rest/vehicles/getallvehicles', 
      // Work with the response
      success: function( response ) {
        console.log( JSON.stringify(response) ); // server response
      }
    });
  });