import React, { Fragment } from 'react'
import Scrollbars from 'react-custom-scrollbars';
import color from '../../../Feature/Config/color';
import BarChart from '../../../Feature/Graphs/barChart1';
import GaugeChart from '../../../Feature/Graphs/gaugeChart1';
import './../../../App.css'
import { ESButton } from '../../Questionnaire/components/tools/ES_Button';

class ChartTblComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        } 
    }
 
    render() { 
        const { sectionId, windowWidth,gaugeData,othersData,label } = this.props;
    
        return (
            <div
                className='d-flex row mx-0 mb-2 justify-content-center'
            >
                <div
                    className='d-flex flex-wrap flex-col col-lg-4 col-sm-12 col-md-12 py-1 text-center'
                    style={{height:320
                    }}
                >
                    <div
                        id={`parent_${sectionId}`}
                        className='p-2 text-left bg-white w-100 text-center d-flex flex-wrap'
                        style={{
                            borderRadius: 6,
                            boxShadow: `0px 16px 40px #edf2f8 `,
                            flexFlow: 'column'
                        }}
                    >
                        <div className='w-100' style={{ flex: '0 1 auto' }}>
                            <GaugeChart
                                label={label}
                                data={gaugeData}
                                id={sectionId}
                                windowWidth={windowWidth}
                            />
                        </div>

                        <div className='w-100 justify-content-center d-flex align-items-center' style={{ flex: '1 1 auto' }}>
                            <ESButton
                                text={'View'}
                                style={{
                                    width: 150,
                                    height: 33,
                                    position: 'relative',
                                    right: 15,
                                }}
                                small
                                rounded
                                onClick={() => console.log('Clicked View.')}
                            />
                        </div>
                    </div>
                </div>
                {
                    sectionId === 'sectionId_1' || sectionId === 'sectionId_10' ?
                        <Fragment>
                            <div className='col-lg-4 col-sm-12 col-md-6 py-1 '>
                                <div
                                    className='p-2 text-left bg-white w-100 h-100 border'
                                    style={{
                                        borderRadius: 6,
                                        boxShadow: `0px 16px 40px #edf2f8 `
                                    }}
                                >
                                    <div className='d-flex justify-content-between text-primary px-3'>
                                    <span className="pr-5 font-weight-bold" style={{color:color.primaryColor,fontSize:18}} >{sectionId === 'sectionId_1'? 'Percentage of GDP allocated to e-Government:' :'Internet Penetration Rate (as a Percentage of Population)'}</span>
                                    <h3 style={{ color: color.black }}>{sectionId === 'sectionId_1'? (othersData ? othersData[2]?.other : ''): (othersData ? othersData[0]?.other : '')}</h3></div>
                                    <div className='h-100'>
                                        
                                        <BarChart
                                            id={`eGov_${sectionId}`}
                                            parentId={`eGov_${sectionId}`}
                                            windowWidth={windowWidth}
                                            yDomain={[0,200]}
                                            data={gdpData1}
                                            tick={5}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4 col-sm-12 col-md-6 py-1 '>
                                <div
                                    className='p-2 text-left bg-white w-100 h-100 border'
                                    style={{
                                        borderRadius: 6,
                                        boxShadow: `0px 16px 40px #edf2f8 `,
                                    }}
                                >
                                    <div className='d-flex justify-content-between text-primary px-3'>
                                    <span className="pr-5 font-weight-bold" style={{color:color.primaryColor,fontSize:18}}>{sectionId === 'sectionId_1'? 'Percentage of GDP allocated to R&D:' :'Wireless Network Availability (as a Percentage of Population)'}</span>
                                    <h3 style={{  color: color.black }}>{sectionId === 'sectionId_1'? (othersData ? othersData[3]?.other : ''): (othersData ? othersData[1]?.other : '')}</h3></div>
                                    <div className='h-100'>
                                        
                                        <BarChart
                                            id={`RandD_${sectionId}`}
                                            // customColor={"#000"}
                                            parentId={`RandD_${sectionId}`}
                                            windowWidth={windowWidth}
                                            yDomain={[0,20]}
                                            data={gdpData2}
                                            tick={4}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                        :
                        <div
                            id={`tbl_${sectionId}`}
                            className='col-lg-8 col-sm-12 col-md-12 py-1'
                            style={{
                            }}
                        >
                            <div
                                className='p-2 text-left bg-white w-100 h-100'
                                style={{
                                    borderRadius: 6,
                                    boxShadow: `0px 16px 40px #edf2f8 `
                                }}
                            >
                                <Table
                                    sectionId={sectionId}
                                    windowWidth={windowWidth}
                                />
                            </div>
                        </div>
                }
            </div>
        )
    }
}

export default ChartTblComponent;

const Table = (props) => {
    const { sectionId, windowWidth } = props;
    // console.log(tblHeaders[sectionId])
    return (
        <div className='table mb-1 h-100 px-2'>
            <h6 className="py-2 pb-3" style={{color:color.primaryColor}}>{tblHeaders[sectionId][0]}</h6>
            <Scrollbars
                className='scrollBar'
                autoHeight
                autoHeightMax='100%'
                style={{ minWidth: windowWidth > 500 && '400px', }}
                renderTrackVertical={(props) => (
                    <div
                        {...props}
                        style={{ display: "none" }}
                        className="track-vertical"
                    />
                )}
            >
                <table className="table table-bordered ">
                    <thead style={{ background: color.primaryColor }}>
                        <tr className="text-center text-light">

                            {tblHeaders[sectionId].map((a, b) => (
                                <th className="align-middle" key={b} style={{ minWidth: 150, borderTopLeftRadius: b == 0 && "10px", borderTopRightRadius: b == tblHeaders[sectionId].length - 1 && "10px" }}>
                                    {a}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tblBody[sectionId].map((a, b) => {
                            return <tr className="">
                                {
                                    a.map((aa, bb) => (
                                        <td className="" key={bb} style={{ background:b%2==0&&"#ecf3f9",borderColor:"white" }}>
                                            {aa}
                                        </td>
                                    ))
                                }
                            </tr>
                        }
                        )
                        }

                    </tbody>
                </table>
            </Scrollbars>
        </div>
    )
}


const tblHeaders = {
    sectionId_1: [''],
    sectionId_2: ['E-Government Activity', 'Responsible Ministries/Agencies'],
    sectionId_3: ['Budget Instruments'],
    sectionId_4: ['Year', 'Legal Acts', 'Responsible Ministries/Agencies'],
    sectionId_5: ['Type of Register', 'Responsible Authorities', 'Analogue/Digital', 'Format', 'Brief Description'],
    sectionId_7: ['Types of E-Services:', 'Responsible Ministries/Agencies', 'Target Users', 'Data Source or Register used for E-Service', 'Brief Description'],
    sectionId_8: ['Type of Citizen Engagement and E-democracy Initiative(s)', 'Responsible Ministries/Agencies', 'Brief Description'],
    sectionId_11: ['List of International Cooperation Initiatives', 'Responsible Ministries/Agencies', 'Brief Description']
}

const tblBody = {
    sectionId_1: [''],
    sectionId_2: [
        ['E-Government Strategy Design', 'Ministry of Information Technology, Communication and Innovation'],
        ['Development of E-Government Architecture', 'Central Informatics Bureau'],
        ['Development of E-Government Legal Framework', '']
    ],
    sectionId_3: [
        ['Interest-Free Loans for Capital Investments in ICT'],
        ['Three Year Corporate Tax Rebates for Qualifying Start-Ups'],
        ['R&D Subsidies']
    ],
    sectionId_4: [
        ['2017', 'Data Protection Act', 'State Law Office'],
        ['2001', 'Telecommunications Information and Communication Technologies Act', 'Central Informatics Bureau'],
        ['2000', '(Electronic Transactions Act)(retired)', 'Central Informatics Bureau']
    ],
    sectionId_5: [
        ['Population/Civil Register', 'Civil Status Division at the Prime Minister’s Office', 'Digital', 'XLSX, ASCII', 'Computerised system is being implemented in 71 sites across the Civil Service. separate applications for social aid and benefits have to be made by individuals seeking assistance, and these are routed through the Local Office and Benefits respectively.'],
        ['Citizenship Or ID Documents Register', '', '', '', '']
    ],
    sectionId_7: [
        ['e-Procurement System', 'Ministry of Civil Service and Administrative Reforms', 'Businesses', 'Mauritius Chamber of Commerce', 'Allows for digital submission of bids, evaluation of bids, and award of contracts among others. '],
    ],
    sectionId_8: [
        ['Citizen Support Portal', '', 'The Citizen Support Portal enables the Government to allocate resources more efficiently based on the different categories of complaints received in the different regions. '],
        ['Social Media Campaign', '', 'The Energy Efficiency Management Office and the Mauritius Police Force actively engage with Citizens on a regularly basis through their Facebook page.']
    ],
    sectionId_11: [
        ['', '', ''],
    ]
}

const gdpData1 = [
    { value: 100, label: '0-4' },
    { value: 50, label: '5-9' },
    { value: 60, label: '10-14' },
    { value: 110, label: '15-19' },
    { value: 180, label: '20-24' },
    { value: 100, label: '25-29' },
    { value: 110, label: '30-34' },
    { value: 30, label: '35-39' },
    { value: 200, label: '40-44' },
    { value: 80, label: '45-49' },
    { value: 130, label: '50-54' },
    { value: 100, label: '55-59' },
    { value: 20, label: '60-64' },
    { value: 60, label: '65-69' },
    { value: 90, label: '70-74' },
    { value: 170, label: '75-79' },
    { value: 110, label: '80-84' },
    { value: 80, label: '85+' },
]


const gdpData2 = [
    { value: 10, label: '0-4' },
    { value: 5, label: '5-9' },
    { value: 6, label: '10-14' },
    { value: 11, label: '15-19' },
    { value: 18, label: '20-24' },
    { value: 10, label: '25-29' },
    { value: 11, label: '30-34' },
    { value: 3, label: '35-39' },
    { value: 20, label: '40-44' },
    { value: 8, label: '45-49' },
    { value: 13, label: '50-54' },
    { value: 10, label: '55-59' },
    { value: 2, label: '60-64' },
    { value: 6, label: '65-69' },
    { value: 9, label: '70-74' },
    { value: 17, label: '75-79' },
    { value: 11, label: '80-84' },
    { value: 8, label: '85+' },
]