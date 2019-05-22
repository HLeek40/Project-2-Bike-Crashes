// Create the Traces

d3.json("/charts").then(function(data) {
  //code for plots goes here, where you have access to data
var trace1 = {
  x: data.map(row => row.crash_sevri),
  mode: "markers",
  type: "bar",
  name: "Crash Severity" 
};

var trace2 = {
  x: data.map(row => row.weather),
  mode: "markers",
  type: "pie",
  name: "Weather Condition"
};

var trace3 = {
  x: data.map(row => row.light_cond),
  mode: "markers",
  type: "pie",
  name: "Light Condition"
  };


  var trace4 = {
    x: data.map(row => row.bike_sex),
    mode: "markers",
    type: "pie",
    name: "Gender of Biker"
  };

  var trace5 = {
    x: data.map(row => row.drvr_sex),
    mode: "markers",
    type: "pie",
    name: "Sex of Driver"
  };

// Create the data array for the plot


var data = [trace1, trace2, trace3, trace4, trace5];

// Define the plot layout
var layout = {
  title: "Biker Crash Data",
  xaxis: { title: "######" },
  yaxis: { title: "#########" }
};

// Plot the chart to a div tag with id "plot"
Plotly.newPlot("plot", data, layout);
});
