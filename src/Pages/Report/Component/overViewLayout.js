import moment from 'moment'
import React, { Fragment } from 'react'
import Ict from "../../../Feature/Images/Ict.PNG"
import Spotlight from '../../../Feature/Images/spot.PNG'
import { ESButton } from '../../Questionnaire/components/tools/ES_Button'
import color from '../../../Feature/Config/color'

const Overview = (props) => {
    const { userUpdate, updateFile, windowWidth,solutionData, overviewSolutionsCnt } = props;

    var ictComponentData = [];
    for (let index = 1; index <= Object.keys(solutionData).length; index++) {
      const result = solutionData[index].reduce((r, c, i) => {
        const R = [...r];
        if (i == 0) {
          R.push({
            sdg_id: c.sdg_id,
            sectors: c.sector_id ? 1 : 0,
            ict_components: [],
          });
          if (c.ict_component) {
            R[0].ict_components.push(c.ict_component);
          }
          if (c.secondary_ict_component) {
            R[0].ict_components.push(c.secondary_ict_component);
          }
        } else {
          R[0].sectors = c.sector_id ? R[0].sectors + 1 : R[0].sectors
          if (
            c.ict_component &&
            !R[0].ict_components.includes(c.ict_component)
          ) {
            R[0].ict_components.push(c.ict_component);
          }
          if (
            c.secondary_ict_component &&
            !R[0].ict_components.includes(c.secondary_ict_component)
          ) {
            R[0].ict_components.push(c.secondary_ict_component);
          }
        }
        return R;
      }, []);
     
      ictComponentData.push(...result);
    }
    const max=ictComponentData.sort((a,b)=> b.sectors-a.sectors)[0].sdg_id
//     const sectors=
//     max===1 ? "No Poverty":
//     max===2 ? "Zero Hunger":
//     max===3 ? "Good Health and Well-Being":
//     max===4 ? "Quality Education":
//     max===5 ? "Gender Equality":
//     max===6 ? "Clean Water and Sanitation":
//     max===7 ? "Affordable and Clean Energy":
//     max===8 ? "Decent Work and Economic Growth":
//     max===9 ? "Industry, Innovation and Infrastructure":
//     max===10 ? "Reduced Inequalities":
//     max===11 ? "Sustainable Cities and Communities":
//     max===12 ? "Responsible Consumption and Production":
//     max===13 ? "Climate Action":
//     max===14 ? "Life Below Water":
//     max===15 ? "Life On Land":
//     max===16 ? "Peace, Justice and Strong Institutions":
//    "Partnerships For The Goals"
    

    const UpdatedData = [
        { 
            info: 'Time/Date :', 
            infoData: userUpdate && moment(userUpdate.last_modified_date).format("DD-MMM-yyyy") 
        },
        { 
            info: 'User Name :', 
            infoData: userUpdate && userUpdate.user_name 
        },
        { 
            info: 'Latest Upload :', 
            infoData: updateFile && updateFile.length != 0 && updateFile.map((v => v.file_name)) 
        },
    ]
    // console.log("UpdateData", UpdatedData);
    const _handleMoveIct = (id) => {
        var scrollDiv = document.getElementById("solutions").offsetTop;
        if(id==='Ict'){
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }else{
            window.scrollTo({ top: scrollDiv, behavior: 'smooth' });
        }
        
    }

    return (
        <Fragment>
            {
                OverviewData.map((v, k) => (
                    <div className={`d-flex flex-col col-lg-4 col-sm-12 col-md-6 py-1 ${k===0 ? 'pl-lg-0' : k===1 ? 'px-lg-1' : 'pr-lg-1'}  w-100` }key={k}>
                        <div
                            className='p-2 text-left bg-white w-100 card border-0'
                            style={{
                                minHeight: '230px',
                                borderRadius: 6,
                                boxShadow: `1px 1px 2px ${color.greyColor}`
                            }}
                        >
                            <div className="float-left" style={{ color: color.primaryColor, fontSize: 16 }}>
                                <i>{v.title}</i>
                            </div>
                            <div className="card-body">
                                {
                                    v.id === 'Ict' ?
                                        <div className="d-flex row w-100  m-0 justify-content-center align-items-center">
                                            <div className='d-flex justify-content-center p-0 '><img src={Ict} style={{ width: '50' }} /></div>
                                            <div className=' p-0 ml-2 '><IctList overviewSolutionsCnt={overviewSolutionsCnt} /></div>
                                        </div>
                                        :
                                        v.id === 'Spotlight' ?
                                            <div className="d-flex w-100 justify-content-between">
                                                <div className="w-30 p-0"><img src={Spotlight} style={{ width: '50' }} /></div>
                                                <div className="w-70 p-0 mt-3 ml-2 text-left">SDG_{max} With the highest number of technological solutions in use </div>
                                            </div>
                                            :
                                            UpdatedData && UpdatedData.map((v, k) => (
                                                <div className={`d-flex w-100 ${windowWidth < 1488 && 'flex-wrap'} justify-content-between`}>
                                                    <div className='w-30 my-1 p-0' style={{ whiteSpace: 'nowrap' }}>{v.info}</div>
                                                    <div className='w-70 p-0 ml-3 text-right'>{v.infoData}</div>
                                                </div>
                                            ))
                                }
                            </div>
                            {
                                v.id !== 'update' &&
                                <div className="d-flex ">
                                    <ESButton text={"View More"} onClick={() => _handleMoveIct(v.id)} />
                                </div>
                            }


                        </div>
                    </div>
                ))
            }
        </Fragment>
    )
}
export default Overview

const OverviewData = [
    { id: 'Ict', title: 'Overview' },
    { id: 'Spotlight', title: 'Spotlight on SDGs' },
    { id: 'update', title: 'Last Updated' }
]

export const IctList = ({overviewSolutionsCnt}) => {
    return (
        <div className=''>
               <div className='col text-right pr-0 font-weight-bold text-secondary' style={{ fontSize: 13}}>Count</div> 
            {ListData.map((v, k) => (
                <div 
                    key={k} 
                    className="d-flex align-items-center my-1"
                    style={{
                        borderRadius: 6,
                        boxShadow: `2px 2px 8px ${color.lightGrey}`
                    }}
                >
                    <div className='col-1'>
                    <div className="" style={{ width: 10, height: 10, borderRadius: '50%', background: v.color }}></div>
                    </div>
                    <div className="col">{v.text}</div>
                    <div className='col-2 px-0 text-center' style={{ minWidth: 30 }}>{overviewSolutionsCnt.find(v1=> v1.aligned_id===v.id)?.totalCnt}</div>
                </div>
            ))}
        </div>
    )
}

const ListData = [
    { color: '#84f268', text: 'SDG Aligned', id: 1 },
    { color: '#f0ba3c', text: 'In Progress', id: 2 },
    { color: '#f27ee5', text: 'Not Aligned', id: 3 }
]
