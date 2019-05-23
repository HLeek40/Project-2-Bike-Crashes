// Annotated heatmap


//pull in the data from the database! 
d3.json("/heat").then(function(heatdata){
    //console.log(heatdata)
    
    for(var i = 0; i < heatdata.length; i++){
        //console.log(heatdata[i].crash_mont)
        //console.log(heatdata[i].crashday)
    }

});


// var xValues = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

// var yValues = [''];

// // var zLabels = //call to the database 

// // var zValues = //call to the database 

// var colorscaleValue = [
//     [0, '#3D9970'],
//     [1, '#001f3f']
//   ];


// var data = [{
//     x: xValues,
//     y: yValues,
//     z: zValues,
//     type: 'heatmap',
//     colorscale: colorscaleValue,
//     showscale: true
//   }];

// var layout = {
//     title: 'Annotated Heatmap',
//     annotations: [],
//     xaxis: {
//         ticks: '',
//         side: 'top'
//     },
//     yaxis: {
//         ticks: '',
//         ticksuffix: '',
//         width: 700,
//         height: 700,
//         autoosize: false
//     }

// };

// //drop down function to reference in html
// function drop(month){
//     var value = month.value;
// }

// //Create the plot 
// //my div is where the calendar goes in the html 

// Plotly.newPlot('myDiv',data, layout)



