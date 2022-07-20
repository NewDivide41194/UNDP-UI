import queryString from "querystring";
import * as API from "./url";

export const RecordFetch = (queryParams, callback, { token } = {}) => {
  const queryParamString = queryString.stringify(queryParams);
  //console.log("query param->", queryParamString)
  fetch(API.RecordAPI + "/?" + queryParamString, {
    method: `GET`,
    headers: {
      "Content-Type": "application/json",
      Accept: "/",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) callback(data.error, null) 
        else if (!data.success) callback(data.message, null)
        else callback(null, data)
    })
    .catch((error) => {
      callback(error, null);
      throw error;
    });
};

export const UpdateRecordFetch = (
  queryParams,
  updateData,
  fileList,
  callback,
  { token } = {}
) => {
  const queryParamString = queryString.stringify(queryParams);
  console.log('update data ', updateData)
  const data = new FormData();
  data.append("data", JSON.stringify(updateData));

  fileList.map((v, k) => {
    data.append("file", v);
  });

  // fetch(API.UpdateRecord + "/?" + queryParamString, {
  //   method: `POST`,
  //   headers: {
  //     Accept: "*/*",
  //     Authorization: `Bearer ${token}`,
  //   },
  //   body: data,
  // },)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     if (data.error) callback(data.error, null) 
  //       else if (!data.success) callback(data.message, null)
  //       else callback(null, data)
  //   })
  //   .catch((error) => {
  //     callback(error, null);
  //     throw error;
  //   });
};

export const AddNewData = ( queryParams,data, callback,{ token } = {}) => {
  
  const queryParamString = queryString.stringify(queryParams);
  fetch(API.AddNewRow + "/?" + queryParamString,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    },)
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

export const updatePandPTitle = (
  queryParams,
  callback,
  { token } = {}
) => {
  const queryParamString = queryString.stringify(queryParams);
  
  fetch(API.UpdatePandP + "/?" + queryParamString, {
    method: `PUT`,
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    }
  },/*{ mode: 'no-cors' }*/)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) callback(data.error, null) 
        else if (!data.success) callback(data.message, null)
        else callback(null, data)
    })
    .catch((error) => {
      callback(error, null);
      throw error;
    });
};

export const RelatedTargetFetch = (queryParams, callback, { token } = {}) => {
  const queryParamString = queryString.stringify(queryParams);
  //console.log("query param->", queryParamString)
  fetch(API.RelatedTargetAPI + "/?" + queryParamString, {
    method: `GET`,
    headers: {
      "Content-Type": "application/json",
      Accept: "/",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) callback(data.error, null) 
        else if (!data.success) callback(data.message, null)
        else callback(null, data)
    })
    .catch((error) => {
      callback(error, null);
      throw error;
    });
};

export const TargetFetch = (queryParams, callback, { token } = {}) => {
  const queryParamString = queryString.stringify(queryParams);
  //console.log("query param->", queryParamString)
  fetch(API.TargetAPI + "/?" + queryParamString, {
    method: `GET`,
    headers: {
      "Content-Type": "application/json",
      Accept: "/",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) callback(data.error, null) 
        else if (!data.success) callback(data.message, null)
        else callback(null, data)
    })
    .catch((error) => {
      callback(error, null);
      throw error;
    });
};

export const TargetDataFetch = (queryParams, callback, { token } = {}) => {
  const queryParamString = queryString.stringify(queryParams);
  //console.log("query param->", queryParamString)
  fetch(API.TargetDataAPI + "/?" + queryParamString, {
    method: `GET`,
    headers: {
      "Content-Type": "application/json",
      Accept: "/",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) callback(data.error, null) 
        else if (!data.success) callback(data.message, null)
        else callback(null, data)
    })
    .catch((error) => {
      callback(error, null);
      throw error;
    });
};

export const UpdateTargetFetch = (
  queryParams,
  updateData,
  fileList,
  callback,
  { token } = {}
) => {
  const queryParamString = queryString.stringify(queryParams);

  const data = new FormData();
  data.append("data", JSON.stringify(updateData));

  fileList.map((v, k) => {
    data.append("file", v);
  });

  fetch(API.UpdateTargetAPI + "/?" + queryParamString, {
    method: `POST`,
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
    body: data,
  },/*{ mode: 'no-cors' }*/)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) callback(data.error, null) 
        else if (!data.success) callback(data.message, null)
        else callback(null, data)
    })
    .catch((error) => {
      callback(error, null);
      throw error;
    });
};

export const InsertSuggestionFetch = async(
  newData,
  callback,
  { token } = {}
) => {
 return await fetch(API.InsertSuggestionAPI, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newData),
  },/*{ mode: 'no-cors' }*/)
    .then((res) => res.json())
    .then((data) => {
      return data.payload
    })
    .catch((error) => {
      throw error;
    });
};

// export const UpdatePriority= (queryParams,data, callback, { token } = {}) => {
  
//   const queryParamString = queryString.stringify(queryParams);

//   fetch(API.UpdatePriorityAPI + "/?" + queryParamString,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "*/*",
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify(data),
//       // signal:SurveyData.signal
//     })
//       .then(res => res.json())
//       .then(data => { 
//         if(!data.success){
//           if (data.message === 'Token error!') callback(data.error, null)
//           else callback(data.message, null)
//         }else callback(null, data)
//       })
//       .catch((error) => {
//         callback(error, null);
//         throw error;
//       });
// };
