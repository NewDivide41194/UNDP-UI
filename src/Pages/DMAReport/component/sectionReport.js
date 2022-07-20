import React, { Fragment } from 'react'
import Scrollbars from 'react-custom-scrollbars';
import color from '../../../Feature/Config/color';
import BarChart from '../../../Feature/Graphs/barChart1';
import GaugeChart from '../../../Feature/Graphs/gaugeChart1';
import './../../../App.css'
import { ESButton } from '../../Questionnaire/components/tools/ES_Button';

const SectionReport = (props) => {
    const { data, sectionId, label, windowWidth } = props;
    return (
        <div className={`d-flex row mx-0 mb-2 ${data.length === 1 && 'justify-content-center'} `} >
            {
                data.map((v, k) => (
                    v.type === 'gauge' ?
                        <div
                            className='d-flex flex-wrap flex-col col-lg-4 col-sm-12 col-md-12 py-1 text-center'
                            style={{
                                height: 320
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
                                        data={v.value}
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
                        :
                        v.type === 'percent' ?
                            <Fragment>
                                {
                                    v.data[0].map((v1, k1) => (

                                        Object.entries(v1).map(([key, value]) =>
                                            <div key={k1} className='col-lg-4 col-sm-12 col-md-6 py-1 '>
                                                <div
                                                    className='p-2 text-left bg-white w-100 h-100 border'
                                                    style={{
                                                        borderRadius: 6,
                                                        boxShadow: `0px 16px 40px #edf2f8 `
                                                    }}
                                                >
                                                    <div className='d-flex justify-content-between text-primary px-3'>

                                                        <span className="pr-5 font-weight-bold" style={{ color: color.primaryColor, fontSize: 18 }} >{key}</span>
                                                        <h3 style={{ color: color.black }}>{value}</h3>

                                                    </div>
                                                    <div className='h-100'>
                                                        <BarChart
                                                            id={k1 === 0 ? `eGov_${sectionId}` : `RandD_${sectionId}`}
                                                            parentId={k1 === 0 ? `eGov_${sectionId}` : `RandD_${sectionId}`}
                                                            windowWidth={windowWidth}
                                                            yDomain={k1 === 0 ? [0, 200] : [0, 20]}
                                                            data={k1 === 0 ? gdpData1 : gdpData2}
                                                            tick={5}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    ))
                                }
                            </Fragment>
                            : v.type === 'table' ?
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
                                            data={v.data[0]}
                                            windowWidth={windowWidth}
                                        />
                                    </div>
                                </div>
                                : <></>

                ))
            }
        </div>
    )
}

export default SectionReport

const Table = (props) => {
    const { sectionId, windowWidth, data } = props;
    return (
        <div className='table mb-1 h-100 px-2'>
            <h6 className="py-2 pb-3" style={{ color: color.primaryColor }}>{tblHeaders[sectionId][0]}</h6>
            <Scrollbars
                className='scrollBar'
                autoHeight
                autoHeightMax='300px'
                autoHeightMin={'300px'}
                autoWidth
                style={{ minWidth: windowWidth > 500 && '400px', }}
                // renderTrackVertical={(props) => (
                //     <div
                //         {...props}
                //         style={{ display: "none" }}
                //         className="track-vertical"
                //     />
                // )}
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
                        {data.map((a, b) => {
                            return <tr className="">
                                {
                                    a.map((aa, bb) => (
                                        <td className="" key={bb} style={{ background: b % 2 == 0 && "#ecf3f9", borderColor: "white" }}>
                                            {
                                                sectionId === 'sectionId_4' ?
                                                (
                                                    bb===0 ?
                                                    (aa ? ((aa.match(/(18|19|20)\d{2}/g) ? (aa.match(/(18|19|20)\d{2}/g))[0] : null)) : null):
                                                    bb===1 ?
                                                    (aa ? 
                                                        (aa.match(/(18|19|20)\d{2}/g) ? (aa.replace((aa.match(/(18|19|20)\d{2}/g))[0],'')).replace('()','') : aa)
                                                    : null) :
                                                    aa
                                                )
                                                : aa
                                            }
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