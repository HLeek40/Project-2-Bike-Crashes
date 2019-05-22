  // Create map object and set default layers
  var myMap = L.map("map", {
    center: [35.9132, -79.0558],
    zoom: 5,
    layers: [light, cityLayer]
  });

  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);
  
//D3 to get the data from the data base
d3.json("/latling").then(function(crashdata){
  console.log()
}

// An array crashes with their latitude and logiture
var crashdata = [];
  
  // An array which will be used to store created cityMarkers
  var cityMarkers = [];
  
  for (var i = 0; i < crashdata.length; i++) {
    // loop through the crash data array, create a new marker, push it to the cityMarkers array
    cityMarkers.push(
      L.marker(crashdata[i].city).bidPopup("<h1>" + crashdata[i].crash_sevri + "</h1>" + crashdata[i].crash_type + "</h1>")
    );
  }
  
  // Add all the cityMarkers to a new layer group.
  // Now we can handle them as one group instead of referencing each individually
  var cityLayer = L.layerGroup(cityMarkers);
  
  // Define variables for our tile layers
  var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });
  
  var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });
  
  // Only one base layer can be shown at a time
  var baseMaps = {
    Light: light,
    Dark: dark
  };
  
  // Overlays that may be toggled on or off
  var overlayMaps = {
    Cities: cityLayer
  };
  
  // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);

  // Here we add a GeoJSON layer to the map once the file is loaded.
L.geoJson(data, {
  // We turn each feature into a circleMarker on the map.
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng);
  },
  // We set the style for each circleMarker using our styleInfo function.
  style: styleInfo,
  // We create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
  onEachFeature: function (feature, layer) {
    layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
  }
}).addTo(myMap);

var legend = L.control({
  position: "bottomright"
});

legend.onAdd = function () {
  var div = L.DomUtil.create('div', 'legend');
  magnitude = [0, 1, 2, 3, 4, 5]
  colors = ["#fff2e6", "#1a0d00", "#4d2600", "#804000", "#cc6600", "#ff9933"]
  for (var i = 0; i < magnitude.length; i++) {
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      magnitude[i] + (magnitude[i + 1] ? "&ndash;" + magnitude[i + 1] + "<br>" : "+");
  }
  return div;
}
legend.addTo(myMap);
})


