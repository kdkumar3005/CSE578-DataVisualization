export var bulletHorizontalFunc = (function () {

    d3.bulletHorizontal = function () {
        var orient = "left",
            reverse = false,
            duration = 0,
            ranges = bulletRanges,
            measures = bulletMeasures,
            width = 380,
            height = 30,
            callback = null,
            tickFormat = d3.format(",.1f");

        function bulletHorizontal(g) {
            g.each(function (d, i) {
                var rangez = ranges.call(this, d, i).slice().sort(d3.descending),
                    measurez = measures.call(this, d, i).slice().sort(d3.descending),
                    g = d3.select(this);


                g.on('mouseover', function (event, d) {
                    callback(event, d, this, "mouseover");
                });

                g.on('click', function (event, d) {
                    callback(event, d, this, "click");
                });

                g.on('mouseout', function (event, d) {
                    callback(event, d, this, "mouseout");
                })

                var x1 = d3.scaleSymlog()
                    .domain([0, Math.max(rangez[0], measurez[0])])
                    .range(reverse ? [width, 0] : [0, width]);

                var x0 = this.__chart__ || d3.scaleSymlog()
                    .domain([0, Infinity])
                    .range(x1.range());

                this.__chart__ = x1;

                var w0 = bulletWidth(x0),
                    w1 = bulletWidth(x1);

                var range = g.selectAll("rect.range")
                    .data(rangez);

                range.enter().append("rect")
                    .attr("class", function (d, i) { return "range s" + i; })
                    .attr("width", w0)
                    .attr("height", height)
                    .attr("x", reverse ? x0 : 0)
                    .transition()
                    .duration(duration)
                    .attr("width", w1)
                    .attr("x", reverse ? x1 : 0);

                range.transition()
                    .duration(duration)
                    .attr("x", reverse ? x1 : 0)
                    .attr("width", w1)
                    .attr("height", height);

                var measure = g.selectAll("rect.measure")
                    .data(measurez);

                measure.enter().append("rect")
                    .attr("class", function (d, i) { return "measure s" + i; })
                    .attr("width", w0)
                    .attr("height", height / 2)
                    .attr("x", reverse ? x0 : 0)
                    .attr("y", height / 4)
                    .transition()
                    .duration(duration)
                    .attr("width", w1)
                    .attr("x", reverse ? x1 : 0);

                measure.transition()
                    .duration(duration)
                    .attr("width", w1)
                    .attr("height", height / 2)
                    .attr("x", reverse ? x1 : 0)
                    .attr("y", height / 4);
            });
        }

        bulletHorizontal.callback = function (x) {
            callback = x;
            return bulletHorizontal;
        }

        bulletHorizontal.orient = function (x) {
            if (!arguments.length) return orient;
            orient = x;
            reverse = orient == "right" || orient == "bottom";
            return bulletHorizontal;
        };

        bulletHorizontal.ranges = function (x) {
            if (!arguments.length) return ranges;
            ranges = x;
            return bulletHorizontal;
        };

        bulletHorizontal.measures = function (x) {
            if (!arguments.length) return measures;
            measures = x;
            return bulletHorizontal;
        };

        bulletHorizontal.width = function (x) {
            if (!arguments.length) return width;
            width = x;
            return bulletHorizontal;
        };

        bulletHorizontal.height = function (x) {
            if (!arguments.length) return height;
            height = x;
            return bulletHorizontal;
        };

        bulletHorizontal.tickFormat = function (x) {
            if (!arguments.length) return tickFormat;
            tickFormat = x;
            return bulletHorizontal;
        };

        bulletHorizontal.duration = function (x) {
            if (!arguments.length) return duration;
            duration = x;
            return bulletHorizontal;
        };

        return bulletHorizontal;
    };

    function bulletRanges(d) {
        return d.ranges;
    }

    function bulletMeasures(d) {
        return d.measures;
    }

    function bulletWidth(x) {
        var x0 = x(1);
        return function (d) {
            if (d == 0) return 0;
            return Math.abs(x(d) - x0);
        };
    }

})();