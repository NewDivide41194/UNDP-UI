import React, { useEffect, useState } from 'react'
import * as d3 from "d3"
import color from '../Config/color';

const GaugeChart = (props) => {
    const {data,label}=props
    const levelData=data&& data ===166 ? [0.333] : data === 167 ? [0.666] : data === 168 ? [0.9999] : 0
   // console.log("data",data);
    const sidebarOpen = localStorage.getItem('sidebarOpen')
    const gauge = function (container, configuration) {
        d3.select(`#${props.id} svg`).remove();
        var that = {};
        var config = {
            size: 200,
            clipWidth: 200,
            clipHeight: window.innerWidth < 1565 && window.innerWidth > 1430 ? 130 : 110,
            ringInset: 20,
            ringWidth: 20,

            pointerWidth: 10,
            pointerTailLength: 5,
            pointerHeadLengthPercent: 0.8,

            minValue: 0,
            maxValue: 10,

            minAngle: -90,
            maxAngle: 90,

            transitionMs: 750,

            majorTicks: 3,
            labelFormat: d3.format('d'),
            labelInset: 10,

            arcColorFn: ['#D6E2EE', '#D6E2EE', '#D6E2EE']
        };
        var range = undefined;
        var r = undefined;
        var pointerHeadLength = undefined;
        var value = 0;

        var svg = undefined;
        var arc = undefined;
        var scale = undefined;
        var ticks = undefined;
        var tickData = undefined;
        var meterArc = undefined;
        var meterTickData = levelData
        var pointer = undefined;
        var text = undefined;
        var donut = d3.pie();

        function deg2rad(deg) {
            return deg * Math.PI / 180;
        }

        function newAngle(d) {
            // var ratio = scale(d);
            var ratio = d3.scaleRadial(d)
            var newAngle = config.minAngle + (ratio * range);
            return newAngle;
        }

        function configure(configuration) {
            var prop = undefined;
            for (prop in configuration) {
                config[prop] = configuration[prop];
            }

            range = config.maxAngle - config.minAngle;
            r = config.size / 1.5;
            pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

            // a linear scale that maps domain values to a percent from 0..1
            scale = d3.scaleLinear()
                .range([0, 1])
                .domain([config.minValue, config.maxValue]);

            ticks = scale.ticks(config.majorTicks);

            tickData = d3.range(config.majorTicks).map(function () { return 1 / config.majorTicks; });
            arc = d3.arc()
                .innerRadius(r - config.ringWidth - config.ringInset)
                .outerRadius(r - config.ringInset)
                .cornerRadius(function (d, i, c) {
                    if (i === 0 || i === 2) return 12
                    return 0
                })
                .startAngle(function (d, i, c, e) {
                    var ratio = i === 0 ? 0 : tickData.reduce((r, c, j) => j < i ? r + c : r, 0);
                    return deg2rad(config.minAngle + (ratio * range) - (i === 2 ? 8 : 0));
                })
                .endAngle(function (d, i) {
                    var startRatio = i === 0 ? 0 : tickData.reduce((r, c, j) => j < i ? r + c : r, 0);
                    var ratio = startRatio + d;
                    return deg2rad(config.minAngle + (ratio * range) + (i === 0 ? 8 : 0));
                });
            meterArc = d3.arc().startAngle(function (d, i, c, e) {
                var ratio = i === 0 ? 0 : meterTickData.reduce((r, c, j) => j < i ? r + c : r, 0);
                return deg2rad(config.minAngle + (ratio * range));
            })
                .endAngle(function (d, i) {
                    var startRatio = i === 0 ? 0 : meterTickData.reduce((r, c, j) => j < i ? r + c : r, 0);
                    var ratio = startRatio + d;
                    return deg2rad(config.minAngle + (ratio * range));
                })
                .innerRadius(r - config.ringWidth - config.ringInset + 1)
                .outerRadius(r - config.ringInset - 1)
                .cornerRadius(function (d, i, c) {
                    if (i === 0) return 12
                    return 0
                })
                ;
        }
        that.configure = configure;

        function centerTranslation_() {
            const W = (props.windowWidth < 992 && props.windowWidth > 690)
                ? (document.getElementById(`parent_${props.id}`).offsetWidth / 2.3) + 15
                : (document.getElementById(`parent_${props.id}`).offsetWidth / 2.3) - 3;
            const H = props.windowWidth < 992 ? (r + 10) : (r + 10)
            // console.log("W",W,"H",H)
            return 'translate(' + W + ',' + H + ')';
        }

        function isRendered() {
            return (svg !== undefined);
        }
        that.isRendered = isRendered;

        function render(newValue) {

            svg = d3.select(container)
                .append('svg:svg')
                .attr('class', 'gauge')
                .attr('width', '100%')
                .attr('height', config.clipHeight * 2);

            var centerTx = centerTranslation_();


            var arcs = svg.append('g')
                .attr('class', 'arc')
                .attr('transform', centerTx);

            arcs.selectAll('path')
                .data(tickData)
                // .data([0.2, 0.2, 0.6])
                .enter().append('path')
                .attr('fill', function (d, i) {
                    // if(i===2) return "#ff0000"
                    return config.arcColorFn[i];
                })
                .style('stroke', '#fff')
                .style('stroke-width', 2)
                .attr("id", function (d, i) { return `p${i}` })
                .attr('d', arc);
            arcs.selectChild("#p1").raise()

            // meter arc
            var meterArcs = svg.append('g')
                .attr('class', 'meterArc')
                .attr('transform', centerTx);
            meterArcs.selectAll('path')
                .data(meterTickData)
                // .data([0.2, 0.2, 0.6])
                .enter().append('path')
                .attr('fill', function (d, i) {
                    if (i > 0) return "#00000000"
                    return "#0969FA";
                })
                // .style('stroke', '#fff')
                .attr("id", function (d, i) { return `mp${i}` })
                .attr('d', meterArc);
            meterArcs.selectChild("#mp1").raise()

            const dividerArc = d3.arc()
                .innerRadius(r - config.ringWidth - config.ringInset)
                .outerRadius(r - config.ringInset)
                .startAngle(deg2rad(-30))
                .endAngle(deg2rad(30))

            const dividerArcs = svg.append('g')
                .attr('class', 'dividerArc')
                .attr('transform', centerTx);

            dividerArcs.selectAll("path")
                .data([0.3])
                .enter().append('path')
                .attr("fill", "#00000000")
                .attr("d", dividerArc)
                .style("stroke", "white")

           
            var text1 = svg.append('g')
                .attr('class', 'label')
                .attr('transform', centerTx)

            // .attr('transform',"translate(150 130)")
            text1.selectAll('text')
                .data(" ")
                .enter().append('g')
                .attr("text-anchor", 'middle')
                .append('text')
                .attr("dy", sidebarOpen==="true"&&(window.innerWidth < 1365 && window.innerWidth > 992)? "-2em" : "-3em")
                .text(meterTickData === 0 ? "" : meterTickData < 0.33333 ? "Basic" : meterTickData < 0.66666 ? "Useful" : "Subtainable")
                .style('fill', color.textColor)
                .style('font-weight', 'bold')
                .style('font-size', sidebarOpen==="true"&&(window.innerWidth > 1220 && window.innerWidth <1275)?20:(window.innerWidth > 1220 || window.innerWidth < 992) ? 24 : window.innerWidth > 1100 ? 15 : 12)

            var text2 = svg.append('g')
                .attr('class', 'label1')
                .attr('transform', centerTx)

            var maxTextWidth = 2 * (config.size / 2 - config.ringWidth - config.ringInset)
            var textArr = label.split(" ").reduce((r,c,i) => i===0 ? [...r, c] : [...r, "_", c] , [])
            var textArrComputed = []
            var lastLength = 0
            text2.selectAll("text")
                .data(textArr)
                .enter()
                .append("text")
                // .attr("dy", "-3em")
                .attr("text-anchor", "middle")
                .style('fill', "#999999")
                // .style('font-size',(window.innerWidth > 1220 || window.innerWidth < 992) ? 13 : window.innerWidth > 1100 ? 10 : 8)
                .text(function(d) { return d })
                .each(function(d, i) {
                    const wordWidth = this.getComputedTextLength()
                    if(i===0) {
                        textArrComputed.push(d)
                        lastLength = wordWidth
                    } else if(lastLength+wordWidth>maxTextWidth) { ///break at width
                        textArrComputed.push(d)
                        lastLength = 0
                    } else {
                        textArrComputed[textArrComputed.length-1] += d
                        lastLength += wordWidth
                    }
                })
                .remove()
            text2.selectAll("text")
                .data(textArrComputed.map(t => t.replace(/_/g, " ")))
                .enter()
                .append("text")
                .attr("dy", function(d,i) {
                    return `${-2 + i*1.5}em`
                })
                .attr("text-anchor", "middle")
                .style('fill', "#999999")
                .style('font-size',sidebarOpen==="true"&&(window.innerWidth > 1090 && window.innerWidth <1375)?10:(window.innerWidth > 1220 || window.innerWidth < 992) ? 13 : window.innerWidth > 1100 ? 10 : 8)
                .text(function(d) { return d })

            // text2.selectAll('text')
            //     .data(" ")
            //     .enter().append('g')
            //     .attr("text-anchor", 'middle')
            //     .attr('class', 'centerText')
            //     .append("svg:text")
            //     .attr("dy", "-2em")
            //     .text(label)
            //     .style('fill', "#999999")
            //     .style('width', "50px")
            //     // .style('font-weight', 'bold')
            //     .style('font-size', 12);
            // // d3.selectAll('.centerText').call(wrap,100)
            // ;

            // var text3 = svg.append('g')
            //     .attr('class', 'label1')
            //     .attr('transform', centerTx)

            // text3.selectAll('text')
            //     .data(" ")
            //     .enter().append('g')
            //     .attr("text-anchor", 'middle')
            //     .attr('class', 'centerText')
            //     .append("svg:text")
            //     .attr("dy", "-1em")
            //     .text(label2)
            //     .style('fill', "#999999")
            //     .style('width', "50px")
            //     // .style('font-weight', 'bold')
            //     .style('font-size', 12);

            const labels = ['Basic', 'Useful', 'Sustainable']
            var lg = svg.append('g')
                .attr('class', 'label')
                .attr('transform', centerTx);
            lg.selectAll('text')
                .data(ticks)
                .enter().append('g')
                .attr('transform', function (d, i) {
                    var ratio = scale(d);
                    var newAngle = config.minAngle + (ratio * range);
                    var extra = i === 0 ? 5 : i === 2 ? 8 : 0;
                    var Y = i === 0 ? -15 : i === 2 ? 15 : 0
                    return 'rotate(' + newAngle + ') translate(' + (Y) + ',' + (config.labelInset - r - extra + (i != 1 && 27)) + ')';
                })
                .attr("text-anchor", 'middle')
                .append('text')
                .attr('transform', function (d) {
                    var ratio = scale(d);
                    var newAngle = config.minAngle + (ratio * range);
                    return 'rotate(' + -newAngle + ') ';
                })
                .text(function (d, i) {
                    return labels[i]
                })
                .style('fill', "#999999")
            // .style('font-weight', 'bold');


            // var lineData = [[config.pointerWidth / 2, 0],
            // [0, -pointerHeadLength],
            // [-(config.pointerWidth / 2), 0],
            // [0, config.pointerTailLength],
            // [config.pointerWidth / 2, 0]];
            // console.log("lineData: ", lineData)
            // var pointerLine = d3.line().curve(d3.curveMonotoneX);
            // var pg = svg.append('g').data([lineData])
            //     .attr('class', 'pointer')
            //     .attr('transform', centerTx)
            //     .style('fill', '#969696')

            // pointer = pg.append('path')
            //     .attr('d', pointerLine/*function(d) { return pointerLine(d) +'Z';}*/)
            //     .attr('transform', 'rotate(' + config.minAngle + ')');
            // console.log("newValue: ", newValue)
            // update(newValue === undefined ? 0 : newValue);
        }
        that.render = render;

        function update(newValue, newConfiguration) {
            if (newConfiguration !== undefined) {
                configure(newConfiguration);
            }
            var ratio = scale(newValue);
            var newAngle = config.minAngle + (ratio * range);
          
            var pointerData=data && data === 166 ? [-550]: data ===167 ? [30]: [550]
           // console.log("pointerData",pointerData);
            pointer
                .data(pointerData)
                .transition()
                .ease(d3.easeElasticOut)
                .duration(2000)
                .attr("transform", function (d) {
                    return "rotate(" + scale(d) + ")"
                })
        }
        that.update = update;
        configure(configuration);

        return that;
    };
    useEffect(() => {
        const id = '#' + props.id
        const width = document.getElementById(`parent_${props.id}`).offsetWidth - 40
        var powerGauge = gauge(id, {
            size: width > 420 ? 270 : width - 90,
            clipWidth: width > 420 ? 270 : width - 90,
            //clipHeight: height-50,
            ringWidth: 25,
            maxValue: 10,
            transitionMs: 3333,
        });
        powerGauge.render();

    }, [props.windowWidth,sidebarOpen,levelData])

    return (
        <>
            <div
                className='d-flex justify-content-center align-items-center'
                id={props.id}
                style={{ background: "rgba(96, 116, 136, 0.05)" }}
            >
            </div>

        </>
    )
}

export default GaugeChart;