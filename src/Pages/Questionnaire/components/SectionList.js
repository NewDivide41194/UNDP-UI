import React, { useEffect, useState } from "react";
import { SurveyListData } from "../../../Api/dataFetch";
import Colors from "../../../Feature/Config/color";
import { ESDropDown } from "./tools/ES_DropDown";
import icon from "./../../../Feature/Config/icon";
import { deleteCookie, readCookie } from "../../../helper/cookieUser";
import { withCookies } from "react-cookie";
import { useRouteMatch, withRouter } from "react-router";
import { checkTokenExist } from "../../../helper/checkAccess";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import UNDP from "../../../Feature/Images/UNDP.svg";

const SectionList = (props) => {
  const {
    _handleSectionClick,
    surveySectionId,
    selectedSection,
    IsLoading,
    totalQAcount,
    countryName,
    countryId
  } = props;
  const [hover, setHover] = useState(false);
  const [listData, setListData] = useState([]);
  let { url } = useRouteMatch();

  const toggleHover = (selected) => {
    setHover(selected);
  };

  useEffect(() => {
    const user = readCookie(props.cookies);
    if (checkTokenExist(user, props.history, props.cookies)) {
      SurveyListData(
        (error, data) => {
          if (error) {
            if (error.toString().includes("expired")) {
              toast("Login Expired!", { type: "error" });
              deleteCookie(props.cookies);
              props.history.push("/login");
            } else toast(error.toString(), { type: "error" });
          } else {
            setListData(data.payload);
          }
        },
        { token: user.token }
      );
    }
  }, []);

  const listOption =
    listData.length > 0 &&
    listData.map((v, k) => ({
      label: v.section_name,
      value: v.survey_section_id,
    }));
  return (
    <div>
      {window.innerWidth <= 765 ? (
        <div className="pb-2 pt-5 col-12">
          <div className="pb-2 font-weight-bold">Choose a Survey Section:</div>
          <ESDropDown
            notClearable
            options={listOption}
            _handleSelect={_handleSectionClick}
            selectedOption={selectedSection}
            disabled={IsLoading ? true : false}
          />
        </div>
      ) : (
        <div className="pr-3">
          <Surveylist
          countryId={countryId}
          countryName={countryName}
            listData={listData}
            sectionIcon={icon}
            hover={hover}
            toggleHover={toggleHover}
            _handleSectionClick={_handleSectionClick}
            surveySectionId={surveySectionId}
            IsLoading={IsLoading}
            totalQAcount={totalQAcount}
            url={url}
          />
        </div>
      )}
    </div>
  );
};
export default withRouter(withCookies(SectionList));

const Surveylist = ({
  listData,
  toggleHover,
  _handleSectionClick,
  surveySectionId,
  hover,
  sectionIcon,
  IsLoading,
  totalQAcount,
  countryId,
  countryName,
  url,
}) => {
  return (
    <div style={{ background: Colors.primaryColor, color: Colors.white }}>
      <div className="d-flex flex-row py-4 pl-5 pb-5 flex-wrap">
        <img
          alt=""
          src={UNDP}
          style={{
            width: 70,
          }}
        />
        <span>
          <h3>UNDP</h3>Digital Readiness Assessment 
        </span>
      </div>
      {listData.length > 0 &&
        listData.map((v, k) => {
          const QAcount =
            totalQAcount &&
            totalQAcount.find(
              (v1) => v1.survey_sections_id === v.survey_section_id
            );
            // console.log('QAcount', QAcount ? ([...new Set(QAcount.keyValue)].length) : null)
            // console.log(QAcount?.keyValue)
          return (
            <div className="px-3">
              <div
                key={k}
                className={`${
                  (hover === v.survey_section_id ||
                    surveySectionId === v.survey_section_id) &&
                  "font-weight-bold"
                }  py-1  text-left mb-2`}
                onMouseEnter={() => toggleHover(v.survey_section_id)}
                onMouseLeave={() => toggleHover(null)}
                title={v.section_name}
                style={{
                  // boxShadow: "0px 1px 3px 0 rgba(166,180,200,1.2)",
                  pointerEvents: IsLoading && "none",
                  borderRadius: "4px",
                  background:
                    hover === v.survey_section_id
                      ? "#80B5DA"
                      : surveySectionId === v.survey_section_id
                      ? "#fff"
                      : Colors.primaryColor,
                  color:
                    surveySectionId === v.survey_section_id
                      ? Colors.textColor
                      : null,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  cursor: "pointer",
                }}
                onClick={() =>
                  _handleSectionClick({
                    sectionId: v.survey_section_id,
                    sectionName: v.section_name,
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
                    {sectionIcon["section" + (k + 1)]}
                    {v.section_name === "Evaluation" ? '' : v.section_name}
                  </span>
                  {QAcount && (
                    <span
                      className="float-right ml-2 font-weight-bold"
                      style={{
                        marginTop: 2,
                        fontSize: 12,
                        color:
                          surveySectionId !== v.survey_section_id &&
                          Colors.white,
                      }}
                    >
                      {[...new Set(QAcount.ans)].length}/{QAcount.ques.length}
                    </span>
                  )}
                </div>
                {/* <div
                id="progress_bar"
                className="d-flex flex-nowrap"
                style={{ width: "100%", position: "relative", bottom: -7 }}
              >
                {QAcount &&
                  [...Array(QAcount.ques_cnt)].map((v_, k_) => (
                    <div
                      className=""
                      key={k_}
                      style={{
                        backgroundColor:
                          v.survey_section_id === surveySectionId
                            ? k_ < QAcount.ans_cnt
                              ? Colors.white
                              : Color.lightGrey
                            : k_ < QAcount.ans_cnt
                            ? Colors.primaryColor
                            : Color.lightGrey,
                        width: 100 / QAcount.ques_cnt + "%",
                        height: 3,
                        marginRight: k_ !== QAcount.ques_cnt - 1 ? 4 : 0,
                        // border: '1px solid white'
                        borderRadius: "10px",
                      }}
                    />
                  ))}
              </div> */}
              </div>
            </div>
          );
        })}
      <hr
        style={{
          // color: '#000',
          backgroundColor: Colors.greyColor,
          height: "1px",
          border: "none",
        }}
      />
      <div className="px-4 pt-2 pb-4">
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
          <img className="pr-2"  src={`/countryflags/${countryId.toLowerCase()}.svg`} alt="country flag" width={50} />
          <span
            className="ml-2"
            title={countryName(countryId)}
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
             {countryName(countryId)}
          </span>
        </div>
}
      </div>
    </div>
  );
};
