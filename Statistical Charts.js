// Create the Traces
var trace1 = {
  x: data.type_of_injury,
  y: data.years,
  mode: "markers",
  type: "bar",
  name: "Crash Serverity" 
};

var trace2 = {
  x: data.weather_condition,
  y: data.count,
  mode: "markers",
  type: "pie",
  name: "Weather Condition"
};

var trace3 = {
    x: data.light_condition,
    y: data.count,
    mode: "markers",
    type: "pie",
    name: "Light Condition"
  };


  var trace4 = {
    x: data.Biker_Sex,
    y: data.year,
    mode: "markers",
    type: "pie",
    name: "Gender of Biker"
  };

  var trace5 = {
    x: data.Driver_Sex,
    y: data.count,
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

