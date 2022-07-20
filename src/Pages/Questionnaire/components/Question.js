import React, { useEffect, useRef } from "react";
import { ESButton } from "../components/tools/ES_Button";
import Color from "../../../Feature/Config/color";
import { Fragment } from "react";
import ESGroupQuestionCard from "./tools/ES_Card1";
import Scrollbars from "react-custom-scrollbars";
import SectionList from "../components/SectionList";

const Question = (props) => {
  const {
    _handleSkip,
    surveyData,
    pageno,
    _handleSubmit,
    autoSave,
    sectionName,
    surveySectionId,
    isSkippable,
    totalQAcount,

    _handleSectionClick,
    selectedSection,
    IsLoading,

    countryId,
    countryName,
  } = props;
  const quesCard_scrollbar = useRef();

  const surveyHeaderId = localStorage.getItem("SurveyHeaderId");
// console.log('totalQAcount', totalQAcount)
  const QAcount =
    totalQAcount &&
    totalQAcount.find(
      (v) => parseInt(v.survey_sections_id) === parseInt(surveySectionId)
    );

   // console.log("QAcount....",[...new Set(QAcount.keyValue)].length, "questionLength",QAcount.ques.length)
  // const deviceAmount =
  //   amountOfDevice && amountOfDevice.length > 0
  //     ? Object.values(amountOfDevice[0])[pageno - 1]
  //     : null;

  // const surveyTotal =
  //   surveyData.length && surveyData[0].survey_header_id === 1
  //     ? total
  //     : surveyData.length && surveyData[0].survey_sections[0].questions.length;


  return (
    <Fragment>
      {/* <div className="w-100" style={{ position: "absolute", top: 0, right: 0 }}>
        <svg
          className="float-right"
          width="28%"
          viewBox="0 0 559.000000 265.000000"
          style={{ position: window.innerWidth >= 765 && 'relative', zIndex: window.innerWidth >= 765 && 1 }}
        >
          <g
            transform="translate(0.000000,262.000000) scale(0.100000,-0.100000)"
            fill="#1A66B9"
            stroke="none"
          >
            <path d="M1792 2633 l-1544 -3 7 -63 c10 -99 26 -179 39 -207 8 -14 16 -43 20 -65 13 -79 82 -236 152 -343 74 -114 223 -261 332 -326 96 -57 229 -109 356 -139 79 -19 121 -21 326 -21 202 -1 253 3 360 22 167 31 331 72 498 126 400 130 662 172 1007 163 508 -14 963 -170 1395 -480 288 -206 598 -524 784 -804 l61 -93 3 1042 2 1042 -22 46 c-16 32 -36 52 -68 70 l-45 25 -460 6 c-253 4 -730 6 -1060 5 -330 0 -1295 -2 -2143 -3z" />
          </g>
          <g
            transform="translate(0.000000,262.000000) scale(0.100000,-0.100000)"
            fill="#80B5DA"
            stroke="none"
          >
            <path d="M246 2565 c-21 -55 10 -251 65 -418 146 -442 446 -711 884 -793 147 -28 443 -26 620 5 167 28 341 71 513 126 441 141 763 190 1097 165 705 -51 1309 -366 1846 -962 87 -97 274 -271 302 -281 16 -6 16 -2 -5 34 -41 73 -206 286 -312 401 -282 310 -567 528 -901 693 -180 89 -303 135 -479 180 -222 57 -332 69 -596 70 -348 0 -513 -28 -925 -157 -421 -131 -704 -175 -1007 -155 -472 30 -819 276 -989 702 -38 95 -89 292 -89 344 0 44 -14 71 -24 46z" />
          </g>
        </svg>
      </div> */}
      <div className="row pt-lg-0 pt-xs-0  pt-md-0 pt-5">
        {window.innerWidth < 765 && <div className="pl-5 pt-3 font-weight-bold" style={{ fontSize: 15, color: Color.secondaryText }}>Digital Maturity Assessment Survey</div>}

        <div className="col-md-3 col-lg-3 col-xs-3">
          <SectionList _handleSectionClick={_handleSectionClick}
            surveySectionId={surveySectionId}
            selectedSection={selectedSection}
            IsLoading={IsLoading}
            totalQAcount={totalQAcount}
            countryId={countryId}
            countryName={countryName} />
        </div>
        <div className="col-md-9 col-lg-9 col-xl-9 pl-0">
          {window.innerWidth > 765 && <div className="pl-4 pt-3 font-weight-bold" style={{ fontSize: 18, color: Color.secondaryText }}>Digital Maturity Assessment Survey</div>}
          <div className="d-flex flex-row flex-wrap justify-content-between align-items-center my-3 px-2">
            <div className="col-12 col-sm-7 col-md-7 col-xs-9 col-lg-8">
              <div className=" align-items-center">
                {/* {sectionIcon} */}
                <span
                  className="m-1 font-weight-bold"
                  style={{ fontSize: window.innerWidth > 350 ? 23 : 19, color: Color.primaryColor }}
                >
                  {sectionName}
                </span>

              </div>
            </div>
            <div className="col-lg-3 col-md-5 col-sm-5 col-xs-3 col-12">
              {QAcount&& [...new Set(QAcount.keyValue)].length >= QAcount.ques.length  ?
                <ESButton
                  text={(surveySectionId === 11 || surveySectionId === 12) ? "Submit" : !isSkippable ? 'Save Progress' :  "Continue to next survey"  }
                  // rounded
                  onClick={!isSkippable ?_handleSubmit : _handleSkip}
                  // disabled={isSkippable}
                /> :
                <ESButton
                  text={(surveySectionId === 11 || surveySectionId === 12) ? "Submit" : "Save Progress"}
                  // rounded
                  onClick={_handleSubmit}
                  disabled={isSkippable}
                />}
            </div>
          </div>
          <div
            id="progress_bar"
            className="m-2 px-3 pb-5"
            style={{ height: 5, borderRadius: "10px" }}
          >
            {QAcount && (
              <div className="d-flex flex-row">
                {window.innerWidth > 344 &&
                  <div
                    className="font-weight-bold pr-3 d-flex align-items-center"
                    style={{
                      color: Color.textColor,
                      fontSize: 12,
                      // top: -8,
                      // position: "relative",
                    }}
                  >
                    {[...new Set(QAcount.ans)].length}/{QAcount.ques.length} answered
                  </div>}
               
                {(QAcount.ques).map((v, k) => {
                 
                  return(
                    <div className={k === 0 ? ((QAcount.ans).findIndex(dt => dt === v)>-1? "pointer1-active":"pointer1") 
                    : k == QAcount.ques.length - 1 ? ((QAcount.ans).findIndex(dt => dt === v)>-1?"pointer2-active":"pointer2") 
                    : ((QAcount.ans).findIndex(dt => dt === v)>-1?"pointer-active":"pointer")}
                      style={{
                        fontSize: 12,
                        zIndex: 20 - k, marginLeft: k == 0 ? 0 : 2,
                        borderTopRightRadius: k == QAcount.ques.length - 1 && "10px",
                        borderBottomRightRadius: k == QAcount.ques.length - 1 && "10px",
                        borderTopLeftRadius: k == 0 && "10px",
                        borderBottomLeftRadius: k == 0 && "10px"
                      }} >
                      <div style={{fontWeight:"bold", color:(QAcount.ans).findIndex(dt => dt === v)>-1? "white":"black", position: 'absolute', left: "20px", top: "8px" }}>Q{k + 1}</div>
                    </div>
                )})}


              </div>
            )}
            {/* </div> */}
          </div>
          {surveyData.length && (
            <div style={{}}>
              <Scrollbars
                style={{ height: "80vh" }}
                renderTrackHorizontal={(props) => (
                  <div
                    {...props}
                    style={{ display: "none", overflowX: "hidden" }}
                    className="track-horizontal"
                  />
                )}
                ref={quesCard_scrollbar}
              >
                {/* <ESProgress Percent={percent} /> */}
                <div className="container-fluid">
                  {/* <div className={"text-light row justify-content-end pt-4"}> */}
                  {/* <div
                className={`px-2 position-fixed`}
                style={{
                  minWidth: 160,
                  borderRadius: "20px",
                  background: "rgba(0,0,0,0.7)",
                  zIndex: "1",
                }}
              >{`${obtained || 0} of ${surveyTotal} Answered`}</div> */}
                  {/* </div> */}
                  {autoSave && <AutoSave />}

                  {/* <div
              className="d-flex flex-row flex-wrap justify-content-between pt-2"
              style={{ fontSize: "18px" }}
            >
              <div className="font-weight-bold">{surveySection}</div>

              <div>
                <span style={{ fontWeight: "bold" }}>Organization: </span>
                <span>{organization}</span>
              </div>
            </div> */}

                  <ESGroupQuestionCard
                    {...props}
                    totalQAcount ={totalQAcount}
                    surveyHeaderId={surveyHeaderId}
                    sessionId={
                      surveyData[0].survey_sections[pageno].survey_section_id
                    }
                  />
                  {/* <div className="row justify-content-end pb-4"> */}
                  {/* <div
                  className="col-lg-6 align-self-center font-weight-bold text-left"
                  style={{ color: `${Color.primaryColor}` }}
                >{`Page - ${surveySectionId} of ${
                  surveyData[0].survey_sections.length
                }`}</div> */}

                  {/* </div> */}
                </div>
              </Scrollbars>
              {/* <hr/> */}
              <SaveAndSkip
                QAcount={QAcount}
                surveySectionId={surveySectionId}
                Color={Color}
                isSkippable={isSkippable}
                _handleSkip={_handleSkip}
                _handleSubmit={_handleSubmit}
              />
            </div>
          )}
        </div>
      </div>
    </Fragment >
  );
};

export default Question;

const AutoSave = () => {
  return (
    <div
      className={`text-light text-center w-100 px-2 fixed-bottom`}
      style={{
        minWidth: 160,
        // borderRadius: media.mobile ? "20px 0px 0 20px" : "20px",
        transition: "1s",
        background: Color.primaryColor,
        zIndex: "1",
      }}
    >
      Saving Answers . . .
    </div>
  );
};

const SaveAndSkip = (props) => {
  const { surveySectionId, _handleSkip, Color, isSkippable, _handleSubmit, QAcount } = props;
  //console.log(surveySectionId)
  if (QAcount &&[...new Set(QAcount.keyValue)].length >= QAcount.ques.length || surveySectionId >= 11) {
    return (
      <div style={{ cursor: "pointer" }} className="row justify-content-end pr-4 pt-2">

        <div className="col-lg-3 col-md-5 col-sm-5 col-xs-3 col-12">
          <ESButton
            text={(surveySectionId === 11 || surveySectionId === 12) ? "Submit" : !isSkippable ? 'Save Progress' : "Continue to next survey"}
            onClick={_handleSkip}
            customColor={Color.primaryColor}
           disabled={(surveySectionId === 11 || surveySectionId === 12) ? isSkippable : false}
          />
        </div>

      </div>
    )
  }
  return (
    <div style={{ cursor: "pointer" }} className="row justify-content-end pr-5 pt-2">
      <div>
        {surveySectionId < 11 && <h6 onClick={_handleSkip}>Skip this section</h6>
        }


      </div>
      {/* {
          surveySectionId !== 12 &&
          <div className="col-md-3 col-sm-6 my-1">
          <ESButton
            text={"Save"}
            
            onClick={_handleSubmit}
            disabled={isSkippable}
          />
        </div>
        }
         */}
    </div>
  );
};
