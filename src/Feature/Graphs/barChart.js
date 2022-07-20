import React, { useEffect } from 'react'
import * as d3 from "d3";
import color from '../Config/color';

const BarChart = (props) => {
    const { windowWidth, parentId,id,customColor, data} = props;
    const sidebarOpen = localStorage.getItem('sidebarOpen')
    useEffect(() => {
        // const dataArray = [
        //     { value: 0, label: '0-4' },
        //     { value: 0, label: '5-9' },
        //     { value: 0, label: '10-14' },
        //     { value: 0, label: '15-19' },
        //     { value: 0, label: '20-24' },
        //     { value: 0, label: '25-29' },
        //     { value: 0, label: '30-34' },
        //     { value: 0, label: '35-39' },
        //     { value: 0, label: '40-44' },
        //     { value: 0, label: '45-49' },
        //     { value: 0, label: '50-54' },
        //     { value: 0, label: '55-59' },
        //     { value: 0, label: '60-64' },
        //     { value: 0, label: '65-69' },
        //     { value: 0, label: '70-74' },
        //     { value: 0, label: '75-79' },
        //     { value: 0, label: '80-84' },
        //     { value: 0, label: '85+' },
        // ]

        drawBarchart(data);

    }, [windowWidth, sidebarOpen, data])

    const drawBarchart = (dataArray) => {
         d3.select("#"+id+" "+"svg").remove();
        // set the dimensions and margins of the graph
        const svgSize = parentId ? document.getElementById(parentId) : document.getElementById("keywordTable");
        var margin = { top: 20, right: 20, bottom: 30, left: 30 },
            width = svgSize === null ? 200 : svgSize.offsetWidth - margin.left - margin.right,
            height = parentId ? 100 : (svgSize === null ? 200 :svgSize.offsetHeight - margin.top - margin.bottom);

        // set the ranges
        var x = d3.scaleBand()
            .range([0, width])
            .padding(0.2);
        var y = d3.scaleLinear()
            .range([height, 0]);
      
        var svg = d3.select("#"+id).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        x.domain(dataArray.map(function (d) { return d.label; }));
        y.domain([-1, d3.max(dataArray, function (d) { return d.value; })]);

        var tooltip = d3.select("body").append("div").attr("class", "bc-toolTip");
        tooltip
            .style('position', 'absolute')
            .style('display', 'none')
            .style('height', 'auto')
            .style('min-width', 80)
            .style('background', 'none repeat scroll 0 0 #ffffff')
            .style('border', '1px solid #6F257F')
            .style('padding', 14);

        //is all data value is zero ?
        var isAllZero = dataArray.filter(v=> v.value === 0).length === dataArray.length;
        var extraVal = id === 'age' ? 210 : 90;

        // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(dataArray)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return x(d.label); })
            .attr("width", x.bandwidth())
            .attr("y", function (d) { return isAllZero ?  (y(d.value)+extraVal ): y(d.value); })
            .attr("height", function (d) { return isAllZero ? (height - y(d.value)-extraVal) : (height - y(d.value)); })
            .style('fill', customColor ? customColor : color.primaryColor)
            .style('opacity', function (d) {
                const op = Math.max.apply(Math, dataArray.map(function (o) { return o.value; })) === d.value
                    ? 1 : .5;
                return op;
            })
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