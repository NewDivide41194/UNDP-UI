import queryString from "querystring";
import * as API from './url'

////////////// ReportData ///////////////////

export const FetchReport= (  queryParams, callback ,{ token } = {}) => {
  const queryParamString = queryString.stringify(queryParams);
    fetch(
      API.ReportAPI + "/?" + queryParamString,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
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

  export const FetchHeatmapData= (queryParams,callback , { token } = {}) => {
    const queryParamString = queryString.stringify(queryParams);
    fetch(
      API.HeatmapAPI+ "/?" + queryParamString,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
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

  export const FetchTargetDetailData= (callback, queryParams, { token } = {}) => {
    const queryParamString = queryString.stringify(queryParams);
   // console.log(queryParamString)
    // const queryParamString = 'sdg/'+queryParams.sdg+'/target/'+queryParams.target+'/sector/'+queryParams.sector+'/country/'+queryParams.country
    fetch(
      API.TargetDetailAPI+ "/?" + queryParamString,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
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
  
  export const SurveyListData= (callback, { token } = {}) => {
    fetch(
      API.Survey_ListApi,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
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
  }

  export const DownloadFile= (  queryParams, callback ,{ token } = {}) => {
    const queryParamString = queryString.stringify(queryParams);
      fetch(
        API.DownloadFile + "/?" + queryParamString,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
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