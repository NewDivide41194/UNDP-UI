import React from "react";
import ESCheckBox from "./ES_CheckBox";
import withMedia from "react-media-query-hoc/dist/with-media";

const InputTypes = (props) => {
  const {
    AnswerData,
    isQuestion,
    _handleCheckChange,
    QuestionData,
    media,
  } = props;

  return (
    QuestionData &&
    QuestionData.map((ques, k2) =>
      ques.input_type_id === 2 ? (
        <div>
          <ESCheckBox
            quesId={ques.question_id}
            value={ques.option_choices}
            _handleChange={_handleCheckChange}
            isAnswer={AnswerData}
            isQuestion={isQuestion}
            keys={ques.question_id}
            className={
              ques.option_group_id === 10
                ? `${
                    media.mobile ? null : "mr-4"
                  } text-center  font-weight-bold`
                : null
            }
            vertical={ques.option_group_id === 10 ? true : false}
          />
        </div>
      ) : null
    )
  );
};

export default withMedia(InputTypes);