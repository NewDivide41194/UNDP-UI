import React, { useEffect, useRef, useState } from "react";
import {
  select,
  scaleBand,
  axisBottom,
  stack,
  max,
  scaleLinear,
  axisLeft,
  stackOrderReverse,
} from "d3";
import { DigitalDevelopmentLegends } from "../../Pages/DigitalDevelopment/Container/DigitalDevelopment";
import color from "../Config/color";

export function StackedBarChart(props) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const { data, windowWidth } = props;
  const [hoverBar, setHoverBar] = useState(null);

  useEffect(() => {
    // will be called initially and on every data change
    const svg = select(svgRef.current);
    const width = (windowWidth < 1284 && windowWidth > 1220) ? 300 : 330;
 
    //  wrapperRef.current.getBoundingClientRect();
    const height = 270;
    svg.selectAll(".layer").remove();

    // stacks / layers
    const stackGenerator = stack().keys(keys).order(stackOrderReverse);
    const layers = stackGenerator(data);
    //console.log(layers);
    const extent = [
      0,
      max(layers, (layer) => max(layer, (sequence) => sequence[1])),
    ];
    //console.log(extent);
    // scales
    const xScale = scaleLinear().domain(extent).range([width, 0]);

    const yScale = scaleBand()
      .domain(data.map((d) => d.themes))
      .rangeRound([0, height])
      .paddingOuter(-0.15)
      .paddingInner(-0.2);
    // rendering
    svg
      .selectAll(".layer")
      .data(layers)
      .join("g")
      .attr("class", "layer")
      .attr("fill", (layer) => colors[layer.key])
      .selectAll("rect")
      .data((layer) => layer)
      .join("rect")
      .attr("x", (sequence) => xScale(sequence[1]))
      .attr("height", 30)
      .attr("y", (sequence) => yScale(sequence.data.themes))
      .attr("width", (sequence) => xScale(sequence[0]) - xScale(sequence[1]))
      .style("stroke", "#d3d3d3")
      .append("title")
      .text((d, i) => {
        return d[1] - d[0];
      });
    //text
    svg
      .selectAll(".layer")
      .data(layers)
      .append("g")
      .attr("class", "layer")
      .selectAll("rect")
      .data((layer) => layer)
      .join("g")
      .append("text")
      .text((d, i) => {
         if(d[1] - d[0] > 30){
          return d[1] - d[0];
         }
      })
      .attr("x", (sequence) => xScale(sequence[1]) - 58)
      //   .attr("x", (sequence) => xScale(sequence[1]))
      .attr("y", (sequence, i) => yScale(sequence.data.themes))
      .style("fill", "#232832");
    // axes
    const xAxis = axisBottom(xScale);
    svg.select(".x-axis").call(xAxis);

    const yAxis = axisLeft(yScale);

    svg
      .select(".y-axis")
      .call(yAxis)
      .style("font-weight", "bold")
      .style("color", "gray");
    svg.selectAll(".layer").attr("transform", "translate(68 20)");
    svg.selectAll(".x-axis").attr("transform", "translate(60 400)");
    svg.selectAll(".y-axis").attr("transform", "translate(75 0)");
    svg.selectAll("path.domain").remove();
    svg.selectAll("line").remove();

    svg
      .selectAll(".y-axis .tick text")
      .style('font-size', 12)
      // .style
  
  }, [colors, data, keys, windowWidth]);

  return (
    <React.Fragment>
      <div ref={wrapperRef} className="px-2 h-100 align-items-center">
        <div className=''>
          <DigitalDevelopmentLegends id={'sbar_leg'} aligned_data={aligned_data} />
        </div>
        <svg ref={svgRef} 
            style={{ height: 270, width: (windowWidth < 1284 && windowWidth > 1220) ? 400 : 450 }}
        >
          {/* <g className="x-axis" /> */}
          <g className="y-axis" />
        </svg>
      </div>
    </React.Fragment>
  );
}
export default StackedBarChart;
const aligned_data = [
  { name: "SDG Aligned", color: "#30cfb9" },
  { name: "In Progress", color: "#f9d478" },
  { name: "Not Aligned", color: "#ef2348" },
  { name: "Not Relevant", color: "#ffffff" },
];

const keys = ["SDG Aligned", "In Progress", "Not Aligned", "Not Relevant"];

const colors = {
  "SDG Aligned": color.Align1,
  "In Progress": color.Align2,
  "Not Aligned": color.Align3,
  "Not Relevant": color.Align4,
};
