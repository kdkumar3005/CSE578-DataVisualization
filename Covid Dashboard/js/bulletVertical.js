export var bulletVerticalFunc = (function () {

    d3.bulletVertical = function () {
        var duration = 0,
            ranges = bulletRanges,
            markers = bulletMarkers,
            measures = bulletMeasures,
            width = 380,
            height = 30,
            minAxis = 0,
            maxAxis = 0,
            callback = null,
            showMarkers = true,
            tickFormat = d3.format(",.1f");

        function bulletVertical(g) {
            g.each(function (d, i) {
                var rangez = ranges.call(this, d, i).slice().sort(d3.descending),
                    markerz = markers.call(this, d, i).slice().sort(d3.descending),
                    measurez = measures.call(this, d, i).slice().sort(d3.descending),
                    g = d3.select(this);

                var x1 = d3.scaleSymlog()
                    .domain([minAxis, maxAxis])
                    .range([height, 0]);

                var x0 = this.__chart__ || d3.scaleSymlog()
                    .domain([0, Infinity])
                    .range(x1.range());

                this.__chart__ = x1;

                var h0 = bulletHeight(x0),
                    h1 = bulletHeight(x1);

                g.on('mouseover', function (event, d) {
                    callback(event, d, this, "mouseover");
                });

                g.on('click', function (event, d) {
                    callback(event, d, this, "click");
                })

                g.on('mouseout', function (event, d) {
                    callback(event, d, this, "mouseout");
                })

                if (rangez[0] != -1) {
                    var range = g.selectAll("rect.range")
                        .data(rangez);

                    range.enter().append("rect")
                        .attr("class", function (d, i) { return "range s" + i; })
                        .attr("height", h0)
                        .attr("width", width)
                        .attr("y", x0)
                        .transition()
                        .duration(duration)
                        .attr("height", h1)
                        .attr("y", x1);

                    range.transition()
                        .duration(duration)
                        .attr("y", x1)
                        .attr("height", h1)
                        .attr("width", width);
                }

                if (measurez[0] != -1) {
                    var measure = g.selectAll("rect.measure")
                        .data(measurez);

                    measure.enter().append("rect")
                        .attr("class", function (d, i) { return "measure s" + i; })
                        .attr("height", h0)
                        .attr("width", width / 2)
                        .attr("x", width / 4)
                        .attr("y", x0)
                        .transition()
                        .duration(duration)
                        .attr("y", x1)
                        .attr("height", h1);

                    measure.transition()
                        .duration(duration)
                        .attr("height", h1)
                        .attr("width", width / 2)
                        .attr("y", x1)
                        .attr("x", width / 4);
                } else {
                    var measure = g.selectAll("rect.measure")
                        .data(measurez);

                    measure.transition()
                        .duration(duration)
                        .attr("height", 0)
                }

                if (showMarkers) {

                    if (markerz[0] != -1) {

                        var marker = g.selectAll("line.marker")
                            .data(markerz);

                        marker.enter().append("line")
                            .attr("class", "marker")
                            .attr("y1", x0)
                            .attr("y2", x0)
                            .attr("x1", width / 6)
                            .attr("x2", width * 5 / 6)
                            .transition()
                            .duration(duration)
                            .attr("y1", x1)
                            .attr("y2", x1);

                        marker.transition()
                            .duration(duration)
                            .attr("y1", x1)
                            .attr("y2", x1)
                            .attr("x1", width / 6)
                            .attr("x2", width * 5 / 6);

                        var tickline = g.selectAll("g.tick")
                            .data(measurez);

                        tickline.enter().append("line")
                            .attr("class", "tick")
                            .attr("y1", height)
                            .attr("y2", height + 5)
                            .attr("x1", width / 2)
                            .attr("x2", width / 2)
                            .style("stroke", "#C3C3C3");
                    } else {

                        var marker = g.selectAll("line.marker")
                            .data(markerz);

                        marker.transition()
                            .duration(duration)
                            .attr("x1", 0)
                            .attr("x2", 0);
                    }
                }

            });

        }

        bulletVertical.setMinAxis = function (x) {
            minAxis = x;
            return bulletVertical;
        }

        bulletVertical.setMaxAxis = function (x) {
            maxAxis = x;
            return bulletVertical;
        }

        bulletVertical.showMarkers = function (x) {
            showMarkers = x;
            return bulletVertical;
        }

        bulletVertical.callback = function (x) {
            callback = x;
            return bulletVertical;
        }

        bulletVertical.ranges = function (x) {
            if (!arguments.length) return ranges;
            ranges = x;
            return bulletVertical;
        };

        bulletVertical.markers = function (x) {
            if (!arguments.length) return markers;
            markers = x;
            return bulletVertical;
        };

        bulletVertical.measures = function (x) {
            if (!arguments.length) return measures;
            measures = x;
            return bulletVertical;
        };

        bulletVertical.width = function (x) {
            if (!arguments.length) return width;
            width = x;
            return bulletVertical;
        };

        bulletVertical.height = function (x) {
            if (!arguments.length) return height;
            height = x;
            return bulletVertical;
        };

        bulletVertical.tickFormat = function (x) {
            if (!arguments.length) return tickFormat;
            tickFormat = x;
            return bulletVertical;
        };

        bulletVertical.duration = function (x) {
            if (!arguments.length) return duration;
            duration = x;
            return bulletVertical;
        };

        return bulletVertical;
    };

    function bulletRanges(d) {
        return d.ranges;
    }

    function bulletMarkers(d) {
        return d.markers;
    }

    function bulletMeasures(d) {
        return d.measures;
    }

    function bulletHeight(x) {
        var x0 = x(1);
        return function (d) {
            if (d == 0) return 0;
            return Math.abs(x(d) - x0);
        };
    }

})();