const AnswerCount = (AnswerData) => [
  ...AnswerData.reduce((mp, o) => {
    if (!mp.has(o.survey_headers_id === 1 ? o.questionId : o.keyValue))
      mp.set(o.survey_headers_id === 1 ? o.questionId : o.keyValue, {
        ...o,
        count: 0,
      });
    mp.get(o.survey_headers_id === 1 ? o.questionId : o.keyValue).count++;
    return mp;
  }, new Map()).values(),
];

const windowScrollTop = () =>
  // (document.getElementById("style-1").scrollTop = 0);
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

const otherOfQuestion = async (index, QuestionData) => {
  const isOther = QuestionData
    ? QuestionData.map((v, k) =>
        v.option_choices === undefined ? [] : v.option_choices
      )[index].filter((d) => d.option_choice_name === "Other")
    : [];
  return isOther.length > 0 ? isOther[0].option_choice_id : [];
};

const OtherAns = (remakeQuesId, QuesId, OptionId, AnswerData) => {
  return (
    AnswerData &&
    AnswerData.filter(
      (a) =>
        a.keyValue === QuesId &&
        a.optionChoiceId === OptionId &&
        a.questionId === remakeQuesId
    )
  );
};


export { AnswerCount, windowScrollTop, otherOfQuestion, OtherAns };
