import React, { useEffect, useState } from "react";
import ESCheckBox from "./ES_CheckBox";
import { ESRadio } from "./ES_Radio";
import color from "../../../../Feature/Config/color";
import ESMatrix from "./ES_MatrixTable";
import { ESTextArea } from "./ES_TextArea";
import { ESTableInput } from "./ES_TableInput";
import { ESInput } from "./ES_Inputs";
import { ESButton } from "./ES_Button";
import ESMatrixLabel from "./ES_MatrixTable_DynamicLabels";
import { ESDropDown } from "./ES_DropDown";
import ESLevelIndicator from "./ES_LevelIndicator";
import '../../../../App.css'

const ESGroupQuestionCard = (props) => {
  const {
    totalQAcount,
    QuestionData,
    _handleRadioChange,
    _handleCheckChange,
    _handleInputChange,
    _handleAddRow,
    _handleSelectLevel,
    _handleSelect,
    _handleSkipNextQues,
    _handleSkipPrevQues,
    AnswerData,
    tableRow,
    otherAns,
    otherOfQuestion,
    surveySectionId,
    sessionId,
    currentQues
  } = props;
  const subQues =
    QuestionData.length > 0 &&
    QuestionData.map(
      (v) => v.sub_questions && v.sub_questions.map((subQues) => subQues)
    );
  const totalQusCnt = totalQAcount.map(i=>(i.ques).length).reduce((r,c)=>r+c);

  // const getOption = (quesId) => {
  //   const selectedQuestion = QuestionData.find(
  //     (q) => q.question_id.toString() === quesId
  //   );
  //   console.log(selectedQuestion);
  //   if (selectedQuestion && selectedQuestion.option_choices) {
  //     const noOption = selectedQuestion.option_choices.find(
  //       (o) => o.option_choice_name === "Yes"
  //     );
  //     if (noOption) {
  //       return noOption.option_choice_id;
  //     }
  //   }
  //   return -1;
  // };
  const [rowCount, setRowCount] = useState(3);
  const NewlineText = (text) => {
    return text.split("/n").map((str, key) => <span>{str}<br />{key !== text.split("/n").length - 1 && <br />}</span>);
  };

  return (
  //console.log("QuesData",QuestionData),
    <div style={{ marginTop: -5 }}>
      {QuestionData &&
        QuestionData.map((ques, k2) => {
          // console.log("questionId",ques.input_type_id,ques.question_id,ques.option_choices)
          const questionId = ques.question_id.toString();
          var selectorOptions = [];
          if (ques.input_type_id === 28) {
            selectorOptions = ques.option_choices.map(v =>
            ({
              ...v,
              label: v.option_choice_name,
              value: v.option_choice_id,
              color: color.lightGrey,
            }));
          }
          // console.log(AnswerData,ques)
          return (
            <div
              title={ques.question_id}
              id={`scroll_${ques.question_id}`}
              className="boxx shadow d-flex flex-row flex-fill flex-wrap w-100 p-3 mt-4 mb-3 bg-white" ////////Group question card
              key={k2}
              style={{ borderRadius: 10 }}
            >
              <div
                className="d-flex flex-row flex-wrap pb-3 w-100"
                key={k2}
                style={{ fontSize: "16px" }}
              >
                <div className="d-flex flex-row w-100 justify-content-start">
                  {sessionId !== 12 && (
                    parseInt(
                      AnswerData.map((v, k) => v.keyValue).filter(
                        (v) => parseInt(v) === ques.question_id
                      )[0]
                    ) === ques.question_id ? (
                      <QuestionCardInfo info={"Answered"} />
                    ) : (
                      <div className="p-2 d-flex align-items-center justify-content-center  mr-2" style={{ width: 25, height: 25, fontSize: "10px", border: `2px solid ${color.lightGrey}`, borderRadius: "50%" }}>{k2 + 1}</div>
                    )
                  )}
                  {ques.question_id !== 64 && (
                    <div>
                      {NewlineText(ques.question_name)}
                    </div>
                  )}

                </div>
                {ques.label && (
                  <ul
                    className="pl-3 m-0"
                    style={{
                      listStyleType: "lower-roman",
                      listStylePosition: "outside",
                    }}
                  >
                    <br />
                    {ques.label.map((v, k) => (
                      <li key={k}>{v.label_name}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="w-100">
                {ques.input_type_id === 10 ? (
                  <div className="table-responsive">
                    <ESMatrix
                      matrixWithLabel={questionId === "64" ? true : false}
                      categories={ques.categories}
                      optionChoices={ques.option_choices}
                      subQuestions={ques.sub_questions}
                      placeHolder={
                        questionId === "20"
                          ? ""
                          : questionId === "23"
                            ? "Please Specify the Ministry/Agency"
                            : undefined
                      }
                      id={questionId}
                      quesId={questionId}
                      subQuesId={subQues.map((v) =>
                        v === undefined ? null : v.sub_question_id
                      )}
                      isAnswer={AnswerData}
                      keys={ques.question_id}
                      value={AnswerData.filter(
                        (d) => d.questionId === questionId
                      ).map((v, k) => v.other)}
                      onChange={(e) => {
                        _handleInputChange(e, questionId, null, questionId);
                      }}
                      _handleRadioChange={_handleRadioChange}
                      _handleCheckChange={_handleCheckChange}
                      _handleInputChange={_handleInputChange}
                    />
                  </div>
                ) : ques.input_type_id === 26 ? (
                  <div className="table-responsive">
                    <ESMatrixLabel
                      isEvaluationTbl={surveySectionId === 12 ? true : false}
                      isDisable={surveySectionId === 12 ? true : false}
                      categories={ques.categories}
                      optionChoices={ques.option_choices}
                      subQuestions={ques.sub_questions}
                      placeHolder={
                        questionId === "20"
                          ? ""
                          : questionId === "23"
                            ? "Please Specify the Ministry/Agency"
                            : undefined
                      }
                      id={questionId}
                      quesId={questionId}
                      subQuesId={subQues.map((v) =>
                        v === undefined ? null : v.sub_question_id
                      )}
                      isAnswer={AnswerData}
                      keys={ques.question_id}
                      value={AnswerData.filter(
                        (d) => d.questionId === questionId
                      ).map((v, k) => v.other)}
                      onChange={(e) => {
                        _handleInputChange(e, questionId, null, questionId);
                      }}
                      _handleRadioChange={_handleRadioChange}
                      _handleCheckChange={_handleCheckChange}
                      _handleInputChange={_handleInputChange}
                    />
                  </div>
                ) : ques.input_type_id === 13 ? (
                  <React.Fragment>
                    <div className={`table-responsive ${ques.question_id === 17 && 'col-12'}`}>
                      <ESTableInput
                        data={ques}
                        placeHolder={
                          ques.question_id === 17
                            ? "" //"Please list any policies or guidelines" -old code
                            : ""
                        }
                        AnswerData={AnswerData}
                        _handleInputChange={_handleInputChange}
                        quesId={questionId}
                        rowCount={rowCount}
                        tableRow={tableRow}
                        subQuesId={ques.sub_questions}
                        quesName={ques.question_name}
                        inputTypeId={ques.input_type_id}
                        keyValue={ques.question_id}
                      />
                    </div>
                    <div className="d-flex justify-content-end">
                    <ESButton
                      customColor="white"
                      textColor={"text-primary"}
                      outline={"btn btn-outline-primary"}
                      id={questionId}
                      text={"Add Rows"}
                      onClick={_handleAddRow}
                      noShadow
                      style={{ width: 150}}
                      leftIcon={<i className="fa fa-plus-circle pr-1" />}
                    />
                    </div>
                  </React.Fragment>
                ) : ques.input_type_id === 7 ? (
                  <div className="w-50">
                    <ESInput
                      type={"number"}
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      max={100}
                      placeHolder={"Please specify"}
                      unit={"%"}
                      id={questionId}
                      value={AnswerData.filter(
                        (d) => d.questionId === questionId
                      ).map((v, k) => v.other)}
                      onChange={(e) => {
                        _handleInputChange(e, questionId, ques.question_id);
                      }}
                    />
                  </div>
                ) : ques.input_type_id === 24 ? (
                  <div>
                    <ESRadio
                      value={ques.option_choices}
                      _handleRadioChange={_handleRadioChange}
                      quesId={questionId}
                      isAnswer={AnswerData}
                      keys={ques.question_id}
                      subQuesId={null}
                    />

                    {/* {AnswerData.filter(
                      (v) =>
                        v.questionId === questionId &&
                        v.optionChoiceId === getOption(v.questionId)
                    ).length > 0 ? (
                      <ESTextArea
                        placeHolder={"Fill Your Answer"}
                        id={questionId}
                        value={AnswerData.filter(
                          (d) =>
                            d.questionId === questionId &&
                            d.subQuestionId === null
                        ).map((v, k) => v.other)}
                        onChange={(e) => {
                          _handleInputChange(
                            e,
                            questionId,
                            null,
                            ques.question_id,
                            ques.option_choices.filter(
                              (v) => v.option_choice_name === "Yes"
                            )[0].option_choice_id
                          );
                        }}
                      />
                    ) : null} */}
                    {ques.sub_questions && (
                      <SubQuestionInput
                        {...props}
                        ques={ques}
                        questionId={questionId}
                      />
                    )}
                  </div>
                ) : ques.input_type_id === 1 ? (
                  <ESCheckBox
                    quesId={ques.question_id}
                    value={ques.option_choices}
                    _handleChange={_handleCheckChange}
                    isAnswer={AnswerData}
                    keys={ques.question_id}
                    className={
                      ques.option_group_id === 10
                        ? `text-center  font-weight-bold`
                        : null
                    }
                    vertical={ques.option_group_id === 10 ? true : false}
                  />
                ) : ques.input_type_id === 4 ? (
                  <div>
                    <ESTextArea
                      placeHolder={"Fill Your Answer"}
                      id={questionId}
                      value={AnswerData.filter(
                        (d) =>
                          d.questionId === questionId &&
                          d.subQuestionId === null
                      ).map((v, k) => v.other)}
                      onChange={(e) => {
                        _handleInputChange(
                          e,
                          questionId,
                          null,
                          ques.question_id
                        );
                      }}
                    />
                    {ques.sub_questions && (
                      <SubQuestionInput
                        {...props}
                        ques={ques}
                        questionId={questionId}
                      />
                    )}
                  </div>
                ) : ques.input_type_id === 2 ? (
                  <div className="w-100">
                    <ESRadio
                      value={ques.option_choices || []}
                      _handleRadioChange={_handleRadioChange}
                      quesId={questionId}
                      isAnswer={AnswerData}
                      keys={ques.question_id}
                      subQuesId={null}
                    />
                    {ques.sub_questions &&
                      otherAns(questionId, ques.question_id, otherOfQuestion(k2, ques.is_other))
                        .length > 0 ? (
                      <SubQuestionInput
                        {...props}
                        ques={ques}
                        questionId={questionId}
                      />
                    ) : null}
                  </div>
                ) : ques.input_type_id === 27 ? (
                  <div className="col-11 ">
                    <ESLevelIndicator
                      quesId={questionId}
                      keys={ques.question_id}
                      levels={ques.option_choices}
                      selectedLevel={AnswerData.filter(
                        (d) => d.questionId === questionId
                      )}
                      _handleSelectLevel={_handleSelectLevel}
                    />
                  </div>
                ) : ques.input_type_id === 28 ? (
                  <div className="col-11 px-0">
                    <ESDropDown
                      surveySelect
                      name={'ques_selector'}
                      placeholder={'Please Select'}
                      quesId={questionId}
                      options={selectorOptions}
                      selectedOption={AnswerData.filter(
                        (d) => d.questionId === questionId
                      )}
                      _handleSelect={_handleSelect}
                    />
                  </div>
                ) : ques.sub_questions ? (
                  <SubQuestionInput
                    {...props}
                    ques={ques}
                    questionId={questionId}
                  />
                ) : null}
              </div>
            </div>
          );
        })}
      {/* <div
        className=' d-flex justify-content-between align-items-center m-auto text-white text-center py-1 px-2'
        style={{
          position: 'sticky',
          bottom: 10,
          width: 90,
          borderRadius: 20,
          backgroundColor: 'rgba(0,0,0,0.8)'
        }}
      >
        <i 
          className="fa fa-angle-left" 
          aria-hidden="true"
          style={{ cursor: 'pointer' }}
          onClick={()=>currentQues !== 1 && _handleSkipPrevQues()}
        />
        <span className=''>{currentQues} / {totalQusCnt}</span>
        <i 
          className="fa fa-angle-right"
          aria-hidden="true"
          style={{ cursor: 'pointer' }}
          onClick={()=>currentQues !== totalQusCnt && _handleSkipNextQues()}
        />
      </div> */}
    </div>
  );
};

export default ESGroupQuestionCard;

const QuestionCardInfo = (props) => {
  const { info } = props;
  return (
    <div>
      <i
        className="far fa-check-circle mr-2"
        style={{ color: info === "Answered" ? color.green : color.lightGrey, fontSize: 25 }}
        title={info}
      />
    </div>
  );
};

const SubQuestionInput = (props) => {
  const {
    ques,
    _handleCheckChange,
    _handleRadioChange,
    questionId,
    AnswerData,
    _handleInputChange,
  } = props;
  return ques.sub_questions.map(
    (subQues, k3) => (
      // console.log("sub-qname", subQues.sub_question_name),
      (
        <div
          className="d-flex flex-row flex-fill flex-wrap w-100 mb-3 "
          key={k3}
        >
          <div className="w-100" style={{ fontSize: 16 }}>
            {subQues.sub_question_name}
          </div>

          <div className="w-100">
            {subQues.input_type_id === 2 || subQues.input_type_id === 15 ? (
              <div>
                <ESRadio
                  value={subQues.option_choices}
                  _handleRadioChange={_handleRadioChange}
                  quesId={questionId}
                  id={subQues.sub_question_id}
                  subQuesId={subQues.sub_question_id}
                  isAnswer={AnswerData}
                  keys={ques.question_id}
                />
                {subQues.input_type_id === 15 &&
                  AnswerData.filter(
                    (v) =>
                      (v.other === undefined ||
                        (v.other !== null ? v.other.length > 0 : "")) &&
                      v.subQuestionId === subQues.sub_question_id
                  ).length > 0 ? (
                  <ESTextArea
                    placeHolder={"Fill Your Answer"}
                    id={subQues.sub_question_id}
                    value={AnswerData.filter(
                      (d) => d.subQuestionId === subQues.sub_question_id
                    ).map((v, k) => v.other)}
                    onChange={(e) => {
                      _handleInputChange(
                        e,
                        questionId,
                        subQues.sub_question_id,
                        ques.question_id,
                        subQues.option_choices.filter(
                          (v) => v.option_choice_name === "Yes"
                        )[0].option_choice_id
                      );
                    }}
                  />
                ) : null}
              </div>
            ) : subQues.input_type_id === 1 ? (
              <ESCheckBox
                quesId={questionId}
                value={subQues.option_choices}
                _handleChange={_handleCheckChange}
                isAnswer={AnswerData}
                keys={ques.question_id}
                className={
                  ques.option_group_id === 10
                    ? `text-center  font-weight-bold`
                    : null
                }
                vertical={ques.option_group_id === 10 ? true : false}
              />
            ) : subQues.input_type_id === 4 ? (
              <ESTextArea
                placeHolder={""}
                id={subQues.sub_question_id}
                value={AnswerData.filter(
                  (d) => d.subQuestionId === subQues.sub_question_id
                ).map((v, k) => v.other)}
                onChange={(e) => {
                  _handleInputChange(
                    e,
                    questionId,
                    subQues.sub_question_id,
                    ques.question_id
                  );
                }}
              />
            ) : null}
          </div>
        </div>
      )
    )
  );
};
