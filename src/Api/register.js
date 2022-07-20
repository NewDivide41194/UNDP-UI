import * as API from "./url";

export const GetRegisterOptions = (callback) => {
  //console.log("data",data)
  fetch(API.RegisterOptionsAPI,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer`
      },
      // signal:SurveyData.signal
    }, { mode: 'no-cors' })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        callback(null, data)
      } else callback(data.error, null)
    })
    .catch((error) => {
      callback(error, null);
      throw error;
    });
};

export const RegisterFetch = (data, callback) => {
  //console.log("data",data)
  fetch(API.RegisterAPI,
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