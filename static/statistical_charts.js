// Create the Traces
var data1 = []
var c_type = ['A: Disabling Injury','B: Evident Injury','C: Possible Injury','K: Killed','O: No Injury'];
d3.json("/barchart").then(function(data) {
  //code for plots goes here, where you have access to data
  Object.entries(data).forEach(key => {
    let nd = key[0];
    let ng = key[1];
    var t_key = [];
    var t_val = [];
    Object.entries(ng).forEach(k => {
      let ky = k[0];
      let kv = k[1];
      t_key.push(ky);
      t_val.push(kv);
    });

    var val_tmp = [];
    for(var i=0;i<c_type.length;i++){
      //console.log(c_type[i]);
      if(t_key.indexOf(c_type[i])){
        var ind = t_key.indexOf(c_type[i]);
        val_tmp.push(t_val[ind]);
        //console.log(t_val[ind]);
      }
      else{
        var ele = 0;
        val_tmp.push(ele);
      }
    }
    //console.log(val_tmp);
    var trace = {
      x: c_type,
      y: val_tmp,
      name: nd,
      type: 'bar'
    };
    data1.push(trace);
  });

var layout = {barmode: 'stack'};
var bub = document.getElementById('bubble');
// Plot the chart to a div tag with id "plot"
Plotly.newPlot(bub, data1, layout);
});
