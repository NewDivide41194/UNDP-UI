import React from "react";
import { ESRadio } from "./ES_Radio";
import ESCheckBox from "./ES_CheckBox";
import Colors from "../../../../Feature/Config/color";
import { ESTextArea } from "./ES_TextArea";

const ESMatrix = (props) => {
  const {
    quesId,
    subQuestions,
    isAnswer,
    categories,
    optionChoices,
    keys,
    isDisable,
    _handleRadioChange,
    _handleCheckChange,
    _handleInputChange,
    matrixWithLabel,
  } = props;
  const NewlineText = (text) => {
    return text.split("/n").map((str) => <span>{str}<br /></span>);
  };
  return (
    //console.log("questionId",quesId,"subQuestion", subQuestions),
    <table className={`table ${(quesId !=7 && quesId !=45) && 'table-bordered'} ${(quesId !=7 && quesId !=45) && 'table-striped'}  rounded table-sm`}>
      <thead>
        {categories && categories.length > 0 && matrixWithLabel == false ? (
          <tr
            className="text-center"
            style={{ background: Colors.primaryColor, color: "#ffffff" }}
          >
            <th style={{ padding: 15 }} rowSpan="2" className="align-middle">
              {categories[0].categories}
            </th>
            <th style={{ padding: 5 }} colSpan="6" className="align-middle">
              {categories.length > 1 ? categories[1].categories : null}
            </th>
          </tr>
        ) : null}

        {optionChoices && (
          <tr
            className="text-center"
            style={{
              background: categories.length > 0 ? null : Colors.primaryColor,
              color: categories.length > 0 ? "black" : "white",
            }}
          >
            {optionChoices.map((v, k) => (
              <th key={k} style={{ padding: 5 }} className="align-middle">
                {v.option_choice_name}
              </th>
            ))}
          </tr>
        )}
      </thead>
      <tbody>
        {subQuestions.map((v, k) => (
          <tr key={k}>
            <td className="w-50" style={{borderTop: '1px solid white'}}>
              {NewlineText(v.sub_question_name)}
              {v.sub_question_label ? v.sub_question_label.map((v,k) => <li key={k}>{v.sub_question_label}</li>) : null}
            </td>
            {v.option_choices.length > 0
              ? v.option_choices.map((v1, k1) =>
                v1.option_choice_name !== " " ? (
                  <td className="p-0 text-center" key={k1}>
                    {
                      v.input_type_id === 1 ? (
                        <ESCheckBox
                          noLabel
                          disabled={isDisable}
                          value={v1}
                          _handleChange={_handleCheckChange}
                          quesId={quesId}
                          subQuesId={v.sub_question_id}
                          isAnswer={isAnswer}
                          keys={keys}
                        />
                      ) :
                        v.input_type_id === 4 ? (
                          <ESTextArea
                            placeHolder={
                              quesId === "20"
                                ? ""
                                : quesId === "23" && k1 === 1 || quesId === "30"
                                  ? "Please Specify the Ministry/Agency" : (quesId === "48") && k1 === 1 ? "" : quesId === "23" && k1 > 1 ? " "
                                    : v1.option_choice_name
                            }
                            id={v.sub_question_id + k1.toString()}
                            value={isAnswer
                              .filter(
                                (d) =>
                                  d.subQuestionId === v.sub_question_id &&
                                  d.optionChoiceId === v1.option_choice_id
                              )
                              .map((v, k) => v.other)}
                            onChange={(e) => {
                              _handleInputChange(
                                e,
                                quesId,
                                v.sub_question_id,
                                quesId,
                                v1.option_choice_id,
                                true
                              );
                            }}
                          />
                        ) : (
                          <ESRadio
                            isDisable={isDisable}
                            value={v1}
                            _handleRadioChange={_handleRadioChange}
                            quesId={quesId}
                            subQuesId={v.sub_question_id}
                            isAnswer={isAnswer}
                            keys={keys}
                          />
                        )}
                  </td>
                ) : null
              )
              : v.input_type_id === 4 && (
                <ESTextArea
                  background={"#e7effd"}
                  //fontStyle={"Italic"}
                  placeHolder={"Please Specify the Ministry/Agency"}
                  id={v.sub_question_id}
                  value={isAnswer
                    .filter((d) => d.subQuestionId === v.sub_question_id)
                    .map((v, k) => v.other)}
                  onChange={(e) => {
                    _handleInputChange(
                      e,
                      quesId,
                      v.sub_question_id,
                      quesId,
                      true
                    );
                  }}
                />
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default ESMatrix;
