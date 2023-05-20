import { bulletVerticalFunc } from "./bulletVertical.js";
import { bulletHorizontalFunc } from "./bulletHorizontal.js";
import { heatMapChart, highlightHeatMapMonth, removeHighlightHeatMapMonth } from "./heatMap.js";

import * as util from "./utility.js";

var countries, projection, covidData, covidDataProcessed, globalData, prevState, aggregate_data, mg, showDetails, caxisg, tooltipBullet, swPrev, swCurr, selectedElement, mapSelectedElement, heatSelectedElement, prevCountryList, currentCountry, currentAttribute, prevHeatmapAction;
var heatMapPrevAttr, heatMapCurrAttr;

var map_svg, simulation;
var date_hard;
var dataOfDate;
var tooltip;

const START_DATE = "01/01/2022";
const END_DATE = "06/30/2022";

const COUNTRY_BORDER_COLOR = "#F0F0F0";
const COUNTRY_COLOR = "#CCCCCC";

const CIRCLE_BORDER_NORMAL = "0.4px";
const CIRCLE_BORDER_ON_OVER = "1px";
const CIRCLE_BORDER_SELECTED = "2px";

const TOOLTIP_OPACITY_ON_DISPLAY = 0.75;

function getHSum(obj, attr) {
  var rls = [0, 0, 0, 0, 0, 0];
  var sDate = new Date(START_DATE);
  var eDate = new Date(END_DATE);
  for (var d = sDate; d <= eDate; d.setDate(d.getDate() + 1)) {
    var idx = d.getMonth();
    var tobj = getDataofADate(d);
    for (const [key, value] of Object.entries(tobj)) {
      if (key != "date" && key in obj)
        rls[idx] += value[attr];
    }
  }
  return rls;
}

function getHCountry(obj, attr, countryName) {
  var rls = [0, 0, 0, 0, 0, 0];
  var sDate = new Date(START_DATE);
  var eDate = new Date(END_DATE);
  for (var d = sDate; d <= eDate; d.setDate(d.getDate() + 1)) {
    var idx = d.getMonth();
    var tobj = getDataofADate(d);
    if (countryName in tobj) {
      var countryData = tobj[countryName];
      rls[idx] += countryData[attr];
    }
  }
  return rls;
}

function getHAverage(obj, attr, countryName) {
  var rls = [0, 0, 0, 0, 0, 0];
  var sDate = new Date(START_DATE);
  var eDate = new Date(END_DATE);
  var countArr = [0, 0, 0, 0, 0, 0];
  for (var d = sDate; d <= eDate; d.setDate(d.getDate() + 1)) {
    var idx = d.getMonth();
    var tobj = getDataofADate(d);
    if (countryName in tobj) {
      var countryData = tobj[countryName];
      countArr[idx]++;
      rls[idx] += countryData[attr];
    }
  }
  for (var i = 0; i < rls.length; i++) {
    rls[i] = rls[i] / countArr[i];
  }
  return rls;
}

var population1radius = d3.scaleLog()
  .domain([1, 1000000])
  .range([1, 20]);

var population2radius = d3.scaleLog()
  .domain([1, 1000000])
  .range([1, 20]);

function getGenericObjForDateWithAttr(date, attr) {
  var obj = getDataofADate(date);
  var genericObj = {};
  genericObj["worldPopulation"] = util.getSumOfAttr(obj, "population");
  genericObj["countryPopulation"] = 0;
  genericObj["testSum"] = util.getSumOfAttr(obj, "new_tests");
  genericObj["testCountry"] = -1;
  genericObj["testAvg"] = -1;
  genericObj["vaccinationSum"] = util.getSumOfAttr(obj, "new_vaccinations");
  genericObj["vaccinationCountry"] = -1;
  genericObj["vaccinationAvg"] = -1;
  genericObj["casesSum"] = util.getSumOfAttr(obj, "new_cases");
  genericObj["casesCountry"] = -1;
  genericObj["casesAvg"] = -1;
  genericObj["deathSum"] = util.getSumOfAttr(obj, "new_deaths");
  genericObj["deathCountry"] = -1;
  genericObj["deathAvg"] = -1;
  genericObj["hbcasesSum"] = getHSum(obj, attr);
  genericObj["hbcasesCountry"] = [-1, -1, -1, -1, -1, -1];
  genericObj["hbcasesAvg"] = [-1, -1, -1, -1, -1, -1];
  genericObj["date"] = date;

  var ls = [];
  for (const [key, value] of Object.entries(obj)) {
    if (key != "date") {
      var record = {};
      record["name"] = key;
      record["attrValue"] = value[attr];
      record["attrLabel"] = attr;
      record["attrDFAValue"] = value["dfa-percent-" + attr];
      record["attrAvg"] = 0;
      ls.push(record);
    }
  }
  genericObj["countryList"] = ls;

  return genericObj;
}

function getGenericObjForDate(date) {
  var obj = getDataofADate(date);
  var genericObj = {};
  genericObj["worldPopulation"] = util.getSumOfAttr(obj, "population");
  genericObj["countryPopulation"] = 0;
  genericObj["testSum"] = util.getSumOfAttr(obj, "new_tests");
  genericObj["testCountry"] = -1;
  genericObj["testAvg"] = -1;
  genericObj["vaccinationSum"] = util.getSumOfAttr(obj, "new_vaccinations");
  genericObj["vaccinationCountry"] = -1;
  genericObj["vaccinationAvg"] = -1;
  genericObj["casesSum"] = util.getSumOfAttr(obj, "new_cases");
  genericObj["casesCountry"] = -1;
  genericObj["casesAvg"] = -1;
  genericObj["deathSum"] = util.getSumOfAttr(obj, "new_deaths");
  genericObj["deathCountry"] = -1;
  genericObj["deathAvg"] = -1;
  genericObj["hbcasesSum"] = getHSum(obj, 'new_cases');
  genericObj["hbcasesCountry"] = [-1, -1, -1, -1, -1, -1];
  genericObj["hbcasesAvg"] = [-1, -1, -1, -1, -1, -1];
  genericObj["date"] = date;

  var ls = [];
  for (const [key, value] of Object.entries(obj)) {
    if (key != "date") {
      var record = {};
      record["name"] = key;
      record["attrValue"] = value["new_cases"];
      record["attrLabel"] = "new_cases";
      record["attrDFAValue"] = value["dfa-percent-new_cases"];
      record["attrAvg"] = 0;
      ls.push(record);
    }
  }
  genericObj["countryList"] = ls;

  return genericObj;
}

function getDataofADate(date) {
  return covidDataProcessed[date.getFullYear()][date.getMonth() + 1][date.getDate()];
}

function updateComponentsOnPopulation(attr, isClicked) {
  var obj = getDataofADate(globalData["date"]);
  var genericObj = util.updateComponentPopulationUtil(globalData, obj, attr, aggregate_data);
  prevState = globalData
  globalData = genericObj;
  if (isClicked) {
    prevState = globalData;
  }
  heatMapPrevAttr = heatMapCurrAttr;
  heatMapCurrAttr = "population";
  if(isClicked)
    heatMapPrevAttr = heatMapCurrAttr;
  map();
  drawCasesAndDeathsBullet(true);
  drawTestsAndVaccinationBullet(true);
  drawHBullet(true);
  drawPopulationBullet(true);
  drawHeatChart(heatMapCurrAttr);
}

function updateComponentsOnH(id, isClicked) {
  prevState = globalData;
  var genericObj = {};
  var obj = covidDataProcessed[2022][id + 1];
  genericObj["worldPopulation"] = util.getAttributeSumForMonth("population", obj, globalData);
  genericObj["countryPopulation"] = 0;
  genericObj["testSum"] = util.getAttributeSumForMonth("new_tests", obj, globalData);
  genericObj["testCountry"] = -1;
  genericObj["testAvg"] = -1;
  genericObj["vaccinationSum"] = util.getAttributeSumForMonth("new_vaccinations", obj, globalData);
  genericObj["vaccinationCountry"] = -1;
  genericObj["vaccinationAvg"] = -1;
  genericObj["casesSum"] = util.getAttributeSumForMonth("new_cases", obj, globalData);
  genericObj["casesCountry"] = -1;
  genericObj["casesAvg"] = -1;
  genericObj["deathSum"] = util.getAttributeSumForMonth("new_deaths", obj, globalData);
  genericObj["deathCountry"] = -1;
  genericObj["deathAvg"] = -1;
  genericObj["hbcasesSum"] = globalData["hbcasesSum"];
  genericObj["hbcasesCountry"] = [-1,-1,-1,-1,-1,-1];
  genericObj["hbcasesAvg"] = [-1,-1,-1,-1,-1,-1];
  genericObj["date"] = globalData["date"];

  var ls = [];
  var countryObj = {};
  for (var i = 0; i < globalData.countryList.length; i++) {
    var country = globalData.countryList[i].name;
    countryObj[country] = i;
  }
  for (const [key, value] of Object.entries(countryObj)) {
    if (key != "date") {
      var record = {};
      record["name"] = key;
      record["attrValue"] = util.getAttributeSumForMonthForCountry(covidDataProcessed[2022][id + 1], key, "new_cases");
      record["attrLabel"] = "new_cases";
      var avg_value = aggregate_data[key]["new_cases"].avg_value;
      record["attrDFAValue"] = util.getDFAPercentage(record["attrValue"], avg_value);
      record["attrAvg"] = 0;
      ls.push(record);
    }
  }
  genericObj["countryList"] = ls;

  globalData = genericObj;
  if (isClicked)
    prevState = globalData;

  map();
  updateRecordsPane(id);
  drawCasesAndDeathsBullet(true);
  drawTestsAndVaccinationBullet(true);
  drawHBullet(true);
  drawPopulationBullet(true);
}

function updateComponents(attr, isClicked) {
  var obj = getDataofADate(globalData["date"]);
  var genericObj = {};
  genericObj["worldPopulation"] = globalData["worldPopulation"];
  genericObj["countryPopulation"] = 0;
  genericObj["testSum"] = globalData["testSum"];
  genericObj["testCountry"] = -1;
  genericObj["testAvg"] = -1;
  genericObj["vaccinationSum"] = globalData["vaccinationSum"];
  genericObj["vaccinationCountry"] = -1;
  genericObj["vaccinationAvg"] = -1;
  genericObj["casesSum"] = globalData["casesSum"];
  genericObj["casesCountry"] = -1;
  genericObj["casesAvg"] = -1;
  genericObj["deathSum"] = globalData["deathSum"];
  genericObj["deathCountry"] = -1;
  genericObj["deathAvg"] = -1;
  genericObj["hbcasesSum"] = getHSum(obj, attr);
  genericObj["hbcasesCountry"] = [-1, -1, -1, -1, -1, -1];
  genericObj["hbcasesAvg"] = [-1, -1, -1, -1, -1, -1];
  genericObj["date"] = globalData["date"];
  var sumOfAttr = 0;
  var ls = [];
  for (const [key, value] of Object.entries(obj)) {
    if (key != "date") {
      var record = {};
      record["name"] = key;
      record["attrValue"] = value[attr];
      record["attrLabel"] = attr;
      record["attrDFAValue"] = value["dfa-percent-" + attr];
      record["attrAvg"] = 0;
      sumOfAttr += value[attr];
      ls.push(record);
    }
  }
  genericObj["countryList"] = ls;
  prevState = globalData;
  heatMapPrevAttr = heatMapCurrAttr;
  globalData = genericObj;
  heatMapCurrAttr = attr;
  if (isClicked) {
    prevState = globalData;
    heatMapPrevAttr = heatMapCurrAttr;
  }

  map();
  drawHeatChart(heatMapCurrAttr);
  drawHBullet(true);
  drawCasesAndDeathsBullet(true);
  drawTestsAndVaccinationBullet(true);
  drawPopulationBullet(true);
  updateRecordsPane(-1);
  var currDate = new Date(globalData["date"].getTime());
  currDate.setDate(currDate.getDate() - 1);
  var pObj = getDataofADate(currDate);
  var prevSumOfAttr = 0;
  for (const [key, value] of Object.entries(pObj)) {
    if (key != "date") {
      prevSumOfAttr += value[attr];
    }
  }
  var change = prevSumOfAttr == 0 ? 0 : ((sumOfAttr - prevSumOfAttr) / prevSumOfAttr) * 100.0;

  swPrev = { ...swCurr };

  swCurr.date = globalData["date"].toDateString();
  swCurr.country = "Whole World";
  swCurr.attrDetails = `${sumOfAttr} ${attr}`;
  swCurr.change = change.toFixed(2);
  updateSelectionWindow();
}

function revertComponents(showSelectionWindow) {
  globalData = prevState;
  heatMapCurrAttr = heatMapPrevAttr;

  map();
  drawHeatChart(heatMapCurrAttr);
  updateRecordsPane(-1);
  drawCasesAndDeathsBullet(true);
  drawTestsAndVaccinationBullet(true);
  drawHBullet(true);
  drawPopulationBullet(true);
  if ((showSelectionWindow != -1)) {
    swCurr = { ...swPrev };
    updateSelectionWindow();
  }
  d3.select(selectedElement).select(".range").attr("stroke", "#7b7b7b").attr("stroke-width", "2px");
}

function bulletToolTipShow(event, d) {
  tooltipBullet.transition().duration(200).style('opacity', 0.9);
  tooltipBullet.html(`<table><tr><td style="text-align: center;">value: ${d.ranges[0]}</td></tr></table>`)
    .style('left', `${event.pageX}px`)
    .style('top', `${(event.pageY - 28)}px`);
}

function bulletToolTipReset() {
  tooltipBullet.transition()
    .duration(500)
    .style("opacity", 0);
}

function testsAndVaccinationsCallBack(event, d, ele, action) {
  if (action === "click") {
    if (mapSelectedElement != null) {
      mapSelectedElement.circleObj.attr("stroke-width", CIRCLE_BORDER_NORMAL);
      mapSelectedElement = null;
    }
    if (heatSelectedElement != null) {
      d3.select(heatSelectedElement).style("stroke-width", "0px");
      heatSelectedElement = null;
    }
    if (selectedElement != null)
      d3.select(selectedElement).select(".range").attr("stroke", "#E7E7E7").attr("stroke-width", "2px");
    selectedElement = ele;
    d3.select(ele).select(".range").attr("stroke", "#7b7b7b").attr("stroke-width", "2px");
    if (d.title == "tests") {
      updateComponents("new_tests", true);
    } else {
      updateComponents("new_vaccinations", true)
    }
    return;
  }
  if (action == "mouseover") {
    bulletToolTipShow(event, d);
    d3.select(ele).select(".range").attr("stroke", "#7b7b7b").attr("stroke-width", "2px");
    if (d.title == "tests") {
      updateComponents("new_tests", false);
    } else {
      updateComponents("new_vaccinations", false)
    }
  } else {

    bulletToolTipReset();
    d3.select(ele).select(".range").attr("stroke", "#E7E7E7").attr("stroke-width", "2px");
    if (d.title == "tests") {
      revertComponents(0);
    } else {
      revertComponents(0)
    }
  }
}

function populationCallBack(event, d, ele, action) {
  if (action === "click") {
    if (mapSelectedElement != null) {
      mapSelectedElement.circleObj.attr("stroke-width", CIRCLE_BORDER_NORMAL);
      mapSelectedElement = null;
    }
    if (heatSelectedElement != null) {
      d3.select(heatSelectedElement).style("stroke-width", "0px");
      heatSelectedElement = null;
    }
    if (selectedElement != null)
      d3.select(selectedElement).select(".range").attr("stroke", "#E7E7E7").attr("stroke-width", "2px");
    selectedElement = ele;
    d3.select(ele).select(".range").attr("stroke", "#7b7b7b").attr("stroke-width", "2px");
    updateComponentsOnPopulation("population", true);
    return;
  }
  if (action == "mouseover") {
    bulletToolTipShow(event, d);
    d3.select(ele).select(".range").attr("stroke", "#7b7b7b").attr("stroke-width", "2px");
    updateComponentsOnPopulation("population", false);
  } else {
    bulletToolTipReset();
    d3.select(ele).select(".range").attr("stroke", "#E7E7E7").attr("stroke-width", "2px");
    revertComponents(-1);
  }
}

function casesAndDeathsCallBack(event, d, ele, action) {
  if (action === "click") {
    if (mapSelectedElement != null) {
      mapSelectedElement.circleObj.attr("stroke-width", CIRCLE_BORDER_NORMAL);
      mapSelectedElement = null;
    }
    if (heatSelectedElement != null) {
      d3.select(heatSelectedElement).style("stroke-width", "0px");
      heatSelectedElement = null;
    }
    if (selectedElement != null)
      d3.select(selectedElement).select(".range").attr("stroke", "#E7E7E7").attr("stroke-width", "2px");
    selectedElement = ele;
    d3.select(ele).select(".range").attr("stroke", "#7b7b7b").attr("stroke-width", "2px");
    if (d.title == "cases") {
      updateComponents("new_cases", true);
    } else {
      updateComponents("new_deaths", true);
    }
    return;
  }
  if (action == "mouseover") {
    bulletToolTipShow(event, d);
    d3.select(ele).select(".range").attr("stroke", "#7b7b7b").attr("stroke-width", "2px");
    if (d.title == "cases") {
      updateComponents("new_cases", false);
    } else {
      updateComponents("new_deaths", false)
    }
  } else {
    bulletToolTipReset();
    d3.select(ele).select(".range").attr("stroke", "#E7E7E7").attr("stroke-width", "2px");
    if (d.title == "cases") {
      revertComponents(0);
    } else {
      revertComponents(0)
    }
  }
}

function idToMonth(id) {
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months[id];
}

function HCallBack(event, d, ele, action) {
  if (action === "click") {
    if (mapSelectedElement != null) {
      mapSelectedElement.circleObj.attr("stroke-width", CIRCLE_BORDER_NORMAL);
      mapSelectedElement = null;
    }
    if (heatSelectedElement != null) {
      d3.select(heatSelectedElement).style("stroke-width", "0px");
      heatSelectedElement = null;
    }
    if (selectedElement != null)
      d3.select(selectedElement).select(".range").attr("stroke", "#E7E7E7").attr("stroke-width", "2px");
    selectedElement = ele;
    d3.select(ele).select(".range").attr("stroke", "#7b7b7b").attr("stroke-width", "2px");
    updateComponentsOnH(d.id, true);
    return;
  }
  if (action == "mouseover") {
    bulletToolTipShow(event, d);
    d3.select(ele).select(".range").attr("stroke", "#7b7b7b").attr("stroke-width", "2px");
    updateComponentsOnH(d.id, false);
    highlightHeatMapMonth(idToMonth(d.id));
  } else {
    bulletToolTipReset();
    d3.select(ele).select(".range").attr("stroke", "#E7E7E7").attr("stroke-width", "2px");
    revertComponents(-1);
    removeHighlightHeatMapMonth();
  }
}

function drawTestsAndVaccinationBullet(isUpdate) {
  var data = util.formattedTestAndVaccinationData(globalData);
  if (!isUpdate)
    util.drawBulletChartVertical(data, "priorityBullet", "paxis", true, 55, 5, testsAndVaccinationsCallBack);
  else
    util.drawBulletChartVerticalUpdate(data, "priorityBullet", "paxis", true, 55, 5, testsAndVaccinationsCallBack);
}

function drawCasesAndDeathsBullet(isUpdate) {
  var data = util.formattedCasesAndDeathsData(globalData);
  if (!isUpdate)
    util.drawBulletChartVertical(data, "categoryBullet", "caxis", true, 55, 15, casesAndDeathsCallBack);
  else
    util.drawBulletChartVerticalUpdate(data, "categoryBullet", "caxis", true, 55, 15, casesAndDeathsCallBack);
}

function drawPopulationBullet(isUpdate) {
  var data = util.formattedPopulationData(globalData);
  if (!isUpdate)
    util.drawBulletChartHorizontal(data, "alertsBullet", "aaxis", populationCallBack);
  else
    util.drawBulletChartHorizontalUpdate(data, "alertsBullet", "aaxis", populationCallBack);
}

function drawHBullet(isUpdate) {
  var data = util.formattedHBulletData(globalData);
  if (!isUpdate)
    util.drawBulletChartVertical(data, "timeBullet", "taxis", false, 1, 1, HCallBack);
  else
    util.drawBulletChartVerticalUpdate(data, "timeBullet", "taxis", false, 1, 1, HCallBack);
}

function drawHeatChart(attribute, country) {
  var heatMapObj = {};
  var countryName;
  var attributeName;

  if (!attribute) attributeName = 'new_cases';
  else attributeName = attribute;
  currentAttribute = attributeName;
  var data = [];
  var covidMetaData = covidDataProcessed['2022'];
  Object.keys(covidMetaData).forEach(function (month) {
    if (month <= 6) {
      Object.keys(covidMetaData[month]).forEach(function (day) {
        var monthName = covidMetaData[month][day].date.toLocaleString('en-US', { month: 'short' });
        if (!country) {
          countryName = 'world';
          currentCountry = 'Whole World';
        }
        else {
          countryName = country;
          currentCountry = country;
        }
        if (!heatMapObj[countryName]) heatMapObj[countryName] = {};
        if (!heatMapObj[countryName][monthName]) heatMapObj[countryName][monthName] = {};
        if (!heatMapObj[countryName][monthName][day]) heatMapObj[countryName][monthName][day] = {
          new_cases: 0,
          new_deaths: 0,
          new_tests: 0,
          new_vaccinations: 0,
          date: covidMetaData[month][day].date
        };
        var entity = heatMapObj[countryName][monthName][day];
        if (countryName == 'world') {
          Object.keys(covidMetaData[month][day]).forEach(function (country) {
            if (country !== 'date') {
              if (covidMetaData[month][day][country]) {
                entity.new_cases += covidMetaData[month][day][country].new_cases || 0;
                entity.new_deaths += covidMetaData[month][day][country].new_deaths || 0;
                entity.new_tests += covidMetaData[month][day][country].new_tests || 0;
                entity.new_vaccinations += covidMetaData[month][day][country].new_vaccinations || 0;
              }
            }
          });
        }
        else {
          if (covidMetaData[month][day][countryName]) {
            entity.new_cases += covidMetaData[month][day][countryName].new_cases || 0;
            entity.new_deaths += covidMetaData[month][day][countryName].new_deaths || 0;
            entity.new_tests += covidMetaData[month][day][countryName].new_tests || 0;
            entity.new_vaccinations += covidMetaData[month][day][countryName].new_vaccinations || 0;
          }
        }
      })
    }
  })
  Object.keys(heatMapObj).forEach(function (country) {
    Object.keys(heatMapObj[country]).forEach(function (month) {
      Object.keys(heatMapObj[country][month]).forEach(function (day) {
        data.push({ 'month': month, 'day': day, 'value': heatMapObj[country][month][day][attributeName], 'date': heatMapObj[country][month][day].date })
      });
    });
  });
  heatMapChart(data);
}

document.addEventListener('DOMContentLoaded', function () {

  selectedElement = null;
  mapSelectedElement = null;
  heatMapCurrAttr = "new_cases";

  swCurr = {
    "date": "",
    "country": "",
    "attrDetails": "",
    "change": 0
  };

  tooltipBullet = d3.select('body').append('div')
    .attr('class', 'tooltip-bullet')
    .style('opacity', 0);

  tooltip = getToolTip();

  const covidDetailsBtn = document.querySelector('#covidDetailsBtn');
  showDetails = 0;
  covidDetailsBtn.addEventListener('click', function () {
    document.querySelector('#covidDetailsTable').style.opacity = 1 - showDetails;
    showDetails = 1 - showDetails;
    this.value = showDetails == 1 ? "Hide Details" : "Show Details";
  });

  document.querySelector('#covidDetailsTable').style.opacity = showDetails;


  Promise.all([d3.csv('data/covid.csv')]).then(function (values) {
    covidData = values[0];
    covidDataProcessed = util.addNestingForCovidData();
    covidData.forEach(d => {
      var currentDate = new Date(d["date"]);
      if ((currentDate.getFullYear() in covidDataProcessed)) {
        if (currentDate.getDate() in covidDataProcessed[currentDate.getFullYear()][currentDate.getMonth() + 1]) {
          covidDataProcessed[currentDate.getFullYear()][currentDate.getMonth() + 1][currentDate.getDate()][d.location] =
          {
            "new_cases": +d.new_cases,
            "total_cases": +d.total_cases,
            "new_deaths": +d.new_deaths,
            "new_tests": +d.new_tests,
            "new_vaccinations": +d.new_vaccinations,
            "country": d.location,
            "date": currentDate,
            "population": +d.population
          };
        }
      }
    });

    addAverateData();
    date_hard = new Date(2022, 5, 14);
    globalData = getGenericObjForDate(date_hard);
    prevState = globalData;
    drawCasesAndDeathsBullet(false);
    drawTestsAndVaccinationBullet(false);
    drawPopulationBullet(false);
    drawHBullet(false);
    drawHeatChart();
    extensionPlan();
    loadBasicSVGSetup();
    map();
    updateRecordsPane(-1);

    swCurr.date = date_hard.toDateString();
    swCurr.country = "Whole World";
    swCurr.attrDetails = `447867 new_cases`;
    swCurr.change = +73.41;

    updateSelectionWindow()
  });
});

function updateSelectionWindow() {
  var dateElement = document.querySelector("#selectionWindowDate");
  var nameElement = document.querySelector("#selectionWindowName");
  var attrElement = document.querySelector("#selectionWindowAttr");
  var incArrowElement = document.querySelector("#selectionWindowIncArrow");
  var incDataElement = document.querySelector("#selectionWindowIncData");
  dateElement.innerText = swCurr.date;
  nameElement.innerHTML = swCurr.country;
  attrElement.innerHTML = swCurr.attrDetails;
  if (Math.abs(swCurr.change) == 0 || !isFinite(swCurr.change)) {
    incArrowElement.innerHTML = '';
    incDataElement.textContent = "NA";
  } else {
    incArrowElement.innerHTML = swCurr.change < 0 ? `&darr;` : `&uarr;`;
    incArrowElement.style.color = swCurr.change < 0 ? `red` : `green`;
    incDataElement.textContent = Math.abs(swCurr.change) + "%";
  }
}

function updateRecordsPane(month) {
  var tableBody = document.querySelector('#covidDetailTableBody');
  tableBody.innerHTML = "";
  var obj = month == -1 ? getDataofADate(globalData["date"]) : {};
  var cls = globalData["countryList"];
  for (var i = 0; i < cls.length; i++) {
    var record = cls[i];
    var countryName = record["name"];
    var tableRow = tableBody.insertRow();
    var serialCell = tableRow.insertCell();
    var nameCell = tableRow.insertCell();
    var vaccinationCell = tableRow.insertCell();
    var testcaseCell = tableRow.insertCell();
    var deathsCell = tableRow.insertCell();
    var casesCell = tableRow.insertCell();
    serialCell.innerHTML = i;
    nameCell.innerHTML = countryName;
    var newCases = month == -1 ? obj[countryName].new_cases : util.getAttributeSumForMonthForCountry(covidDataProcessed[2022][month + 1], countryName, "new_cases");
    var newVaccination = month == -1 ? obj[countryName].new_vaccinations : util.getAttributeSumForMonthForCountry(covidDataProcessed[2022][month + 1], countryName, "new_vaccinations");
    var newDeaths = month == -1 ? obj[countryName].new_deaths : util.getAttributeSumForMonthForCountry(covidDataProcessed[2022][month + 1], countryName, "new_deaths");
    var newTests = month == -1 ? obj[countryName].new_tests : util.getAttributeSumForMonthForCountry(covidDataProcessed[2022][month + 1], countryName, "new_tests");
    vaccinationCell.innerHTML = newVaccination;
    testcaseCell.innerHTML = newTests;
    deathsCell.innerHTML = newDeaths;
    casesCell.innerHTML = newCases;
  }
}


function addAverateData() {
  aggregate_data = {};
  covidData.forEach(d => {
    var currentDate = new Date(d["date"]);
    if ((currentDate.getFullYear() in covidDataProcessed)) {
      if (currentDate.getDate() in covidDataProcessed[currentDate.getFullYear()][currentDate.getMonth() + 1]) {
        if (!(d.location in aggregate_data)) {
          aggregate_data[d.location] = {};
        }
        var data = covidDataProcessed[currentDate.getFullYear()][currentDate.getMonth() + 1][currentDate.getDate()][d.location];
        for (const [key, value] of Object.entries(data)) {

          if (key === "country" || key === "date")
            continue;

          if (!((key in aggregate_data[d.location]))) {
            aggregate_data[d.location][key] = {
              total_value: 0,
              avg_value: 0,
              total_count: 0,

            };
          }
          aggregate_data[d.location][key]['total_value'] += value;
          aggregate_data[d.location][key]['total_count']++;
          aggregate_data[d.location][key]['avg_value'] = aggregate_data[d.location][key]['total_value'] / aggregate_data[d.location][key]['total_count'];

        }

        if (!(currentDate.getFullYear() in aggregate_data)) {
          aggregate_data[currentDate.getFullYear()] = {};
        }
        if (!((currentDate.getMonth() + 1) in aggregate_data[currentDate.getFullYear()])) {
          aggregate_data[currentDate.getFullYear()][currentDate.getMonth() + 1] = {};
        }
        if (!(currentDate.getDate() in aggregate_data[currentDate.getFullYear()][currentDate.getMonth() + 1])) {
          aggregate_data[currentDate.getFullYear()][currentDate.getMonth() + 1][currentDate.getDate()] = {};
        }

        var data = covidDataProcessed[currentDate.getFullYear()][currentDate.getMonth() + 1][currentDate.getDate()][d.location];
        for (const [key, value] of Object.entries(data)) {

          if (key === "country" || key === "date")
            continue;
          var aggregate_data_of_date = aggregate_data[currentDate.getFullYear()][currentDate.getMonth() + 1][currentDate.getDate()];
          if (!((key in aggregate_data_of_date))) {
            aggregate_data_of_date[key] = {
              total_value: 0,
              avg_value: 0,
              total_count: 0,

            };
          }
          aggregate_data_of_date[key]['total_value'] += value;
          aggregate_data_of_date[key]['total_count']++;
          aggregate_data_of_date[key]['avg_value'] = aggregate_data_of_date[key]['total_value'] / aggregate_data_of_date[key]['total_count'];

        }

      }
    }

  });


  covidData.forEach(d => {
    var currentDate = new Date(d["date"]);
    if ((currentDate.getFullYear() in covidDataProcessed)) {
      if (currentDate.getDate() in covidDataProcessed[currentDate.getFullYear()][currentDate.getMonth() + 1]) {

        var data = covidDataProcessed[currentDate.getFullYear()][currentDate.getMonth() + 1][currentDate.getDate()][d.location];


        for (const [key, value] of Object.entries(data)) {

          if (key === "country" || key === "date")
            continue;

          var avg_key = "avg-" + key;

          var avg_value = aggregate_data[d.location][key]['avg_value'];

          var dfa_percent_key = "dfa-percent-" + key;
          var dfa_percent_value = util.getDFAPercentage(value, avg_value);

          data[avg_key] = avg_value;
          data[dfa_percent_key] = dfa_percent_value;

        }

      }
    }

  });

}

function getTypeOfProjection() {
  return d3.geoMercator().scale(175);
}

function addCentroid() {
  countries.features.forEach(feature => {
    feature.centroid = centroid(feature);
    return feature;
  });
}

function addDeviation() {
  countries.features.forEach(feature => {
    var devaitionScale = d3.scaleLinear()
      .domain([-100, 100])
      .range([0.8, 0.2]);
    feature.deviationColorZeroOne = devaitionScale(feature.dfaValue);
    feature.deviationColor = d3.interpolateRdBu(feature.deviationColorZeroOne);
    return feature;
  });
}

function addSelectedFeatureDataToMapDataFromGlobalData() {
  countries.features.forEach(feature => {
    var countryName = feature.properties.name;
    var countryData = globalData.countryList.find(x => x.name === countryName);

    if (typeof countryData === 'undefined') {
    } else {
      feature.attributeValue = countryData.attrValue;
      feature.attributeLabel = countryData.attrLabel;
      feature.dfaValue = countryData.attrDFAValue;
      if (feature.attributeLabel == "population") {
        feature.radius = population1radius(feature.attributeValue);
      }
      else {
        feature.radius = population2radius(feature.attributeValue);
      }

    }
  });
}

function drawCountriesWithBorder(g, path) {
  g.selectAll('path')
    .data(countries.features)
    .enter()
    .append('path').attr('class', 'country').attr('d', path)
    .style("fill", COUNTRY_COLOR)
    .style("stroke", COUNTRY_BORDER_COLOR);
}

function getToolTip() {
  return d3.select("body").append("div")
    .attr("class", "tooltipmain")
    .style("opacity", 0);
}

function getSimulation() {
  return d3.forceSimulation(countries.features)
    .force('charge', d3.forceManyBody().strength(-1))
    .force("x", d3.forceX(d => { return projection(d.centroid)[0]; }))
    .force("y", d3.forceY(d => projection(d.centroid)[1]))
    .force("collision", d3.forceCollide(d => 1 + d.radius));

}

function getToolTipHTMLContent(d) {
  const NEW_LINE = "<br/>", SPACE = " ", SEMICOLON = ":";
  const FONT_YLW_TAG_START = '<FONT COLOR="#FF0000">';
  const FONT_YLW_TAG_END = '</FONT>'
  const selectedDateFormatted = globalData["date"].toDateString();
  var toolTipContent = ""
    .concat(selectedDateFormatted)
    .concat(NEW_LINE)
    .concat(d.properties.name).concat(SEMICOLON)
    .concat(NEW_LINE)
    .concat(FONT_YLW_TAG_START).concat(d.attributeValue).concat(SPACE)
    .concat(d.attributeLabel).concat(FONT_YLW_TAG_END);

  return toolTipContent;
}

function onMouseoverCountryCircle(d, event, circleObj) {
  tooltip.transition()
    .duration(200)
    .style("opacity", .7);
  tooltip.html(getToolTipHTMLContent(d))
    .style("left", (event.pageX) + "px")
    .style("top", (event.pageY - 28) + "px");
  circleObj.attr("stroke-width", CIRCLE_BORDER_ON_OVER);
  if (mapSelectedElement !== null) 
    mapSelectedElement.circleObj.attr("stroke-width", CIRCLE_BORDER_SELECTED);

  swPrev = { ...swCurr };

  var obj = getDataofADate(globalData["date"]);

  swCurr.date = globalData["date"].toDateString();
  swCurr.country = d.properties.name;
  swCurr.attrDetails = `${d.attributeValue} ${d.attributeLabel}`;

  var currDate = new Date(globalData["date"].getTime());
  currDate.setDate(currDate.getDate() - 1);
  var pObj = getDataofADate(currDate);
  var prevSumOfAttr = 0;
  for (const [key, value] of Object.entries(pObj)) {
    if (key != "date" && key == d.properties.name) {
      prevSumOfAttr = value[d.attributeLabel];
      break;
    }
  }
  var change = prevSumOfAttr == 0 ? 0 : ((d.attributeValue - prevSumOfAttr) / prevSumOfAttr) * 100.0;
  swCurr.change = change.toFixed(2);

  updateSelectionWindow();
  updateDataOnCircleEvent(d.properties.name, d.attributeLabel, circleObj, false);
  drawHeatChart(d.attributeLabel, d.properties.name);
}

function onMousemoveCountryCircle(d, event) {
  tooltip.transition()
    .duration(200)
    .style("opacity", .7);
  tooltip.html(getToolTipHTMLContent(d))
    .style("left", (event.pageX) + "px")
    .style("top", (event.pageY - 28) + "px");


}

function onMouseOutCountryCircle(d, circleObj) {
  tooltip.transition()
    .duration(500)
    .style("opacity", 0);

  if (mapSelectedElement !== null) {
    updateDataOnCircleEvent(mapSelectedElement.d.properties.name, mapSelectedElement.d.attributeLabel, mapSelectedElement.circleObj, true);

    swCurr = { ...swPrev };
    updateSelectionWindow();
    drawHeatChart(mapSelectedElement.d.attributeLabel, mapSelectedElement.d.properties.name);
  }
  else {
    circleObj.attr("stroke-width", CIRCLE_BORDER_NORMAL);
    globalData = prevState;
    drawCasesAndDeathsBullet(true);
    drawTestsAndVaccinationBullet(true);
    drawHBullet(true);
    drawPopulationBullet(true);
    swCurr = { ...swPrev };
    updateSelectionWindow();
    drawHeatChart(d.attributeLabel);
  }
}

function onClickCountryCircle(d, event, circleObj) {
  if (mapSelectedElement !== null) {
    mapSelectedElement.circleObj.attr("stroke-width", CIRCLE_BORDER_NORMAL);
  }
  if (selectedElement != null) {
    d3.select(selectedElement).select(".range").attr("stroke", "#E7E7E7").attr("stroke-width", "2px");
    selectedElement = null;
  }
  if (heatSelectedElement != null) {
    d3.select(heatSelectedElement).style("stroke-width", "0px");
    heatSelectedElement = null;
  }
  mapSelectedElement = {
    circleObj: circleObj,
    d: d,
    event: event
  };
  circleObj.attr("stroke-width", CIRCLE_BORDER_SELECTED);
  updateDataOnCircleEvent(d.properties.name, d.attributeLabel, circleObj, true);


  var obj = getDataofADate(globalData["date"]);

  swCurr.date = globalData["date"].toDateString();
  swCurr.country = d.properties.name;
  swCurr.attrDetails = `${d.attributeValue} ${d.attributeLabel}`;

  var currDate = new Date(globalData["date"].getTime());
  currDate.setDate(currDate.getDate() - 1);
  var pObj = getDataofADate(currDate);
  var prevSumOfAttr = 0;
  for (const [key, value] of Object.entries(pObj)) {
    if (key != "date" && key == d.properties.name) {
      prevSumOfAttr = value[d.attributeLabel];
      break;
    }
  }
  var change = prevSumOfAttr == 0 ? 0 : ((d.attributeValue - prevSumOfAttr) / prevSumOfAttr) * 100.0;
  swCurr.change = change.toFixed(2);
  swPrev = { ...swCurr };

  updateSelectionWindow();
  drawHeatChart(d.attributeLabel, d.properties.name);
}

function updateDataOnCircleEvent(countryName, attributeLabel, circleObj, isClicked) {
  var obj = getDataofADate(globalData["date"]);

  var current_date = globalData["date"];
  var aggr_data_of_date = aggregate_data[current_date.getFullYear()][current_date.getMonth() + 1][current_date.getDate()];
  var genericObj = {};
  genericObj["worldPopulation"] = globalData["worldPopulation"];
  var countryDataForaDate = obj[countryName];
  genericObj["countryPopulation"] = obj[countryName]["population"];

  genericObj["testCountry"] = obj[countryName]["new_tests"];

  genericObj["testAvg"] = aggr_data_of_date["new_tests"].avg_value;

  genericObj["vaccinationCountry"] = obj[countryName]["new_vaccinations"];

  genericObj["vaccinationAvg"] = aggr_data_of_date["new_vaccinations"].avg_value;

  genericObj["casesCountry"] = obj[countryName]["new_cases"];

  genericObj["casesAvg"] = aggr_data_of_date["new_cases"].avg_value;

  genericObj["deathCountry"] = obj[countryName]["new_deaths"];

  genericObj["deathAvg"] = aggr_data_of_date["new_deaths"].avg_value;

  genericObj["testSum"] = globalData["testSum"];

  genericObj["vaccinationSum"] = globalData["vaccinationSum"];

  genericObj["casesSum"] = globalData["casesSum"];

  genericObj["deathSum"] = globalData["deathSum"];

  var attr = attributeLabel;
  genericObj["hbcasesSum"] = getHSum(obj, attr);

  genericObj["hbcasesCountry"] = getHCountry(obj, attr, countryName);

  genericObj["hbcasesAvg"] = getHAverage(obj, attr, countryName);
  genericObj["date"] = globalData["date"];
  var ls = [];
  for (const [key, value] of Object.entries(obj)) {
    if (key != "date") {
      var record = {};
      record["name"] = key;
      record["attrValue"] = value[attr];
      record["attrDFAValue"] = value["dfa-percent-" + attr];
      record["attrAvg"] = 0;
      record["attrLabel"] = attr;
      ls.push(record);
    }
  }
  genericObj["countryList"] = ls;
  prevState = globalData
  globalData = genericObj;

  if (isClicked) {
    prevState = globalData;
  }

  drawCasesAndDeathsBullet(true);
  drawTestsAndVaccinationBullet(true);
  drawHBullet(true);
  drawPopulationBullet(true);
}

const textEnter = (d) => {
  var td = d.append("g")
    .attr("class", "country_g")
    .attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    })
    .style("opacity", function (d) { return d.radius > 0 ? 1 : 0; });

  td
    .append('text')
    .attr("class", "country_text")
    .style("font", "12px sans-serif")
    .text(function (d) { return d.properties.name; });

  return d;
}

const textUpdate = (d) => {
  d
    .attr("transform", function (d) {

      return "translate(" + d.x + "," + d.y + ")";
    })
    .style("opacity", function (d) { return d.radius > 0 ? 1 : 0; });

  return d;
}

const textExit = (d) => {
  return d.transition().duration(1000).style("opacity", 0).remove();
}

const circleEnter = (d) => {
  return d.append("circle")
    .attr("class", "country_circle")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", d => d.radius)
    .style("fill", d => d.deviationColor)
    .style("stroke", "black")
    .attr("stroke-width", CIRCLE_BORDER_NORMAL)
    .on('mouseover', function (event, d) {
      onMouseoverCountryCircle(d, event, d3.select(this));
    })
    .on('mousemove', function (event, d) {
      onMousemoveCountryCircle(d, event);
    })
    .on("mouseout", function (event, d) {
      onMouseOutCountryCircle(d, d3.select(this));
    })
    .on("click", function (event, d) {
      onClickCountryCircle(d, event, d3.select(this));
    });

}

const circleUpdate = (d) => {
  return d
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", d => d.radius)
    .style("fill", d => d.deviationColor);
}

const circleExit = (d) => {
  return d.transition().duration(500).style("opacity", 0)
    .remove();
}

function loadBasicSVGSetup() {
  var margin = { top: 150, left: 50, right: 50, bottom: 50 },
    height = 1270 - margin.top - margin.bottom,
    width = 600 - margin.left - margin.right;

  map_svg = d3.select('#map_svg').selectAll("circle").remove();
  map_svg = d3.select('#map_svg')
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  projection = getTypeOfProjection();
  const path = d3.geoPath();
  path.projection(projection);
  mg = map_svg.append('g');
  d3.json('https://cdn.jsdelivr.net/npm//world-atlas@2/countries-110m.json').then(mapData => {



    countries = topojson.feature(mapData, mapData.objects.countries);
    addCentroid();
    drawCountriesWithBorder(mg, path);
  });


}

function map() {


  d3.json('https://cdn.jsdelivr.net/npm//world-atlas@2/countries-110m.json').then(mapData => {



    countries = topojson.feature(mapData, mapData.objects.countries);
    addCentroid();

    addSelectedFeatureDataToMapDataFromGlobalData();
    addDeviation();


    countries.features = countries.features.map(item => {
      item["x"] = projection(item.centroid)[0];
      item["y"] = projection(item.centroid)[1];
      return item;
    });


    d3.forceSimulation(countries.features)
      .force('charge', d3.forceManyBody().strength(-1))
      .force("x", d3.forceX(d => { return projection(d.centroid)[0]; }))
      .force("y", d3.forceY(d => projection(d.centroid)[1]))
      .force("collision", d3.forceCollide(d => 1 + d.radius))
      .on("tick", () => {


        mg.selectAll('.country_circle')
          .data(countries.features, function (d) { return d.properties.name; })
          .join(circleEnter, circleUpdate, circleExit);

        mg.selectAll('.country_g')
          .data(countries.features, function (d) { return d.properties.name; })
          .join(textEnter, textUpdate, textExit);
      });


    addLegendCircle(mg, countries.features[98].attributeLabel);


  });

}


function getX(d) {
  return projection(d.centroid)[0];
}

function getY(d) {
  return projection(d.centroid)[1];
}

var centroid = (feature) => {
  const geometry = feature.geometry;
  if (geometry.type === "Polygon") {
    return d3.geoCentroid(feature);
  }
  else {
    let largestPolygon = {}, largestArea = 0;
    geometry.coordinates.forEach(coordinates => {
      const polygon = { type: "Polygon", coordinates },
        area = d3.geoArea(polygon);
      if (area > largestArea) {
        largestPolygon = polygon;
        largestArea = area;
      }
    });
    return d3.geoCentroid(largestPolygon);
  }


}

function addLegendCircle(mg, label) {
  const circleValues = [1, 10, 100, 1000, 10000, 100000, 1000000];
  var legendCircleCenterX = 50;
  var legendCircleCenterY = 350;
  var lineLength = 50;
  var lineTextGap = 5;
  var lineTextFontSize = 10;
  var lineTextVerticalAdjust = lineTextFontSize / 2;

  var odd = 1;

  mg
    .selectAll('.legendcircle')
    .data(circleValues)
    .enter()
    .append('circle')
    .attr('class', "legendcircle")
    .attr('r', d => { return population2radius(d); })
    .attr('cx', legendCircleCenterX)
    .attr('cy', legendCircleCenterY)
    .style('fill', 'none')
    .style('stroke', "black")
    .style('opacity', 1);

  mg
    .selectAll('.legendline')
    .data(circleValues)
    .enter()
    .append('line')
    .attr('class', "legendline")
    .attr('x1', d => legendCircleCenterX)
    .attr('y1', d => legendCircleCenterY + population2radius(d))
    .attr('x2', d => { odd = 1 - odd; return legendCircleCenterX + lineLength + odd * lineLength; })
    .attr('y2', d => legendCircleCenterY + population2radius(d))
    .style('stroke', "black")
    .style('opacity', 1);

  odd = 1;

  mg
    .selectAll('.legendtext')
    .data(circleValues)
    .enter()
    .append('text')
    .attr('class', "legendtext")
    .attr('x', d => { odd = 1 - odd; return legendCircleCenterX + lineLength + odd * lineLength + lineTextGap })
    .attr('y', d => legendCircleCenterY + population2radius(d) + lineTextVerticalAdjust)
    .text(d => d3.format(".2s")(d))

    .style("font-size", `${lineTextFontSize}px`)
    .style('opacity', 1);


}


export function updateComponentsOnHeatmapHover(date, attrValue) {
  var genericObj = getGenericObjForDateWithAttr(date,currentAttribute);
  prevState = globalData;
  globalData = genericObj;
  map();
  drawTestsAndVaccinationBullet(true);
  drawCasesAndDeathsBullet(true);
  drawPopulationBullet(true);
  drawHBullet(true);

  swPrev = { ...swCurr };

  swCurr.date = globalData["date"].toDateString();
  swCurr.country = currentCountry;
  swCurr.attrDetails = `${attrValue} ${currentAttribute}`;

  var currDate = new Date(globalData["date"].getTime());
  currDate.setDate(currDate.getDate() - 1);
  var pObj = getDataofADate(currDate);
  var prevSumOfAttr = 0;
  if (!currentCountry || currentCountry == 'Whole World') {
    for (const [key, value] of Object.entries(pObj)) {
      if (key != "date") {
        prevSumOfAttr += value[currentAttribute];
      }
    }
  }
  else {
    for (const [key, value] of Object.entries(pObj)) {
      if (key != "date" && key == currentCountry) {
        prevSumOfAttr = value[currentAttribute];
        break;
      }
    }
  }
  var change;
  if (prevSumOfAttr == 0 || attrValue == 0) change = 0;
  else
    change = ((attrValue - prevSumOfAttr) / prevSumOfAttr) * 100.0;
  swCurr.change = change.toFixed(2);

  updateSelectionWindow();
  prevHeatmapAction = 'hover';
}

export function updateComponentsOnHeatmapClick(date, attrValue, heatSelectedElementRef) {
  if (mapSelectedElement != null) {
    mapSelectedElement.circleObj.attr("stroke-width", CIRCLE_BORDER_NORMAL);
    mapSelectedElement = null;
  }
  if (selectedElement != null) {
    d3.select(selectedElement).select(".range").attr("stroke", "#E7E7E7").attr("stroke-width", "2px");
    selectedElement = null;
  }

  if (heatSelectedElement != null && heatSelectedElement !== heatSelectedElementRef) {
    d3.select(heatSelectedElement).style("stroke-width", "0px");
    heatSelectedElement = null;
  }

  heatSelectedElement = heatSelectedElementRef;

  var genericObj = getGenericObjForDateWithAttr(date,currentAttribute);
  globalData = genericObj;
  prevState = globalData;
  map();
  drawTestsAndVaccinationBullet(true);
  drawCasesAndDeathsBullet(true);
  drawPopulationBullet(true);
  drawHBullet(true);

  swCurr.date = globalData["date"].toDateString();
  swCurr.country = currentCountry;
  swCurr.attrDetails = `${attrValue} ${currentAttribute}`;

  var currDate = new Date(globalData["date"].getTime());
  currDate.setDate(currDate.getDate() - 1);
  var pObj = getDataofADate(currDate);
  var prevSumOfAttr = 0;
  if (!currentCountry || currentCountry == 'Whole World') {
    for (const [key, value] of Object.entries(pObj)) {
      if (key != "date") {
        prevSumOfAttr += value[currentAttribute];
      }
    }
  }
  else {
    for (const [key, value] of Object.entries(pObj)) {
      if (key != "date" && key == currentCountry) {
        prevSumOfAttr = value[currentAttribute];
        break;
      }
    }
  }
  var change;
  if (prevSumOfAttr == 0 || attrValue == 0) change = 0;
  else
    change = ((attrValue - prevSumOfAttr) / prevSumOfAttr) * 100.0;
  swCurr.change = change.toFixed(2);
  swPrev = { ...swCurr };
  updateSelectionWindow();

  prevHeatmapAction = 'click';
}

export function updateComponentsOnHeatmapLeave(heatHoveredElement) {
  if (prevHeatmapAction == 'hover') {
    if (heatHoveredElement != heatSelectedElement)
      d3.select(heatHoveredElement).style("stroke-width", "0px");
  }
  if (prevHeatmapAction == 'click') {
    d3.select(heatSelectedElement).style("stroke-width", "2px");
  }
  globalData = prevState;
  map();
  drawTestsAndVaccinationBullet(true);
  drawCasesAndDeathsBullet(true);
  drawPopulationBullet(true);
  drawHBullet(true);

  swCurr = { ...swPrev };
  updateSelectionWindow();
}

function extensionPlan() {
  d3.select('#least')
    .on('mouseover', function (e, d) {
      var minValue = -100, maxValue = -51;
      d3.select(this).style("stroke", "black")
      d3.select(this).style("stroke-width", "4px")
      prevCountryList = [];
      var modifiedCountryList = [];
      var countryList = globalData.countryList;
      countryList.forEach(function (country) {
        prevCountryList.push(country);
        if (minValue <= country.attrDFAValue && country.attrDFAValue <= maxValue)
          modifiedCountryList.push(country);
      });
      globalData.countryList = modifiedCountryList;
      map();
    })
    .on('mouseout', function (e, d) {
      d3.select(this).style("fill", "rgb(125, 183, 215)")
      d3.select(this).style("stroke-width", "0.5px")
      globalData.countryList = prevCountryList;
      map();
    })

  d3.select('#less')
    .on('mouseover', function (e, d) {
      var minValue = -50, maxValue = -1;
      d3.select(this).style("stroke", "black")
      d3.select(this).style("stroke-width", "4px")
      prevCountryList = [];
      var modifiedCountryList = [];
      var countryList = globalData.countryList;
      countryList.forEach(function (country) {
        prevCountryList.push(country);
        if (minValue <= country.attrDFAValue && country.attrDFAValue <= maxValue)
          modifiedCountryList.push(country);
      });
      globalData.countryList = modifiedCountryList;
      map();
    })
    .on('mouseout', function (e, d) {
      d3.select(this).style("fill", "rgb(217, 232, 241)")
      d3.select(this).style("stroke-width", "0.5px")
      globalData.countryList = prevCountryList;
      map();
    })

  d3.select('#more')
    .on('mouseover', function (e, d) {
      var minValue = 0, maxValue = 50;
      d3.select(this).style("stroke", "black")
      d3.select(this).style("stroke-width", "4px")
      prevCountryList = [];
      var modifiedCountryList = [];
      var countryList = globalData.countryList;
      countryList.forEach(function (country) {
        prevCountryList.push(country);
        if (minValue <= country.attrDFAValue && country.attrDFAValue <= maxValue)
          modifiedCountryList.push(country);
      });
      globalData.countryList = modifiedCountryList;
      map();
    })
    .on('mouseout', function (e, d) {
      d3.select(this).style("fill", "rgb(250, 224, 209)")
      d3.select(this).style("stroke-width", "0.5px")
      globalData.countryList = prevCountryList;
      map();
    })

  d3.select('#most')
    .on('mouseover', function (e, d) {
      var minValue = 51, maxValue = 100;
      d3.select(this).style("stroke", "black")
      d3.select(this).style("stroke-width", "4px")
      prevCountryList = [];
      var modifiedCountryList = [];
      var countryList = globalData.countryList;
      countryList.forEach(function (country) {
        prevCountryList.push(country);
        if (minValue <= country.attrDFAValue && country.attrDFAValue <= maxValue)
          modifiedCountryList.push(country);
      });
      globalData.countryList = modifiedCountryList;
      map();
    })
    .on('mouseout', function (e, d) {
      d3.select(this).style("fill", "rgb(235, 147, 118)")
      d3.select(this).style("stroke-width", "0.5px")
      globalData.countryList = prevCountryList;
      map();
    })
}
