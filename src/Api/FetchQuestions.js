import queryString from "querystring";
import * as API from "./url";

export const QuestionFetch = (
  queryParams,
  callback,
  { token } = {}
) => {
  const queryParamString = queryString.stringify(queryParams);
  fetch(API.QuestionAPI + "/?" + queryParamString, {
    method: `GET`,
    headers: {
      "Content-Type": "application/json",
      Accept: "/",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data, 'in ques fetch')
      if(!data.success){
        if (data.message === 'Token error!') callback(data.error, null)
        else callback(data.message, null)
      }else callback(null, data)
    })
    .catch((error) => {
      callback(error, null);
      throw error;
    });
};

export const ResultOfEvaluationFetch = (
  queryParams,
  callback,
  { token } = {}
) => {
  const queryParamString = queryString.stringify(queryParams);
  fetch(API.ResultOfEvaluation + "/?" + queryParamString, {
    method: `GET`,
    headers: {
      "Content-Type": "application/json",
      Accept: "/",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if(!data.success){
        if (data.message === 'Token error!') callback(data.error, null)
        else callback(data.message, null)
      }else callback(null, data)
    })
    .catch((error) => {
      callback(error, null);
      throw error;
    });
};

export const SurveyReportFetch = (
  queryParams,
  callback,
  { token } = {}
) => {
  const queryParamString = queryString.stringify(queryParams);
  fetch(API.SurveyReportAPI + "/?" + queryParamString, {
    method: `GET`,
    headers: {
      "Content-Type": "application/json",
      Accept: "/",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data, 'in ques fetch')
      if(!data.success){
        if (data.message === 'Token error!') callback(data.error, null)
        else callback(data.message, null)
      }else callback(null, data)
    })
    .catch((error) => {
      callback(error, null);
      throw error;
    });
};
// import * as API from "./url";

// export const QuestionFetch = (
//   {
//     userId,
//     surveyHeaderId,
//     typeId,
//     bTypeId,
//     surveySectionId,
//     countryId,
//     token,
//   },
//   callback
// ) => {
//   fetch(API.QuestionAPI, {
//     method: `POST`,
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "/",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({
//       admin_id: userId,
//       survey_header_id: surveyHeaderId,
//       buildingId: typeId,
//       buildingTypeId: bTypeId,
//       surveySectionId: surveySectionId,
//       countryId: countryId,
//     }),
//   })
//     .then((res) => res.json())
//     .then((data) => callback(null, data))
//     .catch((err) => console.log(err));
// };


