import React, { useEffect } from 'react'
import * as d3 from "d3";
import color from '../Config/color';

const BarChart = (props) => {
    const { windowWidth, parentId, id, customColor,data,yDomain,tick } = props;
    const sidebarOpen = localStorage.getItem('sidebarOpen')
    useEffect(() => {      

        drawBarchart(data);

    }, [windowWidth, sidebarOpen])

    const drawBarchart = (data) => {
        d3.select("#" + id + " " + "svg").remove();
        // set the dimensions and margins of the graph
        const svgSize = parentId ? document.getElementById(parentId) : document.getElementById("keywordTable");
        var margin = { top: 20, right: 20, bottom: 30, left: 50 },
            width = svgSize === null ? 200 : svgSize.offsetWidth - margin.left - margin.right,
            height = parentId ? 200 : (svgSize === null ? 200 : svgSize.offsetHeight - margin.top - margin.bottom);

        // set the ranges
        var x = d3.scaleBand()
            .range([0, width])
            .padding(0.2);
        var y = d3.scaleLinear()
        .domain(yDomain)
            .range([height, 0])

        var svg = d3.select("#" + id).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        x.domain(data.map(function (d) { return d.label; }));
        // y.domain([0, d3.max(data, function (d) { return d.value; })]);
        var tooltip = d3.select("body").append("div").attr("class", "bc-toolTip");
        tooltip
            .style('position', 'absolute')
            .style('display', 'none')
            .style('height', 'auto')
            .style('min-width', 80)
            .style('background', 'none repeat scroll 0 0 #ffffff')
            .style('border', '1px solid #6F257F')
            .style('padding', 14);

        const barHeight = height / 25;
        var scale = d3.scaleLinear()
            .domain([d3.min(data), d3.max(data)])
            .range([height / 2, 0]);
        svg
            .append("g")
            .attr("transform", "translate(0,-" + barHeight + ")")
            .call(d3.axisLeft(y).ticks(tick))
            .attr("class", "Y-Axis")
            .selectAll("text")
            .style("text-anchor", "end")
        // .attr("dx", "-.3em")
        // .attr("dy", ".3em");

        // append the rectangles for the bar chart

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("rx", 6)
            .attr("class", "bar")
            .attr("x", function (d) { return x(d.label); })
            .attr("width", 10)
            .attr("y", function (d) { return y(d.value); })
            .attr("height", function (d) { return height - y(d.value); })
            .style('fill', customColor ? customColor : color.primaryColor)
            .style('opacity', function (d) {
                const op = Math.max.apply(Math, data.map(function (o) { return o.value; })) === d.value
                    ? 1 : .5;
                return op;
            }).style("border-radius", "20px")
            .on("mouseover", function (event, d) {
                tooltip
                    .style("left", event.pageX - 50 + "px")
                    .style("top", event.pageY - 70 + "px")
                    .style("display", "inline-block")
                    .html("<span class='mx-2'> Age " + d.label + " : " + d.value + " </span>")

            })
            .on("mouseout", function (d) { tooltip.style("display", "none"); });
    }
    return (

        <div
            className='barchart d-flex justify-content-center h-100'
            style={{
            }}
            id={id} />
    )
}

const data = [
    { name: 'age 0-1', value: 10 },
    { name: 'age 2-3', value: 10 },
    { name: 'age 4-5', value: 10 },
    { name: 'age 6-7', value: 10 },
    { name: 'age 8-9', value: 10 },
    { name: 'age 10-11', value: 10 },
    { name: 'age 12-13', value: 10 },
    { name: 'age 14-15', value: 10 },
    { name: 'age 16-17', value: 10 },
    { name: 'age 18-19', value: 10 },
    { name: 'age 20-21', value: 10 },
    { name: 'age 22-23', value: 10 },
]

export default BarChart;