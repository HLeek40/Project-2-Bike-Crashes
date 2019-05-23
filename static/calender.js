// Annotated heatmap
//import plotly.graph_objs as go

//pull in the data from the database! 
d3.json("/heat").then(function(heatdata){
    console.log(heatdata)
    
    for(var i = 0; i < heatdata.length; i++){
        console.log(heatdata[i].crash_mont)
        console.log(heatdata[i].crashday)
    }
//drop down function to reference in html
function drop(month){
    var yMonth = month.value;
}

 var xLabels = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
 
 //This gives us a list of all the crashdays
var xValues = heatdata.map(hdata => hdata.crashday);
console.log(xValues);

//List of all the crash months 
var yValues = heatdata.map(hdata => hdata.crash_mont);
console.log(yValues);

var week = [];
//count up the number of each Weekday in the list and add that count to a master list 
var sun = 0;
var mon = 0;
var tues = 0;
var wed = 0;
var thurs = 0;
var fri = 0;
var sat = 0;
for (var j=0; j<xValues.length; j++){
    if(xValues[j]=="Sunday")
        sun++;
    if(xValues[j]=="Monday")
        mon++;
    if(xValues[j]=="Tuesday")
        tues++;
    if(xValues[j]=="Wednesday")
        wed++;
    if(xValues[j]=="Thursday")
        thurs++;
    if(xValues[j]=="Friday")
        fri++;
    if(xValues[j]=="Saturday")
        sat++;
}
week.push(sun);
week.push(mon);
week.push(tues);
week.push(wed);
week.push(thurs);
week.push(fri);
week.push(sat);
console.log(week);
console.log(heatdata);

var yV = [" ", " ", " ", " ", " ", " ", " "]

var data = [{
    x: xLabels,
    y: yV,
    z: week,
    type: 'heatmap',
    colorscale: 'Viridis',
    showscale: true
  }];

var layout = {
    title: 'Crashes each Weekday',
    annotations: [],
    xaxis: {
        ticks: '',
        side: 'top'
    },
    yaxis: {
        ticks: '',
        ticksuffix: '',
        width: 700,
        height: 700,
        autoosize: false
    }

};
console.log(data);
console.log(layout);


//Create the plot 
//my div is where the calendar goes in the html 
Plotly.newPlot('myDiv',data, layout)
});



