import React, { useEffect, useState } from "react";
import Question from "../components/Question";
import { QuestionFetch } from "../../../Api/FetchQuestions";
import { PostAnswer } from "../../../Api/PostAnswer";
import { windowScrollTop } from "../../../helper/questionHelper";
import Spinner from "../../../Feature/Images/Spinner.gif";
import info from "../../../Feature/Images/Questionnaire/info.jpg";
import "react-confirm-alert/src/react-confirm-alert.css";
import SectionList from "../components/SectionList";
import font from "../../../Feature/Config/font";
import "../../../App.css";
import Colors from "../../../Feature/Config/color";
import { toast } from "react-toastify";
import { Link, withRouter } from "react-router-dom";
import { deleteCookie, readCookie } from "../../../helper/cookieUser";
import { withCookies } from "react-cookie";
import { checkTokenExist } from "../../../helper/checkAccess";
import { ESTooltip } from "../components/tools/ES_ToolTip";
import { useRouteMatch } from "react-router-dom";
import CountryData from "../../../Feature/Config/countries.json";
import color from "../../../Feature/Config/color";
import AlertDialog from "../../../Feature/Tools/alertDialog";
import UNDP from "../../../Feature/Images/UNDP.svg";

const QuestionContainer = (props) => {
  const user = readCookie(props.cookies);
  let { url } = useRouteMatch();
  const [surveyData, setSurveyData] = useState([]);
  const [pageno /* setPageno */] = useState(0);
  const [AnswerData, setAnswerData] = useState([]);
  const [value, setValue] = useState("");
  const [, /*isAnswer*/ setIsAnswer] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);
  const [total /*setTotal*/] = useState(null);
  const [userId, setUserId] = useState(null);
  const [surveySectionId, setSurveySectionId] = useState(1);
  const [expected_SS_id, setExpected_SS_id] = useState(1);
  const [surveyHeaderId /* setSurveyHeaderId*/] = useState(1);
  const [countryId, setCountryId] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [tableRow, setTableRow] = useState([]);
  const [Ans, setAns] = useState(null);
  const [isSkippable, setIsSkippable] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [totalQAcount, setTotalQAcount] = useState([])
  const [currentSection, setCurrentSection] = useState([])
  const [currentQues, setCurrentQues] = useState(1)
  const windowWidth = window.innerWidth;

  const countryName = (code) => {
    // console.log(code);
    return CountryData.filter((v) => v.code === code)[0].name;
  };
  ///// surveyList ///////////////
  const [sectionName, setSectionName] = useState(null);

  const [autoSave /* setAutoSave*/] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (checkTokenExist(user, props.history, props.cookies)) {
      const userId = user.user_id;
      const countryId = user.country_id;
      setUserId(userId);
      setCountryId(countryId);
      const Ans_ = {
        other: null,
        optionChoiceId: null,
        userId: parseInt(user.user_id),
        questionId: null,
        survey_header_id: parseInt(surveyHeaderId),
        keyValue: null,
        subQuestionId: null,
        surveySectionId: parseInt(surveySectionId),
        countryId: user.country_id,
      };
      setAns(Ans_);
      QuestionFetch(
        {
          userId,
          surveyHeaderId,
          surveySectionId,
          countryId,
        },
        (error, data) => {
          if (error) {
            if (error.toString().includes("expired")) {
              toast("Login Expired!", { type: "error" });
              deleteCookie(props.cookies);
              props.history.push("/login");
            } else toast(error.toString(), { type: "error" });
          } else {
            setSurveyData(data.payload);
            setAnswerData(data.payload[0].answers);
            setSectionName(data.payload[0].survey_sections[0].section_name);
            setTotalQAcount(data.payload[0].total_quesAns_count)
            setSelectedSection([
              {
                label: data.payload[0].survey_sections[0].section_name,
                value: surveySectionId,
              },
            ]);
            setCurrentSection([
              {
                userId: userId,
                survey_header_id: surveyHeaderId,
                surveySectionId: surveySectionId,
                countryId: countryId,
              }
            ])
            const tableRow_ = data.payload[0].survey_sections[
              pageno
            ].questions.reduce((r, c) => {
              // console.log(c.question_id)
              const R = [...r];
              // if (c.input_type_id === 13) {
              //   R.push({ question_id: c.question_id, rowCount: 3 })
              // }
              if (c.input_type_id === 13) {
                const tableData = data.payload[0].answers.map((v) =>
                  v.keyValue === c.question_id
                    ? { keyValue: v.keyValue, quesId: parseInt(v.questionId) }
                    : { keyValue: 0, quesId: 0 }
                );

                var key = Math.max.apply(
                  Math,
                  tableData.map(function (o) {
                    return o.keyValue;
                  })
                );
                var max = Math.max.apply(
                  Math,
                  tableData.map(function (o) {
                    // console.log("o is ===>", o)
                    return o.quesId;
                  })
                );
                // console.log("c is ===>", c.sub_questions)
                // console.log("max data is ===>", max)
                var lengthCondition =
                  max.toString().length >= 5
                    ? parseInt(max.toString().substr(c.sub_questions[0].sub_question_id.toString().length, 1)) + 1
                    : parseInt(max.toString().substr(-2)) + 1;
                R.push({
                  question_id: c.question_id,
                  rowCount:
                    c.question_id === key && max === 0
                      ? 3
                      : max < 3
                        ? 3
                        : lengthCondition,
                });
                // console.log("lengthCondition ===>", lengthCondition)
              }
              return R;
            }, []);
            setTableRow(tableRow_);
            setIsLoading(false);
          }
        },
        { token: user.token }
      );
    }
    // setTotal(totalQuesCount);
  }, [surveySectionId]);
  // console.log("totalQcount..",totalQAcount)
  useEffect(() => {
    if (totalQAcount.length > 0) {
      const newAns = [...new Set(AnswerData.map(item => parseInt(item.keyValue)))];

      const newArr = [...totalQAcount]

      const index = newArr.findIndex(v => parseInt(v.survey_sections_id) === parseInt(surveySectionId))
      // console.log('new ans is ', newAns)
      if (index >= 0) {
        newArr[index].ans = newAns
        newArr[index].keyValue = newAns
      }
      setTotalQAcount(newArr)
    }
  }, [AnswerData])

  const _handleSkip = () => {
    if (isSkippable) {
      setSurveySectionId(surveySectionId + 1);
      windowScrollTop();
    } else {
      setShowDialog(true)
      setExpected_SS_id(surveySectionId + 1)
    }
  };

  const _handleSectionClick = ({
    sectionId
  }) => {
    // setSectionName(sectionName);
    if (isSkippable) {
      setSurveySectionId(sectionId);
    } else {
      setShowDialog(true)
      setExpected_SS_id(sectionId)
    }
  };

  const _handleSubmit = () => {
    setIsLoading(true);
    const data = AnswerData.length < 1 ? currentSection : AnswerData
    // console.log("AnswerData",data);
    if (checkTokenExist(user, props.history, props.cookies)) {
      PostAnswer(
        { data: data /* total, buildingType, token*/ },
        (error, data) => {
          if (error) {
            if (error.toString().includes("expired")) {
              toast("Login Expired!", { type: "error" });
              deleteCookie(props.cookies);
              props.history.push("/login");
            } else toast(error.toString(), { type: "error" });
          } else {
            toast(data.message, { type: "success" });
            setIsLoading(false);
          }
        },
        { token: user.token }
      );
    }
    setIsSkippable(true);
  };

  const isQuesId = (quesId) => {
    return AnswerData.filter((e) => e.questionId === quesId);
  };
  const isQuesIdIndex = (quesId) => {
    const quesIdIndex = AnswerData.findIndex(
      (e) => e.questionId === quesId && e.subQuestionId === null
    );
    return quesIdIndex;
  };

  const isMatrixQuesId = (quesId, subQuesId, optionChoiceId) => {
    return AnswerData.filter(
      (e) =>
        e.questionId === quesId &&
        e.subQuestionId === subQuesId &&
        e.optionChoiceId === optionChoiceId
    );
  };
  const isMatrixQuesIdIndex = (quesId, subQuesId, optionChoiceId) => {
    return AnswerData.findIndex(
      (e) =>
        e.questionId === quesId &&
        e.subQuestionId === subQuesId &&
        e.optionChoiceId === optionChoiceId
    );
  };
  const subIsQuesId = (quesId, subQuesId) => {
    return AnswerData.filter(
      (e) => e.questionId === quesId && e.subQuestionId === subQuesId
    );
  };
  const subIsQuesIdIndex = (quesId, subQuesId) => {
    return AnswerData.findIndex(
      (e) => e.questionId === quesId && e.subQuestionId === subQuesId
    );
  };
  const handleRadioChange = (ansId, quesId, subQuesId, keys, other, e) => {
    setIsSkippable(false);
    // console.log("radio change >> ", ansId, quesId, subQuesId, keys, other);
    const RadioAns = {
      ...Ans,
      optionChoiceId: ansId,
      questionId: quesId.toString(),
      subQuestionId: subQuesId || null,
      keyValue: keys || quesId,
      other: other,
    };
    if (subQuesId !== undefined && subQuesId !== null) {
      // console.log('1....')
      if (subIsQuesId(quesId, subQuesId).length >= 1) {
        // console.log('2....')
        const ans = [...AnswerData]
        const i = subIsQuesIdIndex(quesId, subQuesId);
        const resetIndex = AnswerData.findIndex(
          (e) => e.questionId === quesId && e.subQuestionId === subQuesId && e.optionChoiceId === ansId
        );
        if (resetIndex > -1) {
          // console.log('3....')
          ans.splice(resetIndex, 1)
          setAnswerData(ans);
        } else {
          ans.splice(i, 1, RadioAns)
          setAnswerData(ans);
        }

      } else {
        setAnswerData(AnswerData.concat(RadioAns));
      }
    } else {
      // console.log('4....')
      if (isQuesId(quesId).length >= 1) {

        const ans = [...AnswerData]
        const i = isQuesIdIndex(quesId);
        const resetIndex = AnswerData.findIndex(
          (e) => e.questionId === quesId && e.subQuestionId === null && e.optionChoiceId === ansId
        );
        if (resetIndex > -1) {
          // console.log('5....', quesId)
          // ans.splice(resetIndex, 1)
          const filteredAns = ans.filter(v=> Number(v.questionId) !== Number(quesId) )
          // console.log('5....', filteredAns)
          setAnswerData(filteredAns);
        } else {
          // console.log('6....')
          ans.splice(i, 1, RadioAns)
          setAnswerData(ans)
        }
      } else {
        // console.log('7....')
        setAnswerData(AnswerData.concat(RadioAns));
      }
    }
    setIsAnswer(AnswerData.map((v, k) => v.optionChoiceId));
  };

  const handleInputChange = (e, quesId, subQuesId, keys, optionId, matrix) => {
    setIsSkippable(false);
    var regex = /^\d+(\.\d{0,1})?$/g;
    var numValue;
    if (e.target.type === "number") {
      if (regex.test(e.target.value)) {
        numValue = e.target.value;
      } else {
        numValue = e.target.value.substring(0, e.target.value.length - 1);
      }
    }
    const ImportText = numValue
      ? numValue
      : e.target.value.replace(/\s+/g, " ").trimStart();
    const TextAnswer = {
      ...Ans,
      other: ImportText,
      optionChoiceId: optionId || null,
      questionId: quesId.toString(),
      subQuestionId: subQuesId,
      keyValue: keys || parseInt(quesId),
    };

    if (matrix) {
      if (
        ImportText === "" &&
        isMatrixQuesId(quesId, subQuesId, optionId).length >= 1
      ) {
        setValue(e.target.value);
        const ans = [...AnswerData]
        const i = isMatrixQuesIdIndex(quesId, subQuesId, optionId);
        ans.splice(i, 1);
        setAnswerData(ans);
      } else if (isMatrixQuesId(quesId, subQuesId, optionId).length >= 1) {
        setValue(e.target.value);
        AnswerData.splice(
          isMatrixQuesIdIndex(quesId, subQuesId, optionId),
          1,
          TextAnswer
        );
      } else {
        setValue(e.target.value);
        setAnswerData(AnswerData.concat(TextAnswer));
      }
    } else if (subQuesId === null) {
      if (ImportText === "" && isQuesId(quesId).length >= 1) {
        setValue(e.target.value);
        const ans = [...AnswerData]
        const i = isQuesIdIndex(quesId);
        ans.splice(i, 1);
        setAnswerData(ans);
      } else if (isQuesId(quesId).length >= 1) {
        setValue(e.target.value);
        AnswerData.splice(isQuesIdIndex(quesId), 1, TextAnswer);
      } else {
        setValue(e.target.value);
        AnswerData.push(TextAnswer);
      }
    } else {
      if (ImportText === "" && subIsQuesId(quesId, subQuesId).length >= 1) {
        setValue(e.target.value);
        const ans = [...AnswerData];
        const i = subIsQuesIdIndex(quesId, subQuesId);
        ans.splice(i, 1);
        setAnswerData(ans);
      } else if (subIsQuesId(quesId, subQuesId).length >= 1) {
        setValue(e.target.value);
        AnswerData.splice(subIsQuesIdIndex(quesId, subQuesId), 1, TextAnswer);
        setAnswerData(AnswerData);
      } else {
        setValue(e.target.value);
        // AnswerData.push(TextAnswer);
        setAnswerData(AnswerData.concat(TextAnswer));
      }
    }
  };

  const handleCheckChange = (quesId, subQuesId, answerId, keys) => {
    console.log('click on checkbox.')
    setIsSkippable(false);
    const isQuesId = AnswerData.filter(
      (e) => e.questionId === quesId && e.optionChoiceId === answerId
    );
    const isQuesIdIndex = AnswerData.findIndex(
      (e) => e.optionChoiceId === answerId && e.questionId === quesId
    );

    const CheckAns = {
      ...Ans,
      optionChoiceId: answerId,
      questionId: quesId,
      keyValue: keys,
      subQuestionId: subQuesId,
    };
    console.log('check 1')
    if (isQuesId.length >= 1) {
      console.log('check 2')
      AnswerData.splice(isQuesIdIndex, 1);
    } else {
      console.log('check 3')
      setAnswerData(AnswerData.concat(CheckAns));
    }

    setIsAnswer(AnswerData.map((v, k) => v.optionChoiceId));
  };
  const handleSelectLevel = (quesId, keys, selectedlevel) => {
    setIsSkippable(false);
    const SelectAnswer = {
      ...Ans,
      optionChoiceId: selectedlevel.option_choice_id,
      questionId: quesId,
      keyValue: keys,
      subQuestionId: null,
    };
    if (isQuesId(quesId).length >= 1) {

      var ans = [...AnswerData]
      const i = isQuesIdIndex(quesId);
      const unSelect = ans[i].optionChoiceId

      if (unSelect === selectedlevel.option_choice_id) {
        ans.splice(i, 1)
      }
      else ans.splice(i, 1, SelectAnswer);

      setAnswerData(ans);
    } else {
      setAnswerData(AnswerData.concat(SelectAnswer));
    }
  }
  const handleSelect = ({ quesId, e, keys, subQuesId }) => {
    setIsSkippable(false);
    setSelectedOption(e);
    // console.log("Handle Select", quesId, e, keys, subQuesId);
    if (e !== null && typeof e.label == "string") {
      let ansId = e.value;
      const SelectAnswer = {
        ...Ans,
        optionChoiceId: ansId,
        questionId: quesId,
        keyValue: keys,
        subQuestionId: subQuesId || null,
      };
      // console.log("select answer >> ", SelectAnswer);
      if (subQuesId === null || subQuesId === undefined) {
        if (isQuesId(quesId).length >= 1) {
          const ans = [...AnswerData]
          const i = isQuesIdIndex(quesId);
          ans.splice(i, 1, SelectAnswer);
          setAnswerData(ans);
        } else {
          setAnswerData(AnswerData.concat(SelectAnswer));
        }
        setIsAnswer(AnswerData.map((v, k) => v.optionChoiceId));
      } else {
        if (subIsQuesId(quesId, subQuesId).length >= 1) {
          AnswerData.splice(subIsQuesId(quesId, subQuesId), 1, SelectAnswer);
        } else {
          AnswerData.push(SelectAnswer);
        }
        setIsAnswer(AnswerData.map((v, k) => v.optionChoiceId));
      }
    } else if (e !== null && e.label !== "string") {
      let ansId = e.value;
      const SelectAnswer = {
        ...Ans,
        other: ansId,
        questionId: quesId,
        keyValue: keys,
        subQuestionId: subQuesId || null,
      };

      if (subQuesId === null) {
        if (isQuesId(quesId).length >= 1) {
          AnswerData.splice(isQuesIdIndex(quesId), 1, SelectAnswer);
        } else {
          AnswerData.push(SelectAnswer);
        }
        setIsAnswer(AnswerData.map((v, k) => v.optionChoiceId));
      } else {
        if (subIsQuesId(quesId, subQuesId).length >= 1) {
          AnswerData.splice(
            subIsQuesIdIndex(quesId, subQuesId),
            1,
            SelectAnswer
          );
        } else {
          AnswerData.push(SelectAnswer);
        }
        setIsAnswer(AnswerData.map((v, k) => v.optionChoiceId));
      }
    } else if (e === null) {
      const ans = [...AnswerData]
      const i = isQuesIdIndex(quesId);
      ans.splice(i, 1);
      setAnswerData(ans);
    } else if (isQuesId(quesId).length >= 1) {
      AnswerData.splice(isQuesIdIndex(quesId), 1);
      setIsAnswer(AnswerData.map((v, k) => v.optionChoiceId));
    }
  };
  const Data1 =
    surveyData &&
    surveyData.length &&
    surveyData[0].survey_sections[pageno].questions;

  const QuestionData = Data1;
  const OtherAns = (remakeQuesId, QuesId, OptionId) => {
    return AnswerData.filter(
      (a) =>
        a.keyValue === QuesId &&
        // a.optionChoiceId === OptionId && //to check
        (OptionId === 'Yes No' ? a.optionChoiceId : a.optionChoiceId === OptionId) &&
        a.questionId === remakeQuesId
    );
  };

  const otherOfQuestion = (index, is_other) => {
    const keyword = is_other === 1 ? 'Yes' : is_other === 2 && 'No';

    const isOther =
      QuestionData &&
      QuestionData.map((v, k) =>
        v.option_choices === undefined ? [] : v.option_choices
      )[index].filter((d) =>
        is_other === 3
          ? (d.option_choice_name === "No" || d.option_choice_name === "Yes")
          : (d.option_choice_name === keyword)
      );
    return isOther.length > 0 ? (isOther.length === 2 ? 'Yes No' : isOther[0].option_choice_id) : [];
  };

  const handleAddRow = ({ id }) => {
    setIsSkippable(false);
    const newArr = [...tableRow];
    const index = newArr.findIndex((v) => v.question_id === parseInt(id));
    newArr[index].rowCount = newArr[index].rowCount + 1;
    setTableRow(newArr);
  };

  const save_and_MoveToNext = () => {
    _handleSubmit();
    setSurveySectionId(expected_SS_id);
    setIsSkippable(true);
    windowScrollTop();
    setShowDialog(false);
  }

  const discard_and_MoveToNext = () => {
    setSurveySectionId(expected_SS_id);
    setIsSkippable(true);
    windowScrollTop();
    setShowDialog(false);
  }

  const onDiscardClick = () => {
    setShowDialog(false);
  }
  const handleSkipNextQues = () => {
    const nextQues = currentQues + 1;
    setCurrentQues(nextQues)
    const currentSectionQuesCnt =
      totalQAcount
        .filter(v => v.survey_sections_id <= surveySectionId)
        .map(v1 => v1.ques.length)
        .reduce((r, c) => r + c);

    if (nextQues > currentSectionQuesCnt) {
      _handleSkip()
    } else {
      const prevSect = surveySectionId > 1 &&
        totalQAcount
          .filter(v => v.survey_sections_id <= surveySectionId - 1)
          .map(v1 => v1.ques.length)
          .reduce((r, c) => r + c);
      const questionId =
        totalQAcount
          .filter(v => v.survey_sections_id === surveySectionId)[0].ques[surveySectionId === 1 ? nextQues - 1 : nextQues - prevSect - 1]

      handleScrollAndFocus(questionId)

    }
  };
  const handleSkipPrevQues = () => {
    const prevQues = currentQues - 1;
    setCurrentQues(prevQues)
    const currentSectionQuesCnt =
      totalQAcount
        .filter(v => v.survey_sections_id <= (surveySectionId === 1 ? surveySectionId : surveySectionId - 1))
        .map(v1 => v1.ques.length)
        .reduce((r, c) => r + c);

    if (surveySectionId !== 1) {
      if (prevQues <= currentSectionQuesCnt) {
        if (isSkippable) {
          setSurveySectionId(surveySectionId - 1);
          windowScrollTop();
        } else {
          setShowDialog(true)
          setExpected_SS_id(surveySectionId - 1)
        }
      }
    }

    if (prevQues > currentSectionQuesCnt || surveySectionId === 1) {
      const prevSect = surveySectionId > 1 &&
        totalQAcount
          .filter(v => v.survey_sections_id <= surveySectionId - 1)
          .map(v1 => v1.ques.length)
          .reduce((r, c) => r + c);
      const questionId =
        totalQAcount
          .filter(v => v.survey_sections_id === surveySectionId)[0].ques[surveySectionId === 1 ? prevQues - 1 : prevQues - prevSect - 1]

      handleScrollAndFocus(questionId)
    }
  }
  const handleScrollAndFocus = (questionId) => {
    var scrollDiv = document.getElementById(`scroll_${questionId}`);
    scrollDiv.style.visibility = 'visible';
    scrollDiv.style.display = 'block';
    scrollDiv.style.scrollBehavior = 'smooth';
    scrollDiv.tabIndex = "-1";
    scrollDiv.focus();
  }
  // console.log('totalQAcount ', totalQAcount)
  return (
    <div className="text-left">
      <AlertDialog
        isOpen={showDialog}
        saveMoveToNext={save_and_MoveToNext}
        discardMoveToNext={discard_and_MoveToNext}
        onDiscardClick={onDiscardClick}
      />
      {/* <div
        className="d-flex flex-row flex-wrap justify-content-between py-2"
      >
        <div className='col-lg-5 col-md-5 col-sm-9 col-10 text-left p-0'>
          <div
            className={`${(windowWidth < 1135) ? 'my-0' : 'my-3'}`}
            style={{
              fontSize: windowWidth < 470 ? font.heading2 : font.heading12,
              color: Colors.primaryColor,
              color: "#2079DF",
            }}
          >
            DIGITAL MATURITY ASSESSMENT SURVEY
          </div>
        </div>

        {countryId ? (
          <div className={`col-lg-5 col-md-5 col-sm-9 ${windowWidth < 371 ? 'col-11 pt-3' : 'col-9'} p-0`}>
            <div className={`d-flex flex-nowrap ${windowWidth < 768 ? 'text-left' : 'text-left'} align-items-center h-100`}>
              <span
                className='mr-1'
                style={{
                  fontSize: font.graphLabels,
                  color: color.greyColor
                }}
              >
                you are doing Maturity Assessment for
              </span>
              :
              <div className='ml-2 d-flex flex-row'>
                <img
                  className="pr-2"
                  src={`/countryflags/${countryId.toLowerCase()}.svg`}
                  alt="country flag"
                  width={50}
                />
                <span
                  className="m-auto"
                  title={countryName(countryId)}
                  style={{
                    color: color.primaryColor,
                    fontSize: "24px",
                    maxWidth: 130,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    cursor: 'pointer'
                  }}
                >
                  {countryName(countryId)}
                </span>
              </div>
            </div>
          </div>
        )
          :
          <div> </div>
        }

        <div className='col-lg-2 col-md-2 col-sm-2 text-right p-0'>
          <img alt="" src={UNDP} style={{
            width: 60,
            position: 'relative',
            top: windowWidth < 304 ? -150 : windowWidth < 412 ? -120 : windowWidth < 576 ? -100 : windowWidth < 644 ? -66 : windowWidth < 768 ? -30 : 0
          }}
          />
        </div>
      </div> */}

      <div
        // className=" d-flex flex-row flex-wrap justify-content-between" 
        style={{ marginTop: windowWidth < 765 && -60 }}>
        {/* <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 p-0">
          <SectionList
            _handleSectionClick={_handleSectionClick}
            surveySectionId={surveySectionId}
            selectedSection={selectedSection}
            IsLoading={IsLoading}
            totalQAcount={totalQAcount}
            countryId={countryId}
            countryName={countryName}
          />
          <Link
            to={{ pathname: `${url}/surveySummary`, search: "?id=1" }}
            className="pl-2 pb-3"
          >
            Result of Evaluation
          </Link>
        </div> */}
        <div
          // className="col-xl-9 col-lg-9 col-md-9 col-sm-12 p-0"
          style={{
            position: "relative",
            // borderRadius: 9,
            backgroundImage: "linear-gradient(#FEFEFE, #E6E6E6)",
            // boxShadow: "1px 1px 3px 0px rgba(166,180,200,1.2)",
          }}
        >
          {IsLoading ? (
            <div className="d-flex justify-content-center">
              <img alt="loading..." src={Spinner} width={120} style={{ marginTop: "25%" }} />
            </div>
          ) : (
            <Question
              sectionName={sectionName}
              surveySectionId={surveySectionId}
              autoSave={autoSave}
              value={value}
              surveyData={surveyData}
              QuestionData={QuestionData}
              totalQAcount={totalQAcount}
              tableRow={tableRow}
              userId={userId}
              pageno={pageno}
              AnswerData={AnswerData}
              selectedOption={selectedOption}
              isSkippable={isSkippable}
              // obtained={obtained}
              total={total}
              // percent={percent}
              // amountOfDevice={amountOfDevice}
              otherAns={OtherAns}
              otherOfQuestion={otherOfQuestion}
              _handleSelect={handleSelect}
              _handleCheckChange={handleCheckChange}
              _handleRadioChange={handleRadioChange}
              _handleInputChange={handleInputChange}
              _handleAddRow={handleAddRow}
              _handleSkip={_handleSkip}
              _handleSubmit={_handleSubmit}
              _handleSelectLevel={handleSelectLevel}
              _handleSectionClick={_handleSectionClick}
              _handleSkipNextQues={handleSkipNextQues}
              _handleSkipPrevQues={handleSkipPrevQues}
              selectedSection={selectedSection}
              IsLoading={IsLoading}
              countryId={countryId}
              countryName={countryName}
              currentQues={currentQues}
            />
          )}
        </div>
      </div>
    </div>
  );
  // }
};

export default withRouter(withCookies(QuestionContainer));
