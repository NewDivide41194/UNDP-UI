import React from 'react'
import color from '../../../../Feature/Config/color';
import font from '../../../../Feature/Config/font'
import { ESButton } from '../../../Questionnaire/components/tools/ES_Button';
import TextEditor from '../textEditor';
import {Sheets} from '../../Tools/sheet'
import {UploadButton} from '../../Tools/uploadButton'

const ExpandModal = (props) => {
    const {
        recordData,
        title,
        recordId,
        editorHeader,
        editorValue,
        readOnly,
        isEnabled,
        _handleModalText,
        _handleCancel,
        _handleSaveChanges,
        ministryIndex,
        editTitle,
        newTitle,
        isFile,
        fileName,
        _handleSheetClick,
        _handleEditTitle,
        _handleTitleChange,
        _handleUpdateTitle,
        _handleCancelEdit,
        _handleAddSheet,
        _UploadFile,
        _CancelFile ,
        projIndex
    } = props;
  
    return (
        <div
            className={`modal fade`}
            id={editorHeader==='national_strategic_plan'? 'national': editorHeader==='policies' ?'policy' : editorHeader}
            // tabIndex="-1"
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
        >
            <div
                className="modal-dialog modal-dialog-centered modal-lg"
                style={{ maxWidth: 750, zIndex: 0 }}
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
                            {title}
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


                    <div className="modal-body text-left p-0">
                        <div className="p-3" >
                            <TextEditor
                                recordData={recordData}
                                header={editorHeader}
                                ministryIndex={ministryIndex}
                                value={editorHeader === 'policies'
                                ? editorValue[ministryIndex].policy_and_programme
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
                                        value={editorValue[ministryIndex].ministry
                                        ? editorValue[ministryIndex].ministry
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
                        <div className="d-flex row justify-content-end p-3">
                            <div className="col-6">
                            <ESButton
                                id={recordId}
                                text={"Cancel"}
                                dataDismiss={'modal'}
                                onClick={_handleCancel}
                                customColor={color.greyColor}
                            />
                            </div>
                            <div className="col-6">
                            <ESButton
                                text={"Save"}
                                dataDismiss={"modal"}
                                onClick={_handleSaveChanges}
                                disabled={!isEnabled}
                            />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ExpandModal;