import React from "react";
import { ESRadio } from "./ES_Radio";
import ESCheckBox from "./ES_CheckBox";
import { ESInput } from "./ES_Inputs";
import Colors from "../../../../Feature/Config/color";

const ESMatrixLabel = (props) => {
  const {
    quesId,
    subQuestions,
    isAnswer,
    categories,
    optionChoices,
    keys,
    isDisable,
    isEvaluationTbl,
    _handleRadioChange,
    _handleCheckChange,
    _handleInputChange,
  } = props;

  const NewlineText = (text) => {
    return text.split("/n").map((str) => (
      <div className="d-flex flex-row flex-nowrap">
        <i className="fa fa-circle pt-2 col-1" style={{ fontSize: 7 }} />
        <div className="text-left col-11">{str}</div>
      </div>
    ));
  };

  return (
    <table className="table table-bordered table-striped rounded table-sm">
      <thead>
        {categories && categories.length > 0 ? (
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
            <td style={{ maxWidth: "140px" }}>{v.sub_question_name}</td>
            {v.option_choices.length > 0
              ? v.option_choices.map((v1, k1) =>
                v1.option_choice_name !== " " ? (
                  <td className="p-0 text-center" key={k1}>


                    {v.input_type_id === 1 ? (
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
                    ) : v.input_type_id === 4 ? (
                      <ESInput
                        placeHolder={
                          quesId === "20"
                            ? ""
                            : (quesId === "23" && k1 === 1) || quesId === "30"
                              ? "Please Specify the Ministry/Agency"
                              : quesId === "48" && k1 === 1
                                ? ""
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
                      isEvaluationTbl={isEvaluationTbl}
                      isDisable={isDisable}
                      value={v1}
                      _handleRadioChange={_handleRadioChange}
                      quesId={quesId}
                      subQuesId={v.sub_question_id}
                      isAnswer={isAnswer}
                      keys={keys}
                    />
                    )}

                    {v.sub_question_label.length > 0
                      ? NewlineText(
                        v.sub_question_label[k1].sub_question_label
                      )
                      : null}
                  </td>
                ) : null
              )
              : v.input_type_id === 4 && (
                <ESInput
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
export default ESMatrixLabel;
