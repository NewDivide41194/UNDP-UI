import React from "react";
import Color from "../../../../Feature/Config/color";
import "./radio.css"

export const ESRadio = (props) => {
  const {
    value,
    quesId,
    _handleRadioChange,
    isAnswer,
    isDisable,
    checked,
    keys,
    subQuesId,
    other,
    isEvaluationTbl
  } = props;
  const ID = subQuesId !== null && subQuesId ? subQuesId : quesId;

  return value.length ? (
    <div className='d-flex justify-content-between'>
    {value.map((ans, k3) => (
      <label
        id={`${ans.option_choice_id} div ${ID}`}
        className="option flex-col p-2 rounded container1"
        key={k3}
        onMouseOver={() =>
        (document.getElementById(
          `${ans.option_choice_id} div ${ID}`
        ).style.background = isDisable ? "none" : "rgb(211, 226, 237)")
        }
        onMouseLeave={() =>
        (document.getElementById(
          `${ans.option_choice_id} div ${ID}`
        ).style.background = "none")
        }
        style={{ 
          width: '49%',
          cursor: "pointer",
          border:isAnswer.filter(
              (d) =>
                d.optionChoiceId === ans.option_choice_id &&
                (d.subQuestionId == null
                  ? d.questionId === quesId || d.subQuestionId === subQuesId
                  : d.subQuestionId === subQuesId)
            ).length > 0 ? `1px solid ${Color.secondaryColor}` : `1px solid ${Color.lightGrey}`,
          background: isAnswer.filter(
              (d) =>
                d.optionChoiceId === ans.option_choice_id &&
                (d.subQuestionId == null
                  ? d.questionId === quesId || d.subQuestionId === subQuesId
                  : d.subQuestionId === subQuesId)
            ).length > 0 && "rgb(234, 238, 243)"
        }}  
      >
        <input
          type="radio"
          className="p-0 pr-1"
          disabled={isDisable}
          name={`${subQuesId || quesId}`}
          checked={
            checked ||
            isAnswer.filter(
              (d) =>
                d.optionChoiceId === ans.option_choice_id &&
                (d.subQuestionId == null
                  ? d.questionId === quesId || d.subQuestionId === subQuesId
                  : d.subQuestionId === subQuesId)
            ).length > 0
          }
          onChange={e=> {}}
          onClick={() =>
            _handleRadioChange(
              ans.option_choice_id,
              quesId,
              subQuesId,
              keys,
              ans.option_choice_name === "Yes" ? undefined : ""
            )
          }
          id={`${ans.option_choice_id + ID}`}
          value={ans.option_choice_name}
        />
        <span style={{ marginLeft: 25 }}>
          {ans.option_choice_name}
        </span>
        <span class="checkmark"></span>

      </label>
    ))}
    </div>
  ) : (
    <label
      className={`container1 ${isEvaluationTbl ? 'removeHoverEff' : 'hoverEff'}`}
      style={{
        cursor:isEvaluationTbl ? 'revert' : 'pointer'
      }}
    >
      <input
        type="radio"
        className="p-0 pr-1"
        disabled={isDisable}
        value={value.option_choice_name}
        checked={
          checked === true
            ? true
            : checked === undefined
              ? isAnswer.filter(
                (d) =>
                  d.optionChoiceId === value.option_choice_id &&
                  d.subQuestionId === subQuesId
              ).length > 0
              : false
        }
        onChange={e=> {}}
        onClick={(e) =>
          _handleRadioChange(
            value.option_choice_id,
            quesId,
            subQuesId,
            keys,
            other,
            e
          )
        }
        id={`${value.option_choice_id + ID}`}
      />
      <span class="checkmark" style={{ marginLeft: "-16px", marginTop: "-2px" }}></span>

    </label>
  );
};

{
  /* <ThemeProvider theme={customTheme}>
          <Radio
            className="p-0 pr-1"
            disabled={isDisable}
            name={`${quesId}`}
            checked={
              checked ||
              isAnswer.filter(
                (d) =>
                  d.optionChoiceId === ans.option_choice_id &&
                  (d.subQuestionId == null
                    ? d.questionId === quesId || d.subQuestionId === subQuesId
                    : d.subQuestionId === subQuesId)
              ).length > 0
            }
            onChange={() =>
              _handleRadioChange(
                ans.option_choice_id,
                quesId,
                subQuesId,
                keys,
                ans.option_choice_name === "Yes" ? undefined : ""
              )
            }
            id={`${ans.option_choice_id + ID}`}
            value={ans.option_choice_name}
          />
        </ThemeProvider> */
}

{
  /* <ThemeProvider theme={customTheme}>
        <Radio
          disabled={isDisable}
          value={value.option_choice_name}
          checked={
            checked === true
              ? true
              : checked === undefined
              ? isAnswer.filter(
                  (d) =>
                    d.optionChoiceId === value.option_choice_id &&
                    d.subQuestionId === subQuesId
                ).length > 0
              : false
          }
          onChange={(e) =>
            _handleRadioChange(
              value.option_choice_id,
              quesId,
              subQuesId,
              keys,
              other,
              e
            )
          }
          id={`${value.option_choice_id + ID}`}
        ></Radio>
      </ThemeProvider> */
}
