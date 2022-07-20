import React, { useState } from "react";
import color from "../../../Feature/Config/color";
import font from "../../../Feature/Config/font";
import { ESButton } from "../../Questionnaire/components/tools/ES_Button";
import TextEditor from "./textEditor";
// import upload from '../../../../src/Feature/Images/upload.png'

export const AddNewRow = (props) => {
  const { data, _handleCreateRow, setNewRecord, _handleDiscardNewRow } = props;

  const handleTextChange = ({ text }) => {
    const keyVal = [{ key: "nationalStrategicPlan", value: text }];
    setNewRecord({ keyVal });
  };

  return (
    <div
      className="modal fade"
      id="add_row_modal_1"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        style={{ maxWidth: 950 }}
      >
        <div
          className="modal-content"
          style={{ border: "none", boxShadow: "2px 3px 8px #343434" }}
        >
          <div
            className="modal-header text-white py-2 px-3"
            style={{
              backgroundImage: "linear-gradient(to right, #1A66B9 , #257EDF)",
            }}
          >
            <div className="my-2 font-weight-bold" style={{ fontSize: 16 }}>
              Add New Row
            </div>
            <i
              className="fa fa-times bg-white text-primary my-2"
              data-dismiss="modal"
              aria-hidden="true"
              style={{
                fontSize: 11,
                padding: "4px 5.3px 4px 5.3px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            ></i>
          </div>
          <div className="modal-body text-left p-4">
            <span
              style={{ color: color.primaryColor, fontSize: font.heading3 }}
            >
              <strong>SDG Target :</strong>
              {data.id}
            </span>
            <br />
            <div
              className="mt-3 font-weight-bold"
              style={{ color: color.greyColor }}
            >
              National/Strategic Plan :
            </div>
            <TextEditor
              _handleModalText={handleTextChange}
              header={"Add new Row"}
              id={data.id}
            />
          </div>
          <div className="d-flex flex-row my-2 p-2">
            <div className="d-flex flex-column col-6">
              <ESButton
                text={"Cancel"}
                customColor={color.greyColor}
                onClick={_handleDiscardNewRow}
                dataDismiss={"modal"}
              />
            </div>
            <div className="d-flex flex-column col-6">
              <ESButton
                text={"Create"}
                onClick={_handleCreateRow}
                dataDismiss={"modal"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
