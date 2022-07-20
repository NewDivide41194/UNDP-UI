import React, { useState, Fragment } from "react";
import TextEditor from "./textEditor";
import color from "../../../Feature/Config/color";
import font from "../../../Feature/Config/font";
import { ESButton } from "../../Questionnaire/components/tools/ES_Button";
import AlertDialog from "../../../Feature/Tools/alertDialog";
// import upload from '../../../../src/Feature/Images/upload.png'

const ViewEditModal = (props) => {
  const {
    sdgId,
    modalData,
    _handleModalText,
    _handleSheetClick,
    _UploadFile,
    recordData,
    suggestions,
    updateSuggestion,
    _handlecheckSuggestion,
    ministry,
    ministryIndex,
    _handleAddSheet,
    _handleSaveChanges,
    _handleDiscardP_and_P,
    _handleEditTitle,
    editTitle,
    _handleCancelEdit,
    _handleTitleChange,
    newTitle,
    _handleUpdateTitle,
    fetchEditRecordData,
    updateRecordData,
    isEnabled
  } = props;

  const [showDialog, setShowDialog] = useState(false)
  const isFile = (ID) => {
    return recordData.filter((v) => v.id === ID).length > 0
      ? recordData.filter((v) => v.id === ID)[0].digitalDevelopment
        .policyAndProgrammes.length > 0 &&
      recordData.filter((v) => v.id === ID)[0].digitalDevelopment
        .policyAndProgrammes[ministryIndex].fileName
      : null;
  };

  const fileName = (ID) => (isFile(ID) ? isFile(ID) : "No file chosen.");
  // const fileSize = (ID) =>
  //   isFile(ID) ? (isFile(ID).size / (1024 * 1024)).toFixed(2) + " MB" : "";

  const suggestionList = suggestions.filter(
    (v) => v.sector_id === modalData.sectorId
  );

  const _handleSave = () => {
    setShowDialog(false);
    _handleSaveChanges()
      .then(function () {
        fetchEditRecordData(sdgId);
      })
  }

  const _handleDiscardMove = () => {
    setShowDialog(false);
    _handleDiscardP_and_P({ id: modalData.id })
  }

  const _handleCancel = () => {
    if (updateRecordData.length > 0) {
      setShowDialog(true)
    }
  }
  //console.log("modalData",modalData)
  return ( 
    <Fragment>
      <AlertDialog
        isOpen={showDialog}
        dataDismiss={'modal'}
        dataToggle={'modal'}
        dataTarget={'#view_edit_modal'}
        saveMoveToNext={_handleSave}
        discardMoveToNext={_handleDiscardMove}
        onDiscardClick={() => setShowDialog(false)}
      />
      <div
        className={`modal fade `}
        id="view_edit_modal"
        //tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          style={{ maxWidth: 950, zIndex: 0 }}
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
                {modalData.header}
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
            <div className="modal-body text-left p-0">
              {modalData.data.editable && (
                <div className="p-2" style={{ backgroundColor: "#DEDEDE" }}>
                  <span
                    className="float-left bg-danger text-white m-2"
                    style={{ borderRadius: "50%", padding: "4px 5px 4px 5px" }}
                  >
                    {modalData.data.sdgId}.{modalData.data.sdgTargetNo}
                  </span>
                  <span className="" style={{ fontSize: 16 }}>
                    {modalData.data.relevantPoliciesAndDevelopmentPlan}
                  </span>
                </div>
              )}
              <div className="d-flex flex-row">
                <div
                  className="p-3"
                  style={{
                    width:
                      modalData.header === "Technology, Systems and Platforms"
                        ? "65%"
                        : "100%",
                  }}
                >
                  {modalData.header === "Policy and Programmes" && (
                    <React.Fragment>
                      <Sheets
                        id={modalData.id}
                        policyData={modalData.data.content}
                        _handleSheetClick={_handleSheetClick}
                        ministryIndex={ministryIndex}
                        _handleAddSheet={_handleAddSheet}
                        _handleEditTitle={_handleEditTitle}
                        editTitle={editTitle}
                      />
                      {editTitle && (
                        <div className="d-flex flex-row flex-wrap py-2">
                          <div
                            className="col-12 px-0 font-weight-bold"
                            style={{
                              fontSize: font.heading3,
                              color: color.greyColor,
                            }}
                          >
                            Edit Title
                            <i className="fa fa-edit pl-2" />
                          </div>
                          <input
                            id={editTitle.ppId}
                            className="form-control w-25"
                            value={newTitle}
                            onChange={(e) => _handleTitleChange({ e: e, id: modalData.id })}
                          />
                          {
                            editTitle.ppId &&
                            <Fragment>
                              <div className="pl-2">
                                <ESButton
                                  text={"Update"}
                                  small
                                  onClick={_handleUpdateTitle}
                                />
                              </div>
                              <div className="px-2">
                                <ESButton
                                  text={"Cancel"}
                                  small
                                  customColor={color.greyColor}
                                  onClick={_handleCancelEdit}
                                />
                              </div>
                            </Fragment>
                          }
                        </div>
                      )}
                    </React.Fragment>
                  )}
                  <TextEditor
                    header={modalData.header}
                    id={modalData.id}
                    readOnly={modalData.readOnly}
                    value={
                      modalData.header === "Policy and Programmes"
                        ? modalData.data.content.length > 0 &&
                        modalData.data.content[ministryIndex].text
                        : modalData.data.content
                    }
                    ministryIndex={ministryIndex}
                    _handleModalText={_handleModalText}
                  />
                </div>
                {modalData.header === "Technology, Systems and Platforms" ? (
                  <div
                    className="p-3"
                    style={{ width: "35%", background: color.lightGrey }}
                  >
                    <AiSuggestionPanel
                      recordId={modalData.id}
                      sectorId={modalData.sectorId}
                      suggestionList={suggestionList}
                      updateSuggestion={updateSuggestion}
                      _handlecheckSuggestion={_handlecheckSuggestion}
                    />
                  </div>
                ) : null}
              </div>

              {modalData.header === "Policy and Programmes" && (
                <Fragment>
                  <div className="d-flex flex-row p-3 border-bottom">
                    <div className="d-flex flex-column">
                      <UploadButton
                        id={modalData.id}
                        _UploadFile={_UploadFile}
                        ministryIndex={ministryIndex}
                        isFile={isFile}
                      />
                    </div>
                    <div className="d-flex flex-column col-4">
                      <div
                        className="font-weight-bold"
                        style={{ color: color.primaryColor }}
                      >
                        File :
                      </div>
                      <span
                        style={{
                          color: fileName(modalData.id) === 'No file chosen.'
                            && color.lightGrey
                        }}
                      >
                        {fileName(modalData.id)}
                      </span>
                    </div>
                    <div className="d-flex flex-column col-4">
                      <div
                        className="font-weight-bold"
                        style={{ color: color.primaryColor }}
                      >
                        Author :
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        value={
                          modalData.data.content.length > 0
                            ? modalData.data.content[ministryIndex].ministry
                              ? modalData.data.content[ministryIndex].ministry
                              : ""
                            : ""
                        }
                        onChange={(e) =>
                          _handleModalText({
                            id: modalData.id,
                            text: e.target.value,
                            header: "ministry",
                            ministryIndex: ministryIndex,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="d-flex row justify-content-end p-3">
                    <div className="col-6">
                      <ESButton
                        id={modalData.id}
                        text={"Cancel"}
                        // rounded
                        dataDismiss={updateRecordData.length > 0 ? null : 'modal'}
                        //onClick={_handleDiscardP_and_P}
                        onClick={_handleCancel}
                        customColor={color.greyColor}
                      />
                    </div>
                    <div className="col-6">
                      <ESButton
                        text={"Save"}
                        // rounded
                        dataDismiss={"modal"}
                        onClick={_handleSave}
                        disabled={!isEnabled}
                      />
                    </div>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ViewEditModal;

const UploadButton = (props) => {
  const { id, _UploadFile, isFile, ministryIndex } = props;
  return (
    <div
      className="p-1 my-1 text-center picContainer text-light"
      style={{
        width: "240px",
        // height: "160px",
        backgroundColor: isFile(id) ? color.greyColor : color.primaryColor,
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
            margin: 12,
            top: 0,
          }}
          type="file"
          id={id}
          // disabled={disabled}
          onClick={(event) => (event.target.value = null)}
          onChange={(e) => _UploadFile(e, id, ministryIndex)}
          accept=".docx,.xlsx,.pdf"
        />
        {isFile(id) ? (
          <i className="fa fa-sync-alt fa-2x pr-3" />
        ) : (
          <i className="fa fa-file-upload fa-2x pr-3" />
        )}
        <span style={{ marginTop: 6 }}>
          {isFile(id) ? "Change Document(s)" : " Upload Document(s)"}
        </span>
      </label>
    </div>
  );
};

const AiSuggestionPanel = (props) => {
  const {
    recordId,
    sectorId,
    suggestionList,
    updateSuggestion,
    _handlecheckSuggestion,
  } = props;
  // console.log(suggestionList)
  // console.log(updateSuggestion)
  return (
    <React.Fragment>
      <div
        className="pb-4"
        style={{ fontSize: font.heading2, color: color.primaryColor }}
      >
        <i className="far fa-lightbulb fa-2x pr-2" />
        Suggestions
      </div>
      {suggestionList &&
        [
          ...new Map(
            suggestionList.map((item) => [item["suggestion_id"], item])
          ).values(),
        ].map((v, k) => {
          const defaultActive = suggestionList.filter(
            (dt) =>
              dt.sector_id === sectorId &&
              dt.record_id === recordId &&
              dt.suggestion_id === v.suggestion_id
          );
          const filterSuggestions = updateSuggestion.filter(
            (d) =>
              d.suggestion_id === v.suggestion_id && d.record_id === recordId
          );
          const active = filterSuggestions[0]
            ? filterSuggestions[0].active
            : defaultActive[0]
              ? defaultActive[0].active
              : null;
          //  console.log('each', active)
          return (
            <div key={k}>
              {k !== 0 &&
                v.suggestion_name &&
                suggestionList[k - 1].suggestion_name && (
                  <hr
                    className="mt-0 mb-2"
                    style={{ height: "1px", backgroundColor: "#DEDEDE" }}
                  />
                )}
              {v.suggestion_name ? (
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => _handlecheckSuggestion(e, recordId)}
                    id={v.suggestion_id}
                    name={v.suggestion_name}
                    checked={active === 1 ? true : false}
                    style={{
                      marginRight: 6,
                      display: "inline-block",
                      border: "1px solid red",
                    }}
                  />
                  {v.suggestion_name}
                </label>
              ) : (
                <hr />
              )}
            </div>
          );
        })}
    </React.Fragment>
  );
};

const Sheets = (props) => {
  const {
    policyData,
    _handleSheetClick,
    ministryIndex,
    _handleAddSheet,
    id,
    _handleEditTitle,
    editTitle,
  } = props;
  //console.log(editTitle);
  //  console.log(_handleAddSheet);
  const defaultStyle = {
    borderRadius: "5px 5px 0 0",
  };
  const addIconStyle = { color: color.green, cursor: "pointer" };

  return (
    <div
      className="d-flex flex-row"
      style={{ borderBottom: "3px solid" + color.primaryColor }}
    >
      {policyData.map((v, k) => (
        <Fragment key={k}>
          <span
            className="mr-1 px-2 py-1"
            id={k}
            style={{
              ...defaultStyle,
              background:
                ministryIndex === k ? color.primaryColor : color.lightGrey,
              color: ministryIndex === k ? "#fff" : color.greyColor,
              cursor:
                editTitle && editTitle.ppId !== v.ppId
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            <a id={k} herf="#" onClick={(e) => _handleSheetClick(e)}>
              {v.title || `P&P ${k + 1}`}
            </a>
            {ministryIndex === k && (
              <i
                id={v.ppId}
                className="pl-1 fa fa-cog"
                onClick={(e) => _handleEditTitle(e)}
              />
            )}
          </span>
          {k + 1 === policyData.length && (
            <span className="p-1" style={addIconStyle}>
              <i
                id={id}
                className="fa fa-plus-circle"
                onClick={(e) => _handleAddSheet(e)}
              />
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
};
