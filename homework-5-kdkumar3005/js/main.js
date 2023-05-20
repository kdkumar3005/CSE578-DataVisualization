var Year,Dogs_db, Flights_db, pie_svg, radius = 30;
margin = {top: 10, right: 10, bottom: 50, left: 50},
            width = 2048 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;
document.addEventListener('DOMContentLoaded',function(){
    Promise.all([d3.csv("data/Dogs-Database.csv"),d3.csv("data/Flights-Database.csv")]).then(function(values){
        Dogs_db  = values[0];
        Flights_db =values[1];
        Flights_db.forEach(d => {
            d.Date = new Date (d["Date"]);
            d.altitude  = +d["Altitude (km)"];
            d.Year = d.Date.getFullYear();
        });     
        console.log(Flights_db)         
        drawChart();
    })
})
    function drawChart()
    {
       
        console.log("lets do this");
//var data_alt = {altitude: Flights_db[0].altitude}
var data_alt1 = Flights_db.map(d=>[
    {'altitude':d.altitude}
])
  console.log(data_alt1)

  color = d3.scaleOrdinal().range(["#007FFF", "#2a8071", "#40E0D0"]);

  const pie = d3.pie()
    .value(d => d[1]);

   
  const data_ready = pie(Object.entries(data_alt1[0][0]));
  const data_ready_arc2 = pie(Object.entries(data_alt1[1][0]));

  pie_svg = d3.selectAll(".chart_svg")
  .append("g")
  .attr("transform", "translate(" + 65  + "," + 90 + ")");

  pie_svg_arc2 = d3.selectAll(".chart_svg")
  .append("g")
  .attr("transform", "translate(" + 65  + "," + 90 + ")");

  pie_svg_arc2.append('text')
  .style('fill', '#black')
  .style("font-size", "15px")
  .style("font-weight", "bold")
  .attr("transform", "translate(0," + -70 + ")")
  .attr("text-anchor", "middle")
  .html(Dogs_db[0]["Name (Latin)"]);

  pie_svg.append('image')
  .attr('xlink:href', 'https://www.clipartmax.com/png/small/8-82449_incredible-paw-clipart-free-orange-cat-pictures-download-dog-paw-print.png')
  .attr("width", "30px")
  .attr("height", "32px")
  .attr("transform", "translate(-20," + -15 + ")")
  .attr("preserveAspectRatio", "none");

    console.log(data_ready);
    pie_svg
    .selectAll('.donut')
    .data(data_ready)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13)         // This is the size of the donut hole
      .outerRadius(radius)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * 2/360)  
    )
    .attr('class','donut')
    .attr("fill", d => color(d.data[0]))
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)

      pie_svg_arc2
    .selectAll('.donut')
    .data(data_ready_arc2)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13+radius)         // This is the size of the donut hole
      .outerRadius(radius*2)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * 2/360)  
    )
    .attr('class','donut')
    .attr("fill", "Blue")
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)
//////////////////////////////////////////////////////////////////////


    pie_svg1 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 300  + "," + 90  + ")");
    
    pie_svg1.append('text')
          .style('fill', '#black')
          .style("font-size", "15px")
          .style("font-weight", "bold")
          .attr("transform", "translate(0," + 40 + ")")
          .attr("text-anchor", "middle")
          .html(Dogs_db[1]["Name (Latin)"]);
		  
    pie_svg1.append('image')
            .attr('xlink:href', 'https://www.clipartmax.com/png/small/48-483951_green-dog-paw-clip-art-bclipart-free-clipart-images-green-paw-print.png')
            .attr("width", "25px")
            .attr("height", "25px")
            .attr("transform", "translate(-15," + -10 + ")")
            .attr("preserveAspectRatio", "none");

    pie_svg1
    .selectAll('.donut')
    .data(data_ready)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13)         // This is the size of the donut hole
      .outerRadius(radius)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * 2/360)  
    )
    .attr('class','donut')
    .attr("fill", d => color(d.data[0]))
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)
      
      var line1 = d3.select(".chart_svg").append("g")

      line1.append('line')
      .attr("x1",130)
      .attr("y1",90)
      .attr("x2",275)
      .attr("y2",90)
      .style("stroke", "Black")
      .style("stroke-width", "5px")

          line1.append('text')
          .style('fill', '#black')
          .style("font-size", "23px")
          .style("font-weight", "bold")
          .attr("transform", "translate(195," + 115 + ")")
          .attr("text-anchor", "middle")
          .html(Flights_db[0]["Rocket"]);


///////////////////////////////////////////////////////////////////////////////////////
    const data_ready1 = pie(Object.entries(data_alt1[1][0]));

    pie_svg2 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 60  + "," + 270  + ")");
	
	pie_svg2.append('text')
          .style('fill', '#black')
          .style("font-size", "15px")
          .style("font-weight", "bold")
          .attr("transform", "translate(0," + 40 + ")")
          .attr("text-anchor", "middle")
          .html(Dogs_db[2]["Name (Latin)"]);
		  
     pie_svg2.append('image')
  .attr('xlink:href', 'https://www.clipartmax.com/png/small/8-82449_incredible-paw-clipart-free-orange-cat-pictures-download-dog-paw-print.png')
  .attr("width", "30px")
  .attr("height", "32px")
  .attr("transform", "translate(-20," + -15 + ")")
  .attr("preserveAspectRatio", "none");
			
    pie_svg2
    .selectAll('.donut')
    .data(data_ready1)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13)         // This is the size of the donut hole
      .outerRadius(radius)
	  .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * 2/360) 
    )
    .attr('class','donut')
    .attr("fill", "#f94449")
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)
    
	var line2 = d3.select(".chart_svg").append("g")

      line2.append('line')
      .attr("x1",50)
      .attr("y1",120)
      .attr("x2",60)
      .attr("y2",225)
      .style("stroke", "Black")
      .style("stroke-width", "5px")

          line2.append('text')
          .style('fill', '#black')
          .style("font-size", "23px")
          .style("font-weight", "bold")
          .attr("transform", "translate(25," + 200 + ")")
          .attr("text-anchor", "middle")
          .html(Flights_db[1]["Rocket"]);


//////////////////////////////////////////////////////////////////////////////////////////////////
const data_ready2 = pie(Object.entries(data_alt1[2][0]));
const data_ready4 = pie(Object.entries(data_alt1[4][0]));
    pie_svg3 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 80  + "," + 450  + ")");

    pie_svg3_arc2 = d3.selectAll(".chart_svg")
  .append("g")
  .attr("transform", "translate(" + 80  + "," + 450 + ")");

  pie_svg3_arc2.append('text')
  .style('fill', '#black')
  .style("font-size", "15px")
  .style("font-weight", "bold")
  .attr("transform", "translate(0," + -70 + ")")
  .attr("text-anchor", "middle")
  .html(Dogs_db[3]["Name (Latin)"]);

  pie_svg3.append('image')
  .attr('xlink:href', 'https://www.clipartmax.com/png/small/8-82449_incredible-paw-clipart-free-orange-cat-pictures-download-dog-paw-print.png')
  .attr("width", "30px")
  .attr("height", "32px")
  .attr("transform", "translate(-20," + -15 + ")")
  .attr("preserveAspectRatio", "none");

    pie_svg3
    .selectAll('.donut')
    .data(data_ready2)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13)         // This is the size of the donut hole
      .outerRadius(radius)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * 2/360)
    )
    .attr('class','donut')
    .attr("fill", d => color(d.data[0]))
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)
    
    pie_svg3_arc2
    .selectAll('.donut')
    .data(data_ready4)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13+radius)         // This is the size of the donut hole
      .outerRadius(radius*2)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * 2/360)  
    )
    .attr('class','donut')
    .attr("fill", "Blue")
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)
//////////////////////////////////////////////////////////////////////////////////////////



pie_svg4 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 300  + "," + 450  + ")");

    pie_svg4_arc2 = d3.selectAll(".chart_svg")
  .append("g")
  .attr("transform", "translate(" + 300  + "," + 450 + ")");

  pie_svg4_arc2.append('text')
  .style('fill', '#black')
  .style("font-size", "15px")
  .style("font-weight", "bold")
  .attr("transform", "translate(0," + -70 + ")")
  .attr("text-anchor", "middle")
  .html(Dogs_db[4]["Name (Latin)"]);

  pie_svg4.append('image')
  .attr('xlink:href', 'https://www.clipartmax.com/png/small/8-82449_incredible-paw-clipart-free-orange-cat-pictures-download-dog-paw-print.png')
  .attr("width", "30px")
  .attr("height", "32px")
  .attr("transform", "translate(-20," + -15 + ")")
  .attr("preserveAspectRatio", "none");

    pie_svg4
    .selectAll('.donut')
    .data(data_ready2)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13)         // This is the size of the donut hole
      .outerRadius(radius)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * 2/360) 
    )
    .attr('class','donut')
    .attr("fill", d => color(d.data[0]))
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)
    
    pie_svg4_arc2
    .selectAll('.donut')
    .data(data_ready4)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13+radius)         // This is the size of the donut hole
      .outerRadius(radius*2)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * 2/360)  
    )
    .attr('class','donut')
    .attr("fill", "Blue")
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)
  
    var line3 = d3.select(".chart_svg").append("g")

      line3.append('line')
      .attr("x1",150)
      .attr("y1",450)
      .attr("x2",275)
      .attr("y2",450)
      .style("stroke", "Black")
      .style("stroke-width", "5px")

    //   line3.append('line')
    //   .attr("x1",150)
    //   .attr("y1",430)
    //   .attr("x2",275)
    //   .attr("y2",430)
    //   .style("stroke", "Black")
    //   .style("stroke-width", "5px")

          line3.append('text')
          .style('fill', '#black')
          .style("font-size", "23px")
          .style("font-weight", "bold")
          .attr("transform", "translate(205," + 475 + ")")
          .attr("text-anchor", "middle")
          .html(Flights_db[2]["Rocket"]);



  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const data_ready3 = pie(Object.entries(data_alt1[3][0]));

    pie_svg5 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 200  + "," + 200  + ")");

    pie_svg5.append('text')
  .style('fill', '#black')
  .style("font-size", "15px")
  .style("font-weight", "bold")
  .attr("transform", "translate(0," + -40 + ")")
  .attr("text-anchor", "middle")
  .html(Dogs_db[5]["Name (Latin)"]);
  
  pie_svg5.append('image')
            .attr('xlink:href', 'https://www.clipartmax.com/png/small/48-483951_green-dog-paw-clip-art-bclipart-free-clipart-images-green-paw-print.png')
            .attr("width", "25px")
            .attr("height", "25px")
            .attr("transform", "translate(-15," + -10 + ")")
            .attr("preserveAspectRatio", "none");

    pie_svg5
    .selectAll('.donut')
    .data(data_ready3)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13)         // This is the size of the donut hole
      .outerRadius(radius)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * 2/360)  
    )
    .attr('class','donut')
    .attr("fill", d => color(d.data[0]))
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)
    
//////////////////////////////////////////////////////////////////////////////////

   

    pie_svg6 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 275  + "," + 300  + ")");

    pie_svg6.append('text')
    .style('fill', '#black')
    .style("font-size", "15px")
    .style("font-weight", "bold")
    .attr("transform", "translate(0," + -40 + ")")
    .attr("text-anchor", "middle")
    .html(Dogs_db[6]["Name (Latin)"]);
    
    pie_svg6.append('image')
              .attr('xlink:href', 'https://www.clipartmax.com/png/small/48-483951_green-dog-paw-clip-art-bclipart-free-clipart-images-green-paw-print.png')
              .attr("width", "25px")
              .attr("height", "25px")
              .attr("transform", "translate(-15," + -10 + ")")
              .attr("preserveAspectRatio", "none");

    pie_svg6
    .selectAll('.donut')
    .data(data_ready3)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13)         // This is the size of the donut hole
      .outerRadius(radius)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * 2/360)  
    )
    .attr('class','donut')
    .attr("fill", d => color(d.data[0]))
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)

      var line4 = d3.select(".chart_svg").append("g")

      line4.append('line')
      .attr("x1",190)
      .attr("y1",220)
      .attr("x2",255)
      .attr("y2",300)
      .style("stroke", "Black")
      .style("stroke-width", "5px")

          line4.append('text')
          .style('fill', '#black')
          .style("font-size", "23px")
          .style("font-weight", "bold")
          .attr("transform", "translate(190," + 275 + ")")
          .attr("text-anchor", "middle")
          .html(Flights_db[3]["Rocket"]);


///////////////////////////////////////////////////////////////////////////////////////////////////////////

const data_ready5 = pie(Object.entries(data_alt1[5][0]));

    pie_svg7 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 480 + "," + 220  + ")");

    pie_svg7.append('text')
    .style('fill', '#black')
    .style("font-size", "15px")
    .style("font-weight", "bold")
    .attr("transform", "translate(0," + -40 + ")")
    .attr("text-anchor", "middle")
    .html(Dogs_db[7]["Name (Latin)"]);
    
    pie_svg7.append('image')
              .attr('xlink:href', 'https://www.clipartmax.com/png/small/48-483951_green-dog-paw-clip-art-bclipart-free-clipart-images-green-paw-print.png')
              .attr("width", "25px")
              .attr("height", "25px")
              .attr("transform", "translate(-15," + -10 + ")")
              .attr("preserveAspectRatio", "none");

    pie_svg7
    .selectAll('.donut')
    .data(data_ready5)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13)         // This is the size of the donut hole
      .outerRadius(radius)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * 2/360)  
    )
    .attr('class','donut')
    .attr("fill", d => color(d.data[0]))
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)
    

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
pie_svg8 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 400  + "," + 100  + ")");

    pie_svg8.append('text')
    .style('fill', '#black')
    .style("font-size", "15px")
    .style("font-weight", "bold")
    .attr("transform", "translate(0," + -40 + ")")
    .attr("text-anchor", "middle")
    .html(Dogs_db[8]["Name (Latin)"]);
    
    pie_svg8.append('image')
              .attr('xlink:href', 'https://www.clipartmax.com/png/small/48-483951_green-dog-paw-clip-art-bclipart-free-clipart-images-green-paw-print.png')
              .attr("width", "25px")
              .attr("height", "25px")
              .attr("transform", "translate(-15," + -10 + ")")
              .attr("preserveAspectRatio", "none");

              pie_svg8
    .selectAll('.donut')
    .data(data_ready5)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13)         // This is the size of the donut hole
      .outerRadius(radius)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * 2/360)  
    )
    .attr('class','donut')
    .attr("fill", d => color(d.data[0]))
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)

      var line5 = d3.select(".chart_svg").append("g")

      line5.append('line')
      .attr("x1",400)
      .attr("y1",120)
      .attr("x2",450)
      .attr("y2",200)
      .style("stroke", "Black")
      .style("stroke-width", "5px")

      line5.append('text')
          .style('fill', '#black')
          .style("font-size", "23px")
          .style("font-weight", "bold")
          .attr("transform", "translate(375," + 175 + ")")
          .attr("text-anchor", "middle")
          .html(Flights_db[5]["Rocket"]);

   
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const data_ready6 = pie(Object.entries(data_alt1[6][0]));
const data_ready11 = pie(Object.entries(data_alt1[11][0]));

    pie_svg9 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 600 + "," + 350  + ")");
  
    pie_svg9_arc2 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 600  + "," + 350 + ")");
  
    pie_svg9_arc2.append('text')
    .style('fill', '#black')
    .style("font-size", "15px")
    .style("font-weight", "bold")
    .attr("transform", "translate(0," + -70 + ")")
    .attr("text-anchor", "middle")
    .html(Dogs_db[9]["Name (Latin)"]);
    
    pie_svg9.append('image')
              .attr('xlink:href', 'https://www.clipartmax.com/png/small/8-82449_incredible-paw-clipart-free-orange-cat-pictures-download-dog-paw-print.png')
              .attr("width", "25px")
              .attr("height", "25px")
              .attr("transform", "translate(-15," + -10 + ")")
              .attr("preserveAspectRatio", "none");

    pie_svg9
    .selectAll('.donut')
    .data(data_ready6)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13)         // This is the size of the donut hole
      .outerRadius(radius)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * 2/360)  
    )
    .attr('class','donut')
    .attr("fill", "#f94449")
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)
    pie_svg9_arc2
    .selectAll('.donut')
    .data(data_ready11)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13+radius)         // This is the size of the donut hole
      .outerRadius(radius*2)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * 2/360)  
    )
    .attr('class','donut')
    .attr("fill", "#de0a26")
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const data_ready8 = pie(Object.entries(data_alt1[8][0]));

pie_svg10 = d3.selectAll(".chart_svg")
.append("g")
.attr("transform", "translate(" + 475  + "," + 450  + ")");

pie_svg10_arc2 = d3.selectAll(".chart_svg")
.append("g")
.attr("transform", "translate(" + 475  + "," + 450 + ")");

pie_svg10_arc2.append('text')
.style('fill', '#black')
.style("font-size", "15px")
.style("font-weight", "bold")
.attr("transform", "translate(0," + -70 + ")")
.attr("text-anchor", "middle")
.html(Dogs_db[10]["Name (Latin)"]);

pie_svg10.append('image')
.attr('xlink:href', 'https://www.clipartmax.com/png/small/8-82449_incredible-paw-clipart-free-orange-cat-pictures-download-dog-paw-print.png')
.attr("width", "30px")
.attr("height", "32px")
.attr("transform", "translate(-10," + -15 + ")")
.attr("preserveAspectRatio", "none");

pie_svg10
.selectAll('.donut')
.data(data_ready6)
.enter()
.append("path")
.attr("d", d3.arc()
  .innerRadius(13)         // This is the size of the donut hole
  .outerRadius(radius)
  .startAngle(0*Math.PI * 2/360) //100
  .endAngle(150*Math.PI * -2/360) 
)
.attr('class','donut')
.attr("fill", d => color(d.data[0]))
.attr("stroke", "black")
.style("stroke-width", "1px")
.style("opacity", 1)

pie_svg10_arc2
.selectAll('.donut')
.data(data_ready8)
.enter()
.append("path")
.attr("d", d3.arc()
  .innerRadius(13+radius)         // This is the size of the donut hole
  .outerRadius(radius*2)
  .startAngle(0*Math.PI * 2/360) //100
  .endAngle(150*Math.PI * -2/360)  
)
.attr('class','donut')
.attr("fill", "Blue")
.attr("stroke", "black")
.style("stroke-width", "1px")
.style("opacity", 1)

var line6 = d3.select(".chart_svg").append("g")

  line6.append('line')
  .attr("x1",580)
  .attr("y1",360)
  .attr("x2",495)
  .attr("y2",460)
  .style("stroke", "Black")
  .style("stroke-width", "5px")

      line6.append('text')
      .style('fill', '#black')
      .style("font-size", "23px")
      .style("font-weight", "bold")
      .attr("transform", "translate(570," + 430 + ")")
      .attr("text-anchor", "middle")
      .html(Flights_db[7]["Rocket"]);

 ////////////////////////////////////////////////////////////////////////////////////// 

 const data_ready7 = pie(Object.entries(data_alt1[7][0]));


    pie_svg11 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 600 + "," + 550  + ")");
  
    pie_svg11_arc2 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 600  + "," + 550 + ")");
  
    pie_svg11_arc2.append('text')
    .style('fill', '#black')
    .style("font-size", "15px")
    .style("font-weight", "bold")
    .attr("transform", "translate(0," + -70 + ")")
    .attr("text-anchor", "middle")
    .html(Dogs_db[11]["Name (Latin)"]);
    
    pie_svg11.append('image')
              .attr('xlink:href', 'https://www.clipartmax.com/png/small/48-483951_green-dog-paw-clip-art-bclipart-free-clipart-images-green-paw-print.png')
              .attr("width", "25px")
              .attr("height", "25px")
              .attr("transform", "translate(-15," + -10 + ")")
              .attr("preserveAspectRatio", "none");

              pie_svg11
    .selectAll('.donut')
    .data(data_ready7)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13)         // This is the size of the donut hole
      .outerRadius(radius)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * 2/360)  
    )
    .attr('class','donut')
    .attr("fill", "#f94449")
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)
    pie_svg11_arc2
    .selectAll('.donut')
    .data(data_ready8)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13+radius)         // This is the size of the donut hole
      .outerRadius(radius*2)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * 2/360)  
    )
    .attr('class','donut')
    .attr("fill", "#de0a26")
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)

    var line7 = d3.select(".chart_svg").append("g")

    line7.append('line')
  .attr("x1",580)
  .attr("y1",550)
  .attr("x2",495)
  .attr("y2",460)
  .style("stroke", "Black")
  .style("stroke-width", "5px")

  line7.append('text')
      .style('fill', '#black')
      .style("font-size", "23px")
      .style("font-weight", "bold")
      .attr("transform", "translate(500," + 525 + ")")
      .attr("text-anchor", "middle")
      .html(Flights_db[8]["Rocket"]);

      ///////////////////////////////////////////////////////////////////////////////////////

      
    pie_svg12 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 780  + "," + 430  + ")");

    pie_svg12.append('text')
    .style('fill', '#black')
    .style("font-size", "15px")
    .style("font-weight", "bold")
    .attr("transform", "translate(0," + -40 + ")")
    .attr("text-anchor", "middle")
    .html(Dogs_db[12]["Name (Latin)"]);
    
    pie_svg12.append('image')
              .attr('xlink:href', 'https://www.clipartmax.com/png/small/8-82449_incredible-paw-clipart-free-orange-cat-pictures-download-dog-paw-print.png')
              .attr("width", "25px")
              .attr("height", "25px")
              .attr("transform", "translate(-15," + -10 + ")")
              .attr("preserveAspectRatio", "none");

    pie_svg12
    .selectAll('.donut')
    .data(data_ready3)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13)         // This is the size of the donut hole
      .outerRadius(radius)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * 2/360)  
    )
    .attr('class','donut')
    .attr("fill", d => color(d.data[0]))
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)

      var line8 = d3.select(".chart_svg").append("g")

      line8.append('line')
      .attr("x1",770)
      .attr("y1",450)
      .attr("x2",660)
      .attr("y2",520)
      .style("stroke", "Black")
      .style("stroke-width", "5px")

          line8.append('text')
          .style('fill', '#black')
          .style("font-size", "23px")
          .style("font-weight", "bold")
          .attr("transform", "translate(750," + 520 + ")")
          .attr("text-anchor", "middle")
          .html(Flights_db[8]["Rocket"]);
///////////////////////////////////////////////////////////////////////////////////////
const data_ready10 = pie(Object.entries(data_alt1[10][0]));

    pie_svg13 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 600 + "," + 100  + ")");

    pie_svg13.append('text')
    .style('fill', '#black')
    .style("font-size", "15px")
    .style("font-weight", "bold")
    .attr("transform", "translate(0," + -40 + ")")
    .attr("text-anchor", "middle")
    .html(Dogs_db[14]["Name (Latin)"]);
    
    pie_svg13.append('image')
    .attr('xlink:href', 'https://www.clipartmax.com/png/small/8-82449_incredible-paw-clipart-free-orange-cat-pictures-download-dog-paw-print.png')
              .attr("width", "25px")
              .attr("height", "25px")
              .attr("transform", "translate(-15," + -10 + ")")
              .attr("preserveAspectRatio", "none");

    pie_svg13
    .selectAll('.donut')
    .data(data_ready10)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13)         // This is the size of the donut hole
      .outerRadius(radius)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * 2/360)  
    )
    .attr('class','donut')
    .attr("fill", "#f94449")
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    pie_svg14 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 750 + "," + 120  + ")");
  
    pie_svg14_arc2 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 750  + "," + 120 + ")");
  
    pie_svg14_arc2.append('text')
    .style('fill',       '#black')
    .style("font-size", "15px")
    .style("font-weight", "bold")
    .attr("transform", "translate(0," + -70 + ")")
    .attr("text-anchor", "middle")
    .html(Dogs_db[15]["Name (Latin)"]);
    
    pie_svg14.append('image')
              .attr('xlink:href', 'https://www.clipartmax.com/png/small/48-483951_green-dog-paw-clip-art-bclipart-free-clipart-images-green-paw-print.png')
              .attr("width", "25px")
              .attr("height", "25px")
              .attr("transform", "translate(-15," + -10 + ")")
              .attr("preserveAspectRatio", "none");

              pie_svg14
    .selectAll('.donut')
    .data(data_ready7)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13)         // This is the size of the donut hole
      .outerRadius(radius)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * 2/360)  
    )
    .attr('class','donut')
    .attr("fill", "#f94449")
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)
    pie_svg14_arc2
    .selectAll('.donut')
    .data(data_ready8)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13+radius)         // This is the size of the donut hole
      .outerRadius(radius*2)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * 2/360)  
    )
    .attr('class','donut')
    .attr("fill", "#de0a26")
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)

    var line9 = d3.select(".chart_svg").append("g")

    line9.append('line')
  .attr("x1",730)
  .attr("y1",120)
  .attr("x2",630)
  .attr("y2",110)
  .style("stroke", "Black")
  .style("stroke-width", "5px")

  line9.append('text')
      .style('fill', '#black')
      .style("font-size", "23px")
      .style("font-weight", "bold")
      .attr("transform", "translate(680," + 105 + ")")
      .attr("text-anchor", "middle")
      .html(Flights_db[11]["Rocket"]);

      var line13 = d3.select(".chart_svg").append("g")

      line13.append('line')
  .attr("x1",800)
  .attr("y1",150)
  .attr("x2",850)
  .attr("y2",220)
  .style("stroke", "Black")
  .style("stroke-width", "5px")
  line13.append('text')
      .style('fill', '#black')
      .style("font-size", "23px")
      .style("font-weight", "bold")
      .attr("transform", "translate(850," + 180 + ")")
      .attr("text-anchor", "middle")
      .html(Flights_db[11]["Rocket"]);
////////////////////////////////////////////////////////////////////////////////////////////////////////////

pie_svg15 = d3.selectAll(".chart_svg")
.append("g")
.attr("transform", "translate(" + 770 + "," + 270  + ")");

pie_svg15.append('text')
.style('fill', '#black')
.style("font-size", "15px")
.style("font-weight", "bold")
.attr("transform", "translate(0," + -40 + ")")
.attr("text-anchor", "middle")
.html(Dogs_db[16]["Name (Latin)"]);

pie_svg15.append('image')
.attr('xlink:href', 'https://www.clipartmax.com/png/small/8-82449_incredible-paw-clipart-free-orange-cat-pictures-download-dog-paw-print.png')
          .attr("width", "25px")
          .attr("height", "25px")
          .attr("transform", "translate(-15," + -10 + ")")
          .attr("preserveAspectRatio", "none");

pie_svg15
.selectAll('.donut')
.data(data_ready10)
.enter()
.append("path")
.attr("d", d3.arc()
  .innerRadius(13)         // This is the size of the donut hole
  .outerRadius(radius)
  .startAngle(0*Math.PI * 2/360) //100
  .endAngle(150*Math.PI * 2/360)  
)
.attr('class','donut')
.attr("fill", "#f94449")
.attr("stroke", "black")
.style("stroke-width", "1px")
.style("opacity", 1)

var line10 = d3.select(".chart_svg").append("g")

line10.append('line')
  .attr("x1",750)
  .attr("y1",270)
  .attr("x2",660)
  .attr("y2",330)
  .style("stroke", "Black")
  .style("stroke-width", "5px")

  line10.append('text')
      .style('fill', '#black')
      .style("font-size", "23px")
      .style("font-weight", "bold")
      .attr("transform", "translate(690," + 290 + ")")
      .attr("text-anchor", "middle")
      .html(Flights_db[12]["Rocket"]);
////////////////////////////////////////////////////////////////////////////////////

pie_svg15 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 1000 + "," + 120  + ")");
  
    pie_svg15_arc2 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 1000  + "," + 120 + ")");
  
    pie_svg15_arc2.append('text')
    .style('fill',       '#black')
    .style("font-size", "15px")
    .style("font-weight", "bold")
    .attr("transform", "translate(0," + -70 + ")")
    .attr("text-anchor", "middle")
    .html(Dogs_db[17]["Name (Latin)"]);
    
    pie_svg15.append('image')
    .attr('xlink:href', 'https://www.clipartmax.com/png/small/8-82449_incredible-paw-clipart-free-orange-cat-pictures-download-dog-paw-print.png')
              .attr("width", "25px")
              .attr("height", "25px")
              .attr("transform", "translate(-15," + -10 + ")")
              .attr("preserveAspectRatio", "none");

              pie_svg15
    .selectAll('.donut')
    .data(data_ready7)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13)         // This is the size of the donut hole
      .outerRadius(radius)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * 2/360)  
    )
    .attr('class','donut')
    .attr("fill", "#f94449")
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)
    pie_svg15_arc2
    .selectAll('.donut')
    .data(data_ready8)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13+radius)         // This is the size of the donut hole
      .outerRadius(radius*2)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * 2/360)  
    )
    .attr('class','donut')
    .attr("fill", "#de0a26")
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)

    ////////////////////////////////////////////////////////////////////////////////////////////////

    pie_svg16 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 900 + "," + 270  + ")");
  
    pie_svg16_arc2 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 900  + "," + 270 + ")");
  
    pie_svg16_arc2.append('text')
    .style('fill',       '#black')
    .style("font-size", "15px")
    .style("font-weight", "bold")
    .attr("transform", "translate(0," + -70 + ")")
    .attr("text-anchor", "middle")
    .html(Dogs_db[18]["Name (Latin)"]);
    
    pie_svg16.append('image')
              .attr('xlink:href', 'https://www.clipartmax.com/png/small/48-483951_green-dog-paw-clip-art-bclipart-free-clipart-images-green-paw-print.png')
              .attr("width", "25px")
              .attr("height", "25px")
              .attr("transform", "translate(-10 ," + -10 + ")")
              .attr("preserveAspectRatio", "none");

              pie_svg16
    .selectAll('.donut')
    .data(data_ready7)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13)         // This is the size of the donut hole
      .outerRadius(radius)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * -2/360)  
    )
    .attr('class','donut')
    .attr("fill", "#f94449")
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)
    pie_svg16_arc2
    .selectAll('.donut')
    .data(data_ready8)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13+radius)         // This is the size of the donut hole
      .outerRadius(radius*2)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * -2/360)  
    )
    .attr('class','donut')
    .attr("fill", "#de0a26")
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)

    var line11 = d3.select(".chart_svg").append("g")

    line11.append('line')
  .attr("x1",920)
  .attr("y1",220)
  .attr("x2",980)
  .attr("y2",140)
  .style("stroke", "Black")
  .style("stroke-width", "5px")

  line11.append('text')
      .style('fill', '#black')
      .style("font-size", "23px")
      .style("font-weight", "bold")
      .attr("transform", "translate(980," + 200 + ")")
      .attr("text-anchor", "middle")
      .html(Flights_db[12]["Rocket"]);
      //////////////////////////////////////////////////////////////////////////////////////////////
      pie_svg17 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 1000 + "," + 520  + ")");
  
    pie_svg17_arc2 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 1000  + "," + 520 + ")");

    pie_svg17_arc3 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 1000  + "," + 520 + ")");
  
    pie_svg17_arc3.append('text')
    .style('fill',       '#black')
    .style("font-size", "15px")
    .style("font-weight", "bold")
    .attr("transform", "translate(0," + -100 + ")")
    .attr("text-anchor", "middle")
    .html(Dogs_db[19]["Name (Latin)"]);
    
    pie_svg17.append('image')
    .attr('xlink:href', 'https://www.clipartmax.com/png/small/48-483951_green-dog-paw-clip-art-bclipart-free-clipart-images-green-paw-print.png')
              .attr("width", "25px")
              .attr("height", "25px")
              .attr("transform", "translate(-10," + -15 + ")")
              .attr("preserveAspectRatio", "none");

              pie_svg17
    .selectAll('.donut')
    .data(data_ready7)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13)         // This is the size of the donut hole
      .outerRadius(radius)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * -2/360)  
    )
    .attr('class','donut')
    .attr("fill", "#f94449")
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)
    pie_svg17_arc2
    .selectAll('.donut')
    .data(data_ready8)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13+radius)         // This is the size of the donut hole
      .outerRadius(radius*2)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * -2/360)  
    )
    .attr('class','donut')
    .attr("fill", "#de0a26")
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)

    pie_svg17_arc3
    .selectAll('.donut')
    .data(data_ready8)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(42+radius)         // This is the size of the donut hole
      .outerRadius(radius*3)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * -2/360)  
    )
    .attr('class','donut')
    .attr("fill", "#c30010")
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)

    ////////////////////////////////////////////////////////////////////////////////////////////////

    pie_svg18 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 1200 + "," + 500  + ")");
  
    pie_svg18_arc2 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 1200  + "," + 500 + ")");

    pie_svg18_arc3 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 1200  + "," + 500 + ")");
  
    pie_svg18_arc3.append('text')
    .style('fill',       '#black')
    .style("font-size", "15px")
    .style("font-weight", "bold")
    .attr("transform", "translate(0," + -100 + ")")
    .attr("text-anchor", "middle")
    .html(Dogs_db[20]["Name (Latin)"]);
    
    pie_svg18.append('image')
              .attr('xlink:href', 'https://www.clipartmax.com/png/small/48-483951_green-dog-paw-clip-art-bclipart-free-clipart-images-green-paw-print.png')
              .attr("width", "25px")
              .attr("height", "25px")
              .attr("transform", "translate(-15 ," + -10 + ")")
              .attr("preserveAspectRatio", "none");

              pie_svg18
    .selectAll('.donut')
    .data(data_ready7)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13)         // This is the size of the donut hole
      .outerRadius(radius)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * 2/360)  
    )
    .attr('class','donut')
    .attr("fill", "#f94449")
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)
    pie_svg18_arc2
    .selectAll('.donut')
    .data(data_ready8)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13+radius)         // This is the size of the donut hole
      .outerRadius(radius*2)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * 2/360)  
    )
    .attr('class','donut')
    .attr("fill", "#de0a26")
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)

    pie_svg18_arc3
    .selectAll('.donut')
    .data(data_ready8)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(42+radius)         // This is the size of the donut hole
      .outerRadius(radius*3)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(150*Math.PI * 2/360)  
    )
    .attr('class','donut')
    .attr("fill", "#c30010")
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)

    var line12 = d3.select(".chart_svg").append("g")

    line12.append('line')
  .attr("x1",1180)
  .attr("y1",500)
  .attr("x2",1020)
  .attr("y2",520)
  .style("stroke", "Black")
  .style("stroke-width", "5px")

  line12.append('text')
      .style('fill', '#black')
      .style("font-size", "23px")
      .style("font-weight", "bold")
      .attr("transform", "translate(1100," + 500 + ")")
      .attr("text-anchor", "middle")
      .html(Flights_db[12]["Rocket"]);
      ////////////////////////////////////////////////////////////////////////////////////
      const data_ready12 = pie(Object.entries(data_alt1[17][0]));

      pie_svg19 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 1000 + "," + 330  + ")");
  
    pie_svg19_arc2 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 1000  + "," + 330 + ")");
  
    pie_svg19_arc2.append('text')
    .style('fill',       '#black')
    .style("font-size", "15px")
    .style("font-weight", "bold")
    .attr("transform", "translate(0," + -70 + ")")
    .attr("text-anchor", "middle")
    .html(Dogs_db[21]["Name (Latin)"]);
    
    pie_svg19.append('image')
              .attr('xlink:href', 'https://www.clipartmax.com/png/small/48-483951_green-dog-paw-clip-art-bclipart-free-clipart-images-green-paw-print.png')
              .attr("width", "22px")
              .attr("height", "22px")
              .attr("transform", "translate(-10 ," + -10 + ")")
              .attr("preserveAspectRatio", "none");

              pie_svg19
    .selectAll('.donut')
    .data(data_ready12)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13)         // This is the size of the donut hole
      .outerRadius(radius)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(220*Math.PI * -2/360)  
    )
    .attr('class','donut')
    .attr("fill", "#f94449")
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)
    pie_svg19_arc2
    .selectAll('.donut')
    .data(data_ready12)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13+radius)         // This is the size of the donut hole
      .outerRadius(radius*2)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(220*Math.PI * -2/360)  
    )
    .attr('class','donut')
    .attr("fill", "#de0a26")
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)

    var line14 = d3.select(".chart_svg").append("g")

    line14.append('line')
  .attr("x1",1015)
  .attr("y1",330)
  .attr("x2",1140)
  .attr("y2",190)
  .style("stroke", "Black")
  .style("stroke-width", "5px")

  line14.append('text')
      .style('fill', '#black')
      .style("font-size", "23px")
      .style("font-weight", "bold")
      .attr("transform", "translate(1070," + 240 + ")")
      .attr("text-anchor", "middle")
      .html(Flights_db[19]["Rocket"]);

      ///////////////////////////////////////////////////////////////////////////////////////////////////////////
      

      pie_svg20 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 1200 + "," + 150  + ")");
  
    pie_svg20_arc2 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 1200  + "," + 150 + ")");
  
    pie_svg20_arc2.append('text')
    .style('fill',       '#black')
    .style("font-size", "15px")
    .style("font-weight", "bold")
    .attr("transform", "translate(0," + -70 + ")")
    .attr("text-anchor", "middle")
    .html(Dogs_db[23]["Name (Latin)"]);
    
    pie_svg20.append('image')
    .attr('xlink:href', 'https://www.clipartmax.com/png/small/8-82449_incredible-paw-clipart-free-orange-cat-pictures-download-dog-paw-print.png')
              .attr("width", "22px")
              .attr("height", "22px")
              .attr("transform", "translate(-10 ," + -10 + ")")
              .attr("preserveAspectRatio", "none");

              pie_svg20
    .selectAll('.donut')
    .data(data_ready12)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13)         // This is the size of the donut hole
      .outerRadius(radius)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(220*Math.PI * -2/360)  
    )
    .attr('class','donut')
    .attr("fill", "#f94449")
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)
    pie_svg20_arc2
    .selectAll('.donut')
    .data(data_ready12)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13+radius)         // This is the size of the donut hole
      .outerRadius(radius*2)
      .startAngle(0*Math.PI * 2/360) 
      .endAngle(220*Math.PI * -2/360)  
    )
    .attr('class','donut')
    .attr("fill", "#de0a26")
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)

    var line15 = d3.select(".chart_svg").append("g")

    line15.append('line')
  .attr("x1",1220)
  .attr("y1",150)
  .attr("x2",1370)
  .attr("y2",100)
  .style("stroke", "Black")
  .style("stroke-width", "5px")

  line15.append('text')
      .style('fill', '#black')
      .style("font-size", "23px")
      .style("font-weight", "bold")
      .attr("transform", "translate(1290," + 160 + ")")
      .attr("text-anchor", "middle")
      .html(Flights_db[19]["Rocket"]);

//////////////////////////////////////////////////////////////////////////////////////////////////////////

      pie_svg21 = d3.selectAll(".chart_svg")
.append("g")
.attr("transform", "translate(" + 1370 + "," + 100  + ")");

pie_svg21.append('text')
.style('fill', '#black')
.style("font-size", "15px")
.style("font-weight", "bold")
.attr("transform", "translate(0," + -40 + ")")
.attr("text-anchor", "middle")
.html(Dogs_db[22]["Name (Latin)"]);

pie_svg21.append('image')
.attr('xlink:href', 'https://www.clipartmax.com/png/small/8-82449_incredible-paw-clipart-free-orange-cat-pictures-download-dog-paw-print.png')
          .attr("width", "25px")
          .attr("height", "25px")
          .attr("transform", "translate(-20," + -12 + ")")
          .attr("preserveAspectRatio", "none");

          pie_svg21
.selectAll('.donut')
.data(data_ready10)
.enter()
.append("path")
.attr("d", d3.arc()
  .innerRadius(13)         // This is the size of the donut hole
  .outerRadius(radius)
  .startAngle(0*Math.PI * 2/360) 
.endAngle(220*Math.PI * 2/360) 
)
.attr('class','donut')
.attr("fill", "#f94449")
.attr("stroke", "black")
.style("stroke-width", "1px")
.style("opacity", 1)

/////////////////////////////////////////////////////////////////////////////////

pie_svg22 = d3.selectAll(".chart_svg")
.append("g")
.attr("transform", "translate(" + 1300 + "," + 300  +  ")");

pie_svg22_arc2 = d3.selectAll(".chart_svg")
.append("g")
.attr("transform", "translate(" + 1300 + "," + 300  +  ")");

pie_svg22_arc3 = d3.selectAll(".chart_svg")
.append("g")
.attr("transform", "translate(" + 1300 + "," + 300  +  ")");

pie_svg22_arc3.append('text')
.style('fill',       '#black')
.style("font-size", "15px")
.style("font-weight", "bold")
.attr("transform", "translate(0," + -100 + ")")
.attr("text-anchor", "middle")
.html(Dogs_db[24]["Name (Latin)"]);

pie_svg22.append('image')
.attr('xlink:href', 'https://www.clipartmax.com/png/small/48-483951_green-dog-paw-clip-art-bclipart-free-clipart-images-green-paw-print.png')
          .attr("width", "25px")
          .attr("height", "25px")
          .attr("transform", "translate(-10," + -12 + ")")
          .attr("preserveAspectRatio", "none");

          pie_svg22
.selectAll('.donut')
.data(data_ready7)
.enter()
.append("path")
.attr("d", d3.arc()
  .innerRadius(13)         // This is the size of the donut hole
  .outerRadius(radius)
  .startAngle(0*Math.PI * 2/360) //100
  .endAngle(220*Math.PI * -2/360)  
)
.attr('class','donut')
.attr("fill", "#f94449")
.attr("stroke", "black")
.style("stroke-width", "1px")
.style("opacity", 1)
pie_svg22_arc2
.selectAll('.donut')
.data(data_ready8)
.enter()
.append("path")
.attr("d", d3.arc()
  .innerRadius(13+radius)         // This is the size of the donut hole
  .outerRadius(radius*2)
  .startAngle(0*Math.PI * 2/360) //100
  .endAngle(220*Math.PI * -2/360)  
)
.attr('class','donut')
.attr("fill", "#de0a26")
.attr("stroke", "black")
.style("stroke-width", "1px")
.style("opacity", 1)

pie_svg22_arc3
.selectAll('.donut')
.data(data_ready8)
.enter()
.append("path")
.attr("d", d3.arc()
  .innerRadius(42+radius)         // This is the size of the donut hole
  .outerRadius(radius*3)
  .startAngle(0*Math.PI * 2/360) //100
  .endAngle(220*Math.PI * -2/360)  
)
.attr('class','donut')
.attr("fill", "#c30010")
.attr("stroke", "black")
.style("stroke-width", "1px")
.style("opacity", 1)

var line17 = d3.select(".chart_svg").append("g")

line17.append('line')
.attr("x1",1200)
.attr("y1",300)
.attr("x2",1020)
.attr("y2",330)
.style("stroke", "Black")
.style("stroke-width", "5px")

line17.append('text')
  .style('fill', '#black')
  .style("font-size", "23px")
  .style("font-weight", "bold")
  .attr("transform", "translate(1120," + 340 + ")")
  .attr("text-anchor", "middle")
  .html(Flights_db[19]["Rocket"]);

///////////////////////////////////////////////////////////////////

pie_svg23 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 1500 + "," + 520  + ")");
  
    pie_svg23_arc2 = d3.selectAll(".chart_svg")
    .append("g")
    .attr("transform", "translate(" + 1500  + "," + 520 + ")");
  
    pie_svg23_arc2.append('text')
    .style('fill',       '#black')
    .style("font-size", "15px")
    .style("font-weight", "bold")
    .attr("transform", "translate(0," + -70 + ")")
    .attr("text-anchor", "middle")
    .html(Dogs_db[25]["Name (Latin)"]);
    
    pie_svg23.append('image')
    .attr('xlink:href', 'https://www.clipartmax.com/png/small/8-82449_incredible-paw-clipart-free-orange-cat-pictures-download-dog-paw-print.png')
              .attr("width", "22px")
              .attr("height", "22px")
              .attr("transform", "translate(-10 ," + -10 + ")")
              .attr("preserveAspectRatio", "none");

              pie_svg23
    .selectAll('.donut')
    .data(data_ready12)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13)         // This is the size of the donut hole
      .outerRadius(radius)
      .startAngle(0*Math.PI * 2/360) //100
      .endAngle(220*Math.PI * 2/360)  
    )
    .attr('class','donut')
    .attr("fill", "#f94449")
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)
    pie_svg23_arc2
    .selectAll('.donut')
    .data(data_ready12)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(13+radius)         // This is the size of the donut hole
      .outerRadius(radius*2)
      .startAngle(0*Math.PI * 2/360) 
      .endAngle(220*Math.PI * 2/360)  
    )
    .attr('class','donut')
    .attr("fill", "#de0a26")
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1)

    var line16 = d3.select(".chart_svg").append("g")

    line16.append('line')
  .attr("x1",1480)
  .attr("y1",520)
  .attr("x2",1310)
  .attr("y2",300)
  .style("stroke", "Black")
  .style("stroke-width", "5px")

  line16.append('text')
      .style('fill', '#black')
      .style("font-size", "23px")
      .style("font-weight", "bold")
      .attr("transform", "translate(1370," + 430 + ")")
      .attr("text-anchor", "middle")
      .html(Flights_db[19]["Rocket"]);
////////////////////////////////////////////////////////////////////////////////////////////
pie_svg24 = d3.selectAll(".chart_svg")
.append("g")
.attr("transform", "translate(" + 1570 + "," + 100  + ")");

pie_svg24.append('text')
.style('fill', '#black')
.style("font-size", "15px")
.style("font-weight", "bold")
.attr("transform", "translate(0," + -40 + ")")
.attr("text-anchor", "middle")
.html(Dogs_db[27]["Name (Latin)"]);

pie_svg24.append('image')
.attr('xlink:href', 'https://www.clipartmax.com/png/small/8-82449_incredible-paw-clipart-free-orange-cat-pictures-download-dog-paw-print.png')
          .attr("width", "18px")
          .attr("height", "18px")
          .attr("transform", "translate(-11," + -10  + ")")
          .attr("preserveAspectRatio", "none");

          pie_svg24
.selectAll('.donut')
.data(data_ready10)
.enter()
.append("path")
.attr("d", d3.arc()
  .innerRadius(13)         // This is the size of the donut hole
  .outerRadius(radius)
  .startAngle(0*Math.PI * 2/360) 
.endAngle(310*Math.PI * 2/360) 
)
.attr('class','donut')
.attr("fill", "#f94449")
.attr("stroke", "black")
.style("stroke-width", "1px")
.style("opacity", 1)
/////////////////////////////////////////////////////////////////////////////////////////////

pie_svg25 = d3.selectAll(".chart_svg")
.append("g")
.attr("transform", "translate(" + 1420 + "," + 220  + ")");

pie_svg25.append('text')
.style('fill', '#black')
.style("font-size", "15px")
.style("font-weight", "bold")
.attr("transform", "translate(0," + -40 + ")")
.attr("text-anchor", "middle")
.html(Dogs_db[28]["Name (Latin)"]);

pie_svg25.append('image')
.attr('xlink:href', 'https://www.clipartmax.com/png/small/8-82449_incredible-paw-clipart-free-orange-cat-pictures-download-dog-paw-print.png')
          .attr("width", "18px")
          .attr("height", "18px")
          .attr("transform", "translate(-11," + -10  + ")")
          .attr("preserveAspectRatio", "none");

          pie_svg25
.selectAll('.donut')
.data(data_ready10)
.enter()
.append("path")
.attr("d", d3.arc()
  .innerRadius(13)         // This is the size of the donut hole
  .outerRadius(radius)
  .startAngle(0*Math.PI * 2/360) 
.endAngle(310*Math.PI * 2/360) 
)
.attr('class','donut')
.attr("fill", d => color(d.data[0]))
.attr("stroke", "black")
.style("stroke-width", "1px")
.style("opacity", 1)

var line17 = d3.select(".chart_svg").append("g")

line17.append('line')
  .attr("x1",1530)
  .attr("y1",120)
  .attr("x2",1450)
  .attr("y2",200)
  .style("stroke", "Black")
  .style("stroke-width", "5px")

  line17.append('text')
      .style('fill', '#black')
      .style("font-size", "23px")
      .style("font-weight", "bold")
      .attr("transform", "translate(1530," + 200 + ")")
      .attr("text-anchor", "middle")
      .html(Flights_db[23]["Rocket"]);

      ///////////////////////////////////////////////////////////////////////////////////////////

      pie_svg26 = d3.selectAll(".chart_svg")
      .append("g")
      .attr("transform", "translate(" + 1800 + "," + 400  + ")");
    
      pie_svg26_arc2 = d3.selectAll(".chart_svg")
      .append("g")
      .attr("transform", "translate(" + 1800  + "," + 400 + ")");
  
      pie_svg26_arc3 = d3.selectAll(".chart_svg")
      .append("g")
      .attr("transform", "translate(" + 1800  + "," + 400 + ")");

      pie_svg26_arc4 = d3.selectAll(".chart_svg")
      .append("g")
      .attr("transform", "translate(" + 1800 + "," + 400  + ")");
    
      pie_svg26_arc5 = d3.selectAll(".chart_svg")
      .append("g")
      .attr("transform", "translate(" + 1800  + "," + 400 + ")");
  
      pie_svg26_arc6 = d3.selectAll(".chart_svg")
      .append("g")
      .attr("transform", "translate(" + 1800  + "," + 400 + ")");
    
      pie_svg26_arc6.append('text')
      .style('fill',       '#black')
      .style("font-size", "15px")
      .style("font-weight", "bold")
      .attr("transform", "translate(0," + -200 + ")")
      .attr("text-anchor", "middle")
      .html(Dogs_db[29]["Name (Latin)"]);
      
      pie_svg26.append('image')
      .attr('xlink:href', 'https://www.clipartmax.com/png/small/48-483951_green-dog-paw-clip-art-bclipart-free-clipart-images-green-paw-print.png')
                .attr("width", "25px")
                .attr("height", "25px")
                .attr("transform", "translate(-10," + -15 + ")")
                .attr("preserveAspectRatio", "none");
  
                pie_svg26
      .selectAll('.donut')
      .data(data_ready7)
      .enter()
      .append("path")
      .attr("d", d3.arc()
        .innerRadius(13)         // This is the size of the donut hole
        .outerRadius(radius)
        .startAngle(0*Math.PI * 2/360) //100
        .endAngle(150*Math.PI * -2/360)  
      )
      .attr('class','donut')
      .attr("fill", "#f94449")
      .attr("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", 1)

      pie_svg26_arc2
      .selectAll('.donut')
      .data(data_ready8)
      .enter()
      .append("path")
      .attr("d", d3.arc()
        .innerRadius(13+radius)         // This is the size of the donut hole
        .outerRadius(radius*2)
        .startAngle(0*Math.PI * 2/360) //100
        .endAngle(150*Math.PI * -2/360)  
      )
      .attr('class','donut')
      .attr("fill", "#de0a26")
      .attr("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", 1)
  
      pie_svg26_arc3
      .selectAll('.donut')
      .data(data_ready8)
      .enter()
      .append("path")
      .attr("d", d3.arc()
        .innerRadius(42+radius)         // This is the size of the donut hole
        .outerRadius(radius*3)
        .startAngle(0*Math.PI * 2/360) //100
        .endAngle(150*Math.PI * -2/360)  
      )
      .attr('class','donut')
      .attr("fill", "#c30010")
      .attr("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", 1)

      pie_svg26_arc4
      .selectAll('.donut')
      .data(data_ready8)
      .enter()
      .append("path")
      .attr("d", d3.arc()
        .innerRadius(72 + radius)         // This is the size of the donut hole
        .outerRadius(radius*4)
        .startAngle(0*Math.PI * 2/360) //100
        .endAngle(150*Math.PI * -2/360)  
      )
      .attr('class','donut')
      .attr("fill", "#c30010")
      .attr("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", 1)

      pie_svg26_arc5
      .selectAll('.donut')
      .data(data_ready8)
      .enter()
      .append("path")
      .attr("d", d3.arc()
        .innerRadius(101+radius)         // This is the size of the donut hole
        .outerRadius(radius*5)
        .startAngle(0*Math.PI * 2/360) //100
        .endAngle(150*Math.PI * -2/360)  
      )
      .attr('class','donut')
      .attr("fill", "#c30010")
      .attr("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", 1)

      pie_svg26_arc6
      .selectAll('.donut')
      .data(data_ready8)
      .enter()
      .append("path")
      .attr("d", d3.arc()
        .innerRadius(130+radius)         // This is the size of the donut hole
        .outerRadius(radius*6)
        .startAngle(0*Math.PI * 2/360) //100
        .endAngle(150*Math.PI * -2/360)  
      )
      .attr('class','donut')
      .attr("fill", "#c30010")
      .attr("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", 1)
      //////////////////////////////////////////////////////////////////////////
      pie_svg27 = d3.selectAll(".chart_svg")
.append("g")
.attr("transform", "translate(" + 1470 + "," + 320  + ")");

pie_svg27_arc2 = d3.selectAll(".chart_svg")
.append("g")
.attr("transform", "translate(" + 1470 + "," + 320  + ")");

pie_svg27_arc2.append('text')
.style('fill', '#black')
.style("font-size", "15px")
.style("font-weight", "bold")
.attr("transform", "translate(0," + -70 + ")")
.attr("text-anchor", "middle")
.html(Dogs_db[30]["Name (Latin)"]);

pie_svg27.append('image')
.attr('xlink:href', 'https://www.clipartmax.com/png/small/48-483951_green-dog-paw-clip-art-bclipart-free-clipart-images-green-paw-print.png')
          .attr("width", "18px")
          .attr("height", "18px")
          .attr("transform", "translate(-11," + -10  + ")")
          .attr("preserveAspectRatio", "none");

          pie_svg27
.selectAll('.donut')
.data(data_ready10)
.enter()
.append("path")
.attr("d", d3.arc()
  .innerRadius(13)         // This is the size of the donut hole
  .outerRadius(radius)
  .startAngle(0*Math.PI * 2/360) 
.endAngle(220*Math.PI * -2/360) 
)
.attr('class','donut')
.attr("fill", "#f94449")
.attr("stroke", "black")
.style("stroke-width", "1px")
.style("opacity", 1)

pie_svg27_arc2
.selectAll('.donut')
.data(data_ready10)
.enter()
.append("path")
.attr("d", d3.arc()
  .innerRadius(13+radius)         // This is the size of the donut hole
  .outerRadius(radius*2)
  .startAngle(0*Math.PI * 2/360) 
.endAngle(220*Math.PI * -2/360) 
)
.attr('class','donut')
.attr("fill", "#c30010")
.attr("stroke", "black")
.style("stroke-width", "1px")
.style("opacity", 1)

var line18 = d3.select(".chart_svg").append("g")

line18.append('line')
  .attr("x1",1480)
  .attr("y1",330)
  .attr("x2",1620)
  .attr("y2",350)
  .style("stroke", "Black")
  .style("stroke-width", "5px")

  line18.append('text')
      .style('fill', '#black')
      .style("font-size", "23px")
      .style("font-weight", "bold")
      .attr("transform", "translate(1550," + 330 + ")")
      .attr("text-anchor", "middle")
      .html(Flights_db[24]["Rocket"]);

      /////////////////////////////////////////////////////////////////////////////////////

      pie_svg17 = d3.selectAll(".chart_svg")
      .append("g")
      .attr("transform", "translate(" + 1950 + "," + 520  + ")");
    
      pie_svg17_arc2 = d3.selectAll(".chart_svg")
      .append("g")
      .attr("transform", "translate(" + 1950  + "," + 520 + ")");
  
      pie_svg17_arc3 = d3.selectAll(".chart_svg")
      .append("g")
      .attr("transform", "translate(" + 1950  + "," + 520 + ")");
    
      pie_svg17_arc3.append('text')
      .style('fill',       '#black')
      .style("font-size", "15px")
      .style("font-weight", "bold")
      .attr("transform", "translate(0," + -100 + ")")
      .attr("text-anchor", "middle")
      .html(Dogs_db[34]["Name (Latin)"]);
      
      pie_svg17.append('image')
      .attr('xlink:href', 'https://www.clipartmax.com/png/small/48-483951_green-dog-paw-clip-art-bclipart-free-clipart-images-green-paw-print.png')
                .attr("width", "25px")
                .attr("height", "25px")
                .attr("transform", "translate(-12," + -15 + ")")
                .attr("preserveAspectRatio", "none");
  
                pie_svg17
      .selectAll('.donut')
      .data(data_ready7)
      .enter()
      .append("path")
      .attr("d", d3.arc()
        .innerRadius(13)         // This is the size of the donut hole
        .outerRadius(radius)
        .startAngle(0*Math.PI * 2/360) //100
        .endAngle(150*Math.PI * 2/360)  
      )
      .attr('class','donut')
      .attr("fill", "#f94449")
      .attr("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", 1)
      pie_svg17_arc2
      .selectAll('.donut')
      .data(data_ready8)
      .enter()
      .append("path")
      .attr("d", d3.arc()
        .innerRadius(13+radius)         // This is the size of the donut hole
        .outerRadius(radius*2)
        .startAngle(0*Math.PI * 2/360) //100
        .endAngle(150*Math.PI * 2/360)  
      )
      .attr('class','donut')
      .attr("fill", "#de0a26")
      .attr("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", 1)
  
      pie_svg17_arc3
      .selectAll('.donut')
      .data(data_ready8)
      .enter()
      .append("path")
      .attr("d", d3.arc()
        .innerRadius(42+radius)         // This is the size of the donut hole
        .outerRadius(radius*3)
        .startAngle(0*Math.PI * 2/360) //100
        .endAngle(150*Math.PI * 2/360)  
      )
      .attr('class','donut')
      .attr("fill", "#c30010")
      .attr("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", 1)

      var line19 = d3.select(".chart_svg").append("g")

      line19.append('line')
  .attr("x1",1800)
  .attr("y1",400)
  .attr("x2",1950)
  .attr("y2",510)
  .style("stroke", "Black")
  .style("stroke-width", "5px")

  line19.append('text')
      .style('fill', '#black')
      .style("font-size", "23px")
      .style("font-weight", "bold")
      .attr("transform", "translate(1850," + 500 + ")")
      .attr("text-anchor", "middle")
      .html(Flights_db[31]["Rocket"]);
}

