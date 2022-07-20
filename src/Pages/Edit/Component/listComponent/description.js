import React from 'react'
import color from '../../../../Feature/Config/color';
import font from '../../../../Feature/Config/font';
import { ESButton } from '../../../Questionnaire/components/tools/ES_Button';
import { ESTooltip } from '../../../Questionnaire/components/tools/ES_ToolTip';
import { Sheets } from '../../Tools/sheet';
import { UploadButton } from '../../Tools/uploadButton';
import TextEditor from '../textEditor';
import ExpandModal from './expandModal';

const Description = (props) => {
  const {
    recordData,
    title,
    instruction,
    header,
    editorValue,
    editorHeader,
    _handleModalText,
    readOnly,
    ministryIndex,
    recordId,
    editTitle,
    newTitle,
    isEnabled,
    projIndex,
    PPID,
    _handleSheetClick,
    _handleEditTitle,
    _handleTitleChange,
    _handleUpdateTitle,
    _handleCancelEdit,
    _handleAddSheet,
    _UploadFile,
    _handleCancel,
    _handleSaveChanges,
    _CancelFile
  } = props;

  const isFile = () => {
    return typeof (editorValue) !== 'string' &&
      (editorValue.length > 0
        ? editorValue[ministryIndex].file_name
        : null);

  };

  const fileName = () => (isFile() ? isFile() : "No file chosen.");
 
  return (
    <div>
      <ExpandModal
        recordData={recordData}
        title={title}
        recordId={recordId}
        editorHeader={editorHeader}
        editorValue={editorValue}
        readOnly={false}
        isEnabled={isEnabled}
        projIndex={projIndex}
        _handleModalText={_handleModalText}
        _handleCancel={_handleCancel}
        _handleSaveChanges={_handleSaveChanges}
        ministryIndex={ministryIndex}
        editTitle={editTitle}
        newTitle={newTitle}
        PPID={PPID}
        isFile={isFile}
        fileName={fileName}
        _CancelFile={_CancelFile}
        _handleSheetClick={_handleSheetClick}
        _handleEditTitle={_handleEditTitle}
        _handleTitleChange={_handleTitleChange}
        _handleUpdateTitle={_handleUpdateTitle}
        _handleCancelEdit={_handleCancelEdit}
        _handleAddSheet={_handleAddSheet}
        _UploadFile={_UploadFile}
      
      />
      <div className='my-2'>
        <div
          className='border'
          style={{
            borderRadius: 5
          }}
        >
          {/* <div
            className="text-white font-weight-bold pl-2 py-2"
            style={{
              backgroundColor: color.primaryColor,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5
            }}
          >
            {header}
          </div> */}
          <div
            className="d-flex justify-content-between align-items-center text-white font-weight-bold p-2"
            style={{
              backgroundColor: color.primaryColor,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5
            }}
          >
            <div>
              <span className='font-weight-bold'>
                {title}
              </span>
              <i
                className="fa fa-info-circle px-1"
                data-tip
                data-for={title}
                style={{ cursor: 'pointer' }}
              />
              <ESTooltip
                id={title}
                level={'Instruction'}
                data={instruction}
              />
            </div>
            <i
              className="fas fa-external-link-alt text-white"
              style={{
                cursor: 'pointer'
              }}
              data-dismiss={"modal"}
              data-toggle={"modal"}
              data-target={editorHeader==='national_strategic_plan'? '#national': editorHeader==='policies' ?'#policy' : `#${editorHeader}`}
              data-backdrop="static"
              data-keyboard="false"
            />
          </div>

          {/* latest feedback - remove multi policy tabs. @seine*/}
          {/* {editorHeader === 'policies' && (
            <React.Fragment>
              <Sheets
                id={recordId}
                policyData={editorValue}
                ministryIndex={ministryIndex}
                _handleSheetClick={_handleSheetClick}
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
                    id={editTitle.id}
                    className="form-control w-25"
                    value={newTitle}
                    onChange={(e) => _handleTitleChange({ e: e, id: recordId })}
                  />
                  {
                    editTitle.id &&
                    <React.Fragment>
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
                    </React.Fragment>
                  }
                </div>
              )}
            </React.Fragment>
          )} */}
          <TextEditor
            recordData={recordData}
            header={editorHeader}
            ministryIndex={ministryIndex}
            value={editorHeader === 'policies'
              ? editorValue[ministryIndex]?.policy_and_programme
              : editorValue
            }
            _handleModalText={_handleModalText}
            projIndex={projIndex}
            readOnly={readOnly ? true : false}
          />
          {editorHeader === 'policies' && (
            <React.Fragment>
              <div className="d-flex flex-row border-top px-1">
                <div className="d-flex flex-column col-6 pl-2 mt-1">
                  <UploadButton
                    id={recordId}
                    _UploadFile={_UploadFile}
                    ministryIndex={ministryIndex}
                    isFile={isFile}
                    _CancelFile={_CancelFile}
                  />
                </div>

              </div>
              <div className="d-flex flex-row mb-2">
                <div className="d-flex flex-column col-6">
                  <div
                    className="font-weight-bold"
                    style={{ color: color.primaryColor }}
                  >
                    File :
                  </div>
                  <span
                    style={{
                      color: fileName() === 'No file chosen.'
                        && color.lightGrey
                    }}
                  >
                    {fileName()}
                  </span>
                </div>
                <div className="d-flex flex-column col-6">
                  <div
                    className="font-weight-bold"
                    style={{ color: color.primaryColor }}
                  >
                    Author :
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    value={editorValue[ministryIndex]?.ministry
                      ? editorValue[ministryIndex]?.ministry
                      : ""
                    }
                    onChange={(e) =>
                      _handleModalText({
                        id: recordId,
                        text: e.target.value,
                        header: "ministry",
                        ministryIndex: ministryIndex,
                      })
                    }
                  />
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  )
}

export default Description;
