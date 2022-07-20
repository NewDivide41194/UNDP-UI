import React from 'react'
import * as d3 from "d3";
import * as d3_sankey from 'd3-sankey'
import color from '../Config/color'
import '../../App.css'
import { withCookies } from 'react-cookie';
import { withRouter } from 'react-router';
class SankeyDiagram extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            DataSankey: this.props.SankeyData,
            windowWidth : this.props.windowWidth
        }
    }

    loadSankeyDiagram = () => {
        const Sankeydata = this.state.DataSankey.reduce((r, c) => {
            const R = [...r]
            R.push({ sdg_name: 'SDG' + c.sdg_id + ':' + c.sdg_title, sector_name: c.sector_name, value: c.value })
            return R
        }, [])
        this.setState({ DataSankey:Sankeydata }, () => this.DrawSankey())
            
    }
    componentDidMount() {
        this.loadSankeyDiagram()
    }

    componentDidUpdate(prevProps){
        if(this.props.SankeyData!==prevProps.SankeyData){
            const elements = document.getElementsByClassName("viz__sankey-diagram");

            while (elements.length > 0) elements[0].remove();
            
             this.setState({DataSankey: this.props.SankeyData}, ()=> this.loadSankeyDiagram())
        }
        if(this.props.windowWidth !== prevProps.windowWidth){
            const elements = document.getElementsByClassName("viz__sankey-diagram");

            while (elements.length > 0) elements[0].remove();
            
             this.setState({
                 DataSankey: this.props.SankeyData,
                 windowWidth: this.props.windowWidth
            }, 
                ()=> this.loadSankeyDiagram())
        }
    }

    DrawSankey = () => {
        const { windowWidth } = this.state;
        const sankeyDiagram = d3
            .select('.viz')
            .append('article')
            .attr('class', 'viz__sankey-diagram');

        // svg visualization
        const sankeyDiagramMargin = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
        };
        const height =   (windowWidth >= 1800 && windowWidth < 1920) ? 300
                        : (windowWidth < 1800 && windowWidth >=1700) ? 320
                        : (windowWidth <=1699 && windowWidth > 1540) ? 350
                        : (windowWidth >=1367 && windowWidth <1453) ? 410
                        : (windowWidth >= 1198 && windowWidth <=1258) ? 410 
                        : (windowWidth >= 1259 && windowWidth <=1320) ? 390 : 375
        // describe a rectangle
        const sankeyDiagramWidth = 460 - (sankeyDiagramMargin.left + sankeyDiagramMargin.right);
        const sankeyDiagramHeight = height - (sankeyDiagramMargin.top + sankeyDiagramMargin.bottom);

        const sankeyDiagramSVG = sankeyDiagram
            .append('svg')
            .attr('viewBox', `0 0 ${sankeyDiagramWidth + (sankeyDiagramMargin.left + sankeyDiagramMargin.right)} ${sankeyDiagramHeight + (sankeyDiagramMargin.top + sankeyDiagramMargin.bottom)}`);

        const sankeyDiagramGroup = sankeyDiagramSVG
            .append('g')
            .attr('transform', `translate(${sankeyDiagramMargin.left} ${sankeyDiagramMargin.top})`);

        // color scale to color the sankey chords differently
        var sankeyColor = d3.scaleOrdinal([`#f44336`, `#e91e63`, `#9c27b0`, `#673ab7`, `#2196f3`, `#009688`, `#ffc107`, `#ff5722`, `#5D4037`]);

        /* the sankey function requires an object detailing the nodes and links in two properties
        {
          nodes,
          links
        }
        */
        /* nodes describes one object for each sector
        {
          sector,
        }
        */
        // retrieve the sectors from the dataSankey array
        const sectors = this.state.DataSankey.map(({ sector_name }) => sector_name);

        const sdg_names = this.state.DataSankey.map(({ sdg_name }) => /*"SDG" + `${sdg_id}` +*/(sdg_name));

        const uniqueSectors = new Set([...sectors, ...sdg_names]);

        const nodes = [...uniqueSectors].map(sector_name => ({
            sector_name,
        }));

        /* links describes one object with source, target and value properties
        {
          source,
          target,
          value,
        }
        the structure is simular to the DataSankey array, just with different labels
        */
        const links = this.state.DataSankey.map(({ sector_name: target, sdg_name: source, value }) => ({
            source,
            target,
            value,
        }));

        // larger object for the sankey function
        const data = {
            nodes,
            links,
        };

        // sankey function
        const sankey = d3_sankey.sankey()
            .nodeWidth(2)
            .nodePadding(1)
            .nodeId(d => d.sector_name)
            .size([sankeyDiagramWidth, sankeyDiagramHeight]);

        // process the data to retrieve the values necessary to draw the nodes and connections
        const { nodes: nds, links: lnks } = sankey(data);

        // for each link add a path element connecting the source and target
        // gengerator function describing the path elements based on the links' attributes
        const sankeyLinks = d3_sankey
            .sankeyLinkHorizontal();

        var tooltip = d3.select("body").append("div").attr("class", "sankey_toolTip");

        const setNodeColor = (d, i) => {

            if (d.sector_name.includes('SDG')) {
                const currentSector = d.sector_name.substr(0, d.sector_name.indexOf(':'))
                return color[currentSector]
            }
            else return sankeyColor(i)

        };


        const lnkColor = (d) => {
            const sourceName = d.source.sector_name.substr(0, d.source.sector_name.indexOf(':'))
            return color[sourceName]
        }

        // path elements
        sankeyDiagramGroup
            .selectAll('path.link')
            .data(lnks)
            .enter()
            .append('path')
            .attr('class', 'link')
            .attr('d', sankeyLinks)
            .attr('fill', 'none')
            .attr('stroke', lnkColor)
            .attr('stroke-width', ({ width }) => width)
            .attr('opacity', 0.2)
            // on hover show the information connected with the path element
            .on('mouseenter', function (event, { source, target, value }, i) {

                d3
                    .select(this)
                    .transition()
                    .attr('opacity', 0.7);

                tooltip
                    // .append('p')
                    .style('left', `${event.pageX}px`)
                    .style('top', `${event.pageY}px`)
                    .style('display', 'flex')
                    .style('align-items', 'center')
                    .html(`
              <svg width="6" height="6" viewBox="0 0 10 10" style="margin: 0; margin-right: 0.35rem;">
                <circle cx="5" cy="5" r="5" fill="#fff"></circle>
              </svg>
              <strong>${value}</strong>&nbsp; from '${source.sector_name}' to '${target.sector_name}'
            `);

            })
            .on('mouseout', function (d) {
                d3
                    .select(this)
                    .transition()
                    .attr('opacity', 0.2);

                tooltip.style("display", "none");

            });

        // for each node draw include a group element to group the rectangle and text labels
        // position the group (and the subsequent elements) using the computed properties x0, x1, y0, y1
        const sankeyDiagramNodes = sankeyDiagramGroup
            .selectAll('g.node')
            .data(nds)
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', ({ x0, y0 }) => `translate(${x0} ${y0})`);

        sankeyDiagramNodes
            .data(nds)
            .append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', ({ x0, x1 }) => (x1 - x0) + 2)
            .attr('height', ({ y0, y1 }) => y1 - y0)
            .attr('fill', setNodeColor);

        // position the labels inwards
        sankeyDiagramNodes
            .append('text')
            .attr('x', ({ depth }) => depth === 0 ? 10 : -10)
            .attr('y', ({ y0, y1 }) => (y1 - y0) / 2)
            .attr('text-anchor', ({ depth }) => depth === 0 ? 'start' : 'end')
            .attr('dominant-baseline', 'middle')
            .attr('font-size', '0.5rem')
            .attr('font-weight', 'bold')
            .text(({ sector_name }) => sector_name);
    }
    
    render() {
        return (
            <div>
                <div className="viz bg-white" style={{ borderRadius: 10,
                    boxShadow: `1px 1px 2px ${color.greyColor}`}}></div>
                {/* <div className="text-right my-2 mr-3">
                  <button
                    className="btn px-4"
                    style={{
                      background: color.primaryColor,
                      color: "#fff",
                      borderRadius: 50,
                    }}
                    onClick={() =>console.log("view more")}
                  >
                    View More <i className="fa fa-caret-right pl-1" />
                  </button>
                </div> */}
            </div>
        )
    }
    
}


export default withRouter(withCookies(SankeyDiagram))