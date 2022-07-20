// import { useD3 } from "./hooks/useD3";
import React from "react";
import * as d3 from "d3";
import { Scrollbars } from "react-custom-scrollbars";
import Colors from "../Config/color";
import color from "../Config/color";

import one from "../Images/SDG Icons/1.png";
import two from "../Images/SDG Icons/2.png";
import three from "../Images/SDG Icons/3.png";
import four from "../Images/SDG Icons/4.png";
import five from "../Images/SDG Icons/5.png";
import six from "../Images/SDG Icons/6.png";
import seven from "../Images/SDG Icons/7.png";
import eight from "../Images/SDG Icons/8.png";
import nine from "../Images/SDG Icons/9.png";
import ten from "../Images/SDG Icons/10.png";
import eleven from "../Images/SDG Icons/11.png";
import twelve from "../Images/SDG Icons/12.png";
import thirteen from "../Images/SDG Icons/13.png";
import fourteen from "../Images/SDG Icons/14.png";
import fivtheen from "../Images/SDG Icons/15.png";
import sixteen from "../Images/SDG Icons/16.png";
import seventeen from "../Images/SDG Icons/17.png";
import ScrollSlider from "../Tools/slider";

const sdgImg = [
  { url: one, value: 1.7 }, { url: two, value: 6 },
  { url: three, value: 11.7 }, { url: four, value: 17.8 },
  { url: five, value: 23.3 }, { url: six, value: 28 },
  { url: seven, value: 32.1 }, { url: eight, value: 37.4 },
  { url: nine, value: 43.2 }, { url: ten, value: 48 },
  { url: eleven, value: 53.5 }, { url: twelve, value: 59.5 },
  { url: thirteen, value: 64.3 }, { url: fourteen, value: 68.5 },
  { url: fivtheen, value: 75 }, { url: sixteen, value: 82.5 },
  { url: seventeen, value: 93.4 }
]
class HeatMap extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.scrollbar = React.createRef();
    this.state = {
      updateData: [],
      slideValue: 1.7
    };
  }

  componentDidMount() {
    this.drawGraph(this.props.data);
  }
  windowWidth = window.innerWidth;


  drawGraph = (data) => {
    const self = this;
    const legendData = [
      { interval: 1, color: Colors.Align1 },
      { interval: 2, color: Colors.Align2 },
      { interval: 3, color: Colors.Align3 },
      { interval: 4, color: Colors.Align4 },
    ];
    const width = 2750,
      // const width = 200,

      height = 477 + 125,
      margins = { top: 20, right: 100, bottom: 50, left: 0 };
    var zoom = d3.zoom().scaleExtent([1, 1]);

    const xLabels = [...new Set(data.map((v) => v.sdg_title.toUpperCase()))];
    const data1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

    var xscale = d3
      .scaleLinear()
      .domain([1, d3.max(data1)])
      .range([0, width - 85]);
    var x_axis = d3
      .axisBottom()
      .scale(xscale)
      .ticks(17)
      .tickValues([
        1, 1.67, 2.33, 3.46, 4.35, 5.13, 5.91, 6.35, 7.58, 8.25, 9.145, 10.035,
        11.045, 11.49, 12.382, 13.51, 14.74,
      ])
      // .tickSize(-height)
      .tickSize(5)

      .tickFormat((d, i) => {
        const title = `SDG:${i + 1}`;
        return title;
      });

    var imgX_axis = d3
      .axisTop()
      .scale(xscale)
      .ticks(17)
      .tickValues([
        1, 1.67, 2.33, 3.46, 4.35, 5.13, 5.91, 6.35, 7.58, 8.25, 9.145, 10.035,
        11.045, 11.49, 12.382, 13.51, 14.74,
      ])
      // .tickSize(-height)
      .tickSize(0)

      .tickFormat((d, i) => {
        const title = `SDG:${i + 1}`;
        return title;
        // d3.svg.append("image")
        // .attr("width", 20)
        // .attr("height", 20)
        // .attr("xlink:href", sdgImg.sdg1);
        // return '';

      });

    //Setting chart width and adjusting for margins
    const chart = d3
      .select(".chart")
      .attr("width", width)
      // .attr("height", 0)
      .append("g")
      .attr("transform", "translate(" + 0 + "," + (margins.top + 125) + ")");
    chart.selectAll("*").remove();

    const Tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("border-radius", "5px")
      .style("box-shadow", "2px 2px 4px gray")
      .style("padding", "4px")
      .style("background", "#fff")
      .style("border-top", "4px solid" + color.primaryColor);

    const mouseClick = (d, a) => {
      const clickedPoint = d3.select(
        `rect[id='${a.sdg_id + "." + a.sdg_target_id + "-" + a.sector_id}']`
      );

      this.props.getTargetDetailData({ clickedData: a });
      clickedPoint
        .attr("data-toggle", "modal")
        .attr("data-target", "#dataDetailModal");
      //window.alert("Target "+a.sdg_id+'.'+a.sdg_target_id+'.'+a.sector_id)
    };

    // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = function (d, b) {
      const sectorId = b.sector_id;
      const total_sdg = 17;
      const total_sectors = 25;
      for (let i = 1; i <= total_sectors; i++) {
        for (let j = 1; j <= total_sdg; j++) {
          const singleSDG = document.getElementsByClassName(
            j + "." + sectorId
          )
          const firstele = (singleSDG[0].id).substring(
            (singleSDG[0].id).lastIndexOf(".") + 1, 
            (singleSDG[0].id).lastIndexOf("-")
          );
          const lastele = (singleSDG[singleSDG.length-1].id).substring(
            (singleSDG[singleSDG.length-1].id).lastIndexOf(".") + 1, 
            (singleSDG[singleSDG.length-1].id).lastIndexOf("-")
          );
          for (let k = firstele; k <= lastele; k++) {
            if (i === sectorId) {
              if (document.getElementById(j + "." + k + "-" + i)) {
                document.getElementById(
                  j + "." + k + "-" + i
                ).style.stroke =
                  document.getElementById(b.sdg_id + "." + b.sdg_target_id + "-" + b.sector_id)
                    ===
                    document.getElementById(j + "." + k + "-" + i)
                    ? '#0076B7' : "#ffffff";
                document.getElementById(
                  j + "." + k + "-" + i
                ).style.strokeWidth = "1px";
                document.getElementById(
                  j + "." + k + "-" + i
                ).style.width = "16px";
                document.getElementById(
                  j + "." + k + "-" + i
                ).style.height = "16px";
                document.getElementById(
                  j + "." + k + "-" + i
                ).style.filter = "url(#f3)";
              }
            }
            else {
              if (document.getElementById(j + "." + k + "-" + i)) {
                document.getElementById(
                  j + "." + k + "-" + i
                ).style.opacity = .4;
              }
            }
          }
        }
      }

      Tooltip.text(d);
      return Tooltip.style("visibility", "visible");
    };
    const mousemove = function (event, d) {
      const current_position = d3.pointer(event);
      const tooltip = Tooltip.node();
      const html =
        "Target: " +
        d.sdg_id +
        "." +
        d.sdg_target_id +
        "</br>" +
        "Sector: " +
        d.sector_name +
        "</br>" +
        "Status: " +
        (d.aligned === null ? "Not Relevant" : d.aligned);

      Tooltip.html(html)
        .style("top", event.pageY - 10 + "px")
        .style("left", function () {
          if (current_position[0] < window.innerWidth / 2) {
            return event.pageX + 10 + "px";
          } else {
            return tooltip.offsetWidth >= 160 && tooltip.offsetWidth <= 180
              ? event.pageX - 200 + "px"
              : tooltip.offsetWidth >= 180 && tooltip.offsetWidth <= 240
                ? event.pageX - 220 + "px"
                : tooltip.offsetWidth >= 240
                  ? event.pageX - 300 + "px"
                  : event.pageX - 160 + "px";
          }
        });
    };
    const mouseout = function (event, b) {
      const sectorId = b.sector_id;
      const total_sdg = 17;
      const total_sectors = 25;
      for (let i = 1; i <= total_sectors; i++) {
        for (let j = 1; j <= total_sdg; j++) {
          const singleSDG = document.getElementsByClassName(
            j + "." + sectorId
          )
          const firstele = (singleSDG[0].id).substring(
            (singleSDG[0].id).lastIndexOf(".") + 1, 
            (singleSDG[0].id).lastIndexOf("-")
          );
          const lastele = (singleSDG[singleSDG.length-1].id).substring(
            (singleSDG[singleSDG.length-1].id).lastIndexOf(".") + 1, 
            (singleSDG[singleSDG.length-1].id).lastIndexOf("-")
          );
          for (let k = firstele; k <= lastele; k++) {
            if (document.getElementById(j + "." + k + "-" + i)) {
              document.getElementById(
                j + "." + k + "-" + i
              ).style.stroke =
                document.getElementById(b.sdg_id + "." + b.sdg_target_id + "-" + b.sector_id)
                  ===
                  document.getElementById(j + "." + k + "-" + i)
                  ? '#0076B7' : "#000000";
              document.getElementById(
                j + "." + k + "-" + i
              ).style.strokeWidth = .2;
              document.getElementById(
                j + "." + k + "-" + i
              ).style.width = "18px";
              document.getElementById(
                j + "." + k + "-" + i
              ).style.height = "18px";
              document.getElementById(
                j + "." + k + "-" + i
              ).style.filter = "none";
              document.getElementById(
                j + "." + k + "-" + i
              ).style.opacity = 1;
            }
          }
        }
      }

      return Tooltip.style("visibility", "hidden");
    };

    // Three function that change the tooltip when user hover / move / leave on Tick Text
    const mouseoverTick = function (d, b) {
      Tooltip.text(d);
      return Tooltip.style("visibility", "visible");
    };
    const mousemoveTick = function (event, d) {
      return Tooltip.html(d)
        .style("top", event.pageY + 10 + "px")
        .style("left", function () {
          const current_position = d3.pointer(event);
          if (current_position[0] > window.innerWidth / 2) {
            return event.pageX + 10 + "px";
          } else {
            return event.pageX - 100 + "px";
          }
        });
      // .style("left", event.pageX + 10 + "px");
    };
    const mouseoutTick = function (event, b) {
      return Tooltip.style("visibility", "hidden");
    };

    const barHeight = height / 25;

    //Return dynamic color based on intervals in legendData
    const colorScale = (d) => {
      for (let i = 0; i < legendData.length; i++) {
        if (d.aligned_id === null) {
          return Colors["Align4"];
        } else {
          if (d.aligned_id === legendData[i].interval) {
            return legendData[i].color;
          }
        }
      }
      return Colors["Align4"];
    };

    const gapPoint = [-10];
    //Append heatmap bars, styles, and mouse events
    chart
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .append("rect")
      // .attr("class","HELLO")
      .attr(
        "id",
        (a, b) => a.sdg_id + "." + a.sdg_target_id + "-" + a.sector_id
      )
      .attr(
        "class",
        (a, b) => a.sdg_id + "." + a.sector_id
      )

      .attr("x", (a, b) => {
        if (b !== 0 && data[b].sdg_id !== data[b - 1].sdg_id)
          // gapPoint.push(gapPoint[gapPoint.length - 1] + 6);
          gapPoint.push(gapPoint[gapPoint.length - 1] + 16);

        if (b % 25 === 0) {
          // gapPoint.push(gapPoint[gapPoint.length - 1] + 9);
          gapPoint.push(gapPoint[gapPoint.length - 1] + 19);
        }

        return gapPoint[gapPoint.length - 1];
      })
      .attr("y", (d) => {
        return (d.sector_id - 1) * 19;
      })

      .style("fill", colorScale)
      .style('opacity', 1)
      .style("stroke", "#000000")
      .style("stroke-width", 0.2)
      .style("stroke-opacity", "100")
      .style("cursor", "pointer")
      .attr("width", 18)
      .attr("height", 18)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseout", mouseout)
      .on("click", mouseClick);

    chart
      .append("g")
      .attr("transform", "translate(0," + (height - 660) + ")")
      .call(imgX_axis)
      .call(g => g.select(".domain").remove())
      .attr("class", "img_xAxis")
      .selectAll("text")
      .data(xLabels)
      .style("text-anchor", "start")
      .attr("dx", "-1em")
      .attr("dy", "0");

    d3.select(".img_xAxis").selectAll("text").remove();
    d3.select(".img_xAxis").selectAll(".tick")
      .data(sdgImg)
      .append("svg:image")
      .attr("xlink:href", function (d) { return d.url; })
      .attr("width", 90)
      .attr("height", 90)
      .style('cursor', 'pointer')
      .attr("transform", (a, b) => {
        if (b === 0 || b === 1 || b === 8) {
          return "translate(5,-85)";
        } else if (b === 6) {
          return "translate(0,-85)";
        } else if (b === 12) {
          return "translate(-10,-85)";
        } else if (b === 11) {
          return "translate(30,-85)";
        } else if (b === 2 || b === 14) {
          return "translate(50,-85)";
        } else if (b === 3 || b === 10 || b === 13 || b === 9) {
          return "translate(25,-85)";
        } else if (b === 4 || b === 5) {
          return "translate(15,-85)";
        } else if (b === 7 || b === 15) {
          return "translate(60.5,-85)";
        } else {
          return "translate(140.5,-85)";
        }
      })
      .on("click", function (i, d) {
        self.handleSlider(null, d.value)
      });

    chart
      .append("g")
      .attr("transform", "translate(0," + (height - 125) + ")")
      .call(x_axis)
      .attr("class", "xAxis")
      .selectAll("text")
      .data(xLabels)
      .style("text-anchor", "start")
      .attr("dx", "-1em")
      .attr("dy", "0")
      .attr("transform", (a, b) => {
        if (b === 0 || b === 1 || b === 8) {
          return "translate(50,10)";
        } else if (b === 6 || b === 12) {
          return "translate(33,10)";
        } else if (b === 2 || b === 14) {
          return "translate(80,10)";
        } else if (b === 3 || b === 10 || b === 13 || b === 9 || b === 11) {
          return "translate(70,10)";
        } else if (b === 4 || b === 5) {
          return "translate(58.5,10)";
        } else if (b === 7 || b === 15) {
          return "translate(100.5,10)";
        } else {
          return "translate(180.5,10)";
        }

      })
      .on("mouseover", mouseoverTick)
      .on("mouseenter", mousemoveTick)
      .on("mouseout", mouseoutTick);

    // Create the scale
    var y = d3
      .scaleBand()
      .domain(data.map((v) => v.sector_name)) // This is what is written on the Axis: from 0 to 100
      .range([0, 480])
      .padding(0.5); // Note it is reversed

    //Append y axis
    // console.log(windowWidth);
    const chart1 = d3
      .select(".Y-Axis")
      .attr("height", height + margins.top + margins.bottom)
      .attr("width", this.windowWidth < 991 ? 150 : 230)
      .append("g")
      .attr(
        "transform",
        "translate(" +
        `${this.windowWidth < 991 ? 150 : 230}` +
        "," +
        (margins.top + 125) +
        ")"
      );
    chart1
      .append("g")
      .attr("transform", "translate(0,-" + barHeight / 7 + ")")
      .call(d3.axisLeft(y))
      .attr("class", "yAxis")
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.3em")
      .attr("dy", ".3em");
    // .attr("transform", "rotate(-30)");

    // chart
    //   .append("text")
    //   .attr("transform", "translate(" + width / 2 + "," + (height + 40) + ")")
    //   .style("text-anchor", "middle")
    //   .text("SDG Targets");

    d3.select(".chart")
      .transition()
      .duration(800)
      .ease(d3.easeLinear)
      .attr("height", height + margins.top + margins.bottom);

  };

  handleSlider = (e, value) => {
    const left = window.innerWidth <= 490
      ? (value === 1.7 ? 0 : value > 54 ? value * 25 : value > 12 ? value * 23 : value * 15)
      : window.innerWidth <= 590
        ? (value === 1.7 ? 0 : value > 24 ? value * 24 : value * 15)
        : window.innerWidth <= 740
          ? (value === 1.7 ? 0 : value > 33 ? value * 24 : value * 15)
          : window.innerWidth <= 815
            ? (value === 1.7 ? 0 : value > 54 ? value * 25 : value * 18)
            : window.innerWidth < 1252
              ? (value === 1.7 ? 0 : value > 54 ? value * 23 : value * 15)
              : (value === 1.7 ? 0 : value > 54 ? value * 20 : value * 10);

    this.setState({ slideValue: value })
    this.scrollbar.current.view.scroll({
      left: left,
      behavior: 'smooth',
    });
  }

  handleScrollFrame = () => {
    const scrollLeft = this.scrollbar.current.getScrollLeft()
    const slideValue = scrollLeft <= 0
      ? 1.7
      : (window.innerWidth <= 740 ? (scrollLeft <= 90) : window.innerWidth <= 815 ? (scrollLeft <= 108) : window.innerWidth < 1252 ? (scrollLeft <= 90) : (scrollLeft <= 60))
        ? 6
        : (window.innerWidth <= 740 ? (scrollLeft <= 175.5) : window.innerWidth <= 815 ? (scrollLeft <= 210.6) : window.innerWidth < 1252 ? (scrollLeft <= 175.5) : (scrollLeft <= 117))
          ? 11.7
          : (window.innerWidth <= 490 ? (scrollLeft <= 409.40000000000003) : window.innerWidth <= 740 ? (scrollLeft <= 267) : window.innerWidth <= 815 ? (scrollLeft <= 320.40000000000003) : window.innerWidth < 1252 ? (scrollLeft <= 267) : (scrollLeft <= 178))
            ? 17.8
            : (window.innerWidth <= 490 ? (scrollLeft <= 535.9) : window.innerWidth <= 740 ? (scrollLeft <= 349.5) : window.innerWidth <= 815 ? (scrollLeft <= 419.40000000000003) : window.innerWidth < 1252 ? (scrollLeft <= 349.5) : (scrollLeft <= 233))
              ? 23.3
              : (window.innerWidth <= 490 ? (scrollLeft <= 644) : window.innerWidth <= 590 ? (scrollLeft <= 672) : window.innerWidth <= 740 ? (scrollLeft <= 420) : window.innerWidth <= 815 ? (scrollLeft <= 504) : window.innerWidth < 1252 ? (scrollLeft <= 420) : (scrollLeft <= 280))
                ? 28
                : (window.innerWidth <= 490 ? (scrollLeft <= 738.3000000000001) : window.innerWidth <= 590 ? (scrollLeft <= 770.4000000000001) : window.innerWidth <= 740 ? (scrollLeft <= 481.5) : window.innerWidth <= 815 ? (scrollLeft <= 577.8000000000001) : window.innerWidth < 1252 ? (scrollLeft <= 481.5) : (scrollLeft <= 321))
                  ? 32.1
                  : (window.innerWidth <= 490 ? (scrollLeft <= 860.1999999999999) : window.innerWidth <= 740 ? (scrollLeft <= 897.5999999999999) : window.innerWidth <= 815 ? (scrollLeft <= 673.1999999999999) : window.innerWidth < 1252 ? (scrollLeft <= 561) : (scrollLeft <= 374))
                    ? 37.4
                    : (window.innerWidth <= 490 ? (scrollLeft <= 993.6) : window.innerWidth <= 740 ? (scrollLeft <= 1036.8000000000002) : window.innerWidth <= 815 ? (scrollLeft <= 777.6) : window.innerWidth < 1252 ? (scrollLeft <= 648) : (scrollLeft <= 432))
                      ? 43.2
                      : (window.innerWidth <= 490 ? (scrollLeft <= 1104) : window.innerWidth <= 740 ? (scrollLeft <= 1152) : window.innerWidth <= 815 ? (scrollLeft <= 864) : window.innerWidth < 1252 ? (scrollLeft <= 720) : (scrollLeft <= 480))
                        ? 48
                        : (window.innerWidth <= 490 ? (scrollLeft <= 1230.5) : window.innerWidth <= 740 ? (scrollLeft <= 1284) : window.innerWidth <= 815 ? (scrollLeft <= 963) : window.innerWidth < 1252 ? (scrollLeft <= 802.5) : (scrollLeft <= 535))
                          ? 53.5
                          : (window.innerWidth <= 490 ? (scrollLeft <= 1487.5) : window.innerWidth <= 740 ? (scrollLeft <= 1428) : window.innerWidth <= 815 ? (scrollLeft <= 1487.5) : window.innerWidth < 1252 ? (scrollLeft <= 1368.5) : (scrollLeft <= 1190))
                            ? 59.5
                            : (window.innerWidth <= 490 ? (scrollLeft <= 1607.5) : window.innerWidth <= 740 ? (scrollLeft <= 1543.1999999999998) : window.innerWidth <= 815 ? (scrollLeft <= 1607.5) : window.innerWidth < 1252 ? (scrollLeft <= 1478.8999999999999) : (scrollLeft <= 1286))
                              ? 64.3
                              : (window.innerWidth <= 490 ? (scrollLeft <= 1712.5) : window.innerWidth <= 740 ? (scrollLeft <= 1644) : window.innerWidth <= 815 ? (scrollLeft <= 1712.5) : window.innerWidth < 1252 ? (scrollLeft <= 1575.5) : (scrollLeft <= 1370))
                                ? 68.5
                                : (window.innerWidth <= 490 ? (scrollLeft <= 1875) : window.innerWidth <= 740 ? (scrollLeft <= 1800) : window.innerWidth <= 815 ? (scrollLeft <= 1875) : window.innerWidth < 1252 ? (scrollLeft <= 1725) : (scrollLeft <= 1500))
                                  ? 75
                                  : (window.innerWidth <= 490 ? (scrollLeft <= 2062.5) : window.innerWidth <= 740 ? (scrollLeft <= 1980) : window.innerWidth <= 815 ? (scrollLeft <= 2062.5) : window.innerWidth < 1252 ? (scrollLeft <= 1897.5) : (scrollLeft <= 1650))
                                    ? 82.5
                                    : 93.4;
    this.setState({ slideValue })
  }

  render() {
    const sidebarOpen = localStorage.getItem('sidebarOpen');
    const sidebarWidth = sidebarOpen === 'true' ? 235 : 0;
    const chartWidth = window.innerWidth - (this.windowWidth < 991 ? 150 : 230) - 50 - sidebarWidth
    return (
      <div className="d-flex flex-row flex-nowrap mb-2" style={{}}>
        <div className="flex-col mt-2" style={{ zIndex: 0 }}>
          <svg className="Y-Axis" />
        </div>
        <div className="flex-col mt-2 chart_container" style={{ overflow: 'hidden', marginLeft: 0 }}>
          <Scrollbars
            className='scrollBar'
            style={{
             width: chartWidth + 'px',
            }}
            ref={this.scrollbar}
            onScrollFrame={() => this.handleScrollFrame()}
            renderTrackVertical={(props) => (
              <div
                {...props}
                style={{ display: "none" }}
                className="track-vertical"
              />
            )}
          >

            <ScrollSlider
              value={this.state.slideValue}
              onChange={this.handleSlider}
            />
            <svg className="chart">
              <filter id="f3" x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox">
                <feOffset result="offOut" in="SourceAlpha" dx="4" dy="4" />
                <feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" />
                <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0" in="shadowBlurOuter1" type="matrix" result="shadowMatrixOuter1" />
                <feMerge>
                  <feMergeNode in="shadowMatrixOuter1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </svg>
          </Scrollbars>
          <div className='' style={{ position: 'absolute', left: '55%', marginTop: -20 }}>SDG Targets</div>
        </div>
      </div>
    );
  }
}
export default HeatMap;
