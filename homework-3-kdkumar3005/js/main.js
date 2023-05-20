var vowelMatchLen = [], consonantsMatchLen = [], punctuationMatchLen = [];
var vowelCounter;
var pie_svg;
var color;
var radius;
var consonantsCounter;
var punctuationCounter;
var bar_svg;
var width = 580;
var height = 400;
var margin = 40;
var bar_margin = { top: 30, right: 30, bottom: 70, left: 60 };
var bar_width = 580 - bar_margin.left - bar_margin.right;
var bar_height = 400 - bar_margin.top - bar_margin.bottom;

function submitText() {

  vowelCounter = { a: 0, e: 0, i: 0, o: 0, u: 0, y: 0 };
  consonantsCounter = { b: 0, c: 0, d: 0, f: 0, g: 0, h: 0, j: 0, k: 0, l: 0, m: 0, n: 0, p: 0, q: 0, r: 0, s: 0, t: 0, v: 0, w: 0, x: 0, z: 0 };
  punctuationCounter = { ".": 0, ",": 0, ";": 0, ":": 0, "?": 0, "!": 0 };
  var span = document.getElementById("character-name");
  span.textContent = "NONE";
  radius = Math.min(width, height) / 2 - margin;

  pie_svg = d3.select("#pie_svg").select("g").remove();
  bar_svg = d3.select("#bar_svg").select("g").remove();
  pie_svg = d3.select("#pie_svg")
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  console.log("submit text");
  var rawTextLower = document.getElementById('wordbox').value.toLowerCase();

  var vowelMatch = rawTextLower.match(/[aeiouy]/ig);
  console.log(vowelMatch);
  if (vowelMatch != null) {
    vowelMatchLen[0] = vowelMatch.length;
    console.log("vowels " + vowelMatch.length);
    for (var i = 0; i < vowelMatch.length; i++) {
      var character = vowelMatch[i];
      if (vowelCounter[character]) {
        vowelCounter[character]++;
      } else {
        vowelCounter[character] = 1;
      }
    }
  }
  else if (vowelMatch == null) {
    vowelMatchLen[0] = 0;
  }


  console.log(vowelCounter);
  var consonantsMatch = rawTextLower.match(/[^aeiouy.,;?!: ]/ig);
  if (consonantsMatch != null) {
    consonantsMatchLen[0] = consonantsMatch.length;
    console.log("consonants " + consonantsMatch.length);
    for (var i = 0; i < consonantsMatch.length; i++) {
      var character = consonantsMatch[i];
      if (consonantsCounter[character]) {
        consonantsCounter[character]++;
      } else {
        consonantsCounter[character] = 1;
      }
    }
  }
  else if (consonantsMatch == null) {
    consonantsMatchLen[0] = 0;
  }
  console.log(consonantsCounter);
  var punctuationMatch = rawTextLower.match(/[.,;?!:]/ig);
  if (punctuationMatch != null) {
    punctuationMatchLen[0] = punctuationMatch.length;
    console.log("punctuations " + punctuationMatch.length);
    for (var i = 0; i < punctuationMatch.length; i++) {
      var character = punctuationMatch[i];
      if (punctuationCounter[character]) {
        punctuationCounter[character]++;
      } else {
        punctuationCounter[character] = 1;
      }
    }
    console.log(punctuationCounter);
  }
  else if (punctuationMatch == null) {
    punctuationMatchLen[0] = 0;
  }

  drawDonut();
}

function drawDonut() {
  var centerSvg;
  var data = { Vowels: vowelMatchLen[0], Consonants: consonantsMatchLen[0], Punctuations: punctuationMatchLen[0] };
  console.log(data)

  color = d3.scaleOrdinal().range(["#008080", "#2a8071", "#40E0D0"]);

  const pie = d3.pie()
    .value(d => d[1]);

  const data_ready = pie(Object.entries(data));
  console.log(data_ready);
  pie_svg
    .selectAll('.donut')
    .data(data_ready)
    .enter()
    .append("path")
    .attr("d", d3.arc()
      .innerRadius(100)         // This is the size of the donut hole
      .outerRadius(radius)
    )
    .attr("fill", d => color(d.data[0]))
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", 0.7)
    .on('mouseover', function (d, i) {

      console.log("inside donut chart");
      d3.select(this)
        .style("stroke-width", "4px")
      pie_svg.append('text')
        .style('fill', '#black')
        .style("font-size", "23px")
        .style("font-weight", "bold")
        .attr("transform", "translate(0," + 20 + ")")
        .attr("text-anchor", "middle")
        .html(i.data[0] + " : " + i.data[1]);
    })
    .on('mouseout', function (d, i) {

      d3.select("#pie_svg").select("g").select("text").remove();
      d3.select(this)
        .style("stroke-width", "1px")


    })
    .on('click', function (d, i) {
      drawBarData(d, i);
      var span = document.getElementById("character-name");
      span.textContent = "NONE";
    })

  function drawBarData(d, i) {
    bar_svg = d3.select("#bar_svg").select("g").remove();

    bar_svg = d3.select("#bar_svg")
      .append("g")
      .style('stroke-width', 1)
      .attr("transform", "translate(" + bar_margin.left + "," + bar_margin.top + ")");
    if (i.data[0] == "Consonants") {
      var keys = Object.keys(consonantsCounter)
      var values = Object.values(consonantsCounter)
      consonantArray = Object.entries(consonantsCounter).map(([key, value]) => ({
        key: key,
        value: value
      }));
      var color = "#2a8071";
      drawBarChart(keys, values, consonantArray, color)
    }
    if (i.data[0] == "Punctuations") {
      var keys = Object.keys(punctuationCounter)
      var values = Object.values(punctuationCounter)
      punctuationArray = Object.entries(punctuationCounter).map(([key, value]) => ({
        key: key,
        value: value
      }));
      var color = "#40E0D0";
      drawBarChart(keys, values, punctuationArray, color)
    }
    if (i.data[0] == "Vowels") {
      var keys = Object.keys(vowelCounter)
      var values = Object.values(vowelCounter)
      vowelArray = Object.entries(vowelCounter).map(([key, value]) => ({
        key: key,
        value: value
      }));
      var color = "#008080";
      drawBarChart(keys, values, vowelArray, color)
    }

  }
  function drawBarChart(keys, values, charArray, color) {
    var x = d3.scaleBand().range([0, bar_width]).domain(keys).padding(0.2);
    console.log(keys);
    bar_svg.append("g").attr("transform", "translate(0," + bar_height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end");

    var y = d3.scaleLinear().range([bar_height, 0]).domain([0, d3.max(values)]);
    console.log(d3.max(values));

    var div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);


    bar_svg.append("g")
      .call(d3.axisLeft(y));

    bar_svg.selectAll("mybar")
      .data(charArray)
      .enter()
      .append("rect")
      .attr("x", function (d) { return x(d.key); })
      .attr("y", function (d) { return y(d.value); })
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .attr("width", x.bandwidth())
      .attr("height", function (d) { return bar_height - y(d.value); })
      .attr("fill", color)
      .on("mouseover", function (event, d) {
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html("character: " + d.key + "<br/>" + "count: " + d.value)
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mousemove", function (event, d) {
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html("character: " + d.key + "<br/>" + "count: " + d.value)
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function (d) {
        div.transition()
          .duration(500)
          .style("opacity", 0);
      })
      .on("click", function (d, i) {
        var span = document.getElementById("character-name");
        span.textContent = i.key + " is " + i.value;


      })
  }
}