import React, { Fragment } from 'react'
import GuagueChart from '../../../Feature/Graphs/guagueChart'
import Carousel from 'react-material-ui-carousel'

class GuagueComponent extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = { slide: false }
        this.state = { guageSlide: this.props.data }

    }
    BreakLabel() {
        const legends = document.querySelectorAll("text.segment-value")
        const title = document.querySelectorAll("text.current-value")

        this.setState({ slide: true });

        for (let t of title) {
            t.setAttribute('transform', ' translate(0, -30)')
            const textWidth = 300
            const lineHeight = 20

            this.a({d:t, textWidth:textWidth, lineHeight:lineHeight, innerHTML: t.innerHTML})
        }

     
            for (let d of legends) {
                const legendName = d.innerHTML
                d.style.fontWeight = 'normal'
                if (legendName === 'Project Conceptualisation') {
                    d.setAttribute('transform', 'rotate(0) translate(-125, -40)')
                    this.a({d:d, innerHTML:'Project Conceptua- lisation'})
                }
                else if (legendName === 'Budget Allocation') {
                    d.setAttribute('transform', 'rotate(0) translate(-90, -100)')
                    this.a({d:d, innerHTML:'Budget Allocation'})
                }
                else if (legendName === 'Project Implementation') {
                    d.setAttribute('transform', 'rotate(0) translate(0, -125)')
                    this.a({d:d, innerHTML:'Project Implementation'})
                }
                else if (legendName === 'Performance Monitoring') {
                    d.setAttribute('transform', 'rotate(0) translate(90, -100)')
                    this.a({d:d, innerHTML:'Performance Monitoring'})
                }
                else if (legendName === 'Evaluation and Citizens Feedback') {
                    d.setAttribute('transform', 'rotate(0) translate(120, -55)')
                    this.a({d:d, innerHTML:'Evaluation and Citizens Feedback'})
                }
            }

    }

    a = ({d,textWidth,lineHeight,innerHTML }) => {
        //var x = 0;
        var y = lineHeight || 15;
        var width = textWidth || 50;

        var element = d
        var text = innerHTML;
 
        /* split the words into array */
        var words = text.split(' ');
        var line = '';

        /* Make a tspan for testing */
        element.innerHTML = '<tspan id="PROCESSING">busy</tspan>';

        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var testElem = document.getElementById('PROCESSING');
            /*  Add line in testElement */
            testElem.innerHTML = testLine;
            /* Messure textElement */
            var metrics = testElem.getBoundingClientRect();
            const testWidth = metrics.width;

            if (testWidth > width && n > 0) {
                element.innerHTML += '<tspan x="0" dy="' + y + '">' + line + '</tspan>';
                line = words[n] + ' ';
            } else {
                line = testLine;
            }
        }

        element.innerHTML += '<tspan x="0" dy="' + y + '">' + line + '</tspan>';
        document.getElementById("PROCESSING").remove();
    }
    componentDidUpdate = () => {
        this.BreakLabel()
    }
    componentDidMount() {
        this.BreakLabel()

    }

    render() {
        return (
            <Carousel
                onChange={() => this.setState({ slide: !this.state.slide })}
                autoPlay={false}
                indicators={false}
                index={this.props.index}
                // IndicatorIcon={<i className={`fa fa-fast-forward fa-2x`} style={{color: "#088cd7", cursor: 'pointer',position: "relative", top: "80%"}}></i>}   
                animation="slide">

                {
                    this.state.guageSlide.map((a, b) =>
                        <div className="d-flex row" key={b} id={b}>

                            {
                            // a.guageData.length < 3 ?
                            //     <Fragment>

                            //         {a.guageData.map((c, d) =>
                            //             <div className="col px-0 m-0" key={d}>
                            //                 <GuagueChart
                            //                     guagueTitle={c.title} value={parseInt(c.value) === 1 ? '100' : parseInt(c.value) === 2 ? '300' : parseInt(c.value) === 3 ? '500' : parseInt(c.value) === 4 ? '700' : parseInt(c.value) === 5 ? '900' : '0'} />
                            //             </div>
                            //         )}
                            //         <div className="col px-0 m-0" style={{ display: 'none' }}>
                            //             <GuagueChart
                            //                 guagueTitle={''} value={'900'} />
                            //         </div>
                            //         <div className="col px-0 m-0" style={{ display: 'none' }}>
                            //             <GuagueChart
                            //                 guagueTitle={''} value={'900'} />
                            //         </div>
                            //     </Fragment>
                            //     :
                                a.guageData.map((c, d) =>
                                    <div className="col px-0" key={d}>
                                        <GuagueChart
                                            guagueTitle={c.title} value={parseInt(c.value) === 1 ? '100' : parseInt(c.value) === 2 ? '300' : parseInt(c.value) === 3 ? '500' : parseInt(c.value) === 4 ? '700' : parseInt(c.value) === 5 ? '900' : '0'} />
                                    </div>
                                )
                            }

                        </div>
                    )
                }
            </Carousel>
        )
    }
}

export default GuagueComponent
const dataSample = [
    {
        "title": "National Electronic Licensing System",
        "value": 4
    },

]
// const guageSlide = [{
//     "slide": 1,
//     "guageData": [{ title: 'Social Integration Management Information System', value: "4" },
//     { title: 'Electronic Health Records System', value: "3" },
//     { title: 'Mauritius and Rodrigues Submarine (MARS) subsea cable system', value: "4" }]
// },
// {
//     "slide": 2,
//     "guageData": [{ title: 'National Multi Hazard Alert System', value: "4" },
//     { title: 'Agricultural Production & Market Information System', value: "4" },
//     { title: 'National Traffic Data Management System', value: "4" }
//     ]
// },
// {
//     "slide": 3,
//     "guageData": [{ title: 'National Electronic Licensing System', value: "4" },
//     { title: 'National Identity Scheme', value: "3" },
//     { title: 'Open Data Portal', value: "4" }
//     ]
// }]
