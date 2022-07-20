import queryString from "querystring";
import * as API from "./url";

export const FetchUser = (queryParams, callback, { token } = {}) => {
  const queryParamString = queryString.stringify(queryParams);
  // const queryParamString = 'sdg/'+queryParams.sdg+'/target/'+queryParams.target+'/sector/'+queryParams.sector+'/country/'+queryParams.country
  fetch(API.UserList + "/?" + queryParamString, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) {
        if (data.message === "Token error!") callback(data.error, null);
        else callback(data.message, null);
      } else callback(null, data);
    })
    .catch((error) => {
      callback(error, null);
      throw error;
    });
};

export const UpdateUser = (
  queryParams,
  updateData,
  callback,
  { token } = {}
) => {
  const queryParamString = queryString.stringify(queryParams);
  //console.log(updateData);
  fetch(
    API.UpdateUser + "/?" + queryParamString,
    {
      method: `PUT`,
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    } /*{ mode: 'no-cors' }*/
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.error) callback(data.error, null);
      else if (!data.success) callback(data.message, null);
      else callback(null, data);
    })
    .catch((error) => {
      callback(error, null);
      throw error;
    });
};
