export function getSumOfAttr(data, attr) {
  var sum = 0;
  for (const [key, value] of Object.entries(data)) {
    if (key != "date") {
      sum += value[attr];
    }
  }
  return sum;
}

export function formattedTestAndVaccinationData(data) {
  var record = [];
  var testObj = { "title": "tests" };
  var vaccinationObj = { "title": "vaccinations" };
  testObj["ranges"] = [data["testSum"]];
  testObj["measures"] = [data["testCountry"]];
  testObj["markers"] = [data["testAvg"]];
  vaccinationObj["ranges"] = [data["vaccinationSum"]];
  vaccinationObj["measures"] = [data["vaccinationCountry"]];
  vaccinationObj["markers"] = [data["vaccinationAvg"]];
  record.push(testObj);
  record.push(vaccinationObj);
  return record;
}

export function formattedCasesAndDeathsData(data) {
  var record = [];
  var casesObj = { "title": "cases" };
  var deathObj = { "title": "death" };
  casesObj["ranges"] = [data["casesSum"]];
  casesObj["measures"] = [data["casesCountry"]];
  casesObj["markers"] = [data["casesAvg"]];
  deathObj["ranges"] = [data["deathSum"]];
  deathObj["measures"] = [data["deathCountry"]];
  deathObj["markers"] = [data["deathAvg"]];
  record.push(casesObj);
  record.push(deathObj);
  return record;
}

export function formattedPopulationData(data) {
  var record = [];
  var popObj = {};
  popObj["ranges"] = [data["worldPopulation"]];
  popObj["measures"] = [data["countryPopulation"]];
  record.push(popObj);
  return record;
}

export function formattedHBulletData(data) {
  var record = [];
  for (var i = 0; i < data["hbcasesSum"].length; i++) {
    var hObj = {};
    hObj["ranges"] = [data["hbcasesSum"][i]];
    hObj["measures"] = [data["hbcasesCountry"][i]];
    hObj["markers"] = [data["hbcasesAvg"][i]];
    hObj["id"] = i;
    record.push(hObj);
  }
  return record;
}

export function drawBulletChartVerticalUpdate(data, chartName, axisName, showMarkers, redSize, textMov, callbackFunc) {
  const margin = { top: 0, right: 5, bottom: 15, left: 0 };

  var caseDiv = d3.select(`#${chartName}`);
  var width = (document.querySelector(`#${chartName}`).offsetWidth - 50) / data.length;
  var height = document.querySelector(`#${chartName}`).offsetHeight - 15;
  var svg = caseDiv.selectAll(".bullet");
  const innerWidth = width - margin.left - margin.right - redSize;
  const innerHeigth = height - margin.top - margin.bottom;

  var maxRange = 1;
  for (var i = 0; i < data.length; i++) {
    maxRange = Math.max(maxRange, data[i]["measures"][0]);
    maxRange = Math.max(maxRange, data[i]["ranges"][0]);
    maxRange = Math.max(maxRange, data[i]["markers"][0]);
  }

  const caseChart = d3.bulletVertical()
    .callback(callbackFunc)
    .showMarkers(showMarkers)
    .setMinAxis(0)
    .setMaxAxis(maxRange)
    .width(innerWidth)
    .height(innerHeigth);

  const yScale = d3.scaleLog()
    .domain([1, maxRange])
    .range([innerHeigth, 0]);

  const yAxis = d3.axisLeft(yScale);

  yAxis
    .ticks(4)
    .tickFormat(d3.format(".2s"));

  var bsvg = svg.select("g");

  bsvg
    .datum((d, i) => {
      d.markers = [...data[i].markers];
      d.measures = [...data[i].measures];
      d.ranges = [...data[i].ranges];
      return d;
    })
    .call(caseChart.duration(1000));

  d3.select(`.${axisName}`)
    .transition()
    .duration(1000)
    .attr("height", `${height}px`);

  d3.select(`.${axisName}`).select("g")
    .transition()
    .duration(1000)
    .attr('transform', `translate(35,0)`)
    .call(yAxis).style("color", "#666");

  var title = bsvg.append("g")
    .style("text-anchor", "start")
    .attr("transform", "translate(" + (margin.left + textMov) + "," + (innerHeigth + 10) + ")");

  title.append("text")
    .attr("class", "title")
    .text(function (d) { return d.title; });
}

export function drawBulletChartVertical(data, chartName, axisName, showMarkers, redSize, textMov, callbackFunc) {

  const margin = { top: 0, right: 5, bottom: 15, left: 0 };

  var caseDiv = d3.select(`#${chartName}`);
  var width = (document.querySelector(`#${chartName}`).offsetWidth - 50) / data.length;
  var height = document.querySelector(`#${chartName}`).offsetHeight - 15;
  var svg = caseDiv.selectAll(".bullet");
  const innerWidth = width - margin.left - margin.right - redSize;
  const innerHeigth = height - margin.top - margin.bottom;

  var maxRange = 1;
  for (var i = 0; i < data.length; i++) {
    maxRange = Math.max(maxRange, data[i]["measures"][0]);
    maxRange = Math.max(maxRange, data[i]["ranges"][0]);
    maxRange = Math.max(maxRange, data[i]["markers"][0]);
  }

  const caseChart = d3.bulletVertical()
    .callback(callbackFunc)
    .showMarkers(showMarkers)
    .setMinAxis(0)
    .setMaxAxis(maxRange)
    .width(innerWidth)
    .height(innerHeigth);

  const yScale = d3.scaleLog()
    .domain([1, maxRange])
    .range([innerHeigth, 0]);

  const yAxis = d3.axisLeft(yScale);

  yAxis
    .ticks(4)
    .tickFormat(d3.format(".2s"));

  var bsvg = svg
    .data(data)
    .enter().append("svg")
    .attr("class", "bullet")
    .attr("id", function (d, i) { return "bchart" + i; })
    .attr("width", innerWidth + margin.left + margin.right)
    .attr("height", innerHeigth + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(caseChart);

  d3.select(`.${axisName}`)
    .attr("height", `${height}px`)
    .attr("width", "35px")
    .append("g")
    .attr('transform', `translate(35,0)`)
    .call(yAxis).style("color", "#666");

  var title = bsvg.append("g")
    .style("text-anchor", "start")
    .attr("transform", "translate(" + (margin.left + textMov) + "," + (innerHeigth + 10) + ")");

  title.append("text")
    .attr("class", "title")
    .text(function (d) { return d.title; });
}

export function drawBulletChartHorizontalUpdate(data, chartName, axisName, callBackFunc) {
  var margin = { top: 5, right: 10, bottom: 5, left: 10 };

  var caseDiv = d3.select(`#${chartName}Inner`);
  var width = (document.querySelector(`#${chartName}`).offsetWidth) - margin.left - margin.right;
  var height = document.querySelector(`#${chartName}`).offsetHeight / 3.5 - margin.top - margin.bottom;


  var chart = d3.bulletHorizontal()
    .callback(callBackFunc)
    .width(width - 15)
    .height(height);


  const xScale = d3.scaleLog()
    .domain([1, Math.max(data[0].ranges[0], data[0].measures[0])])
    .range([0, width - 15]);

  const xAxis = d3.axisTop(xScale).ticks(4)
    .tickFormat(d3.format(".2s"));;

  d3.select(`.${axisName}`).select("g")
    .transition()
    .duration(1000)
    .style("color", "#666")
    .attr('transform', `translate(${margin.left},20)`)
    .call(xAxis);

  var bsvg = caseDiv.selectAll("svg").select("g");

  bsvg
    .datum((d, i) => {
      d.measures = [...data[i].measures];
      d.ranges = [...data[i].ranges];
      return d;
    })
    .call(chart.duration(1000));
}

export function drawBulletChartHorizontal(data, chartName, axisName, callBackFunc) {
  var margin = { top: 5, right: 10, bottom: 5, left: 10 };

  var caseDiv = d3.select(`#${chartName}Inner`);
  var width = (document.querySelector(`#${chartName}`).offsetWidth) - margin.left - margin.right;
  var height = document.querySelector(`#${chartName}`).offsetHeight / 3.5 - margin.top - margin.bottom;


  var chart = d3.bulletHorizontal()
    .callback(callBackFunc)
    .width(width - 15)
    .height(height);


  const xScale = d3.scaleLog()
    .domain([1, Math.max(data[0].ranges[0], data[0].measures[0])])
    .range([0, width - 15]);

  const xAxis = d3.axisTop(xScale).ticks(4)
    .tickFormat(d3.format(".2s"));;

  d3.select(`.${axisName}`)
    .attr("height", 20)
    .attr("width", width + 15)
    .append("g")
    .attr('transform', `translate(${margin.left},20)`)
    .call(xAxis).style("color", "#666");

  var svg = caseDiv.selectAll("svg");

  var bsvg = svg
    .data(data)
    .enter().append("svg")
    .attr("class", "bullet")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(chart);
}

export function addNestingForCovidData() {
  const YEAR_START = 2021;
  const YEAR_END = 2022;
  const DATE_START = new Date(2021, 0, 1);
  const DATE_END = new Date(2022, 8, 30);

  var covidDataProcessed = {};

  for (var year = YEAR_START; year <= YEAR_END; year++) {
    covidDataProcessed[year] = {};
    for (var monthIdx = 1; monthIdx <= 12; monthIdx++) {
      covidDataProcessed[year][monthIdx] = {};
    }
  }

  for (var d = DATE_START; d <= DATE_END; d.setDate(d.getDate() + 1)) {
    covidDataProcessed[d.getFullYear()][d.getMonth() + 1][d.getDate()] = { date: new Date(d) }
  }
  return covidDataProcessed;
}

export function getAttributeSumForMonthForCountry(obj, country, attr) {
  var sum = 0;
  for (const [key, value] of Object.entries(obj)) {
    for (const [skey, svalue] of Object.entries(value)) {
      if (skey == country)
        sum += svalue[attr];
    }
  }
  return sum;
}

export function getDFAPercentage(current_value, avg_value) {

  var dfa_value = current_value - avg_value;
  var dfa_percent_value = dfa_value / avg_value * 100;
  if (dfa_percent_value > 100)
    dfa_percent_value = 100;
  if (dfa_percent_value < -100)
    dfa_percent_value = -100;

  return dfa_percent_value;
}

export function updateComponentPopulationUtil(globalData, obj, attr, aggregate_data) {
  var genericObj = {};
  genericObj["worldPopulation"] = globalData["worldPopulation"];
  genericObj["countryPopulation"] = 0;
  genericObj["testSum"] = globalData["testSum"];
  genericObj["testCountry"] = globalData["testCountry"];
  genericObj["testAvg"] = globalData["testAvg"];
  genericObj["vaccinationSum"] = globalData["vaccinationSum"];
  genericObj["vaccinationCountry"] = globalData["vaccinationCountry"];
  genericObj["vaccinationAvg"] = globalData["vaccinationAvg"];
  genericObj["casesSum"] = globalData["casesSum"];
  genericObj["casesCountry"] = globalData["casesCountry"];
  genericObj["casesAvg"] = globalData["casesAvg"];
  genericObj["deathSum"] = globalData["deathSum"];
  genericObj["deathCountry"] = globalData["deathCountry"];
  genericObj["deathAvg"] = globalData["deathAvg"];
  genericObj["hbcasesSum"] = globalData["hbcasesSum"];
  genericObj["hbcasesCountry"] = [-1, -1, -1, -1, -1, -1];
  genericObj["hbcasesAvg"] = [-1, -1, -1, -1, -1, -1];
  genericObj["date"] = globalData["date"];

  var ls = [];
  for (const [key, value] of Object.entries(obj)) {
    if (key != "date") {
      var record = {};
      record["name"] = key;
      record["attrValue"] = value[attr];
      record["attrLabel"] = attr;
      var avg_value = aggregate_data[key][attr].avg_value;
      record["attrDFAValue"] = getDFAPercentage(record["attrValue"], avg_value);
      record["attrAvg"] = avg_value;
      ls.push(record);
    }
  }
  genericObj["countryList"] = ls;
  return genericObj;
}

export function getAttributeSumForMonth(attr, obj, globalData) {
  var sum = 0;
  var countryObj = {};
  for (var i = 0; i < globalData.countryList.length; i++) {
    var country = globalData.countryList[i].name;
    countryObj[country] = i;
  }
  for (const [key, value] of Object.entries(obj)) {
    for (const [skey, svalue] of Object.entries(value)) {
      if (skey in countryObj)
        sum += svalue[attr];
    }
  }
  return sum;
}
