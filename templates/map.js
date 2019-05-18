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
  
  // Create map object and set default layers
  var myMap = L.map("map", {
    center: [35.9132, 79.0558],
    zoom: 5,
    layers: [light, cityLayer]
  });
  
  // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);
  
  
