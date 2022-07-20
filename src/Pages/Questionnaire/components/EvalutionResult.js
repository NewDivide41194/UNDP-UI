import React, { useEffect, useState } from "react";
import { ResultOfEvaluationFetch } from "../../../Api/FetchQuestions";
import { withCookies } from "react-cookie";
import { deleteCookie, readCookie } from "../../../helper/cookieUser";
import { toast } from "react-toastify";
import { checkTokenExist } from "../../../helper/checkAccess";
import font from "../../../Feature/Config/font";
import Colors from "../../../Feature/Config/color";
import icon from "../../../Feature/Config/icon";
import { ESTooltip } from "./tools/ES_ToolTip";
import back from "../../../Feature/Images/back.jpg"
import { withRouter } from "react-router";

const EvalutionResult = (props) => {
  const user = readCookie(props.cookies);
  const [resultData, setResultData] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (checkTokenExist(user, props.history, props.cookies)) {
     const userId=user.user_id;
      ResultOfEvaluationFetch(
        {
          userId,
        },
        (error, data) => {
          if (error) {
            if (error.toString().includes("expired")) {
              toast("Login Expired!", { type: "error" });
              deleteCookie(props.cookies);
              props.history.push("/login");
            } else toast(error.toString(), { type: "error" });
          } else {
            setResultData(data.payload);
          }
        },
        { token: user.token }
      );
    }
  }, []);
  const levels = ["Basic Level", "Useful Level", "Sustainable level"];

  return (
    <div className="text-left ">
    <div className="d-flex flex-row flex-nowrap pt-2">
      <div className="pt-3 pr-3" onClick={()=>props.history.push("/digital_maturity_accessment")}><img src={back} style={{width: 30, cursor: 'pointer'}}/></div>
      <div
        className="my-2 pb-0"
        style={{ fontSize: font.heading12, color: Colors.primaryColor }}
      >
        DIGITAL MATURITY ASSESSMENT SURVEY
      </div>
    </div>
      <div style={{ fontWeight: "bold", fontSize: font.heading2 }}>
        Result of Evalution
      </div>
      <div className="pb-2">(Mouse over for description)</div>
      <div className="col-lg-6 p-0">
        {resultData.map((v, k) => {
          return (
            <div className="d-flex flex-row py-1">
              <div
                key={k}
                className="pr-2"
                style={{
                  color: Colors.textColor,
                  display: "inline-flex",
                  flex: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <div className="pr-3">{icon["section" + (k + 1)]}</div>
                <div
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={v.sub_question_name}
                >
                  <strong>{`Section ${k + 1}`}</strong>
                  <br />
                  {v.sub_question_name}
                </div>
              </div>
              {v.data.map((x, y) => (
                <div
                  key={y}
                  className="mr-2"
                  data-tip
                  data-for={`${v.sub_question_name}` + v.option_choice_id + y}
                  style={{
                    padding: 18,
                    display: "inline-block",
                    backgroundColor:
                      y === 0
                        ? `rgba(114,159,207,${v.option_choice_id >= 166 && 1})`
                        : y === 1
                        ? `rgba(173,224,246,${
                            v.option_choice_id >= 167 ? 1 : 0.1
                          })`
                        : `rgba(93,224,246,${
                            v.option_choice_id === 168 ? 1 : 0.1
                          })`,
                    borderRadius: 5,
                    width: "20%",
                    height: 20,
                    cursor: "pointer",
                  }}
                >
                  <ESTooltip
                    id={`${v.sub_question_name}` + v.option_choice_id + y}
                    level={levels[y]}
                    data={x.label}
                  />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default withCookies(withRouter(EvalutionResult));

