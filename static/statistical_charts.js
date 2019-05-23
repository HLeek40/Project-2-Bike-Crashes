// Create the Traces
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

var layout = {barmode: 'stack'};
var bub = document.getElementById('bubble');
// Plot the chart to a div tag with id "plot"
Plotly.newPlot(bub, data1, layout);
});
