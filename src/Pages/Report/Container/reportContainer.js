import React, { Fragment, useEffect, useRef } from "react";
import GuagueComponent from "../Component/guagueComponent";
import KeywordTable from "../Component/keywordTable";
import UpdateTable from "../Component/updateTable";
import font from "../../../Feature/Config/font";
import ReactToPrint from "react-to-print";
import ReportTargetDataTable from "../Component/reportTargetDataTable";
import RadarChart from "../../../Feature/Graphs/radarChart";
// import { render } from "@testing-library/react";
import SankeyDiagram from "../../../Feature/Graphs/sankeyDiagram";
import { useState } from "react";
import { withRouter } from "react-router";
import ScrollToTop from "../../../Feature/Tools/toTopBtn";
import Spinner from "../../../Feature/Images/Spinner.gif";
import IMAGE from "../../../Feature/Images/digital_development.png";
import UNDP from "../../../Feature/Images/UNDP.svg";
import { withCookies } from "react-cookie";
import {
  deleteCookie,
  readCookie,
  writeCookie,
} from "../../../helper/cookieUser";
import { checkTokenExist } from "../../../helper/checkAccess";
import { FetchReport } from "../../../Api/dataFetch";
import { toast } from "react-toastify";
import CountrySelector from "../../../Feature/Tools/countrySelector";
import * as API from "../../../Api/url";
import io from "socket.io-client";
import CountryData from "../../../Feature/Config/countries.json";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import color from "../../../Feature/Config/color";
import StackedBarChart from "../../../Feature/Graphs/stackedBarChart";
import { makeStyles } from "@material-ui/core";
import BarChart from "../../../Feature/Graphs/barChart";
import linkages from "../../../Feature/Images/Edit Menu Icons/linkages.png";
import Overview from "../Component/overViewLayout";
import { Scrollbars } from "react-custom-scrollbars";
import SectionList from "../../Questionnaire/components/SectionList";

const Report = (props) => {
  const scrollbar = useRef();
  const countryFilter = CountryData.filter(
    (v) => v.code == "MU" || v.code == "KG" || v.code == "TZ" || v.code == "TL"
  );
  const CountryList = countryFilter.map((v) => {
    return { label: v.name, value: v.code };
  });
  const countryName = (code) => {
    return CountryData.filter((v) => v.code === code)[0].name;
  };
  const windowWidth = window.innerWidth;
  const ComponentPDF = useRef();
  const [index, setIndex] = useState(0);
  const [ReportData, setReportData] = useState(null);
  const [tabVal, setTabVal] = React.useState(0);
  const [ageGroupData, setAgeGroupData] = useState([])

  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const user = readCookie(props.cookies);
  const countryId = user.country_id;

  const socket_noti = io(API.LastUpdateNoti, { transports: ["websocket"] });

  // const countryFilter = CountryData.filter(
  //   (v) => v.code == "MU" || v.code == "KG" || v.code == "TZ" || v.code == "TL"
  // );
  // const CountryList = countryFilter.map((v) => {
  //   return { label: v.name, value: v.code };
  // });

  // const [selectedCountry, setSelectedCountry] = useState(
  //   countryId && CountryList.filter((v) => v.value === countryId)[0]
  // );

  useEffect(() => {
    if (checkTokenExist(user, props.history, props.cookies)) {
      setUserId(user.user_id);
      // setCountryId(user.country_id);
      fetchReportData({
        userId: user.user_id,
        countryId: user.country_id,
        update: false,
      });
    }

    socket_noti.on("updateInfo", (msg) => {
      if (msg.isLastUpdateInfo) {
        fetchReportData({
          userId: user.user_id,
          countryId: user.country_id,
          update: true,
        });
      }
    });

    return () => socket_noti.disconnect();
  }, []);


  const handleTabChange = (event, newValue) => {
    setTabVal(newValue);
  };

  const fetchReportData = ({ userId, countryId, update }) => {
    if (checkTokenExist(user, props.history, props.cookies)) {
      if (update === undefined) {
        setLoading(true);
      }
      FetchReport(
        { countryId, userId },
        (error, data) => {
          if (error) {
            setLoading(false);
            if (error.toString().includes("expired")) {
              toast("Login Expired!", { type: "error" });
              deleteCookie(props.cookies);
              props.history.push("/login");
            } else toast(error.toString(), { type: "error" });
          } else {
            setReportData(data.payload);
            setAgeGroupData(data.payload.ageGroupData)
            setLoading(false);
          }
        },
        { token: user.token }
      );
    }
  };

  const _handleIndex = () => {
    index === 2 ? setIndex(0) : setIndex(index + 1);
  };
  // const _changeCountryHandler = (value) => {
  //   const cookieData = { ...user };
  //   cookieData.country_id = value.value;
  //   writeCookie(props.cookies, cookieData);
  //   setSelectedCountry(CountryList[value]);
  // };

  const DigitalDevelopmentThemes = ReportData
    ? ReportData.DigitalDevelopmentThemes
    : [];
  const total = 376;
  // console.log("DigitalThemes",DigitalDevelopmentThemes)
  const radarData = DigitalDevelopmentThemes && [
    [
      {
        area: "People",
        value: Math.floor((DigitalDevelopmentThemes.people / total) * 100),
      },
      {
        area: "Planet",
        value: Math.floor((DigitalDevelopmentThemes.planet / total) * 100),
      },
      {
        area: "Prosperity",
        value: Math.floor((DigitalDevelopmentThemes.prosperity / total) * 100),
      },
      {
        area: "Peace",
        value: Math.floor((DigitalDevelopmentThemes.peace / total) * 100),
      },
      {
        area: "Partnerships",
        value: Math.floor(
          (DigitalDevelopmentThemes.partnerships / total) * 100
        ),
      },
    ],
  ];
  //  console.log("radarData",radarData);
  const keywords = ReportData ? ReportData.keywords : [];
  const keywordData = [
    {
      label: "Information Management System",
      count: keywords.Information_Management_System,
    },
    {
      label: "Youth Employment Programme",
      count: keywords.Youth_Employment_Programme,
    },
    { label: "Social Integration", count: keywords.Social_Integration },
    { label: "Data Collection", count: keywords.Data_Collection },
    { label: "Real-Time Monitoring", count: keywords.Real_Time_Monitoring },
  ].sort((a, b) => b.count - a.count);
  //console.log("keywords", ReportData);
  const tabHeight = "60px";
  const tabWidth = "130px";
  const useStyles = makeStyles((theme) => ({
    tabsRoot: {
      minHeight: tabHeight,
      height: tabHeight,
      padding: 0,
    },
    tabRoot: {
      minHeight: tabHeight,
      height: tabHeight,
      minWidth: tabWidth,
      width: tabWidth,
      padding: 0,
    },
  }));
  const [floatingIconList, setFloatingIconList] = useState("none");
  function openList1() {
    if (floatingIconList == "none") setFloatingIconList("block");
    else setFloatingIconList("none");
  }
  const classes = useStyles();

  const StandAlone = ReportData &&
    ReportData.Linkage.filter(v => v.external_link === 0).length + ReportData.Linkage.filter(v => v.internal_link === 0).length

  //  const modifiedGdata = 
  //  (ReportData && ReportData.nationalProjects) &&
  //   nationalData.map((v, k) => {
  //     return {
  //       guageData: v.guageData.map((v1) => {
  //         const currentArr = ReportData.nationalProjects[k].guageData
  //         return {
  //           ...v1,
  //           value: currentArr.length === 0
  //             ? 0
  //             : (currentArr.findIndex(a => a.title === v1.title) < 0 ? 0 : currentArr.find(a => a.title === v1.title).value)
  //         }
  //       })
  //     }

  //   });

  return (
    // <div className="containter py-1" ref={ComponentPDF}>
    //   <ScrollToTop />
    //   <div
    //     id="overview_bar"
    //     className="d-flex flex-row flex-wrap justify-content-between py-2 pb-3"
    //   >
    //     <div className='col-lg-3 col-md-3 col-sm-10 text-left p-0'>
    //       <div
    //         style={{
    //           fontSize: window.innerWidth < 470 ? 28 : font.heading1,
    //           fontWeight: 350,
    //           color: "#2079DF"
    //         }}
    //       >
    //         OVERVIEW
    //       </div>
    //       <ReactToPrint
    //         trigger={() => (
    //           <a className='float-left pl-1' href="#" style={{ fontSize: font.graphLabels }}>
    //             <i className="fas fa-print pr-2"></i>Print Document
    //           </a>
    //         )}
    //         content={() => ComponentPDF.current}
    //         pageStyle="{size: A4 landscape;}"
    //       />
    //     </div>

    //     {countryId ? (
    //       <div className={`col-lg-6 col-md-6 col-sm-9 ${windowWidth < 371 ? 'col-11' : 'col-9'} p-0`}>
    //         <div className={`d-flex flex-nowrap ${windowWidth < 768 ? 'text-left' : 'justify-content-center'} align-items-center h-100`}>
    //           <span
    //             style={{
    //               fontSize: font.graphLabels,
    //               color: color.greyColor
    //             }}
    //           >
    //             you are viewing SDG Mapping Survey for
    //           </span>
    //           :
    //           <div className='ml-2 d-flex flex-row'>
    //             <img
    //               className="pr-2"
    //               src={`/countryflags/${countryId.toLowerCase()}.svg`}
    //               alt="country flag"
    //               width={50}
    //             />
    //             <span
    //               className="m-auto"
    //               title={countryName(countryId)}
    //               style={{
    //                 color: color.primaryColor,
    //                 fontSize: "24px",
    //                 maxWidth: 130,
    //                 overflow: "hidden",
    //                 whiteSpace: "nowrap",
    //                 textOverflow: "ellipsis",
    //                 cursor: 'pointer'
    //               }}
    //             >
    //               {countryName(countryId)}
    //             </span>
    //           </div>
    //         </div>
    //       </div>
    //     ) : <div></div>
    //     }

    //     <div className='col-lg-3 col-md-2 col-sm-2 text-right p-0'>
    //       <img alt="" src={UNDP} style={{
    //         width: 60,
    //         position: 'relative',
    //         top: windowWidth < 319 ? -135 : windowWidth < 355 ? -120 : windowWidth < 371 ? -100 : windowWidth < 380 ? -140 : windowWidth < 424 ? -120 : windowWidth < 576 ? -108 : (windowWidth < 768 && -60)
    //       }}
    //       />
    //     </div>
    //   </div>

    //   {ReportData && !loading ? (
    //     <div style={{ marginTop: windowWidth < 576 && -55 }}>
    //       <div
    //         className="row justify-content-center py-2"
    //         style={{ background: "#fff" }}>
    //         <div
    //           className={`${windowWidth <= 1220 ? "col-lg-12" : "col-lg-4"
    //             } col-md-7 col-sm-12 col-xs-12 justify-content-center p-0 `}
    //         >
    //           <div className='d-flex flex-row'>
    //             <Tabs
    //               value={tabVal}
    //               onChange={handleTabChange}
    //               TabIndicatorProps={{
    //                 style: { background: color.primaryColor },
    //               }}
    //               classes={{
    //                 root: classes.tabsRoot,
    //               }}
    //             >
    //               <Tab
    //                 classes={{ root: classes.tabRoot }}
    //                 label="Overall Progress"
    //                 style={{ outline: "none", textTransform: "none" }}
    //               />
    //               <Tab
    //                 classes={{ root: classes.tabRoot }}
    //                 label="Themes"
    //                 style={{ outline: "none", textTransform: "none" }}
    //               />
    //             </Tabs>
    //           </div>
    //           {tabVal === 0 ? (
    //             radarData && (
    //               <div className='d-flex flex-row align-items-center' style={{ height: '87%' }}>
    //                 <RadarChart windowWidth={windowWidth} data={radarData} />
    //               </div>
    //             )
    //           ) : (
    //             <div className={` ${!(windowWidth < 1426) && 'd-flex flex-row align-items-center justify-content-center'}`} style={{ height: '87%' }}>
    //               <StackedBarChart
    //                 windowWidth={windowWidth}
    //                 data={ReportData.themesData}
    //               />
    //             </div>
    //           )}
    //         </div>
    //         <div
    //           className={`${windowWidth <= 1220 ? "col-lg-12" : "col-lg-8"
    //             }  col-md-12 col-sm-12 col-xs-12 p-0 my-xl-5 my-sm-3
    //           `}
    //         >
    //           <div className="d-flex flex-row flex-wrap h-100 align-items-center">
    //             <div className="d-flex col-lg-6 pr-1 p-0 my-1 justify-content-center">
    //               {ReportData.keywords && (
    //                 <KeywordTable
    //                   windowWidth={windowWidth}
    //                   data={keywordData}
    //                 />
    //               )}
    //             </div>
    //             <div
    //               className={`d-flex ${windowWidth > 991 ? 'h-100' : 'mt-1'} p-0 my-1 justify-content-center m-auto ${(windowWidth < 1220 && windowWidth >= 997) ? 'col-lg-5' : 'col-lg-6'}`}
    //               style={{
    //                 maxWidth : windowWidth < 1200 && '350px'
    //               }}
    //             >
    //               <div className="d-flex flex-wrap flex-row justify-content-center w-100">
    //                 <div className={`d-flex flex-col  ${(windowWidth <= 1640) ? 'col-12' : 'col-8'}`}
    //                   style={{ display: windowWidth < 768 && "none" }}>
    //                   <img alt="" src={IMAGE} style={{ width: '100%' }} />
    //                 </div>

    //                 <div className={`d-flex flex-col ${windowWidth > 1669 ? 'col-12' : 'col'}`}>
    //                   <button
    //                     className="btn btn-block btn-outline-primary my-2"
    //                     // style={{ height: 60, marginTop: windowWidth > 768 && "130px" }}
    //                     onClick={() =>
    //                       props.history.push("/sdg_targets_and_DigitalDevelopment")
    //                     }
    //                   >
    //                     Detailed Records
    //                     <i className="fa fa-arrow-circle-right pl-2" />
    //                   </button>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="row py-2 border-bottom border-top">
    //         <div
    //           className="text-left text-primary pl-3"
    //           style={{ fontSize: font.heading2, color: color.primaryColor }}
    //         >
    //           NATIONAL PROJECTS
    //         </div>
    //         {ReportData.nationalProjects ? (
    //           <React.Fragment>
    //             <div className="w-100 my-3">
    //               <GuagueComponent
    //                 index={index}
    //                 data={ReportData.nationalProjects}
    //               />
    //             </div>
    //             <div className="col-12">
    //               <button
    //                 className="btn px-4"
    //                 style={{
    //                   background: color.primaryColor,
    //                   color: "white",
    //                   borderRadius: 50,
    //                 }}
    //                 onClick={() => _handleIndex()}
    //               >
    //                 View More <i className="fa fa-caret-right pl-1" />
    //               </button>
    //             </div>
    //           </React.Fragment>
    //         ) : (
    //           <div className="col-12">
    //             <NoData />
    //           </div>
    //         )}

    //       </div>

    //       <div className="row py-2">
    //         <div
    //           className={`col-xl-6 ${windowWidth <= 1197 ? "col-lg-12" : "col-lg-6"
    //             } col-md-12 col-sm-12 col-12 justify-content-center mb-2`}
    //         >
    //           <ReportTargetDataTable
    //             windowWidth={windowWidth}
    //             solutionData={ReportData.solutionData}
    //           />
    //         </div>
    //         <div
    //           className={`col-xl-6 ${windowWidth <= 1197 ? "col-lg-12" : "col-lg-6"
    //             } col-md-12 col-sm-12 col-12 justify-content-center mb-2`}
    //         >
    //           <div
    //             className="mt-2 text-primary text-left "
    //             style={{ fontSize: font.heading2, color: "#2079DF" }}
    //           >
    //             LINK TO SECTORS
    //           </div>
    //           {ReportData.sdgSector.length > 0 ? (
    //             <SankeyDiagram
    //               SankeyData={ReportData.sdgSector}
    //               windowWidth={windowWidth}
    //             />
    //           ) : (
    //             <NoData />
    //           )}
    //         </div>
    //       </div>
    //       <div className="d-flex flex-row flex-wrap">
    //         <div className="d-flex col-lg-4 pr-1 pb-3 p-0 justify-content-center">
    //           {ReportData && (
    //             <UpdateTable
    //               windowWidth={windowWidth}
    //               userUpdate={ReportData.updateInfo}
    //               updateFile={ReportData.lastUpdatedFiles}
    //             />
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   ) : (
    //     <img alt="" src={Spinner} width={120} />
    //   )}
    //   <div className="d-flex row justify-content-center"></div>
    // </div>
    <>
      {
        ReportData && !loading ?
          <div className="d-flex flex-row-reverse flex-wrap px-5">
            {/* <div
        className
        style={{
          // borderBottom: `2px solid ${color.lightGrey}`
          position: "-webkit-sticky",
          position: "sticky",
          top: 0,
          // right: 0,
          width: "auto",
          zIndex: 2,
          height: 0,
          cursor: 'pointer'
          // backgroundColor:"yellow"
        }}
      >
        {countryId ? (
          <>
            <div
              className="d-flex align-items-center justify-content-center"
              onClick={openList1}
              style={
                {
                  // borderBottom: `2px solid ${color.lightGrey}`
                }
              }
            >
              <img
                className="pr-2"
                src={`/countryflags/${countryId.toLowerCase()}.svg`}
                alt="country flag"
                width={30}
              />
              <span
                className="font-weight-bold"
                title={countryName(countryId)}
                style={{
                  color: color.primaryColor,
                  fontSize: "19px",
                  maxWidth: 130,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  cursor: "pointer",
                }}
              >
                {countryName(countryId)}
              </span>
            </div>

            <div
              className="text-left mx-1 text-secondary p-2 rounded"
              style={{
                position: "absolute",
                right: "-10px",
                display: floatingIconList,
                backgroundColor: color.white,
                width: "170px",
                boxShadow: `1px 1px 2px ${color.greyColor}`,
              }}
            >
              Ministry of Education <br /> Tertiary Education <br /> Science and
              Technology
            </div>
          </>
        ) : (
          <div></div>
        )}
      </div> */}
            <div
              className={`col-lg-12 col-md-12 p-0 mt-5 ${windowWidth < 300 ? "col-sm-12 col-xs-12" : "col-sm-10 col-xs-10"
                } ${windowWidth < 300 && "p-0"}`}
            >
              {/* <div
          className="row m-0 mt-3"
          style={{ borderBottom: `2px solid ${color.lightGrey}` }}
        >
          <h4 className="my-1"> Overview</h4>
        </div> */}

              <div className="d-flex row m-0 my-3 justify-content-center">
                {ReportData && !loading ?
                  <Overview
                    windowWidth={windowWidth}
                    userUpdate={ReportData.updateInfo}
                    updateFile={ReportData.lastUpdatedFiles}
                    solutionData={ReportData.solutionData}
                    overviewSolutionsCnt={ReportData.overviewSolutionCnt}
                  />
                  :
                  <img alt="" src={Spinner} width={120} />
                }
              </div>

              {/* <div
          className="row m-0"
          style={{ borderBottom: `2px solid ${color.lightGrey}` }}
        >
          <h4 className="my-1"> Milestones</h4>
        </div> */}
              {ReportData && !loading ? (
                <div className="d-flex row m-0 my-3 justify-content-center">
                  <div className="d-flex flex-col col-lg-5 col-sm-12 col-md-6 py-1 pl-lg-0">
                    <div
                      className="p-2 text-left bg-white w-100"
                      style={{
                        borderRadius: 6,
                        boxShadow: `1px 1px 2px ${color.greyColor}`,
                      }}
                    >
                      <i style={{ fontSize: 16, color: color.primaryColor }}>Overall</i>
                      {radarData && (
                        <div className="" style={{}}>
                          <RadarChart windowWidth={windowWidth} data={radarData} />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="d-flex flex-col col-lg-7 col-sm-12 col-md-6 py-1 px-lg-1">
                    <div
                      className="p-2 text-left bg-white w-100"
                      style={{
                        borderRadius: 6,
                        boxShadow: `1px 1px 2px ${color.greyColor}`,
                      }}
                    >
                      <i style={{ fontSize: 16, color: color.primaryColor }}>Keywords</i>
                      {ReportData && (
                        <KeywordTable windowWidth={windowWidth} data={ReportData.suggestionKeywords} />
                      )}
                    </div>
                  </div>
                  {/* <div className="d-flex flex-col col-lg-4 col-sm-12 col-md-6 py-1 pr-lg-0 w-100">
              <div
                className="p-2 text-left bg-white w-100 h-100 border"
                style={{
                  borderRadius: 6,
                  boxShadow: `1px 1px 2px ${color.greyColor}`,
                }}
              >
                <div className="font-weight-bold">
                  Outreach Of Project : Age Group
                </div>
                <div className="h-100">
                  <BarChart windowWidth={windowWidth} id={"age"} data={ageGroupData} />
                </div>
              </div>
            </div> */}
                </div>
              ) : (
                <img alt="" src={Spinner} width={120} />
              )}
              {/* <div
          className="row m-0 mt-3"
          style={{ borderBottom: `2px solid ${color.lightGrey}` }}
        >
          <h4 className="my-1"> Projects: Nationwide Implementation</h4>
        </div> */}
              <div
                className="d-flex row mx-0 p-2 my-3 bg-white"
                style={{
                  borderRadius: 6,
                  boxShadow: `1px 1px 2px ${color.greyColor}`,
                  marginTop: 11,
                }}
              >
                <i className="" style={{ fontSize: 16, color: color.primaryColor }}>Projects: Nationwide Implementation</i>

                {ReportData && !loading ? (
                  ReportData.nationalProjects.length > 0 ? (
                    <React.Fragment>
                      <div className="w-100 my-3">
                        <GuagueComponent
                          index={index}
                          // data={modifiedGdata ? modifiedGdata : nationalData}
                          data={ReportData.nationalProjects}
                        />
                      </div>
                      <div className="col-12 mb-2">
                        <button
                          className="btn px-4"
                          style={{
                            background: color.primaryColor,
                            color: "white",
                            borderRadius: 50,
                          }}
                          onClick={() => _handleIndex()}
                        >
                          View More <i className="fa fa-caret-right pl-1" />
                        </button>
                      </div>
                    </React.Fragment>
                  ) : (
                    <div className="col-12">
                      <NoData />
                    </div>
                  )
                ) : (
                  <div className="d-flex flex-row justify-content-center w-100">
                    <img className="" alt="" src={Spinner} width={120} />
                  </div>
                )}
              </div>
              {/* <div
          id="solutions"
          className="row m-0 mt-3"
          style={{ borderBottom: `2px solid ${color.lightGrey}` }}
        >
          <h4 className="my-1">Solutions by SDGs</h4>
        </div> */}
              {ReportData && !loading ? (
                <div className="d-flex row m-0 my-2 justify-content-between">
                  <div
                    className="d-flex flex-col col-lg-8 col-sm-12 col-md-8 py-1 pl-lg-0"
                  >
                    <div
                      className="w-100 h-100 p-2"
                      style={{
                        borderRadius: 6,
                        boxShadow: `1px 1px 2px ${color.greyColor}`,
                        background: '#ECF3F9'
                      }}>
                      <i className="float-left" style={{ fontSize: 16, color: color.primaryColor }}>Projects: By SDGs</i>
                      <div>
                        <ReportTargetDataTable
                          windowWidth={windowWidth}
                          solutionData={ReportData.solutionData}
                        />
                      </div>
                      {/* <div
                  className={`float-right mx-2 ${windowWidth < 768 ? 'my-2' : 'mb-0'}`}
                  style={{
                    position: !(windowWidth < 768) && 'absolute',
                    right:!(windowWidth < 768) && 3,
                    bottom:!(windowWidth < 768) && 3
                  }}
                >
                  <button
                    className="btn px-4"
                    style={{
                      background: color.primaryColor,
                      color: "white",
                      borderRadius: 50,
                    }}
                    onClick={() => console.log("view more")}
                  >
                    View More <i className="fa fa-caret-right pl-1" />
                  </button>
                </div> */}
                    </div>
                  </div>

                  <div
                    id="sankeyside"
                    className="d-flex flex-col col-lg-4 col-sm-12 col-md-4 py-1 h-100 px-0"
                    /*style={{ marginRight: '0px', marginBottom: '0px'}}*/
                    style={{
                      // borderRadius: 10,
                      // boxShadow: `1px 1px 2px ${color.greyColor}`,
                      // fontSize: font.graphLabels,
                      // background: '#ECF3F9'
                    }}
                  >
                    <div
                      className="w-100 h-100 p-2"
                      style={{
                        borderRadius: 6,
                        boxShadow: `1px 1px 2px ${color.greyColor}`,
                        background: '#ECF3F9'
                      }}>
                      <i className="float-left" style={{ fontSize: 16, color: color.primaryColor }}>Linkages</i>
                      <Scrollbars className="custom-paddingRight" style={{ height: 700 }}>
                        <div className="d-flex flex-column flex-wrap justify-content-center mt-2">


                          <div
                            className="my-2 bg-white"
                            style={{
                              borderRadius: 10,
                              boxShadow: `1px 1px 2px ${color.greyColor}`,
                              fontSize: font.graphLabels,
                            }}
                          >
                            <div className="text-muted p-3 text-left">
                              LINK WITHIN MINISTRY/DEPARTMENT
                            </div>
                            <div
                              className="mb-2 p-1 mx-3 ml-2 pl-3 text-left"
                              style={{
                                borderRadius: 20,
                                boxShadow: `1px 1px 2px ${color.greyColor}`,
                                color: color.green,
                              }}
                            >
                              {ReportData && ReportData.Linkage.filter(v => v.internal_link === 1).length}
                            </div>
                          </div>

                          <div
                            className="my-2 bg-white"
                            style={{
                              borderRadius: 10,
                              boxShadow: `1px 1px 2px ${color.greyColor}`,
                              fontSize: font.graphLabels,
                            }}
                          >
                            <div className="text-muted p-3 text-left">
                              EXTERNAL LINK TO OTHER MINISTRIES OR AGENCIES
                            </div>
                            <div
                              className="mb-2 p-1 mx-3 ml-2 pl-3 text-left"
                              style={{ color: color.primaryColor }}
                            >
                              <img src={linkages} style={{ width: 30 }} />
                              {ReportData && ReportData.Linkage.filter(v => v.external_link === 1).length}
                            </div>
                          </div>

                          <div
                            className="my-2 bg-white"
                            style={{
                              borderRadius: 10,
                              boxShadow: `1px 1px 2px ${color.greyColor}`,
                              fontSize: font.graphLabels,
                            }}
                          >
                            <div className="text-muted p-3 text-left">
                              STANDALONE DIGITAL EFFORTS
                            </div>
                            <div
                              className="mb-2 p-1 mx-3 ml-2 pl-3 text-left"
                              style={{
                                borderRadius: 20,
                                boxShadow: `1px 1px 2px ${color.greyColor}`,
                                color: "red",
                              }}
                            >
                              {StandAlone}
                            </div>
                          </div>
                          {/* <div className="text-right mr-3">
                    <button
                      className="btn px-4"
                      style={{
                        background: color.primaryColor,
                        color: "white",
                        borderRadius: 50,
                      }}
                      onClick={() => console.log("view more")}
                    >
                      View More <i className="fa fa-caret-right pl-1" />
                    </button>
                  </div> */}
                          <div
                            className="mt-2 "
                            style={{
                              //height: document.getElementsByClassName('viz bg-white')[0]?.clientHeight + 23
                            }}
                          >
                            <div
                              className="text-left "
                              style={{}}
                            >
                              LINK TO SECTORS
                            </div>
                            {ReportData.sdgSector.length > 0 ? (
                              <SankeyDiagram
                                SankeyData={ReportData.sdgSector}
                                windowWidth={windowWidth}
                              />
                            ) : (
                              <NoData />
                            )}
                          </div>

                        </div>
                      </Scrollbars>
                    </div>
                  </div>
                </div>
              ) : (
                <img alt="" src={Spinner} width={120} />
              )}
              {/* <div
          className={`row m-0`}
          style={{
            borderBottom: `2px solid ${color.lightGrey}`,
            // position: windowWidth < 777 && 'absolute',
            // top: (windowWidth >= 665 && windowWidth < 759) ? '119%' : windowWidth < 665 ? '116.5%' : (windowWidth >= 760 && windowWidth < 780) ? '99%' : ''
          }}
        >
          <h4 className="my-1"> View All Detailed Records</h4>
        </div> */}
              <div
                className="d-flex row m-0 my-2 p-2 bg-white"
                style={{
                  borderRadius: 10,
                  boxShadow: `1px 1px 2px ${color.greyColor}`,
                  // position: windowWidth < 777 && 'absolute',
                  // top: (windowWidth >= 665 && windowWidth < 759) ? '122%' : (windowWidth > 460 && windowWidth < 665) ? '119.5%' : (windowWidth >= 760 && windowWidth < 780) ? '100%' : windowWidth < 460 ? '118.5%' : ''
                }}
              >
                <i className="float-left" style={{ fontSize: 16, color: color.primaryColor }}>View All Detailed Records</i>
                <React.Fragment>
                  <div className="d-flex flex-wrap flex-row justify-content-center w-100">
                    <div
                      className={`col-xl-5 col-lg-5 col-md-5 col-sm-12 pl-0 ${windowWidth <= 1640 ? "col-12" : "col-8"
                        }`}
                      style={{ display: windowWidth < 768 && "none" }}
                    >
                      <img alt="" src={IMAGE} style={{ width: "100%" }} />
                    </div>

                    <div
                      className={`col-xl-5 col-lg-5 col-md-5 col-sm-12 ${windowWidth > 1669 ? "col-12" : "col"
                        }`}
                    >
                      <button
                        className="btn btn-block btn-outline-primary my-2"
                        style={{
                          height: 60,
                          position: windowWidth > 777 && "absolute",
                          top: windowWidth > 777 && "35%",
                          left: "0%",
                        }}
                        onClick={() =>
                          props.history.push("/sdg_targets_and_DigitalDevelopment")
                        }
                      >
                        Detailed Records
                        <i className="fa fa-arrow-circle-right pl-2" />
                      </button>
                    </div>
                  </div>
                </React.Fragment>
              </div>
            </div>
          </div>
          :
          <div className="d-flex row m-0 my-3 justify-content-center">
            <img alt="" src={Spinner} width={120} />
          </div>
      }
    </>

  );
};

export default withRouter(withCookies(Report));

export const NoData = () => {
  return (
    <div className="bg-secondary text-light p-3 my-4 rounded text-center  ">
      <i className="fa fa-exclamation-triangle pr-2" />
      No Data
    </div>
  );
};

const nationalData = [{
  "guageData":
    [{ title: 'Social Integration Management Information System', value: 0 },
    { title: 'Electronic Health Records System', value: 0 },
    { title: 'Mauritius and Rodrigues Submarine (MARS) subsea cable system', value: 0 }]
},
{

  "guageData": [{ title: 'National Multi Hazard Alert System', value: 0 },
  { title: 'Agricultural Production & Market Information System', value: 0 },
  { title: 'National Traffic Data Management System', value: 0 }
  ]
},
{

  "guageData": [{ title: 'National Electronic Licensing System', value: 0 },
  { title: 'National Identity Scheme', value: 0 },
  { title: 'Open Data Portal', value: 0 }
  ]
}]