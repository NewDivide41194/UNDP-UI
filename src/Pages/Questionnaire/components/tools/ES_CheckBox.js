import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Color from "../../../../Feature/Config/color";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const ESCheckbox = (props) => {
  const {
    noLabel,
    value,
    _handleChange,
    quesId,
    media,
    isAnswer,
    keys,
    className,
    vertical,
    checked,
    fontSize,
    disabled,
    subQuesId
  } = props;

  const customTheme = createMuiTheme({
    palette: {
      secondary: {
        main: Color.primaryColor,
      },
    },
  });
  return (
    <div
      // style={{ minHeight: 200 }}
      className="d-flex flex-row justify-content-center align-content-between flex-wrap"
    >
      {noLabel||<div className="w-100">{value.option_choice_name}</div>  } 
      <ThemeProvider theme={customTheme}>
        <Checkbox
          disabled={disabled}
          value={value.option_choice_name}
          checked={
            isAnswer
              ? isAnswer.filter(
                  (d) =>
                    d.optionChoiceId === value.option_choice_id &&
                    d.questionId === quesId&&
                    d.subQuestionId===subQuesId
                ).length > 0
              : checked
          }
          id={`${value.option_choice_id }`+subQuesId}
          onChange={() => _handleChange(quesId,subQuesId, value.option_choice_id, keys)}
          name={`${quesId}`}
        />
      </ThemeProvider>
    </div>
  );
};

export default ESCheckbox;
