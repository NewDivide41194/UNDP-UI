import React from "react";
import * as d3 from "d3";
import "../../App.css";
import color from "../Config/color";

class SpiderChart extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // Data: this.props.Radar
    };
  }

  componentDidMount() {
    const windowWidth = this.props.windowWidth
    const evaluationLevel = this.props.evaluationLevel

    d3.selectAll("chart").transition().duration(2000);
    const svgSize = document.getElementById("spider").offsetWidth - (windowWidth < 500 ? 80 : windowWidth < 600 ? 100 : windowWidth < 700 ? 0 : windowWidth < 800 ? 100 : windowWidth < 900 ? 200 : windowWidth < 1000 ? 220 : windowWidth < 1100 ? 320 : windowWidth < 1200 ? 350 : windowWidth < 1300 ? 450 : windowWidth < 1400 ? 550 : 650);
    // Config for the Radar chart
    const config = {
      w: svgSize,
      h: svgSize,
      windowWidth: this.props.windowWidth,
      maxValue: 90,
      levels: evaluationLevel.length,
      ExtraWidthX: windowWidth < 700 ? 900 : 700,
      svgId: this.props.svgId
    };

    const data = this.props.data;
    DrawRadarChart.draw("#chart", data, config, evaluationLevel);
   // console.log('radar data ', data, evaluationLevel)
  }

  render() {
    //console.log(this.props.windowWidth)
    return (
      <div
        className={`container h-100 ${this.props.svgId && ' mt-2'} `}
        style={this.props.svgId && {
          // backgroundColor: '#F3F3F3',
          borderRadius: 6
        }}
      >
        <div
          id="chart"
          className="h-100 chart"
          style={{ textAlign: "center", display: "block", margin: "auto" }}
        />
      </div>
    );
  }
}

const DrawRadarChart = {
  draw: function (id, d, options, levels) {
    var cfg = {
      radius: 7,
      w: 400,
      h: 400,
      margin:
        options.svgId ? ({ top: -115, right: 0, bottom: 0, left: 57 }) :
          (options.windowWidth >= 585 && options.windowWidth <= 767
            ? { top: 10, right: 80, bottom: 10, left: 80 }
            : options.windowWidth >= 768 && options.windowWidth <= 991
              ? { top: -9, right: 60, bottom: -9, left: 60 }
              : options.windowWidth >= 992 && options.windowWidth <= 1170
                ? { top: 9, right: 55, bottom: 30, left: 55 }
                : { top: -20, right: 55, bottom: 0, left: 55 }),
      legendPosition: { x: -50, y: 15 },
      wrapWidth: 100,
      factor: 1,
      factorLegend: 0.95,
      levels: 3,
      maxValue: 0,
      radians: 2 * Math.PI,
      opacityArea: 0.2,
      ToRight: 5,
      ExtraWidthX: 300,
      ExtraWidthY:
        options.svgId ? (-30) :
          (options.windowWidth >= 992 && options.windowWidth <= 1170 ? 150 : 115),
      color: d3.scaleOrdinal().range(["#257EE0", "#257EE0"]),
    };

    if ("undefined" !== typeof options) {
      for (var i in options) {
        if ("undefined" !== typeof options[i]) {
          cfg[i] = options[i];
        }
      }
    }

    cfg.maxValue = 20;
    // console.log("d>", d)
    var allAxis = d[0].map(function (i, j) {
      return i.area;
    });
    var total = allAxis.length;
    var radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2);
    var responsiveViewX =
      options.windowWidth >= 585 && options.windowWidth <= 767
        ? 100
        : options.windowWidth <= 991
          ? 125
          : options.windowWidth <= 1220
            ? 135
            : options.windowWidth >= 1606
              ? 118
              : 150;
    var responsiveViewY =
      options.windowWidth >= 585 && options.windowWidth <= 767
        ? 100
        : options.windowWidth <= 991
          ? 150 + 18
          : options.windowWidth <= 1220
            ? 150 + 38
            : options.windowWidth >= 1606
              ? 118 + 53
              : 150 + 33;

    d3.select(id).select("svg").remove();
    var polyPoints = null;
    //console.log(options, cfg)
    var g = d3
      .select(id)
      .append("svg")
      .attr("width", options.svgId ? options.w : options.w + cfg.ExtraWidthX)
      .attr("height", options.h + cfg.ExtraWidthY)
      .attr(
        "viewBox",
        "-120 0 " +
        (options.w + cfg.ExtraWidthX - responsiveViewX) +
        " " +
        (options.h + cfg.ExtraWidthY - responsiveViewY)
      )
      .append("g")
      .attr(
        "transform",
        "translate(" + cfg.margin.left + "," + cfg.margin.top + ")"
      );

    // Points for polygon segments
    //console.log(cfg.levels, 'levels')
    var polygonData = [];
    for (var i_1 = 0; i_1 < 3; i_1++) {
      var levelFactor = cfg.factor * radius * ((i_1 + 1) / cfg.levels);

      for (var i_2 = 0; i_2 < allAxis.length; i_2++) {
        var newData = [...polygonData];
        if (i_2 === 0) {
          const x =
            levelFactor *
            (1 - cfg.factor * Math.sin((i_2 * cfg.radians) / total));
          const y =
            levelFactor *
            (1 - cfg.factor * Math.cos((i_2 * cfg.radians) / total));
          const transformPoint =
            "translate(" +
            (cfg.w / 2 - levelFactor) +
            ", " +
            (cfg.h / 2 - levelFactor) +
            ")";
          const firstPoint = x + "," + y;

          newData.push({ points: firstPoint, transform: transformPoint });
          polygonData = newData;
        } else {
          const x =
            levelFactor *
            (1 - cfg.factor * Math.sin((i_2 * cfg.radians) / total));
          const y =
            levelFactor *
            (1 - cfg.factor * Math.cos((i_2 * cfg.radians) / total));
          const totalPoints = polygonData[i_1].points + " " + x + "," + y;

          newData[i_1].points = totalPoints;
          polygonData = newData;
        }
      }
    }
    // console.log('25.3,0 1.2382701377326157,17.48187004231383 10.429033117000428,45.76812995768617 40.170966882999565,45.76812995768617 49.36172986226739,17.481870042313837', 'Expect')
    // console.log(polygonData[0].points, 'realtity')
    //Polygon sements with alternate grid color
    g.selectAll(".levels")
      .data(polygonData.reverse())
      .enter()
      .append("polygon")
      .attr("points", function (d, i) {
        return d.points;
      })
      .style("fill", function (d, i) {
        return i % 2 === 0 ? "#f6f8fa" : "#d6e2ea";
      })
      .style("stroke", "#ccdee9")
      .style("stroke-width", "2px")
      .attr("transform", function (d, i) {
        return d.transform;
      })
      .style("opacity", 1);

    //Text indicating at what % each level is
    for (var j = 0; j < 3; j++) {
      var levelFactor1 = cfg.factor * radius * ((j + 1) / cfg.levels);
      g.selectAll(".levels")
        .data(levels) //dummy data
        .enter()
        .append("svg:text")
        .attr("x", function (d) {
          return levelFactor1 * (1 - cfg.factor * Math.sin(0));
        })
        .attr("y", function (d) {
          return levelFactor1 * (1 - cfg.factor * Math.cos(0));
        })
        .attr("class", "legend")
        .style("font-family", "sans-serif")
        .style("font-weight", "bold")
        .style("font-size", "18px")
        .attr(
          "transform",
          "translate(" +
          (cfg.w / 2 - levelFactor1 + cfg.ToRight - 2) +
          ", " +
          (cfg.h / 2 - levelFactor1 + 100) +
          ")"
        )
        .attr("fill", "#257EE0")
        .text(d =>
        // {return d.name}
        {
          return levels[j].name
          // return j
            ;
        }
        );
    }

    var series = 0;

    var axis = g
      .selectAll(".axis")
      .data(allAxis)
      .enter()
      .append("g")
      .attr("class", "axis");

    axis
      .append("line")
      .attr("x1", cfg.w / 2)
      .attr("y1", cfg.h / 2)
      .attr("x2", function (d, i) {
        return (
          (cfg.w / 2) * (1 - cfg.factor * Math.sin((i * cfg.radians) / total))
        );
      })
      .attr("y2", function (d, i) {
        return (
          (cfg.h / 2) * (1 - cfg.factor * Math.cos((i * cfg.radians) / total))
        );
      })
      .attr("class", "line")
      .style("stroke", "#ccdee9")
      .style("stroke-width", "2px");

    axis
      .append("text")
      .attr("class", "legend")
      .text(function (d) { return d })
      .style("font-family", "sans-serif")
      .style("font-size", "20px")
      .style("font-weight", "bold")
      .style("fill", "grey")
      .attr("text-anchor", "middle")
      .attr("dy", "1.3em")
      .attr("x", cfg.w - 52)
      .attr("y", function (d, i) { return i * 20 + 9; })
      //.attr("transform", "translate(" + cfg["legendPosition"]["x"] + "," + cfg["legendPosition"]["y"] + ")")
      //.attr('transform', 'rotate(-90)')
      .attr("transform", function (d, i) {
        return "translate(10, -18)";
      })

      .attr("x", function (d, i) {
        return (
          (cfg.w / 2) *
          (1 - cfg.factorLegend * Math.sin((i * cfg.radians) / total)) -
          60 * Math.sin((i * cfg.radians) / total)
        );
      })
      .attr("y", function (d, i) {
        return (
          (cfg.h / 2) * (1 - Math.cos((i * cfg.radians) / total)) -
          20 * Math.cos((i * cfg.radians) / total)
        );
      })


    d3
      .selectAll(".legend")
      .call(wrap, cfg.wrapWidth)

    ////////// textwrap
    function wrap(text, width) {
      //console.log("text", text.text(), isNaN(parseInt(text.text())))
      text.each(function () {
        var text = d3.select(this),
          words = text.text().length > 20 ? text.text().split(/\s+/).reverse() : [text.text()],
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          x = text.attr('x'),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", isNaN(parseInt(words)) && x < 90 ? x - 60 : isNaN(parseInt(words)) && x > 350 && y > 0 ? parseFloat(x) + 50 : x).attr("y", isNaN(parseInt(words)) && y < 500 ? y - 60 : y).attr("dy", dy + "em")
        while (word = words.pop()) {
          line.push(word)
          tspan.text(line.join(" "))
          if (tspan.node().getComputedTextLength() > width) {
            line.pop()
            tspan.text(line.join(" "))
            line = [word]
            tspan = text.append("tspan").attr("x", isNaN(parseInt(words)) && x < 90 ? x - 60 : isNaN(parseInt(words)) && x > 350 && y > 0 ? parseFloat(x) + 50 : x).attr("y", isNaN(parseInt(words)) && y < 500 ? y - 60 : y).attr("dy", `${++lineNumber * lineHeight + dy}em`).text(word)
          }
        }
      })
    }//wrap	
    d.forEach(function (y, x) {
      var dataValues = [];
      g.selectAll(".nodes").data(y, function (j, i) {
        dataValues.push([
          (cfg.w / 2) *
          (1 -
            (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) *
            cfg.factor *
            Math.sin((i * cfg.radians) / total)),
          (cfg.h / 2) *
          (1 -
            (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) *
            cfg.factor *
            Math.cos((i * cfg.radians) / total)),
        ]);
      });
      dataValues.push(dataValues[0]);
      g.selectAll(".area")
        .data([dataValues])
        .enter()
        .append("polygon")
        .attr("points", function (d) {
          if (polyPoints) return polyPoints;
          else
            return d3
              .range(d.length)
              .map(function () {
                return cfg.w / 2 + "," + cfg.h / 2;
              })
              .join(" ");
        })
        .attr("class", "radar-chart-serie" + series)
        .style("stroke-width", "2px")
        .style("stroke", cfg.color(series))
        .style("fill-opacity", cfg.opacityArea)
        .on("mouseover", function (d) {
          var z = "polygon." + d3.select(this).attr("class");
          g.selectAll("polygon").transition(200).style("fill-opacity", 0.1);
          g.selectAll(z).transition(200).style("fill-opacity", 0.7);
        })
        .on("mouseout", function () {
          g.selectAll("polygon")
            .transition(200)
            .style("fill-opacity", cfg.opacityArea);
        })
        .transition()
        .duration(2000)
        .attr("points", function (d) {
          var str = "";
          for (var pti = 0; pti < d.length; pti++) {
            str = str + d[pti][0] + "," + d[pti][1] + " ";
          }
          return str;
        })
        .style("fill", function (j, i) {
          return cfg.color(series);
        });
      series++;
    });
    series = 0;

    var tooltip = d3.select("body").append("div").attr("class", "toolTip");
    var dataValues = [];
    d.forEach(function (y, x) {
      var c = g
        .selectAll(".nodes")
        .data(y)
        .enter()
        .append("svg:circle")
        .attr("class", "radar-chart-serie" + series)
        .attr("r", cfg.radius)
        .attr("alt", function (j) {
          return Math.max(j.value, 0);
        })
        .attr("cx", function (j, i) {
          dataValues.push([
            (cfg.w / 2) *
            (1 -
              (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) *
              cfg.factor *
              Math.sin((i * cfg.radians) / total)),
            (cfg.h / 2) *
            (1 -
              (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) *
              cfg.factor *
              Math.cos((i * cfg.radians) / total)),
          ]);
          return (
            (cfg.w / 2) *
            (1 -
              (Math.max(j.value, 0) / cfg.maxValue) *
              cfg.factor *
              Math.sin((i * cfg.radians) / total))
          );
        })
        .attr("cy", function (j, i) {
          return (
            (cfg.h / 2) *
            (1 -
              (Math.max(j.value, 0) / cfg.maxValue) *
              cfg.factor *
              Math.cos((i * cfg.radians) / total))
          );
        })
        .attr("data-id", function (j) {
          return j.area;
        })
        .style("fill", "#257EE0")
        .style("stroke-width", "2px")
        .style("stroke", "#fff")
        .style("fill-opacity", 0.9)
        .on("mouseover", function (event, d) {
          tooltip
            .style("left", event.pageX - 40 + "px")
            .style("top", event.pageY - 40 + "px")
            .style("display", "inline-block")
            .html("<span>" + d.area + " : " + (d.value === 6.5 ? "Basic Level" :  d.value === 13.5 ? "Useful Level" : "Sustainable Level")  + "</span>");
          var z = "polygon." + d3.select(this).attr("class");
          g.selectAll("polygon").transition(200).style("fill-opacity", 0.1);
          g.selectAll(z).transition(200).style("fill-opacity", 0.7);
        })
        .on("mouseout", function (d) {
          tooltip.style("display", "none");
          g.selectAll("polygon")
            .transition(200)
            .style("fill-opacity", cfg.opacityArea);
        });

      c.transition().delay(1750).duration(100).style("fill-opacity", 0.9);

      series++;
    });
  },
};

export default SpiderChart;