var chartVars = "KoolOnLoadCallFunction=chartReadyHandler";

KoolChart.create("chart1", "chartHolder", chartVars, "100%", "100%");

function chartReadyHandler(id) {
  document.getElementById(id).setLayout(layoutStr);
  document.getElementById(id).setData(makeData());
  setTimeout(changeData, 3000);
}

var layoutStr =
  '<KoolChart backgroundColor="#FFFFFF"  borderStyle="none" fontFamily="Noto Sans">'
   +'<Options>'
    +'<Caption text="Changes data every 2 seconds"/>'
   +'</Options>'
   +'<WordCloudChart showDataTips="true">'
    +'<series>'
     +'<WordCloudSeries textField="text" weightField="weight">'
      +'<showDataEffect>'
       +'<SeriesInterpolate duration="1000"/>'
      +'</showDataEffect>'
      +'<fills>'
       +'<SolidColor color="#5586a4"/>'
       +'<SolidColor color="#40b2e6"/>'
       +'<SolidColor color="#ffa123"/>'
       +'<SolidColor color="#595c7b"/>'
       +'<SolidColor color="#ef8075"/>'
       +'<SolidColor color="#f8ba03"/>'
       +'<SolidColor color="#03b79a"/>'
       +'<SolidColor color="#a5d4e6"/>'
       +'<SolidColor color="#b79d7c"/>'
       +'<SolidColor color="#9e589e"/>'
      +'</fills>'
     +'</WordCloudSeries>'
    +'</series>'
   +'</WordCloudChart>'
  +'</KoolChart>';

function changeData(){
  document.getElementById("chart1").setData(makeData());
  setTimeout(changeData, 2000);
 }
console.log(wordcloud);
 function makeData(){
  var i, n,
   chartData = [],
   data = wordcloud;
  for(i = 0, n = data.length ; i < n ; i += 1){
   chartData.push({
    text : data[i],
    weight : Math.floor(Math.random(10) * 100)
   });
  }
  return chartData;
 };