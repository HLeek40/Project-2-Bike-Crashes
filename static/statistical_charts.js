// Create the Traces
// Create the Traces
//console.log("LOOK HERE")
var data1 = []
d3.json("/barchart").then(function(data) {
  //code for plots goes here, where you have access to data
  Object.keys(data).forEach(function(key){
    var t_key = [];
    var t_val = [];
    Object.keys(key).forEach(function(k){
      t_key.push(k);
      t_val.push(key[k]);
    });
    var trace = {
      x: t_key,
      y: t_val,
      name: key,
      type: 'bar'
    };
    data1.push(trace);
  });

//var layout = {barmode: 'stack'};
var layout = {
  title: {
    text:'Count of Car Crash Severity',
    font: {
      family: 'Courier New, monospace',
      size: 24,
      barmode: 'stack'
    },
    xref: 'paper',
    x: 0.05,
  },
  xaxis: {
    title: {
      text: '',
      font: {
        family: 'Courier New, monospace',
        size: 24,
        color: '#7f7f7f'
      }
    },
  },
  yaxis: {
    title: {
      text: 'Number of Injuries',
      font: {
        family: 'Courier New, monospace',
        size: 24,
        color: '#7f7f7f'
      }
    }
  }
};
var bub = document.getElementById('bubble');
// Plot the chart to a div tag with id "plot"
Plotly.newPlot(bubble, data1, layout);
});
////////////////////////////////////////////////////
// Create the Traces
d3.json("/piechart1").then(function(data) {
  //code for plots goes here, where you have access to data
var trace1 = {
  values: data.map(row => row.weather),
  labels: ["Clear", "Cloudy", "Rain"],
  mode: "markers",
  type: "pie",
  name: "Weather Condition"
};
  // Plot the chart to a div tag with id "plot"
  Plotly.newPlot("plot", trace1, layout)}
);
//////////////////////////////////////////////////////////
// Create the Traces
d3.json("/piechart2").then(function(data) {

var trace2 = {
  values: data.map(row => row.light_cond),
  labels: ["Dark-Lighted Roadway", "Dark-Roadway Not Lighted", "Daylight", "Dusk", "Unknown"],
  mode: "markers",
  type: "pie",
  name: "Light Condition"
  };
   // Plot the chart to a div tag with id "plot"
   Plotly.newPlot("plot", trace2, layout)}
   );
 //////////////////////////////////////////////////////////
   // Create the Traces
d3.json("/piechart3").then(function(data) {
  //code for plots goes here, where you have access to data

  var trace3 = {
    values: data.map(row => row.bike_sex),
    labels: ["Female", "Male", "Unknown"],
    mode: "markers",
    type: "pie",
    name: "Gender of Biker"
  };
  Plotly.newPlot("plot", trace3, layout)}
   );

 ///////////////////////////////////////////////
d3.json("/piechart4").then(function(data) {  

var trace4 = {
    values: data.map(row => row.drvr_sex),
    labels: ["Female", "Male", "Unknown"],
    mode: "markers",
    type: "pie",
    name: "Sex of Driver"
  };

  // Define the plot layout
  var layout = {
    title: "Biker Crash Data",
    xaxis: { title: "######" },
    yaxis: { title: "#########" }
  };
  
  // Plot the chart to a div tag with id "plot"
  Plotly.newPlot("plot", trace4, layout)}
);