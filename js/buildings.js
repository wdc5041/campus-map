$.getJSON("./data/building-centroids.json", function(centroids) {
  
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