import { updateComponentsOnHeatmapHover, updateComponentsOnHeatmapClick, updateComponentsOnHeatmapLeave } from "./main.js";

const margin = { top: 20, right: 15, bottom: 60, left: 35 },
  width = 288 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

var heatmapObj = {};

function getColorBasedOnValue(percent) {
  if (percent > 87.5) return '#950000';
  else if (percent > 75 && percent <= 87.5) return '#d10002';
  else if (percent > 62.5 && percent <= 75) return '#fa0113';
  else if (percent > 50 && percent <= 62.5) return '#ff5244';
  else if (percent > 37.5 && percent <= 50) return '#ff8254';
  else if (percent > 25 && percent <= 37.5) return '#ffb681';
  else if (percent > 12.5 && percent <= 25) return '#ffd19c';
  else return '#ffe7c6';
}

heatmapObj.svg = d3.select("#heatmap")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

const svg = heatmapObj.svg;

function drawBaseHeatChart(data) {
  var maxValue = 0;
  data.forEach(function (entry) {
    maxValue = Math.max(entry.value, maxValue);
  });
  data.forEach(function (entry) {
    entry.percentValue = entry.value / maxValue * 100;
  });

  heatmapObj.months = Array.from(new Set(data.map(d => d.month)))
  heatmapObj.days = Array.from(new Set(data.map(d => d.day)))

  heatmapObj.x = d3.scaleBand()
    .range([0, width])
    .domain(heatmapObj.months)
    .padding(0.05);

  svg.append("g")
    .call(d3.axisTop(heatmapObj.x).tickSize(0).tickPadding(5))
    .select(".domain").remove();

  heatmapObj.y = d3.scaleBand()
    .range([0, height])
    .domain(heatmapObj.days)
    .padding(0.05);

  svg.append("g")
    .call(d3.axisLeft(heatmapObj.y).tickSize(0).tickPadding(5))
    .select(".domain").remove();
  const tooltip = d3.select("body").append("div")
    .style("opacity", 0)
    .attr("class", "tooltip-heatmap")


  const mouseout = function (d) {
    tooltip.style("opacity", 0)
    updateComponentsOnHeatmapLeave(this);
  }

  svg.selectAll(".heatmap")
    .data(data, function (d) { return d.month + ':' + d.day; })
    .join("rect")
    .attr("class", "heatmap")
    .attr("x", function (d) { return heatmapObj.x(d.month) })
    .attr("y", function (d) { return heatmapObj.y(d.day) })
    .attr("rx", "2")
    .attr("width", heatmapObj.x.bandwidth())
    .attr("height", "15px")
    .style("fill", function (d) { return getColorBasedOnValue(d.percentValue) })
    .on("mouseover", function (e, d) {
      d3.select(this)
        .style("stroke", "black")
        .style("stroke-width", "2px")
      if(d.value == undefined) d.value = 'N/A';
      tooltip
        .html("Date: " + d.day + " " + d.month + "<br>Value:  " + d.value)
        .style("opacity", 0.8)
        .style("top", e.pageY + 'px')
        .style("left", e.pageX + 'px');
      updateComponentsOnHeatmapHover(d.date, d.value);
    })
    .on("click", function (e, d) {
      d3.select(this)
        .style("stroke", "black")
        .style("stroke-width", "2px")
        if(d.value == undefined) d.value = 'N/A';
      tooltip
        .html("Date: " + d.day + " " + d.month + "<br>Value:  " + d.value)
        .style("opacity", 0.8)
        .style("top", e.pageY + 'px')
        .style("left", e.pageX + 'px');
      updateComponentsOnHeatmapClick(d.date, d.value, this);
    })
    .on("mouseout", mouseout)

  svg.append('rect')
    .style("fill", "none")
    .attr("stroke", 'black')
    .attr("stroke-width", "4px")
    .attr("id", "highlightMonth")
    .attr("width", heatmapObj.x.bandwidth())
    .attr("height", height)
    .attr("x", heatmapObj.x('Jan'))
    .attr("y", 0)
    .attr("opacity", 0)

  svg
    .append('text')
    .text('% of max value')
    .attr('fill', 'black')
    .attr('x', 60)
    .attr('y', 530)
    .style('font-size', '10px')

  svg
    .append('rect')
    .attr('x', -10)
    .attr('y', 540)
    .attr('width', 15)
    .attr('height', 15)
    .attr("rx", "2")
    .attr('fill', '#ffe7c6')

  svg
    .append('text')
    .text('>=0')
    .attr('fill', 'black')
    .attr('x', -15)
    .attr('y', 570)
    .style('font-size', '10px')

  svg
    .append('rect')
    .attr('x', 20)
    .attr('y', 540)
    .attr('width', 15)
    .attr('height', 15)
    .attr("rx", "2")
    .attr('fill', '#ffd19c')

  svg
    .append('text')
    .text('>12.5')
    .attr('fill', 'black')
    .attr('x', 15)
    .attr('y', 570)
    .style('font-size', '10px')

  svg
    .append('rect')
    .attr('x', 50)
    .attr('y', 540)
    .attr('width', 15)
    .attr('height', 15)
    .attr("rx", "2")
    .attr('fill', '#ffb681')

  svg
    .append('text')
    .text('>25')
    .attr('fill', 'black')
    .attr('x', 47)
    .attr('y', 570)
    .style('font-size', '10px')

  svg
    .append('rect')
    .attr('x', 80)
    .attr('y', 540)
    .attr('width', 15)
    .attr('height', 15)
    .attr("rx", "2")
    .attr('fill', '#ff8254')

  svg
    .append('text')
    .text('>37.5')
    .attr('fill', 'black')
    .attr('x', 73)
    .attr('y', 570)
    .style('font-size', '10px')

  svg
    .append('rect')
    .attr('x', 110)
    .attr('y', 540)
    .attr('width', 15)
    .attr('height', 15)
    .attr("rx", "2")
    .attr('fill', '#ff5244')

  svg
    .append('text')
    .text('>50')
    .attr('fill', 'black')
    .attr('x', 105)
    .attr('y', 570)
    .style('font-size', '10px')

  svg
    .append('rect')
    .attr('x', 140)
    .attr('y', 540)
    .attr('width', 15)
    .attr('height', 15)
    .attr("rx", "2")
    .attr('fill', '#fa0113')

  svg
    .append('text')
    .text('>62.5')
    .attr('fill', 'black')
    .attr('x', 133)
    .attr('y', 570)
    .style('font-size', '10px')

  svg
    .append('rect')
    .attr('x', 170)
    .attr('y', 540)
    .attr('width', 15)
    .attr('height', 15)
    .attr("rx", "2")
    .attr('fill', '#d10002')

  svg
    .append('text')
    .text('>75')
    .attr('fill', 'black')
    .attr('x', 168)
    .attr('y', 570)
    .style('font-size', '10px')

  svg
    .append('rect')
    .attr('x', 200)
    .attr('y', 540)
    .attr('width', 15)
    .attr('height', 15)
    .attr("rx", "2")
    .attr('fill', '#950000')

  svg
    .append('text')
    .text('>87.5')
    .attr('fill', 'black')
    .attr('x', 193)
    .attr('y', 570)
    .style('font-size', '10px')


};

export function heatMapChart(data) {
  var maxValue = 0;
  data.forEach(function (entry) {
    maxValue = Math.max(entry.value, maxValue);
  });
  data.forEach(function (entry) {
    entry.percentValue = entry.value / maxValue * 100;
  });

  if (!heatmapObj.months || !heatmapObj.days || JSON.stringify(Array.from(new Set(data.map(d => d.month)))) !== JSON.stringify(heatmapObj.months) || JSON.stringify(Array.from(new Set(data.map(d => d.day)))) !== JSON.stringify(heatmapObj.days)) {
    drawBaseHeatChart(data);
  }

  else {
    svg.selectAll(".heatmap")
      .data(data, function (d) { return d.month + ':' + d.day; })
      .join("rect")
      .attr("class", "heatmap")
      .attr("x", function (d) { return heatmapObj.x(d.month) })
      .attr("y", function (d) { return heatmapObj.y(d.day) })
      .attr("rx", "2")
      .attr("width", heatmapObj.x.bandwidth())
      .attr("height", "15px")
      .style("fill", function (d) { return getColorBasedOnValue(d.percentValue) })

  }
};

export function highlightHeatMapMonth(month) {
  svg.select("#highlightMonth")
    .attr("x", heatmapObj.x(month))
    .attr("opacity", 1)
}

export function removeHighlightHeatMapMonth() {
  svg.select("#highlightMonth")
    .attr("opacity", 0)
}