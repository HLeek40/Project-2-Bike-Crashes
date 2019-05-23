// Creating map object
var myMap = L.map("map", {
  center: [35.91, -79.05],
  zoom: 14
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var baseURL = "/latling";
// Grab the data with d3
d3.json(baseURL).then(function(response) {
     var markers = L.layerGroup();

  for (var i = 0; i < response.length; i++) {

    var LAT = +response[i].lat;
    var LON = +response[i].lon;
    markers.addLayer(L.circleMarker([LAT, LON]).bindPopup("City: " + response[i].city + "<br>Crash Severity: " + response[i].crsh_sevri));
  }
  // Add our marker cluster layer to the map
  myMap.addLayer(markers);
});
// //   var legend = L.control({
// //     position: "bottomright"
// //   });

// //   legend.onAdd = function () {
// //     var div = L.DomUtil.create('div', 'legend');
// //     magnitude = [0, 1, 2, 3, 4, 5]
// //     //colors = ["#fff2e6", "#1a0d00", "#4d2600", "#804000", "#cc6600", "#ff9933"]
// //     colors = ["green", "yellowgreen", "yellow", "orange", "orangered", "red"]
// //     for (var i = 0; i < magnitude.length; i++) {
// //       div.innerHTML +=
// //         "<i style='background: " + colors[i] + "'></i> " +
// //         magnitude[i] + (magnitude[i + 1] ? "&ndash;" + magnitude[i + 1] + "<br>" : "+");
// //     }
// //     return div;
// //   }
// //   legend.addTo(myMap);
// // });