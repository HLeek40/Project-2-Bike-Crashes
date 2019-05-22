var mapmargin = 50;
$('#map').css("height", ($(window).height() - mapmargin));
$(window).on("resize", resize);
resize();
function resize(){

    if($(window).width()>=980){
        $('#map').css("height", ($(window).height() - mapmargin));    
        $('#map').css("margin-top",50);
    }else{
        $('#map').css("height", ($(window).height() - (mapmargin+12)));    
        $('#map').css("margin-top",-21);
    }

}
 
 // Creating map object
var myMap = L.map("map", {
  center: [35.91, -79.05],
  zoom: 14
});
console.log(API_KEY);
console.log(wordcloud);
// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var baseURL = "/latling";
// Grab the data with d3
d3.json(baseURL, function(response) {

//   // Create a new marker cluster group
//   //var markers = L.markerClusterGroup();
     var markers = L.layerGroup();
//   //var records = response;
//   // Loop through data

//   // function mColor(mag){
//   //   mag = +mag;
//   //   var color = "white";
//   //   if (mag > 5){
//   //     color = "red";
//   //   }
//   //   else if (mag >= 4){
//   //     color = "orangeRed";
//   //   }
//   //   else if (mag >= 3){
//   //     color = "orange";
//   //   }
//   //   else if (mag >= 2){
//   //     color = "yellow";
//   //   }
//   //   else if (mag >= 1){
//   //     color = "yellowgreen";
//   //   }
//   //   else{
//   //     color = "green";
//   //   }
//   //   return color;
//   // }

  for (var i = 0; i < response.length; i++) {

    var LAT = +response[i].lat;
    var LON = +response[i].lon;
    markers.addLayer(L.circleMarker([LAT, LON])).bindPopup(response[i].city);
    //L.marker([LON, LAT]).bindPopup(response[i].city).addTo(myMap);
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