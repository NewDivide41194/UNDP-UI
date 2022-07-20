import React, { useEffect } from "react";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router";
import CountryData from "../../../Feature/Config/countries.json";
import { deleteCookie, readCookie } from "../../../helper/cookieUser";
import color from "../../../Feature/Config/color";
import polygon from "../../../Feature/Images/polygon.jpg";
import { useState } from "react";
import ChartTblComponent from "../component/chart_tbl";
import SpiderChart from "../../../Feature/Graphs/Spider";
import GaugeChart from '../../../Feature/Graphs/gaugeChart1';
import { ESButton } from "../../Questionnaire/components/tools/ES_Button";
import { checkTokenExist } from "../../../helper/checkAccess";
import { SurveyReportFetch } from "../../../Api/FetchQuestions";
import { toast } from "react-toastify";
import UNDP from "../../../Feature/Images/UNDP1.svg";
import SectionReport from "../component/sectionReport";

const SurveyReport = (props) => {
  const user = readCookie(props.cookies);
  const windowWidth = window.innerWidth;
  const countryId = user.country_id;
  const userId = user.user_id;
  const [surveySectionId, setSurveySectionId] = useState(12);
  const [surveyHeaderId /* setSurveyHeaderId*/] = useState(1);
  const [Ans, setAns] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);
  const [dmaReportData,setDMAReportData]=useState([]);
  const [questionName,setQuestionName]=useState([]);
  const countryName = (code) => {
    return CountryData.filter((v) => v.code === code)[0].name;
  };

  useEffect(()=>{

    setIsLoading(true);
    if(checkTokenExist(user,props.history,props.cookies)){
      const Ans_ = {
        other: null,
        optionChoiceId: null,
        userId: parseInt(userId),
        questionId: null,
        survey_header_id: parseInt(surveyHeaderId),
        keyValue: null,
        subQuestionId: null,
        surveySectionId: parseInt(surveySectionId),
        countryId: countryId,
      };
      setAns(Ans_);
      SurveyReportFetch(
        {
          userId,
          countryId,
          surveyHeaderId,
        },
        (error, data) => {
          if (error) {
            if (error.toString().includes("expired")) {
              toast("Login Expired!", { type: "error" });
              deleteCookie(props.cookies);
              props.history.push("/login");
            } else toast(error.toString(), { type: "error" });
          } else {
            // setQuestionName(data.payload[0].survey_sections[0].questions[0].sub_questions)
            setDMAReportData(data.payload);
            setIsLoading(false);
          }
        },
        { token: user.token }
      );
    }
  }, [surveySectionId]);
  
  const othersData = Object.keys(dmaReportData).length === 1 ? dmaReportData[0].answers[0].othersData : undefined
  // console.log("others",othersData[0])
  const AnswerData= Object.keys(dmaReportData).length===1 &&dmaReportData[0].answers[1].modifiedResult.map(v=>v.optionChoiceId)
  // console.log("answerData",AnswerData)
 
  const SpiderData =dmaReportData.length > 0 ? 
    [dmaReportData.map(v=> 
      ({
        area: v.section_name, 
        value: v.data.find(v=> v.type==='gauge')?.value === 166 
                ? 6.5 : v.data.find(v=> v.type==='gauge')?.value === 167 
                ? 13.5 : v.data.find(v=> v.type==='gauge')?.value === 168
                ? 20 : 0
      })
    )]: [];

  const [floatingIconList, setFloatingIconList] = useState("none");
  function openList1() {
    if (floatingIconList == "none") setFloatingIconList("block");
    else setFloatingIconList("none");
  }

  const avgLevel = SpiderData.length > 0 ? 
  ((SpiderData[0].reduce((a, b) => a + ((b.value === 6.5 ? 5:b.value ===13.5 ? 10 : b.value===20 ? 15 : 0) || 0), 0))/11).toFixed(2)
  : null;


  return (
    <div className="d-flex flex-wrap">
      <div className="d-flex flex-row py-4 pl-5">
        <img
          alt=""
          src={UNDP}
          style={{
            width: 70,
          }}
        />
        <span className="text-left" style={{color:"#0265B5"}}>
          <h3>UNDP</h3>Digital Readiness Assessment
        </span>
      </div>
      {/* <div
        style={{
          position: "-webkit-sticky",
          position: "sticky",
          top: 0,
          // right: 0,
          width: "auto",
          zIndex: 2,
          height: 0,
          cursor: "pointer",
          // borderBottom: `2px solid ${color.lightGrey}`
        }}
      >
        {countryId ? (
          <>
            <div
              className="d-flex align-items-center justify-content-center"
              onClick={openList1}
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
                }}
              >
                {countryName(countryId)}
              </span>
            </div>
            <div
              className="text-left mx-1 text-secondary p-2 rounded"
              style={{
                position: "absolute",
                display: floatingIconList,
                right: "-10px",
                backgroundColor: color.white,
                width: "170px",
                boxShadow: `0px 16px 40px #edf2f8 `,
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
        // className="pl-5 col-12"
      >
        <div className="pl-5 m-0 mt-3 pb-3">
          <h5 className="my-1 text-left pb-3" style={{color:"#082753"}}> Overall Digital Maturity</h5>
          <div
            id="spider"
            className="bg-white my-3 mx-3 d-flex flex-row"
            style={{
              height: "auto",
              borderRadius: 8,
              color: color.primaryColor,
              boxShadow: `0px 16px 40px #edf2f8 `,
            }}
          >
            <div className="col-2 m-3 text-left"
              style={{
                cursor: "pointer",
                // fontSize: windowWidth < 496 ? 6 : 9,
              }}>
              <h6>Digital Maturity Level</h6>
              <h5 style={{ color: color.black, paddingTop: 10, marginBottom: 0 }}>
                {(!avgLevel) ? '...' 
                : (avgLevel > 2.4 && avgLevel < 7.5) ?  "Basic" : (avgLevel > 7.4 && avgLevel < 12.5) ? 'Useful' : (avgLevel > 12.4 && avgLevel < 17.5) ? "Sustainable" : "Under Basic" }
                </h5>
              <span style={{ color: color.greyColor }} className="text-black">Ave. Digital Maturity Level</span>

            </div>
            {/* <div
              className="col-1 d-flex flex-column flex-wrap"
              style={{
                position: "absolute",
                right: "5%",
                top: "8%",
                cursor: "pointer",
                fontSize: windowWidth < 496 ? 6 : 9,
              }}
            >
              <div className="my-1">
                <img
                  src={polygon}
                  style={{ width: windowWidth < 496 ? 20 : 30 }}
                />
                <div>HIGH</div>
              </div>
              <div className="my-1">
                <img
                  src={polygon}
                  style={{ width: windowWidth < 496 ? 20 : 30 }}
                />
                <div>MEDIUM</div>
              </div>
              <div className="my-1">
                <img
                  src={polygon}
                  style={{ width: windowWidth < 496 ? 17 : 25 }}
                />
                <div>LOW</div>
              </div>
              <div className="my-1">
                <img
                  src={polygon}
                  style={{ width: windowWidth < 496 ? 17 : 25 }}
                />
                <div>ZERO</div>
              </div>
            </div> */}
            <div className="col-8">
              {SpiderData.length >0 && (
                <SpiderChart
                  windowWidth={windowWidth}
                  data={SpiderData}
                  svgId={"Spider"}
                  evaluationLevel={evaluationLevel}
                />
              )}
            </div>
            {/* <div className="row justify-content-between px-2 py-3">
              <div
                className="col-5"
                style={{
                  boxShadow: `1px 1px 2px ${color.greyColor}`,
                  borderRadius: 5,
                }}
              >
                <div className="text-left">Your Digital Maturity Scores :</div>
                <div className="row justify-content-between">
                  <i className="fas fa-clipboard-list fa-2x ml-3 my-1" />
                  <h6 className="mr-3 mt-2">80</h6>
                </div>
              </div>
              <div
                className="col-5"
                style={{
                  boxShadow: `1px 1px 2px ${color.greyColor}`,
                  borderRadius: 5,
                }}
              >
                <div className="text-left">
                  Average Digital Maturity Scores :
                </div>
                <div className="row justify-content-between">
                  <i className="fas fa-file-alt fa-2x ml-3 my-1" />
                  <h6 className="mr-3 mt-2">140</h6>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        {
          dmaReportData.length > 0 ?
            dmaReportData.map((v,k)=> 
              <div key={k} className="py-3 pl-5" style={{background: k%2 ===0 ?'#ECF3F9' : ""}}>
                <div className="row m-0 mt-3" style={{color:"#082753"}}>
                  <h5 className="m-1 pb-3">{v.section_name}</h5>
                </div>
                <SectionReport
                  data={v.data}
                  sectionId={`sectionId_${v.survey_section_id}`}
                  label={v.section_name+ ' level'}
                  windowWidth={windowWidth}
                />
              </div>
            )
          :
          <>Loading</>
        }
  
        {/* <div className="py-3 pl-5" style={{background:'#ECF3F9'}}>
          <div className="row m-0 mt-3" style={{color:"#082753"}}>
            <h5 className="m-1 pb-3">Political will and Support</h5>
          </div>
          <ChartTblComponent
            label="Your Political will and Support level"
            othersData={othersData}
            gaugeData={AnswerData && AnswerData[0]}
            sectionId={"sectionId_1"}
            windowWidth={windowWidth}
          />
        </div>
        <div className="py-3 pl-5" >
          <div className="row m-0 mt-3" style={{color:"#082753"}}>
            <h5 className="m-1 pb-3">Coordination</h5>
          </div>
          <ChartTblComponent
            label="Your Coordination level"
            gaugeData={AnswerData &&AnswerData[1]}
            sectionId={"sectionId_2"}
            windowWidth={windowWidth}
          />
        </div>

        <div className="py-3 pl-5" style={{background:'#ECF3F9'}}>
          <div className="row m-0 mt-3" style={{color:"#082753"}}>
            <h5 className="m-1 pb-3">Financing Model</h5>
          </div>
          <ChartTblComponent
            label="Your Financing Model level"
            gaugeData={AnswerData &&AnswerData[2]}
            sectionId={"sectionId_3"}
            windowWidth={windowWidth}
          />
        </div>

        <div className="py-3 pl-5">
          <div className="row m-0 mt-3" style={{color:"#082753"}}>
            <h5 className="m-1 pb-3">Legal Framework</h5>
          </div>
          <ChartTblComponent
            label="Your Legal Framework level"
            gaugeData={AnswerData &&AnswerData[3]}
            sectionId={"sectionId_4"}
            windowWidth={windowWidth}
          />
        </div>

        <div className="py-3 pl-5" style={{background:'#ECF3F9'}}>
          <div className="row m-0 mt-3" style={{color:"#082753"}}>
            <h5 className="m-1 pb-3">
              Digital Databases, Interoperability, Secure Data Exchange
            </h5>
          </div>
          <ChartTblComponent
            label=" Your Digital Databases, Interoperability, Secure Data Exchange level"
            gaugeData={AnswerData &&AnswerData[4]}
            sectionId={"sectionId_5"}
            windowWidth={windowWidth}
          />
        </div>

        <div className="py-3 pl-5">
          <div className="row m-0 mt-3" style={{color:"#082753"}}>
            <h5 className="m-1 pb-3">
              Secure Digital Identity and Digital Signature
            </h5>
          </div>
          <div
            className='d-flex row mx-0 mb-2'
          >
            <div
              className='d-flex flex-wrap flex-col col-lg-4 col-sm-12 col-md-12 py-1 text-center'

            >
              <div
                id={`parent_sectionId_9`}
                className='p-2 text-left bg-white w-100 text-center d-flex flex-wrap'
                style={{
                  borderRadius: 6,
                  boxShadow: `0px 16px 40px #edf2f8 `,
                  flexFlow: 'column',
                  height: 320,
                }}
              >
                <div className='w-100' style={{ flex: '0 1 auto' }}>
                  <GaugeChart
                    label="Your Secure Digital Identity and Digital Signature level"
                    data={AnswerData &&AnswerData[5]}
                    id={'sectionId_9'}
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
          </div>
        </div>

        <div className="py-3 pl-5" style={{background:'#ECF3F9'}}>
          <div className="row m-0 mt-3" style={{color:"#082753"}}>
            <h5 className="m-1 pb-3">
              Access to Services, Awareness-Raising
            </h5>
          </div>
          <ChartTblComponent
            label="Your Access to Services, Awareness-Raising level"
            gaugeData={AnswerData &&AnswerData[6]}
            sectionId={"sectionId_7"}
            windowWidth={windowWidth}
          />
        </div>

        <div className="py-3 pl-5">
          <div className="row m-0 mt-3" style={{color:"#082753"}}>
            <h5 className="m-1">
              E-Participation, E-Democracy
            </h5>
          </div>
          <ChartTblComponent
            label="Your E-Participation, E-Democracy level"
            gaugeData={AnswerData &&AnswerData[7]}
            sectionId={"sectionId_8"}
            windowWidth={windowWidth}
          />
        </div>

        <div className="py-3 pl-5" style={{background:'#ECF3F9'}}>
          <div className="row m-0 mt-3" style={{color:"#082753"}}>
            <h5 className="m-1 pb-3">
              Information Security
            </h5>
          </div>
          <div
            className='d-flex row mx-0 mb-2'
          >
            <div
              className='d-flex flex-wrap flex-col col-lg-4 col-sm-12 col-md-12 py-1 text-center'

            >
              <div
                id={`parent_sectionId_6`}
                className='p-2 text-left bg-white w-100 text-center d-flex flex-wrap'
                style={{
                  borderRadius: 6,
                  boxShadow: `0px 16px 40px #edf2f8 `,
                  flexFlow: 'column',
                  // height: 220,
                }}
              >
                <div className='w-100' style={{ flex: '0 1 auto' }}>
                  <GaugeChart
                    label="Your Information Securtiy level"
                    data={AnswerData &&AnswerData[8]}
                    id={'sectionId_6'}
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
          </div>
        </div>

        <div className="py-3 pl-5">
          <div className="row m-0 mt-3" style={{color:"#082753"}}>
            <h5 className="m-1 pb-3">
              Telecommunications and Digital Infrastructure
            </h5>
          </div>
          <ChartTblComponent
            othersData={othersData}
            label='Your Telecommunications and Digital Infrastructure level'
            gaugeData={AnswerData &&AnswerData[9]}
            sectionId={"sectionId_10"}
            windowWidth={windowWidth}
          />
        </div>

        <div className="py-3 pl-5" style={{background:'#ECF3F9'}}>
          <div className="row m-0 mt-3" style={{color:"#082753"}}>
            <h5 className="m-1 pb-3">
              International Cooperation
            </h5>
          </div>
          <ChartTblComponent
            label="Your International Cooperation level"
            gaugeData={AnswerData &&AnswerData[10]}
            sectionId={"sectionId_11"}
            windowWidth={windowWidth}
          />
        </div> */}
      </div>
    </div>
  );
};
export default withRouter(withCookies(SurveyReport));

const evaluationLevel = [
  { name: "Basic" }, { name: "Useful" },
  { name: "Sustainable" },

]
