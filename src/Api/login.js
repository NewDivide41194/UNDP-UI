import * as API from "./url";

export const LoginFetch = (data, callback) => {
  //console.log("data",data)
  fetch(API.LoginAPI,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer`
      },
      body: JSON.stringify(data),
      // signal:SurveyData.signal
    }, { mode: 'no-cors' })
    .then(res => res.json())
    .then(data => {
      if (!data.success) {
        if (data.message === 'Token error!') callback(data.error, null)
        else callback(data.message, null)
      } else callback(null, data)
    })
    .catch((error) => {
      callback(error, null);
      throw error;
    });
};


