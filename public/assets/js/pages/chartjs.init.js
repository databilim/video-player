function randomNumber(e,a){return Math.random()*(a-e)+e}function randomBar(e,a){var t=randomNumber(.95*a,1.05*a),r=randomNumber(.95*t,1.05*t);return{t:e.valueOf(),y:r}}!function(e){"use strict";var a=function(){this.$body=e("body"),this.charts=[]};a.prototype.respChart=function(a,t,r,o){var n=a.get(0).getContext("2d"),i=e(a).parent();return function(){var l;switch(a.attr("width",e(i).width()),t){case"Line":l=new Chart(n,{type:"line",data:r,options:o});break;case"Doughnut":l=new Chart(n,{type:"doughnut",data:r,options:o});break;case"Pie":l=new Chart(n,{type:"pie",data:r,options:o});break;case"Bar":l=new Chart(n,{type:"bar",data:r,options:o});break;case"Radar":l=new Chart(n,{type:"radar",data:r,options:o});break;case"PolarArea":l=new Chart(n,{data:r,type:"polarArea",options:o})}return l}()},a.prototype.initCharts=function(){var a=[];if(e("#line-chart-example").length>0){a.push(this.respChart(e("#line-chart-example"),"Line",{labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],datasets:[{label:"Current Week",backgroundColor:"rgba(79, 198, 225, 0.3)",borderColor:"#4fc6e1",data:[32,42,42,62,52,75,62]},{label:"Previous Week",fill:!0,backgroundColor:"transparent",borderColor:"#7e57c2",borderDash:[5,5],data:[42,58,66,93,82,105,92]}]},{maintainAspectRatio:!1,legend:{display:!1},tooltips:{intersect:!1},hover:{intersect:!0},plugins:{filler:{propagate:!1}},scales:{xAxes:[{reverse:!0,gridLines:{color:"rgba(0,0,0,0.05)"}}],yAxes:[{ticks:{stepSize:20},display:!0,borderDash:[5,5],gridLines:{color:"rgba(0,0,0,0)",fontColor:"#fff"}}]}}))}if(e("#bar-chart-example").length>0){a.push(this.respChart(e("#bar-chart-example"),"Bar",{labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],datasets:[{label:"Sales Analytics",backgroundColor:"#7e57c2",borderColor:"#7e57c2",hoverBackgroundColor:"#7e57c2",hoverBorderColor:"#7e57c2",data:[65,59,80,81,56,89,40,32,65,59,80,81]},{label:"Dollar Rate",backgroundColor:"#e3eaef",borderColor:"#e3eaef",hoverBackgroundColor:"#e3eaef",hoverBorderColor:"#e3eaef",data:[89,40,32,65,59,80,81,56,89,40,65,59]}]},{maintainAspectRatio:!1,legend:{display:!1},scales:{yAxes:[{gridLines:{display:!1},stacked:!1,ticks:{stepSize:20}}],xAxes:[{barPercentage:.7,categoryPercentage:.5,stacked:!1,gridLines:{color:"rgba(0,0,0,0.01)"}}]}}))}if(e("#pie-chart-example").length>0){a.push(this.respChart(e("#pie-chart-example"),"Pie",{labels:["Direct","Affilliate","Sponsored","E-mail"],datasets:[{data:[300,135,48,154],backgroundColor:["#7e57c2","#fa5c7c","#4fc6e1","#ebeff2"],borderColor:"transparent"}]},{maintainAspectRatio:!1,legend:{display:!1}}))}if(e("#donut-chart-example").length>0){a.push(this.respChart(e("#donut-chart-example"),"Doughnut",{labels:["Direct","Affilliate","Sponsored"],datasets:[{data:[128,78,48],backgroundColor:["#4fc6e1","#7e57c2","#ebeff2"],borderColor:"transparent",borderWidth:"3"}]},{maintainAspectRatio:!1,cutoutPercentage:60,legend:{display:!1}}))}if(e("#polar-chart-example").length>0){a.push(this.respChart(e("#polar-chart-example"),"PolarArea",{labels:["Direct","Affilliate","Sponsored","E-mail"],datasets:[{data:[251,135,48,154],backgroundColor:["#7e57c2","#fa5c7c","#4fc6e1","#ebeff2"],borderColor:"transparent"}]}))}if(e("#radar-chart-example").length>0){a.push(this.respChart(e("#radar-chart-example"),"Radar",{labels:["Eating","Drinking","Sleeping","Designing","Coding","Cycling","Running"],datasets:[{label:"Desktops",backgroundColor:"rgba(57,175,209,0.2)",borderColor:"#39afd1",pointBackgroundColor:"#39afd1",pointBorderColor:"#fff",pointHoverBackgroundColor:"#fff",pointHoverBorderColor:"#39afd1",data:[65,59,90,81,56,55,40]},{label:"Tablets",backgroundColor:"rgba(161, 127, 224,0.2)",borderColor:"#a17fe0",pointBackgroundColor:"#a17fe0",pointBorderColor:"#fff",pointHoverBackgroundColor:"#fff",pointHoverBorderColor:"#a17fe0",data:[28,48,40,19,96,27,100]}]},{maintainAspectRatio:!1}))}return a},a.prototype.init=function(){var a=this;Chart.defaults.global.defaultFontFamily='-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',a.charts=this.initCharts(),e(window).on("resize",function(t){e.each(a.charts,function(e,a){try{a.destroy()}catch(e){}}),a.charts=a.initCharts()})},e.ChartJs=new a,e.ChartJs.Constructor=a}(window.jQuery),function(e){"use strict";e.ChartJs.init()}(window.jQuery);for(var dateFormat="MMMM DD YYYY",date=moment("April 01 2017",dateFormat),data=[randomBar(date,30)],labels=[date];data.length<24;)(date=date.clone().add(1,"d")).isoWeekday()<=5&&(data.push(randomBar(date,data[data.length-1].y)),labels.push(date));var ctx=document.getElementById("financial-report").getContext("2d");ctx.canvas.width=1e3,ctx.canvas.height=300;var cfg={type:"bar",data:{labels:labels,datasets:[{label:"CHRT - Chart.js Corporation",data:data,type:"line",pointRadius:0,fill:!1,lineTension:0,borderWidth:2}]},options:{scales:{xAxes:[{type:"time",distribution:"series",ticks:{source:"labels"}}],yAxes:[{scaleLabel:{display:!0,labelString:"Closing price ($)"}}]}}},chart=new Chart(ctx,cfg);document.getElementById("update").addEventListener("click",function(){var e=document.getElementById("type").value;chart.config.data.datasets[0].type=e,chart.update()});