import React, { useState } from 'react'
import color from '../../../Feature/Config/color'
import font from '../../../Feature/Config/font';
import { ESButton } from '../../Questionnaire/components/tools/ES_Button';

export const UploadButton = (props) => {
    const { id, _UploadFile, isFile, ministryIndex,_CancelFile} = props;
 
    return (
      <div className="d-flex flex-row">
        <div
        className="p-1 col-6 my-1 text-center picContainer text-light border"
        style={{
          minWidth: 200,
          width: 200,
          height: 50,
          backgroundColor: isFile() ? color.greyColor : color.primaryColor,
          borderRadius: 5,
        }}
        >
          <label
            className="row justify-content-center pt-1"
            htmlFor={id}
            style={{ cursor: "pointer" }}
          >
            <input
              style={{
                position: "absolute",
                opacity: 0,
                top: 0,
              }}
              type="file"
              id={id}
              onClick={(event) => (event.target.value = null)}
              onChange={(e) => _UploadFile(e, ministryIndex)}
              accept=".docx,.xlsx,.pdf"
            />
            {isFile() ? (
              <i className="fa fa-sync-alt fa-2x pr-2 pl-1 pt-1" style={{ fontSize: 28 }} />
            ) : (
              <i className="fa fa-file-upload fa-2x pr-3"  />
            )}
            <span style={{ marginTop: 6 }}>
              {isFile() ? "Change Document(s)" : " Upload Document(s)"}
            </span>
          </label>
        </div>
        <div className="ml-1 px-0 d-flex col-6 my-1 text-center text-light" style={{ height: 50}} >
          <ESButton text={"Cancel"} style={{ height: '100%'}} fontSize={font.graphLabels} onClick={()=>_CancelFile(ministryIndex)} customColor={color.greyColor}/>
        </div>
      </div>
     
    );
  };
  