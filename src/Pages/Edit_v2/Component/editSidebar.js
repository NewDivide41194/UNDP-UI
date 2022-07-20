import React, { Component } from 'react'
import Colors from "../../../Feature/Config/color";
import UNDP from "../../../Feature/Images/UNDP.svg";
import goals from '../../../Feature/Images/Edit Menu Icons/goals.png'
import policies from '../../../Feature/Images/Edit Menu Icons/policies.png'
import review from '../../../Feature/Images/Edit Menu Icons/review.png'
import systems from '../../../Feature/Images/Edit Menu Icons/systems.png'
import MenuBar from './menuBar';


class EditSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      listData: listData,
      ansCnt: {
        1: 0,
        2: 0,
        3: 0,
        4: 0
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { updateRecordData } = this.props;
    if (updateRecordData.length > 0) {
      if (prevProps.updateRecordData !== updateRecordData) {
        let goal_target_cnt = 2;
        let policy_cnt = 0;
        let system_cnt = 0;
        let review_cnt = 0;
        if (updateRecordData[0].sector_id) {
          goal_target_cnt += 1;
        }
        if (updateRecordData[0].people || updateRecordData[0].planet || updateRecordData[0].peace || updateRecordData[0].partnerships || updateRecordData[0].prosperity) {
          goal_target_cnt += 1;
        }
        if (updateRecordData[0].national_strategic_plan && updateRecordData[0].national_strategic_plan !== '') {
          policy_cnt += 1;
        }
        if (updateRecordData[0].policies[0].file_name || updateRecordData[0].policies[0].policy_and_programme && updateRecordData[0].policies[0].policy_and_programme !== '') {
          policy_cnt += 1;
        }
        if (updateRecordData[0].technology_system_and_platform && updateRecordData[0].technology_system_and_platform !== '') {
          system_cnt += 1;
        }
        if (updateRecordData[0].systemProjects.length > 0) {
          const sysProj = updateRecordData[0].systemProjects
          for (let i = 0; i < sysProj.length; i++) {
            const current = sysProj[i]
            if (current.suggestionAns.filter(v => v.active === 1)?.length > 0) {
              system_cnt += 1;
            }
            if (current.proj_title && current.proj_title !== '') {
              system_cnt += 1;
            }
            if (current.proj_level_id) {
              system_cnt += 1;
              if (current.proj_level_id === 1) {
                if (current.status_update_id) {
                  system_cnt += 1;
                }
              } else if (current.proj_level_id === 2) {
                if (current.location && current.location !== '') {
                  system_cnt += 1;
                }
              }
            }
            if (current.internalLink === 1 || current.internalLink === 0) {
              system_cnt += 1;
              if (current.internalLink === 1) {
                if (current.internalLinkType || (current.internalYesDesc && current.internalYesDesc !== '')) {
                  system_cnt += 1;
                }
              } else if (current.internalLink === 0) {
                if (current.internalNoDesc && current.internalNoDesc !== '') {
                  system_cnt += 1;
                }
              }
            }
            if (current.externalLink === 1 || current.externalLink === 0) {
              system_cnt += 1;
              if (current.externalLink === 1) {
                if (current.externalLinkType || (current.externalYesDesc && current.externalYesDesc !== '')) {
                  system_cnt += 1;
                }
              } else if (current.externalLink === 0) {
                if (current.externalNoDesc && current.externalNoDesc !== '') {
                  system_cnt += 1;
                }
              }
            }
          }
        }
        if
          (updateRecordData[0].resource.filter(v => v.active === 1).length > 0 ||
          updateRecordData[0].planning.filter(v => v.active === 1).length > 0 ||
          updateRecordData[0].user_experience.filter(v => v.active === 1).length > 0
        ) {
          review_cnt += 1;
        }
        if (updateRecordData[0].aligned_id) {
          review_cnt += 1;
        }

        const ansCnt = {
          1: goal_target_cnt,
          2: policy_cnt,
          3: system_cnt,
          4: review_cnt
        }

        this.setState({ ansCnt })
      }
    }
  }

  toggleHover = (selected) => {
    this.setState({ hover: selected });
  };

  render() {
    const { hover, listData, ansCnt } = this.state;
    const { countryId, countryName, _handleSectionClick, sectionId, updateRecordData } = this.props;

    return (
      <>
        {
          window.innerWidth <= 925 ? (
            <div className='col-12'>
              <MenuBar
                sectionId={sectionId}
                listData={listData}
                _handleSectionClick={_handleSectionClick}
              />
            </div>
          )
            : (
              <div className="mr-4" style={{}}>
                <List
                  countryId={countryId}
                  countryName={countryName}
                  hover={hover}
                  listData={listData}
                  toggleHover={this.toggleHover}
                  _handleSectionClick={_handleSectionClick}
                  sectionId={sectionId}
                  updateRecordData={updateRecordData}
                  ansCnt={ansCnt}
                />
              </div>
            )
        }
      </>
    )
  }
}

export default EditSidebar

const List = ({
  listData,
  toggleHover,
  _handleSectionClick,
  sectionId,
  hover,
  IsLoading,
  updateRecordData,
  countryId,
  countryName,
  ansCnt
}) => {
  const systemTotalCnt = updateRecordData[0] ? (updateRecordData[0]?.systemProjects.length * 8) + 1 : 0
  return (
    <div className='' style={{ background: Colors.primaryColor, color: Colors.white, minHeight: '100vh', height: '100%', position: 'relative' }}>
      <div className="d-flex flex-row py-4 pl-5 pb-5 flex-wrap">
        <img
          alt=""
          src={UNDP}
          style={{
            width: 70,
          }}
        />
        <span className='text-left'>
          <h3>UNDP</h3>Digital Readiness Assessment
        </span>
      </div>
      {listData.length > 0 &&
        listData.map((v, k) => {
          // const QAcount =
          //   totalQAcount &&
          //   totalQAcount.find(
          //     (v1) => v1.id === v.id
          //   );
          return (
            <div className="px-3">
              <div
                key={k}
                className={`${(hover === v.id ||
                  sectionId === v.id) &&
                  "font-weight-bold"
                  }  py-1  text-left mb-2`}
                onMouseEnter={() => toggleHover(v.id)}
                onMouseLeave={() => toggleHover(null)}
                title={v.label}
                style={{
                  // boxShadow: "0px 1px 3px 0 rgba(166,180,200,1.2)",
                  pointerEvents: IsLoading && "none",
                  borderRadius: "4px",
                  background:
                    hover === v.id
                      ? "#80B5DA"
                      : sectionId === v.id
                        ? "#fff"
                        : Colors.primaryColor,
                  color:
                    sectionId === v.id
                      ? Colors.textColor
                      : null,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  cursor: "pointer",
                }}
                onClick={() =>
                  _handleSectionClick({
                    sectionId: v.id,
                    sectionName: v.label,
                  })
                }
              >
                <div className="d-flex flex-nowrap justify-content-between px-2">
                  <span
                    style={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <img className='mx-2' src={v.imgSrc} width='22' height='22' />
                    {v.label}
                  </span>
                  {
                    // QAcount && (
                    <span
                      className="float-right ml-2 font-weight-bold"
                      style={{
                        marginTop: 2,
                        fontSize: 12,
                        color:
                          sectionId !== v.id &&
                          Colors.white,
                      }}
                    >
                      {ansCnt[v.id]}/{v.id === 3 ? systemTotalCnt : v.totalCnt}
                      {/* {[...new Set(QAcount.keyValue)].length}/{QAcount.ques.length} */}
                    </span>
                    // )
                  }
                </div>
              </div>
            </div>
          );
        })}
      {/* <hr
            className='col-10'
          style={{
            // color: '#000',
            backgroundColor: Colors.greyColor,
            height: "1px",
            border: "none",
            position: 'absolute',
            bottom: '110px'
          }}
        ></hr> */}
      {/* <div className='col-12 border' style={{ position: 'absolute', bottom: '110px'}}></div> */}
      <div className='col-12 pt-4' style={{ position: 'absolute', bottom: '20px', borderTop: `1px solid ${Colors.lightGrey}` }}>

        <div className="d-flex row flex-wrap justify-content-center p-0">
          <div className='col text-left ml-3'>
            <span
              // className="p-3"
              style={
                {
                  // fontSize: font.graphLabels,
                  // color: Colors.greyColor
                }
              }
            >
              MATURITY ASSESSMENT FOR :
            </span>

            {countryId &&
              <div className="d-flex flex-row pt-2">
                <img className="mr-2" src={`/countryflags/${countryId.toLowerCase()}.svg`} alt="country flag" width={50} />
                <span
                  className=""
                  title={countryName}
                  style={{
                    // color: Colors.primaryColor,
                    fontSize: "24px",
                    // maxWidth: 130,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    cursor: "pointer",
                  }}
                >
                  {countryName}
                </span>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};


const listData = [
  { id: 1, label: 'Goals/Target', value: 'Goals/Target', imgSrc: goals, totalCnt: 4 },
  { id: 2, label: 'Policies', value: 'Policies', imgSrc: policies, totalCnt: 2 },
  { id: 3, label: 'Systems', value: 'Systems', imgSrc: systems, totalCnt: 9 },
  { id: 4, label: 'Review', value: 'Review', imgSrc: review, totalCnt: 2 },
]

