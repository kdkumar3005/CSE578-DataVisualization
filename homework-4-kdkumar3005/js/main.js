
function toggle(source) {
  var checkboxes = document.getElementsByName('region');
  for (var i = 0, n = checkboxes.length; i < n; i++) {
    checkboxes[i].checked = source.checked;
  }
  drawLine();
}
$(".checkbox-menu").on("change", "input[type='checkbox']", function () {
  $(this).closest("li").toggleClass("active", this.checked);
});
$(document).on('click', '.allow-focus', function (e) {
  e.stopPropagation();
});

function clearCheckBox(){
  var checkboxes = document.getElementsByName('region');
  for (var i = 0, n = checkboxes.length; i < n; i++) {
    checkboxes[i].checked = false;
  }
}
margin = { top: 10, right: 120, bottom: 30, left: 80 },
  width = 1400 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;
var line_svg;
var countryRegion_data, globalDev_data;
var x,y,xaxis,yaxis;
const keyfunction=(d)=>{
  return d[1][0].Geo;
};
// This function is called once the HTML page is fully loaded by the browser
document.addEventListener('DOMContentLoaded', function () {
  // Hint: create or set your svg element inside this function
  // This will load your two CSV files and store them into two arrays.
  Promise.all([d3.csv('data/countries_regions.csv'), d3.csv('data/global_development.csv')])
    .then(function (values) {
      console.log('loaded countries_regions.csv and global_development.csv');
      countryRegion_data = values[0];
      globalDev_data = values[1];
      console.log(countryRegion_data);
      console.log(globalDev_data);
      globalDev_data.forEach(d => {
        // d.Year = new Date(d["Year"], 0, 1);
        d.Year = +d["Year"];
        d.BirthRate = +d["Data.Health.Birth Rate"];
        d.FertilityRate = +d["Data.Health.Fertility Rate"];
        d.DeathRate = +d["Data.Health.Death Rate"];
        d.TotalPropulation = +d["Data.Health.Total Population"];
        d.AgriculturalLand = +d["Data.Rural Development.Agricultural Land"];
        d.RuralPopulation = +d["Data.Rural Development.Rural Population"];
        d.SurfaceArea = +d["Data.Rural Development.Surface Area"];
        d.ArableLand = +d["Data.Rural Development.Arable Land"];
        d.Telephone = +d["Data.Infrastructure.Telephone Lines per 100 People"];
        d.LandArea = +d["Data.Rural Development.Land Area"];
      })
      countryRegion_data.forEach(d => {
        d.Region = d["World bank region"];
      })

    });
    line_svg = d3.select("#lineGraph_svg")
    .append("g")
    .style('stroke-width', 1)
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
     x = d3.scaleLinear()
            .range([0, width])
    xaxis = line_svg.append("g")
                .attr("transform", "translate(0," + height + ")");
    y = d3.scaleLinear().range([height,0]);
    yaxis =  line_svg.append("g");  
});
function color(Region){

  if (Region == 'Europe & Central Asia')
  {
    return '#e41a1c';
  }
  else if (Region == 'South Asia')
  {
    return '#377eb8';
  } 
  else if (Region == 'Middle East & North Africa')
  {
    return '#4daf4a';
  } 
  else if (Region == 'Sub-Saharan Africa')
  {
    return '#984ea3';
  } 
  else if (Region == 'Latin America & Caribbean')
  {
    return '#ff7f00';
  } 
  else if (Region == 'East Asia & Pacific')
  {
    return '#808000';
  } 
  else if (Region == 'North America')
  {
    return '#a65628';
  } 

}
function drawLine() {
  var attribute = document.getElementById("glob_id").value;
  console.log(attribute);
  d3.select("#lineGraph_svg").select("g").select("#xlabel").remove();
  d3.select("#lineGraph_svg").select("g").select("#ylabel").remove();
  var regions = document.getElementsByName("region");
  console.log(regions);
  var regionsChecked = [];
  for (var i = 0; i < regions.length; i++) {
    if (regions[i].checked == true) {
      regionsChecked.push(regions[i].title);
    }
  }

  console.log(regionsChecked);
  console.log("hello from the other side");
  console.log(countryRegion_data);
  console.log(globalDev_data);
  var countriesSelected = [];
  for (var i = 0; i < countryRegion_data.length; i++) {
    for (var j = 0; j < regionsChecked.length; j++) {
      if (countryRegion_data[i].Region == regionsChecked[j]) {
        countriesSelected.push({country:countryRegion_data[i].name,
        region:countryRegion_data[i].Region,
      Geo:countryRegion_data[i].geo });
      }
    }
  }
  console.log(countriesSelected);
  
    x.domain([1980, 2013]);
  xaxis.call(d3.axisBottom(x).tickFormat(d3.format('d')));

    line_svg.append("text")
            .attr("class", "x label")
            .attr("id","xlabel")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", height + 20)
            .text("Year");    
    
var attrValue =[];
var readyData = [];
console.log(globalDev_data[0][attribute]);
for(var i = 0; i< countriesSelected.length; i++)
{
  for(var j = 0; j< globalDev_data.length; j++)
  {
     if(countriesSelected[i].country == globalDev_data[j].Country && globalDev_data[j].Year >=1980)
     {
        attrValue.push(globalDev_data[j][attribute]);
        readyData.push({Country: countriesSelected[i].country,
        Year:globalDev_data[j].Year,   
        Attribute:globalDev_data[j][attribute],
        Region:countriesSelected[i].region,
        Geo:countriesSelected[i].Geo})
        
     }
  }
}
const sumstat = d3.group(readyData, d=>d.Country);
console.log(sumstat);
y.domain([0, d3.max(attrValue)+1]);
yaxis.transition().duration(1000)
          .call(d3.axisLeft(y));        

        line_svg.append('text')
                .attr('transform','rotate(-90)')
                .attr('id','ylabel')
                .attr("class", "y label")
                .attr('dy','-70 ')
                .style('text-anchor','end')
                .text(attribute);
  
        // Draw the line
        line_svg.selectAll(".line")
                .data(sumstat,keyfunction)
                .join(
                  enter => enter.append("path")
                  .attr("fill", "none")
                  .attr("class","line")
                  .attr("id", function(d){console.log("id" + d[1][0].Geo); return d[1][0].Geo;})
                  .attr("stroke", function(d){ return color(d[1][0].Region)})
                  .attr("stroke-width", 5.5)
                  .attr("d", function(d){
                    return d3.line()
                        .x(function(d) { return x(+d.Year); })
                        .y(function(d) { return y(+d.Attribute); })
                        (d[1])
                    })
                    .call(enter => enter.style("opacity", 0).transition()
                    .delay(500)
                    .duration(500)
                    .ease(d3.easeLinear)
                    .style("opacity", d3.select("#myRange").property("value")/100))
                 ,
                  update => {console.log("outside update " ,update); return update.call(update => { 
                         console.log("inside update ", update) 
                         return update.transition()
                                      .duration(500)
                                      .attr("d", function(d){
                             return d3.line()
                                      .x(function(d) { return x(+d.Year); })
                                      .y(function(d) { return y(+d.Attribute); })
                                      (d[1])
                                      })                                                
                })}
                ,
                    exit => exit.call(exit => exit.transition().duration(500).style("opacity", 0)
                    .remove())
                );
        line_svg.selectAll('.countryCircle')
                .data(sumstat,keyfunction)
                .join(
                  enter => enter.append("circle")
                .attr('class','countryCircle')      
                .attr("id", function(d){console.log("id" + d[1][0].Geo); return d[1][0].Geo;})
                .style('fill',function(d){ return color(d[1][0].Region)})
                .attr('cx', function(d){
                  var ind = d[1].length
                  return x(d[1][ind-1].Year); 
                })
                .attr('cy', function(d){
                  var ind = d[1].length
                  return y(d[1][ind-1].Attribute); 
                })
                .style("stroke","black")
                .attr('r', 7)
                .call(enter => enter.style("opacity",0).transition()
                .delay(500)
                .duration(500)
                .ease(d3.easeLinear)
                .style("opacity", d3.select("#myRange").property("value")/100))
                ,
                update => update.call(update=> update.transition()
                .duration(500).attr('cx', function(d){
                  var ind = d[1].length
                  return x(d[1][ind-1].Year); 
                })
                .attr('cy', function(d){
                  var ind = d[1].length
                  return y(d[1][ind-1].Attribute); 
                }))
                ,
                exit => exit.call(exit => exit.transition().duration(500).style("opacity", 0)
                .remove())
                ); 

        line_svg.selectAll('.countrytext')
                .data(sumstat,keyfunction)
                .join(
                  enter=>enter.append('text')
                  .attr('class','countrytext')
                .text(function(d){
                  return d[1][0].Country
                })
                .attr('font-size',10)
                .style('fill',function(d){ return color(d[1][0].Region)})
                .attr("id", function(d){console.log("id" + d[1][0].Geo); return d[1][0].Geo;})
                .attr('dx',function(d){
                  var ind = d[1].length
                  return x(d[1][ind-1].Year+.2) ; 
                })//positions text towards the left of the center of the circle
                .attr('dy',function(d){
                  var ind = d[1].length
                  return y(d[1][ind-1].Attribute); 
                })
                .call(enter => enter.style("opacity",0).transition().delay(500)
                .duration(500)
                .ease(d3.easeLinear)
                .style("opacity", d3.select("#myRange").property("value")/100))
                ,
                update => update.call(update=> update.transition()
                .duration(500)
                .attr('dx',function(d){
                  var ind = d[1].length
                  return x(d[1][ind-1].Year+.2) ; 
                })//positions text towards the left of the center of the circle
                .attr('dy',function(d){
                  var ind = d[1].length
                  return y(d[1][ind-1].Attribute); 
                })),
                exit => exit.call(exit => exit.transition().duration(500).style("opacity", 0)
                .remove())
                )

                d3.select("#myRange").on("input", function () {
          line_svg.selectAll('.countryCircle')
                  .transition()
                  .ease(d3.easeLinear)
                  .style("opacity", d3.select("#myRange").property("value")/100)  
          line_svg.selectAll('.countrytext')
                  .transition()
                  .ease(d3.easeLinear)
                  .style("opacity", d3.select("#myRange").property("value")/100)     
          line_svg.selectAll('.line')
                  .transition()
                  .ease(d3.easeLinear)
                  .style("opacity", d3.select("#myRange").property("value")/100)                    
    });

    line_svg.selectAll('.line')
    .on("mouseover",function(event,d){
      console.log(d);
      console.log(event);
      line_svg.selectAll('.line')
      .style("opacity",.1)
      line_svg.selectAll('.countryCircle')
      .style("opacity",.1)
      line_svg.selectAll('.countrytext')
      .style("opacity",.1)
      var hoveredLineElement  = '#'+d[1][0].Geo;
      d3.selectAll(hoveredLineElement)
      .style("opacity",1)
    })
    .on("mousemove",function(event,d){
      d3.select(this)
      .style("opacity", 1)
    })
    .on("mouseout",function(event,d){
      line_svg.selectAll('.line')
      .style("opacity", d3.select("#myRange").property("value")/100)
      line_svg.selectAll(".countryCircle")
         .style("opacity", d3.select("#myRange").property("value")/100)
         line_svg.selectAll(".countrytext")
          .style("opacity", d3.select("#myRange").property("value")/100)
    })

    line_svg.selectAll('.countryCircle')
    .on("mouseover",function(event,d){
      console.log(d);
      console.log(event);
      line_svg.selectAll('.line')
      .style("opacity",.1)
      line_svg.selectAll('.countryCircle')
      .style("opacity",.1)
      line_svg.selectAll('.countrytext')
      .style("opacity",.1)
      var hoveredCircleElement  = '#'+d[1][0].Geo;
      d3.selectAll(hoveredCircleElement)
      .style("opacity",1)
    })
    .on("mousemove",function(event,d){
      d3.select(this)
      .style("opacity", 1)
    })
    .on("mouseout",function(event,d){
      line_svg.selectAll('.line')
      .style("opacity", d3.select("#myRange").property("value")/100)
      line_svg.selectAll(".countryCircle")
         .style("opacity", d3.select("#myRange").property("value")/100)
         line_svg.selectAll(".countrytext")
          .style("opacity", d3.select("#myRange").property("value")/100)
    })


    line_svg.selectAll('.countrytext')
    .on("mouseover",function(event,d){
      console.log(d);
      console.log(event);
      line_svg.selectAll('.line')
      .style("opacity",.1)
      line_svg.selectAll('.countryCircle')
      .style("opacity",.1)
      line_svg.selectAll('.countrytext')
      .style("opacity",.1)
      var hoveredTextElement  = '#'+d[1][0].Geo;
      d3.selectAll(hoveredTextElement)
      .style("opacity",1)
    })
    .on("mousemove",function(event,d){
      d3.select(this)
      .style("opacity", 1)
    })
    .on("mouseout",function(event,d){
      line_svg.selectAll('.line')
      .style("opacity", d3.select("#myRange").property("value")/100)
      line_svg.selectAll(".countryCircle")
         .style("opacity", d3.select("#myRange").property("value")/100)
         line_svg.selectAll(".countrytext")
          .style("opacity", d3.select("#myRange").property("value")/100)
    })

       

}   