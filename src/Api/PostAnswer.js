import * as API from "./url";

export const PostAnswer = (data, callback, {token ={}}) => {
  fetch(API.User_AnswerApi,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data),
      // signal:SurveyData.signal
    })
      .then(res => res.json())
      .then(data => { 
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
