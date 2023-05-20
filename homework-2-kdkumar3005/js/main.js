// Hint: This is a good place to declare your global variables
var male_glob, female_glob, margin,width,height,svg,x, x_axis,y, y_axis,xAxisG,yAxisG;
margin = {top: 10, right: 100, bottom: 90, left: 50},
            width = 1000 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;
// This function is called once the HTML page is fully loaded by the browser
document.addEventListener('DOMContentLoaded', function () {
   // Hint: create or set your svg element inside this function
    
   // This will load your two CSV files and store them into two arrays.
   Promise.all([d3.csv('data/females_data.csv'),d3.csv('data/males_data.csv')])
        .then(function (values) {
            console.log('loaded females_data.csv and males_data.csv');
            female_data = values[0];
            male_data = values[1];
            // female_glob = female_data;
            // male_glob = male_data;
            // Hint: This is a good spot for doing data wrangling
            female_data.forEach(d => {
               d.Year= new Date (d["Year"],0,1);
                d.Bangladesh  = +d["Bangladesh"];
                d.Brazil  = +d["Brazil"];
                d.Chile  = +d["Chile"];
                d.Egypt  = +d["Egypt"];
                d.Kenya = +d["Kenya"];
            });
            male_data.forEach(d => {
                d.Year= new Date (+d["Year"],0,1);
                d.Bangladesh  = +d["Bangladesh"];
                d.Brazil  = +d["Brazil"];
                d.Chile  = +d["Chile"];
                d.Egypt  = +d["Egypt"];
                d.Kenya = +d["Kenya"];
            });
            
            svg = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
             x = d3.scaleTime().range([0,width]);
             x_axis = svg.append("g").attr("transform", "translate(0," + height + ")");
             y = d3.scaleLinear().range([height,0]);
             y_axis =  svg.append("g");             
             var size = 20;
            svg.append("rect")
           .attr("x", 1.7*width/2)
           .attr("y", 0.01*height/2) 
           .attr("width", size)
           .attr("height", size)
           .style("fill", "red")

           svg.append("text")
              .attr("x",1.78*width/2)
              .attr("y",0.03*height/2 ) 
              .style("fill", "red")
              .text('Male employment rate')
              .attr("text-anchor", "left")
              .style("alignment-baseline", "middle")

           svg.append("rect")
           .attr("x", 1.7*width/2)
           .attr("y", 0.22*height/2) 
           .attr("width", size)
           .attr("height", size)
           .style("fill", "blue")

           svg.append("text")
              .attr("x",1.78*width/2)
              .attr("y",0.24*height/2 ) 
              .style("fill", "blue")
              .text('Female employment rate')
              .attr("text-anchor", "left")
              .style("alignment-baseline", "middle")

              svg.append("text").attr("x",width/2).attr("y",height+margin.bottom/2).style("text-anchor","middle").text("Year");

              svg.append("text").attr("x",0-height/2)
              .attr("y",-31.5)
              .attr("transform","rotate(-90)")
              .style("text-anchor","middle").text("Employment Rate");

            drawLolliPopChart();
        });
});

// Use this function to draw the lollipop chart.
function drawLolliPopChart() {
    var country = document.getElementById("select_country").value;
    console.log('trace:drawLollipopChart() '+ country); 
    //adding x axis
     x.domain([new Date("1990",0,1), new Date("2023",0,1)]);
    x_axis.transition().duration(1000).call(d3.axisBottom(x));
    //adding y axis
  y.domain([0.0,d3.max(male_data, function(d){
                return d[country];
            })+.1]);
   y_axis.transition().duration(1000).call(d3.axisLeft(y));
    
                  
   var male_line = svg.selectAll(".Male_line")
      .data(male_data)
    // update lines
    male_line
      .enter()
      .append("line")
      .attr("class", "Male_line")
      .merge(male_line)
      .transition()
      .duration(1000)
        .attr("x1", function(d) {return x(d.Year); })
        .attr("x2", function(d) { return x(d.Year); })
        .attr("y1", y(0))
        .attr("y2", function(d) { return y(d[country]); })
        .attr("stroke", "red")

        var female_line = svg.selectAll(".Female_line")
      .data(female_data)
    // update lines
    female_line
      .enter()
      .append("line")
      .attr("class", "Female_line")
      .merge(female_line)
      .transition()
      .duration(1000)
        .attr("x1", function(d) {return x(d.Year)+5; })
        .attr("x2", function(d) { return x(d.Year)+5; })
        .attr("y1", y(0))
        .attr("y2", function(d) { return y(d[country]); })
        .attr("stroke", "blue")
    
    var male_circle = svg.selectAll(".circle_male")
      .data(male_data)
    // update bars
    male_circle
      .enter()
      .append("circle")
      .attr("class", "circle_male")
      .merge(male_circle)
      .transition()
      .duration(1000)
        .attr("cx", function(d) { return x(d.Year); })
        .attr("cy", function(d) { return y(d[country]); })
        .attr("r", 8)
        .attr("fill", "#ff0000");

    var female_circle = svg.selectAll(".circle_female")
        .data(female_data)
      // update bars
      female_circle
        .enter()
        .append("circle")
        .attr("class", "circle_female")
        .merge(female_circle)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return x(d.Year)+5; })
          .attr("cy", function(d) { return y(d[country]); })
          .attr("r", 8)
          .attr("fill", "#0000ff");
 
          
}

