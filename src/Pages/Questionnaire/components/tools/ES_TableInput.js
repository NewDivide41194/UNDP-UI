import React from "react";
import Colors from "../../../../Feature/Config/color";
import { ESTextArea } from "./ES_TextArea";

export const ESTableInput = (props) => {
  const {
    AnswerData,
    _handleInputChange,
    quesId,
    subQuesId,
    reportText,
    keyValue,
    placeHolder,
    tableRow,
  } = props;
  
  const addedQuestionId = 1000;

  const rowCount_ = tableRow.length > 0 && tableRow.find(
    (v) => v.question_id === parseInt(quesId)
  );
 // console.log("row count is ===>", rowCount_, tableRow)
  
  return (
    <table className="table table-bordered table-striped">
      <thead style={{ background: Colors.primaryColor }}>
        <tr className="text-center text-light">
          <th style={{ width: "60px",borderTopLeftRadius:"10px" }} className="align-middle">
            #
          </th>
          {subQuesId.map((a, b) => (
            <th className="align-middle" key={b} style={{ minWidth: 150,borderTopRightRadius: b==subQuesId.length-1 && "10px" }}>
              {a.sub_question_name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rowCount_ &&
        new Array(rowCount_.rowCount).fill(null).map((v, k) => (
          <tr className="text-center" key={k}>
            <td className="p-0">{k + 1}</td>
            {subQuesId.map((v1, k1) => {
              //console.log(v1);
              const remakeQuestionId =
                // addedQuestionId + v1.sub_question_id + k.toString();

                (parseInt(addedQuestionId) + parseInt(k)) + v1.sub_question_id.toString()
                
              return (
                  v1.input_type_id === 4 && (
                  <td key={k1} className="p-0">
                    {reportText ? (
                      <span
                        className="text-left"
                        style={{ color: Colors.primaryColor }}
                      >
                        {AnswerData.filter(
                          (d) => d.questionId === remakeQuestionId
                        ).length && AnswerData.length
                          ? AnswerData.filter(
                              (d) => d.questionId === remakeQuestionId
                            ).map((v, k) => v.other)[0]
                          : undefined}
                      </span>
                    ) : (
                      <ESTextArea
                        height={40}
                        id={remakeQuestionId}
                        placeHolder={
                          quesId === "17" && k1 >= 1 ? "" : placeHolder
                        }
                        value={
                          AnswerData.filter(
                            (d) => d.questionId === remakeQuestionId
                          ).length && AnswerData.length
                            ? AnswerData.filter(
                                (d) => d.questionId === remakeQuestionId
                              ).map((v, k) => v.other )[0]
                            : undefined
                            // console.log("question id", v.questionId)
                        }
                        onChange={(e) => {
                          _handleInputChange(
                            e,
                            remakeQuestionId,
                            v1.sub_question_id,
                            keyValue,
                            true
                          );
                        }}
                      />
                    )}
                  </td>
                )
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
